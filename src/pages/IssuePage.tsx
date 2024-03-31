import { useState } from "react";
import {
  IssueFormModal,
  IssueStoryContainer,
  IssueTicket,
  IssueTicketContainer,
  IssueTicketMaker,
} from "@/components/IssueManagement";
import { Box, Fade, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
import { IssueSummary, IssueStatus } from "@/models/Issue";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { useUpdateIssueStatusMutation } from "@/hooks/useUpdateIssueStatusMutation";

const IssuePage = () => {
  const { projectId } = useParams();
  // 추후 api 요청 보낸 후 존재하지 않는 projectId면 Not Found 페이지로 리다이렉트

  const [issueIdToShowInModal, setIssueIdToShowInModal] = useRecoilState(
    issueIdToShowInModalState
  );
  const [draggedIssue, setDraggedIssue] = useState<IssueSummary | null>(null);
  const [hoveredContainerId, setHoveredContainerId] = useState<string | null>(
    null
  );
  const [showIssueTicketMaker, setShowIssueTicketMaker] = useState(false);

  const mutation = useUpdateIssueStatusMutation(projectId!);

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
      mutation.mutate({
        issue: issueTicket,
        oldStatus: originContainerId as IssueStatus,
        newStatus: targetContainerId as IssueStatus,
      });
    }

    setHoveredContainerId(null);
  };

  // const handleAddIssue = (newIssue: IssueSummary | null) => {
  //   if (!!newIssue) {
  //     setTodoItems([newIssue, ...todoItems]);
  //   }
  //   setShowIssueTicketMaker(false);
  // };

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
          <IssueStoryContainer />
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
            ariaLabel="create issue"
            containerId="toDo"
            isHovered={hoveredContainerId === "toDo"}
            showIssueTicketMaker={showIssueTicketMaker}
            title="할 일"
            IconComponent={AddCircleIcon}
            onIconComponentClick={() => setShowIssueTicketMaker(true)}
          >
            {/* {showIssueTicketMaker && (
              <IssueTicketMaker handleAddIssue={handleAddIssue} />
            )} */}
          </IssueTicketContainer>
          <IssueTicketContainer
            ariaLabel="create issue"
            containerId="inProgress"
            isHovered={hoveredContainerId === "inProgress"}
            title="진행 중"
          />
          <IssueTicketContainer
            ariaLabel="delete issue"
            containerId="done"
            isHovered={hoveredContainerId === "done"}
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
      <IssueFormModal
        currentIssueId={issueIdToShowInModal}
        handleClose={() => setIssueIdToShowInModal("")}
      />
    </DndContext>
  );
};

export default IssuePage;
