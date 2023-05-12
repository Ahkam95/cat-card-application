import { DOMAIN, PATH, DEFAULT_PARAM_VALUES } from "../common/configs.js";

export const getImageURL = (imageText) => {
    return DOMAIN.concat(PATH).concat(imageText ? imageText : DEFAULT_PARAM_VALUES.text)
}

export const getImageRequstParam = (imageWidth, imageHeight, textColor, imageSize) => {
    return {
        params: {
            width: parseInt(imageWidth ? imageWidth : DEFAULT_PARAM_VALUES.width),
            height: parseInt(imageHeight ? imageHeight : DEFAULT_PARAM_VALUES.height),
            color: textColor ? textColor : DEFAULT_PARAM_VALUES.color,
            s: parseInt(imageSize ? imageSize : DEFAULT_PARAM_VALUES.size)
        }
    }
}