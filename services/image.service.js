const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "../public");
const AVATARS = "avatars";

const uploadImage = async (id, file) => {
  const avatarURL = path.join(AVATARS, `${id}${file.originalname}`);
  try {
    await sharp(file.path)
      .resize({ width: 250 })
      .toFile(path.join(PUBLIC_DIR, avatarURL));
    return avatarURL;
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await fs.unlink(file.path);
  }
};

module.exports = {
  uploadImage,
};
