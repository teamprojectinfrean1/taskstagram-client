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

type TextEditorProps = {
  id: string;
  initialContent: RawDraftContentState | null;
  handleContentChange: (content: RawDraftContentState) => void;
};

const TextEditor = ({
  id,
  initialContent,
  handleContentChange,
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

  return (
    <Editor
      id={id}
      editorState={editorState}
      editorClassName="custom-scrollbar"
      onEditorStateChange={onEditorStateChange}
      localization={{ locale: "ko" }}
      toolbar={toolbarOptions}
      editorStyle={{
        height: "360px",
        width: "100%",
        border: "1px solid lightgray",
        padding: "20px",
      }}
    />
  );
};

export default TextEditor;
