import {join} from 'path';
import axios from 'axios';
import Jimp from 'jimp';
import { getImageURL, getImageRequstParam } from '../utils/imageBindUtil.js';
import { ARRAY_BUFFER } from '../common/constants.js';
import { IMAGE_FOLDER, SAVED_IMAGE_NAME } from '../common/configs.js';
import LogUtil from '../utils/logUtil.js'

const logger = LogUtil.getLogger();

export const bindTwoImagesIntoOne = async (firstImageText, secondImageText, imageWidth, imageHeight, textColor, imageSize) => {
    try {
        const firstImageURL = getImageURL(firstImageText)
        const secondImageURL = getImageURL(secondImageText)
        const imageRequestParam = getImageRequstParam(imageWidth, imageHeight, textColor, imageSize)

        const firstImageResponse = await axios.get(firstImageURL, {responseType: ARRAY_BUFFER, ...imageRequestParam})
        logger.info('Successfully fetched the first image')

        const secondImageResponse = await axios.get(secondImageURL, {responseType: ARRAY_BUFFER, ...imageRequestParam})
        logger.info('Successfully fetched the second image')

        const firstImage = await Jimp.read(firstImageResponse.data);
        const secondImage = await Jimp.read(secondImageResponse.data);
        const combinedImage = new Jimp(firstImage.getWidth() + secondImage.getWidth(), Math.max(firstImage.getHeight(), secondImage.getHeight()));
        combinedImage.composite(firstImage, 0, 0);
        combinedImage.composite(secondImage, firstImage.getWidth(), 0);
        
        const fileOut = join(process.cwd(), IMAGE_FOLDER.concat('/').concat(SAVED_IMAGE_NAME));
        await combinedImage.writeAsync(fileOut);
        logger.info('Successfully generated the binded image')
    } catch (e) {
        logger.error('Failed to bind the images!')
        logger.error(e)
    }
}
