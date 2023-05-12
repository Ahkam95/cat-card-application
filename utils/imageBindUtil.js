import { DOMAIN, PATH } from "../common/configs.js";

export const getImageURL = (imageText) => {
    return DOMAIN.concat(PATH).concat(imageText)
}

export const getImageRequstParam = (imageWidth=400, imageHeight=500, imageColor='Pink', imageSize=100) => {
    return {
        params: {
            width: imageWidth,
            height: imageHeight,
            color: imageColor,
            s: imageSize
        }
    }
}