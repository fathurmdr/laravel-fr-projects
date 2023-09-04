import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { EventInfo } from '@ckeditor/ckeditor5-utils';
import Editor from 'ckeditor5-custom-build';
import CustomImageUploadAdapter from '@/utils/ckeditor5/ImageUploadAdapter';
import InputError from '@/components/InputError';

interface TextEditorProps {
  id?: string;
  label?: string;
  errorMessage?: string;
  data?: string;
  onReady?: (editor: Editor) => void;
  onChange?: (event: EventInfo, editor: Editor) => void;
  onFocus?: (event: EventInfo, editor: Editor) => void;
  onBlur?: (event: EventInfo, editor: Editor) => void;
}

export default function TextEditor({
  id,
  label,
  errorMessage,
  data,
  onReady,
  onChange,
  onFocus,
  onBlur,
}: TextEditorProps) {
  return (
    <div className="mb-4.5 text-black">
      {label && (
        <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
          {label}
        </label>
      )}
      <CKEditor
        id={id}
        editor={Editor}
        config={{
          extraPlugins: [CustomImageUploadAdapter],
        }}
        data={data}
        onReady={onReady}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <InputError message={errorMessage} className="mt-2" />
    </div>
  );
}
