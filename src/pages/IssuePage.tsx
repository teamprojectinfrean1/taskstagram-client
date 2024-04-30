import { useState } from "react";
import {
  IssueFormModal,
  IssueStoryContainer,
  IssueTicket,
  IssueTicketContainer,
} from "@/components/IssueManagement";
import { Box, Fade, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { issueIdToShowInModalState } from "@/stores/issueStore";
import { useRecoilState } from "recoil";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
// import { useUpdateIssueStatusMutation } from "@/hooks/useUpdateIssueStatusMutation";
import theme from "@/theme/theme";

const IssuePage = () => {
  // const { projectId } = useParams();
  const projectId = "1a490be9-a3f7-4483-bc42-c283fec0e004"; // 추후 제거 예정
  // 추후 api 요청 보낸 후 존재하지 않는 projectId면 Not Found 페이지로 리다이렉트
  const [issueIdToShowInModal, setIssueIdToShowInModal] = useRecoilState(
    issueIdToShowInModalState
  );
  const [draggedIssue, setDraggedIssue] = useState<IssueSummary | null>(null);
  const [hoveredContainerId, setHoveredContainerId] = useState<string | null>(
    null
  );

  // const mutation = useUpdateIssueStatusMutation(projectId!);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    setDraggedIssue(event.active.data.current?.issue);
    return;
  };

  const onDragOver = (event: DragOverEvent) => {
    const targetContainerId = event.over?.id;
    if (typeof targetContainerId === "string" || targetContainerId === null) {
      setHoveredContainerId(targetContainerId);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const currentDraggable = active.data.current;

    const issueTicket: IssueSummary = currentDraggable?.issue;
    const targetContainerId = over?.id;
    const originContainerId = currentDraggable?.parent;

    if (
      issueTicket &&
      originContainerId &&
      targetContainerId &&
      originContainerId !== targetContainerId
    ) {
      // mutation.mutate({
      //   issue: issueTicket,
      //   oldStatus: originContainerId as IssueStatus,
      //   newStatus: targetContainerId as IssueStatus,
      // });
    }

    setHoveredContainerId(null);
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <Stack
        spacing={4}
        sx={{
          height: "100%",
          minHeight: "700px",
        }}
      >
        <Box sx={{ height: "10%", minHeight: "120px" }}>
          {/* <IssueStoryContainer projectId={projectId!} /> */}
        </Box>
        <Box
          display="flex"
          flexDirection={{
            xs: "column",
            md: "row",
          }}
          gap={4}
          sx={{
            height: "90%",
            minHeight: "300px",
          }}
        >
          <IssueTicketContainer
            containerId="TODO"
            isHovered={hoveredContainerId === "TODO"}
            projectId={projectId!}
            title="할 일"
          />
          <IssueTicketContainer
            containerId="INPROGRESS"
            isHovered={hoveredContainerId === "INPROGRESS"}
            projectId={projectId!}
            title="진행 중"
          />
          <IssueTicketContainer
            containerId="DONE"
            isHovered={hoveredContainerId === "DONE"}
            projectId={projectId!}
            title="완료"
          />
        </Box>
      </Stack>
      {createPortal(
        <DragOverlay>
          {draggedIssue && (
            <IssueTicket
              issue={draggedIssue}
              sx={{
                backgroundColor: "#F3F3F7",
                border: "1px solid #313449",
              }}
            />
          )}
        </DragOverlay>,
        document.body
      )}
      <IconButton
        size="large"
        edge="end"
        aria-label="Create New Issue"
        onClick={() => setIssueIdToShowInModal("new-issue")}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.default,
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.grey[400],
            color: theme.palette.grey[600],
            "&:hover": {
              backgroundColor: theme.palette.grey[400],
            },
          },
          p: 0.5,
          position: "fixed",
          bottom: 30,
          right: 60,
          boxShadow: 4,
          zIndex: 1000,
          alignSelf: "flex-end",
        }}
      >
        <AddIcon />
      </IconButton>
      {issueIdToShowInModal && (
        <IssueFormModal
          currentIssueId={issueIdToShowInModal}
          handleClose={() => setIssueIdToShowInModal(null)}
        />
      )}
    </DndContext>
  );
};

export default IssuePage;
