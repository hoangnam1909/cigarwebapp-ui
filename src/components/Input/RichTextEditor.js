import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function RichTextEditor({ data, onChange }) {
  return <ReactQuill theme="snow" value={data} onChange={onChange} />;
}

export default RichTextEditor;
