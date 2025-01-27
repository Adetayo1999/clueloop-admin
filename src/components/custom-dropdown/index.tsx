import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { CloudArrowDownIcon as UploadIcon } from "@heroicons/react/24/solid";

export interface Iaccept {
  [key: string]: string[];
}

type Props = {
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  accept: Iaccept;
  open?: () => void;
  supportFormatText?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  showText?: boolean;
  className?: string;
  maxSize?: number;
  maxFiles?: number;
};

function CustomDropzone({
  onDrop,
  accept,
  open,
  supportFormatText,
  name,
  disabled,
  required,
  className,
  maxSize,
  maxFiles,
  showText = true,
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles,
    accept,
    onDrop,
    disabled,
    maxSize,
  });

  return (
    <div
      {...getRootProps({
        className: `min-h-[10rem] flex flex-col gap-y-3 justify-center items-center p-6   border border-dashed bg-[#F6F6F6] dark:bg-black  rounded ${className}`,
      })}
    >
      <input className="input-zone  " {...getInputProps({ name, required })} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <div>
            <span className="flex items-center justify-center">
              <UploadIcon className="size-14 text-gray-600" />
            </span>
            {showText && (
              <div className="mt-7 flex flex-col gap-y-2.5">
                <div className="flex items-center justify-center gap-x-1 text-xs">
                  <p className="text-slate-400">Drag & drop files or </p>
                  <button
                    type="button"
                    onClick={open}
                    className="border-b border-purple-450 leading-none text-primary"
                  >
                    Browse
                  </button>
                </div>
              </div>
            )}
            {supportFormatText ? (
              <p className="text-gray-420 mt-2.5 text-xs leading-4.5">
                {supportFormatText}
              </p>
            ) : null}
          </div>
        )}
      </div>
      {maxSize && (
        <span className="text-xs text-gray-500 font-medium ">
          Maximum {(maxSize / (1024 * 1024)).toFixed(0)}MB characters allowed.
        </span>
      )}
    </div>
  );
}

export default CustomDropzone;
