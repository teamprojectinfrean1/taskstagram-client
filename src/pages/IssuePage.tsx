import { useState } from "react";
import { useQueryClient } from "react-query";
import {
  IssueFormModal,
  IssueStoryContainer,
  IssueTicket,
  IssueStatusBoard,
} from "@/components/Issue";
import { Box, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  issueIdToShowInModalState,
  issueFeatureAvailabilityState,
} from "@/stores/issueStore";
import { useRecoilState, useRecoilValue } from "recoil";
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
import theme from "@/theme/theme";
import { userInfoState } from "@/stores/userStore";
import { selectedProjectState } from "@/stores/projectStore";
import useUpdateIssueStatus from "@/hooks/useUpdateIssueStatus";

const IssuePage = () => {
  const queryClient = useQueryClient();

  const { memberId } = useRecoilValue(userInfoState);

  const selectedProject = useRecoilValue(selectedProjectState);
  const selectedProjectId = selectedProject ? selectedProject.projectId : undefined;

  const [issueIdToShowInModal, setIssueIdToShowInModal] = useRecoilState(
    issueIdToShowInModalState
  );

  const isIssueFeatureAvailable = useRecoilValue(issueFeatureAvailabilityState);
  const [draggedIssueTicket, setDraggedIssueTicket] =
    useState<IssueSummary | null>(null);
  const [hoveredStatusBoardId, setHoveredStatusBoardId] = useState<
    string | null
  >(null);

  const executeUpdateIssueStatus = useUpdateIssueStatus({
    projectId: selectedProjectId!,
    queryClient,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    setDraggedIssueTicket(event.active.data.current?.issue);
  };

  const onDragOver = (event: DragOverEvent) => {
    const targetStatusBoardId = event.over?.id;
    if (
      typeof targetStatusBoardId === "string" ||
      targetStatusBoardId === null
    ) {
      setHoveredStatusBoardId(targetStatusBoardId);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const currentDraggable = active.data.current;

    const issueTicket: IssueSummary = currentDraggable?.issue;
    const targetStatusBoardId = over?.id;
    const originStatusBoardId = currentDraggable?.parent;

    if (
      issueTicket &&
      originStatusBoardId &&
      targetStatusBoardId &&
      originStatusBoardId !== targetStatusBoardId
    ) {
      executeUpdateIssueStatus({
        issue: issueTicket,
        oldStatus: originStatusBoardId as IssueStatus,
        newStatus: targetStatusBoardId as IssueStatus,
        modifierId: memberId,
      });
    }

    setHoveredStatusBoardId(null);
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
          <IssueStoryContainer projectId={selectedProjectId!} />
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
          <IssueStatusBoard
            statusId="TODO"
            isHovered={hoveredStatusBoardId === "TODO"}
            isIssueFeatureAvailable={isIssueFeatureAvailable}
            projectId={selectedProjectId}
            title="할 일"
          />
          <IssueStatusBoard
            statusId="INPROGRESS"
            isHovered={hoveredStatusBoardId === "INPROGRESS"}
            isIssueFeatureAvailable={isIssueFeatureAvailable}
            projectId={selectedProjectId}
            title="진행 중"
          />
          <IssueStatusBoard
            statusId="DONE"
            isHovered={hoveredStatusBoardId === "DONE"}
            isIssueFeatureAvailable={isIssueFeatureAvailable}
            projectId={selectedProjectId}
            title="완료"
          />
        </Box>
      </Stack>
      {createPortal(
        <DragOverlay>
          {draggedIssueTicket && (
            <IssueTicket
              issue={draggedIssueTicket}
              sx={{
                backgroundColor: "#F3F3F7",
                border: "1px solid #313449",
              }}
            />
          )}
        </DragOverlay>,
        document.body
      )}
      {selectedProjectId && isIssueFeatureAvailable && (
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
      )}
      {selectedProjectId && issueIdToShowInModal && (
        <IssueFormModal
          currentIssueId={issueIdToShowInModal}
          handleClose={() => setIssueIdToShowInModal(null)}
          projectId={selectedProjectId}
        />
      )}
    </DndContext>
  );
};

export default IssuePage;
