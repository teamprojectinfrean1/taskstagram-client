import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";

type TextEditorProps = {
  isInitialEntry: boolean;
};

const TextEditor = ({ isInitialEntry }: TextEditorProps) => {
  const [editorState, setEditorState] = useState(
    isInitialEntry
      ? EditorState.createEmpty()
      : EditorState.createWithContent(ContentState.createFromText(""))
  ); /* API에서 반환된 텍스트 콘텐츠로 업데이트 필요 */

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
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
