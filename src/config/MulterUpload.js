import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();

const dataUri = (req) => dUri.format(
  path.extname(req.files.image.name).toString(), req.files.image.data
);

export { multerUploads, dataUri };
