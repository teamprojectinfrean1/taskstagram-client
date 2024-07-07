import { useEffect, useState, useRef } from "react";
import { Box, IconButton, Paper, Skeleton } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { SkeletonIssueStory, IssueStory } from "@/components/Issue";
import useOverflowDetection from "@/hooks/useOverflowDetection";
import { getPaginatedProjectMemberList } from "@/apis/memberApi";
import InfiniteScroller from "@/components/InfiniteScroller";
import { PROJECT_MEMBER_PER_PAGE } from "@/constants";

const SCROLL_AMOUNT_ON_ARROW_CLICK = 500;
const SCROLL_POSITION_TOLERANCE = 5;

type IssueStoryContainerProps = {
  projectId?: string;
};

const IssueStoryContainer = ({ projectId }: IssueStoryContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const storyIsOverflowing = useOverflowDetection(containerRef, "horizontal");

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(
        scrollLeft < scrollWidth - clientWidth - SCROLL_POSITION_TOLERANCE
      );
    }
  };

  useEffect(() => {
    const currentContainer = containerRef.current;
    currentContainer?.addEventListener("scroll", checkScrollButtons);
    checkScrollButtons();

    return () => {
      currentContainer?.removeEventListener("scroll", checkScrollButtons);
    };
  }, [storyIsOverflowing]);

  const handleScroll = (direction: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft +=
        direction * SCROLL_AMOUNT_ON_ARROW_CLICK;
    }
  };

  return (
    <Paper elevation={2} sx={{ height: "100%" }}>
      {!projectId ? (
        <Skeleton variant="rounded" height="100%" />
      ) : (
        <Box display="flex" alignItems="center" sx={{ height: "100%", py: 2 }}>
          <IconButton
            size="large"
            aria-label="scroll leftwards"
            sx={{
              visibility:
                storyIsOverflowing && canScrollLeft ? "visible" : "hidden",
            }}
            onClick={() => handleScroll(-1)}
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
          <Box
            id="IssueStory"
            overflow="auto"
            display="flex"
            ref={containerRef}
            className="custom-scrollbar"
            sx={{
              scrollBehavior: "smooth",
            }}
            alignSelf="center"
            gap={1}
          >
            <InfiniteScroller<ProjectMember>
              queryFunction={getPaginatedProjectMemberList}
              queryKey={["issueStoryList", projectId]}
              requestOptions={{
                projectId,
                size: PROJECT_MEMBER_PER_PAGE,
              }}
              containerRef={containerRef}
              firstPageErrorMessage="스토리 목록을 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오."
              subsequentPageErrorMessage="스토리 목록을 추가로 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오."
              noDataToShowMessage="현재 표시할 스토리가 없습니다."
              renderItem={(story) => (
                <IssueStory key={story.memberId} story={story} />
              )}
              renderSkeleton={(index) => <SkeletonIssueStory key={index} />}
              numberOfSkeletons={9}
            />
          </Box>
          <IconButton
            size="large"
            aria-label="scroll rightwards"
            sx={{
              visibility:
                storyIsOverflowing && canScrollRight ? "visible" : "hidden",
            }}
            onClick={() => handleScroll(+1)}
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default IssueStoryContainer;
