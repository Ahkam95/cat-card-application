import {writeFile} from 'fs';
import {join} from 'path';
import mergeImg from 'merge-img';
import axios from 'axios';
import { getImageURL, getImageRequstParam } from '../utils/imageBindUtil.js';
import LogUtil from '../utils/logUtil.js'
import { ARRAY_BUFFER, BINARY, IMAGE_TYPE } from '../common/constants.js';
import { IMAGE_FOLDER, SAVED_IMAGE_NAME } from '../common/configs.js';

const logger = LogUtil.getLogger();

export const bindTwoImagesIntoOne = async (firstImageText, secondImageText, imageWidth, imageHeight, textColor, imageSize) => {
    try {
        const firstImageURL = getImageURL(firstImageText)
        const secondImageURL = getImageURL(secondImageText)
        const imageRequestParam = getImageRequstParam(imageWidth, imageHeight, textColor, imageSize)

        const firstImageResponse = await axios.get(firstImageURL, {responseType: ARRAY_BUFFER, ...imageRequestParam})
        const firstImageBody = Buffer.from(firstImageResponse.data, BINARY);
        logger.info('First image generated.')

        const secondImageResponse = await axios.get(secondImageURL, {responseType: ARRAY_BUFFER, ...imageRequestParam})
        const secondImageBody = Buffer.from(secondImageResponse.data, BINARY);
        logger.info('Second image generated.')

        logger.info('Started to bind the images')
        const mergedImage = await mergeImg([
            { src: Buffer.from(firstImageBody, BINARY), x: 0, y: 0 },
            { src: Buffer.from(secondImageBody, BINARY), x: imageWidth, y: 0 }
        ]);
    
        const buffer = await new Promise((resolve, reject) => {
            mergedImage.getBuffer(IMAGE_TYPE, (err, buffer) => {
                if (err) {
                    logger.error(err)
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });
  
        logger.info(`Writing the binded image to folder ${IMAGE_FOLDER}`)
        const fileOut = join(process.cwd(), IMAGE_FOLDER.concat('/').concat(SAVED_IMAGE_NAME));
        await new Promise((resolve, reject) => {
            writeFile(fileOut, buffer, BINARY, (err) => {
            if (err) {
                logger.error(err)
                reject(err);
            } else {
                resolve();
            }
            });
        });

    } catch (e) {
        logger.error(e)
    }
}
