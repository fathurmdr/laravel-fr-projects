import { ChangeEvent, InputHTMLAttributes, DragEvent } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import InputError from '@/components/InputError';
interface UploadFileProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  image?: File | null;
  imageUrl?: string;
  setImage?: (image: File) => void;
  coverClass?: string;
  maxSize?: string;
  errorMessage?: string;
}

function ImageUpload({
  id,
  label,
  image,
  imageUrl,
  setImage,
  coverClass,
  maxSize,
  errorMessage,
  ...props
}: UploadFileProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage && setImage(e.target.files[0]);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage && setImage(file);
  };
  return (
    <div className="mb-4.5">
      {label && (
        <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
          {label}
        </label>
      )}
      <div
        className={`relative mb-5.5 flex min-h-[12rem] w-full cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-md border-2  bg-gray dark:bg-meta-4
        ${
          image || imageUrl
            ? 'border border-stroke dark:border-form-strokedark'
            : 'border-dashed border-primary'
        }
      `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          {...props}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
        />

        {image || imageUrl ? (
          <img
            className={`min-h-[64px] ${coverClass}`}
            src={image ? URL.createObjectURL(image) : `/uploads/${imageUrl}`}
            alt="image"
          />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3">
            <span className="flex h-10 w-10 items-center justify-center">
              <FaCloudUploadAlt className="text-4xl text-primary " />
            </span>
            <p>
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
            <p>(max, {maxSize ? maxSize : '800 X 800px'})</p>
          </div>
        )}
      </div>

      <InputError message={errorMessage} className="mt-2" />
    </div>
  );
}

export default ImageUpload;
