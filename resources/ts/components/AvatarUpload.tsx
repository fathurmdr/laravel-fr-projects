import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
interface UploadFileProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
}

function AvatarUpload({ id, ...props }: UploadFileProps) {
  const [image, setImage] = useState<File | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return (
    <label
      htmlFor={id}
      className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-primary outline-none dark:border-form-strokedark dark:bg-form-input"
    >
      {image ? (
        <img src={image ? URL.createObjectURL(image) : ''} alt={'avatar'} />
      ) : (
        <FaUserAlt className="text-4xl text-primary " />
      )}
      <input
        {...props}
        type="file"
        id={id}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

export default AvatarUpload;
