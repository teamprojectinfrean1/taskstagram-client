import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import toolbarOptions from "@/components/Editor/toolbarConfig";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
} from "draft-js";
import { Skeleton } from "@mui/material";

type TextEditorProps = {
  id: string;
  initialContent: RawDraftContentState | null;
  handleContentChange: (content: RawDraftContentState) => void;
  isLoading?: boolean;
};

const TextEditor = ({
  id,
  initialContent,
  handleContentChange,
  isLoading = false,
}: TextEditorProps) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      return EditorState.createWithContent(convertFromRaw(initialContent));
    }
    return EditorState.createEmpty();
  });

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    handleContentChange(convertToRaw(newState.getCurrentContent()));
  };

  return isLoading ? (
    <Skeleton variant="rectangular" height={450} sx={{ borderRadius: "4px" }} />
  ) : (
    <Editor
      id={id}
      editorState={editorState}
      editorClassName="custom-scrollbar"
      onEditorStateChange={onEditorStateChange}
      localization={{ locale: "ko" }}
      toolbar={toolbarOptions}
      editorStyle={{
        height: "400px",
        width: "100%",
        border: "1px solid lightgray",
        padding: "20px",
      }}
    />
  );
};

export default TextEditor;
