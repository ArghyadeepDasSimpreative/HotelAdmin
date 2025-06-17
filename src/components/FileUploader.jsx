import { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import Button from "./Button";

const FileUploader = ({ label = "Upload Image", onFileSelect }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    onFileSelect(file); // pass the file to parent
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col gap-3 w-full my-3 max-w-[300px] border border-slate-400 rounded-md p-3">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={triggerFileInput}
        className="flex items-center gap-2 px-4 py-2 text-white bg-black hover:bg-gray-800 rounded-md text-sm"
      >
        <FiUpload className="text-white" />
        {label}
      </button>

      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="h-36 object-cover rounded border border-black/20 w-[300px]"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
