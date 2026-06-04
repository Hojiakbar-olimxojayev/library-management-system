import { diskStorage } from 'multer';
import { extname } from 'path';

export const imageStorage = {
  storage: diskStorage({
    destination: './uploads/book_photos',
    filename(req, file, callback) {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, uniqueName + extname(file.originalname));
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
};
