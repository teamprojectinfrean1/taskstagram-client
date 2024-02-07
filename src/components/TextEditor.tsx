import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";

type TextEditorProps = {
  id: string;
  initialContent: string | null;
  // onSelectionChange: (value: ContentState| null) => void;
};

const TextEditor = ({
  id,
  initialContent,
  // onSelectionChange,
}: TextEditorProps) => {
  // const handleEditorChange = (newEditorState: EditorState) => {
  //   const contentState = newEditorState.getCurrentContent();
  //   onSelectionChange(contentState);
  // };


  return (
    <div>
      <Editor
        editorState={
          initialContent
            ? EditorState.createWithContent(
                ContentState.createFromText(initialContent)
              )
            : EditorState.createEmpty()
        }
        // onEditorStateChange={handleEditorChange}
        localization={{ locale: "ko" }}
        editorStyle={{
          height: "400px",
          width: "100%",
          border: "1px solid lightgray",
          padding: "20px",
        }}
      />
    </div>
  );
};

export default TextEditor;
