import { FileLoader, UploadResponse } from '@ckeditor/ckeditor5-upload';
import api from '@/api/axios';

class ImageUploadAdapter {
  private loader: FileLoader;
  private controller?: AbortController;

  constructor(loader: FileLoader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then((file) => {
      this.controller = new AbortController();

      const data = new FormData();
      data.append('upload', file as Blob);
      return new Promise<UploadResponse>((resolve, reject) => {
        api
          .post('/upload-image', data)
          .then((res) =>
            resolve({
              default: res.data.url,
            }),
          )
          .catch((err) => {
            return reject(err);
          });
      });
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.controller) {
      this.controller.abort();
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomImageUploadAdapter(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (
    loader: FileLoader,
  ) => {
    // Configure the URL to the upload script in your back-end here!
    return new ImageUploadAdapter(loader);
  };
}
