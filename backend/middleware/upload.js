import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, crypto.randomBytes(12).toString('hex') + ext);
  }
});

function fileFilter(req, file, cb) {
  const ok = /image\/(png|jpe?g|webp|svg\+xml)/.test(file.mimetype);
  cb(ok ? null : new Error('केवल चित्र अपलोड करें'), ok);
}

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
