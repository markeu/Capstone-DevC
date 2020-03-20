import fs from 'promise-fs';
import { cloudinary } from '../config';
import { renameFile } from '../utiities';


export default async (reqFile) => {
  const file = reqFile;
  // change file name to a unique one
  file.name = renameFile(file.name);
  const path = `${__dirname}/../temp/${file.name}`;
  
  // temporary store file in server
  file.mv(path, (err) => {
    if (err) return err;
  });
  // upload stored file to cloudinary
  try {
    const res = await cloudinary.v2.uploader.upload(path,
      {
        folder: `/teamwork/${file.mimetype}`,
        use_filename: true
      });
      // remove stored file and return upload result
    fs.unlink(path, (err) => {
      if (err) return err;
    });

    return res;
  } catch (error) {
    return error;
  }

};
