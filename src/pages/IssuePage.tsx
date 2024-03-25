import { useState } from "react";
import IssueFormModal from "@/components/IssueManagement/IssueFormModal";
import IssueTicketContainer from "@/components/IssueManagement/IssueTicketContainer";
import IssueStoryContainer from "@/components/IssueManagement/IssueStoryContainer";
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
import {
  mockDoneIssueSummaryList,
  mockInProgressIssueSummaryList,
  mockToDoIssueSummaryList,
} from "@/mock/issueMock";
import { IssueSummary } from "@/models/Issue";
import IssueTicket from "@/components/IssueManagement/IssueTicket";
import { createPortal } from "react-dom";
import IssueTicketMaker from "@/components/IssueManagement/IssueTicketMaker";

const IssuePage = () => {
  const [issueIdToShowInModal, setIssueIdToShowInModal] = useRecoilState(
    issueIdToShowInModalState
  );
  const [draggedIssue, setDraggedIssue] = useState<IssueSummary | null>(null);
  const [hoveredContainerId, setHoveredContainerId] = useState<string | null>(
    null
  );
  const [showIssueTicketMaker, setShowIssueTicketMaker] = useState(false);

  /* 추후 useState말고 useQuery 사용 예정 */
  const [todoItems, setTodoItems] = useState<Array<IssueSummary>>(
    mockToDoIssueSummaryList
  );
  const [doneItems, setDoneItems] = useState<Array<IssueSummary>>(
    mockDoneIssueSummaryList
  );
  const [inProgressItems, setInProgressItems] = useState<Array<IssueSummary>>(
    mockInProgressIssueSummaryList
  );

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

    const targetContainerId = over?.id;
    const issueTicket: IssueSummary = currentDraggable?.issue;
    const index = currentDraggable?.index;
    const originContainer = currentDraggable?.parent;

    if (originContainer !== targetContainerId) {
      if (targetContainerId === "toDo") {
        setTodoItems([issueTicket, ...todoItems]);
      } else if (targetContainerId === "inProgress") {
        setInProgressItems([issueTicket, ...inProgressItems]);
      } else if (targetContainerId === "done") {
        setDoneItems([issueTicket, ...doneItems]);
      }

      const removeFromList = (list: IssueSummary[]) =>
        list.filter((_, i) => i !== index);

      if (originContainer === "toDo") {
        setTodoItems(removeFromList(todoItems));
      } else if (originContainer === "inProgress") {
        setInProgressItems(removeFromList(inProgressItems));
      } else if (originContainer === "done") {
        setDoneItems(removeFromList(doneItems));
      }
    }
    setHoveredContainerId(null);
  };

  const handleAddIssue = (newIssue: IssueSummary | null) => {
    if (!!newIssue) {
      setTodoItems([newIssue, ...todoItems]);
    }
    setShowIssueTicketMaker(false);
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
            issueTicketList={todoItems}
            showIssueTicketMaker={showIssueTicketMaker}
            title="할 일"
            IconComponent={AddCircleIcon}
            onIconComponentClick={() => setShowIssueTicketMaker(true)}
          >
            {showIssueTicketMaker && (
              <IssueTicketMaker handleAddIssue={handleAddIssue} />
            )}
          </IssueTicketContainer>
          <IssueTicketContainer
            ariaLabel="create issue"
            containerId="inProgress"
            isHovered={hoveredContainerId === "inProgress"}
            issueTicketList={inProgressItems}
            title="진행 중"
          />
          <IssueTicketContainer
            ariaLabel="delete issue"
            containerId="done"
            isHovered={hoveredContainerId === "done"}
            issueTicketList={doneItems}
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
