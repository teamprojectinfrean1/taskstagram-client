import { useRef } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import CommentCard from "@/components/Comment/CommentCard";
import InfiniteScroller from "@/components/InfiniteScroller";
import { getCommentList } from "@/apis/commentApi";
import { useRecoilValue } from "recoil";
import { issueIdToShowInModalState } from "@/stores/issueStore";

const SkeletonCommentCard = (
  <Box display="flex" gap={4}>
    <Skeleton variant="circular" width={50} height={50} />
    <Skeleton
      variant="rectangular"
      height={120}
      sx={{ flexGrow: 1, borderRadius: "4px" }}
    />
  </Box>
);

const COMMENT_PER_PAGE = 15;

const CommentList = () => {
  const issueId = useRecoilValue(issueIdToShowInModalState);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Stack spacing={4} sx={{ mt: 3 }} ref={containerRef}>
      <InfiniteScroller<ExistingComment>
        queryFunction={getCommentList}
        queryKey={["commentList", issueId!]}
        requestOptions={{
          issueId,
          size: COMMENT_PER_PAGE,
        }}
        containerRef={containerRef}
        firstPageErrorMessage="댓글 목록을 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오."
        subsequentPageErrorMessage="댓글 목록을 추가로 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오."
        noDataToShowMessage="현재 표시할 댓글이 없습니다."
        renderItem={(comment) => (
          <CommentCard key={comment.commentId} comment={comment} />
        )}
        renderSkeleton={() => SkeletonCommentCard}
      />
    </Stack>
  );
};

export default CommentList;
