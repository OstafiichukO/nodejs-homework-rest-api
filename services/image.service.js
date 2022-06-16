var Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;
const PUBLIC_DIR = path.join(__dirname, "../public");
const AVATARS = "avatars";

const uploadImage = async (id, file) => {
  const avatarURL = path.join(AVATARS, `${id}${file.originalname}`);
  try {
    await Jimp.read(file.path).then((img) => {
      return img.resize(250, 250);
    });
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
