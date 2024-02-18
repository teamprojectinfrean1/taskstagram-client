import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw, RawDraftContentState } from "draft-js";

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
      editorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      onEditorStateChange={onEditorStateChange}
      localization={{ locale: "ko" }}
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