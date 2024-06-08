import { useState, useEffect, useRef } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import toolbarOptions from "@/components/Editor/toolbarConfig";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type TextEditorProps = {
  id: string;
  isReadOnly: boolean;
  initialContent: RawDraftContentState | null;
  handleContentChange: (content: RawDraftContentState) => void;
};

const TextEditor = ({
  id,
  isReadOnly,
  initialContent,
  handleContentChange,
}: TextEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isInitialized = useRef(false);

  useEffect(() => {
    if (initialContent && !isInitialized.current) {
      const contentState = convertFromRaw(initialContent);
      setEditorState(EditorState.createWithContent(contentState));
      isInitialized.current = true;
    }
  }, [initialContent]);

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    const rawContent = convertToRaw(newState.getCurrentContent());
    if (!rawContent.blocks.every((block) => block.text === "")) {
      handleContentChange(rawContent);
    }
  };

  return (
    <Editor
      id={id}
      readOnly={isReadOnly}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorClassName="custom-scrollbar"
      toolbar={toolbarOptions}
      localization={{ locale: "ko" }}
      editorStyle={{
        height: "360px",
        width: "100%",
        border: "1px solid lightgray",
        borderRadius: 4,
        padding: "20px",
      }}
    />
  );
};

export default TextEditor;
