import { useEffect, useState, useRef } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { SkeletonUserStory, UserStory } from "@/components/IssueManagement";
import useOverflowDetection from "@/hooks/useOverflowDetection";
import useGetUserStoryListQuery from "@/hooks/useGetIssueStoryListQuery";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const SCROLL_AMOUNT_ON_ARROW_CLICK = 500;
const SCROLL_POSITION_TOLERANCE = 5;

type UserStoryContainerProps = {
  projectId: string;
};

const UserStoryContainer = ({ projectId }: UserStoryContainerProps) => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetUserStoryListQuery({ projectId: projectId! });

  const lastIssueRef = useIntersectionObserver({
    containerId: "userStory",
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const [testLoading, setTestLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setTestLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const userStoryListRef = useRef<HTMLDivElement>(null);
  const storyIsOverflowing = useOverflowDetection(
    userStoryListRef,
    "horizontal"
  );

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (userStoryListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = userStoryListRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(
        scrollLeft < scrollWidth - clientWidth - SCROLL_POSITION_TOLERANCE
      );
    }
  };

  useEffect(() => {
    const currentContainer = userStoryListRef.current;
    currentContainer?.addEventListener("scroll", checkScrollButtons);
    checkScrollButtons();

    return () => {
      currentContainer?.removeEventListener("scroll", checkScrollButtons);
    };
  }, [storyIsOverflowing]);

  const handleScroll = (direction: number) => {
    if (userStoryListRef.current) {
      userStoryListRef.current.scrollLeft +=
        direction * SCROLL_AMOUNT_ON_ARROW_CLICK;
    }
  };

  return (
    <Paper elevation={2} sx={{ height: "100%" }}>
      <Box
        display="flex"
        alignItems="center"
        sx={{ height: "100%", px: 1, py: 2 }}
      >
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
          id="userStory"
          overflow="auto"
          display="flex"
          ref={userStoryListRef}
          className="custom-scrollbar"
          sx={{
            scrollBehavior: "smooth",
          }}
          alignSelf="center"
        >
          {!testLoading &&
            Array.from({ length: 10 }, (_, index) => (
              <UserStory key={index} name="성이름" />
            ))}
          <div
            ref={hasNextPage ? lastIssueRef : undefined}
            style={{ margin: 0 }}
          />
          {(isFetchingNextPage || testLoading) &&
            Array.from({ length: 8 }, (_, i) => <SkeletonUserStory key={i} />)}
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
    </Paper>
  );
};

export default UserStoryContainer;
