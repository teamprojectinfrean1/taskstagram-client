import BasicModal from "@/components/BasicModal";
import SearchableSelect from "@/components/SearchableSelect";
import { useState, Fragment } from "react";
import { IssueFormData } from "@/models/Issue";

type IssueFormModalProps = {
  isInitialEntry: boolean;
};

const IssueFormModal = ({ isInitialEntry }: IssueFormModalProps) => {
  const [formData, setFormData] = useState<IssueFormData>(
    isInitialEntry
      ? {
          title: "",
          content: null,
          assignee: null,
          task: null,
          dateRange: null,
          type: null,
          status: null,
        }
      : {
          title: "",
          content: "",
          assignee: [""],
          task: "",
          dateRange: ["", ""],
          type: "",
          status: "",
        }
  );

  const handleInputChange = (
    field: keyof IssueFormData,
    value: string | string[] | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <BasicModal
      modalButtonContent=""
      addCommentSection
      additionalInputs={
        <Fragment>
          <SearchableSelect
            label="담당자"
            possibleOptions={["Option 1", "Option 2", "Option 3"]}
            selectedOptions={formData.assignee}
            multiselect
            onSelectionChange={(value) => handleInputChange("assignee", value)}
          />
          <SearchableSelect
            label="Task"
            possibleOptions={["Option 1", "Option 2", "Option 3"]}
            selectedOptions={formData.task}
            onSelectionChange={(value) => handleInputChange("task", value)}
          />
          <SearchableSelect
            label="타입"
            possibleOptions={["Option 1", "Option 2", "Option 3"]}
            selectedOptions={formData.type}
            onSelectionChange={(value) => handleInputChange("type", value)}
          />
          <SearchableSelect
            label="상태"
            possibleOptions={["Option 1", "Option 2", "Option 3"]}
            selectedOptions={formData.status}
            onSelectionChange={(value) => handleInputChange("status", value)}
          />
        </Fragment>
      }
    ></BasicModal>
  );
};

export default IssueFormModal;
