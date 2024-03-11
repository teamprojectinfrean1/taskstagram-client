import { useEffect, useState, useRef } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import IssueStory from "@/components/IssueManagement/IssueStory";
import useOverflowDetection from "@/hooks/useOverflowDetection";

const SCROLL_AMOUNT_ON_ARROW_CLICK = 500;
const SCROLL_POSITION_TOLERANCE = 5;

type IssueStoryContainerProps = {
};

const IssueStoryContainer = ({
}: IssueStoryContainerProps) => {
  const issueStoryListRef = useRef<HTMLDivElement>(null);
  const storyIsOverflowing = useOverflowDetection(
    issueStoryListRef,
    "horizontal"
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (issueStoryListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        issueStoryListRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - SCROLL_POSITION_TOLERANCE);
    }
  };

  useEffect(() => {
    const currentContainer = issueStoryListRef.current;
    currentContainer?.addEventListener("scroll", checkScrollButtons);
    checkScrollButtons();

    return () => {
      currentContainer?.removeEventListener("scroll", checkScrollButtons);
    };
  }, []);

  const handleScroll = (direction: number) => {
    if (issueStoryListRef.current) {
      issueStoryListRef.current.scrollLeft +=
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
          overflow="auto"
          display="flex"
          ref={issueStoryListRef}
          className="custom-scrollbar"
          sx={{
            scrollBehavior: "smooth",
          }}
          alignSelf="center"
        >
          <IssueStory key={0} name="아주 긴 사용자 이름"/>
          {Array.from({ length: 20 }, (_, index) => (
            <IssueStory key={index} name="성이름"/>
          ))}
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

export default IssueStoryContainer;
