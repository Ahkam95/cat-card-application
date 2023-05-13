import {bindTwoImagesIntoOne} from './services/bindImageService.js'

// added these params as environment variables
const {FIRST_IMAGE_TEXT, SECOND_IMAGE_TEXT, IMAGE_WIDTH, IMAGE_HEIGHT, TEXT_COLOR, IMAGE_SIZE} = process.env

const main = async () => {
  await bindTwoImagesIntoOne(FIRST_IMAGE_TEXT, SECOND_IMAGE_TEXT, IMAGE_WIDTH, IMAGE_HEIGHT, TEXT_COLOR, IMAGE_SIZE);
}

main();
