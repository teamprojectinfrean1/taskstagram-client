import { useState } from "react";
import IssueFormModal from "@/components/IssueManagement/IssueFormModal";
import IssueTicketContainer from "@/components/IssueManagement/IssueTicketContainer";
import IssueStoryContainer from "@/components/IssueManagement/IssueStoryContainer";
import { Box, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { currentIssueIdToShowInModal } from "@/stores/issueStore";
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
import theme from "@/theme/theme";

const IssuePage = () => {
  const [currentIssueId, setCurrentIssueId] = useRecoilState(
    currentIssueIdToShowInModal
  );
  const [draggedIssue, setDraggedIssue] = useState<IssueSummary | null>(null);
  const [hoveredContainerId, setHoveredContainerId] = useState<string | null>(
    null
  );
  
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
    const targetContainer = event.over?.id;
    if (typeof targetContainer === "string" || targetContainer === null) {
      setHoveredContainerId(targetContainer);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const currentDraggable = active.data.current;

    const targetContainer = over?.id;
    const issueTicket: IssueSummary = currentDraggable?.issue;
    const index = currentDraggable?.index;
    const originContainer = currentDraggable?.parent;

    if (originContainer !== targetContainer) {
      if (targetContainer === "toDo") {
        setTodoItems([issueTicket, ...todoItems]);
      } else if (targetContainer === "inProgress") {
        setInProgressItems([issueTicket, ...inProgressItems]);
      } else if (targetContainer === "done") {
        setDoneItems([issueTicket, ...doneItems]);
      }
      if (originContainer === "toDo") {
        setTodoItems([
          ...todoItems.slice(0, index),
          ...todoItems.slice(index + 1),
        ]);
      } else if (originContainer === "inProgress") {
        setInProgressItems([
          ...inProgressItems.slice(0, index),
          ...inProgressItems.slice(index + 1),
        ]);
      } else if (originContainer === "done") {
        setDoneItems([
          ...doneItems.slice(0, index),
          ...doneItems.slice(index + 1),
        ]);
      }
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
            title="할 일"
            IconComponent={AddCircleIcon}
            onIconComponentClick={() => {}}
          />
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
          {createPortal(
            <DragOverlay>
              {draggedIssue && (
                <IssueTicket
                  issue={draggedIssue}
                  sx={{ backgroundColor: "#F3F3F7", border: "1px solid #313449" }}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </Box>
      </Stack>
      <IssueFormModal
        currentIssueId={currentIssueId}
        handleClose={() => setCurrentIssueId("")}
      />
    </DndContext>
  );
};

export default IssuePage;
