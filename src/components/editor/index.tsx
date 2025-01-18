import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

const CLOUDINARY_UPLOAD_PRESET = "clueloop";
const CLOUD_NAME = "dmr4qgehu";

const CustomEditor: React.FC<
  ReactQuillProps & {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }
> = ({ value, setValue, ...props }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const quillRef = useRef<ReactQuill>(null);

  const handleImageUpload = useCallback(() => {
    // helps to pick image
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("file", file);
        // Cloudinary setting for managing uploads.
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
          setIsUploading(true);
          const response = await axios.post(
            // Replace "your_cloud_name" with your actual Cloudinary cloud name.
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
            formData
          );

          // gets the uploaded image URL.
          const imageUrl = response.data.secure_url;
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            // Inserts the image at the current cursor position in the editor.
            quill.insertEmbed(range!.index, "image", imageUrl);
          }
        } catch (error) {
          console.log(error);
          toast.error("Error uploading image");
        } finally {
          setIsUploading(false);
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["clean"], // remove formatting button
      ],
      handlers: {
        image: handleImageUpload, // Custom image handler
      },
    },
  };

  useEffect(() => {
    if (quillRef.current) quillRef.current.focus();
  }, []);

  return (
    <div className="custom-editor z-[100000] flex-gro  relative">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        className=" dark:text-white text-gray-800  border-none "
        ref={quillRef}
        placeholder="Start typing..."
        readOnly={isUploading}
        {...props}
      />
    </div>
  );
};

export default CustomEditor;
