// These can be vary depend on the environments(dev,stag,prod etc). So added them as configs. It can be moved to SSM if you are using AWS
export const DOMAIN = 'https://cataas.com'
export const PATH = '/cat/says/'
export const IMAGE_FOLDER = 'catImages'
export const SAVED_IMAGE_NAME = 'cat-card.jpg'
export const DEFAULT_PARAM_VALUES = {
    text:'Default Text',
    width: 400,
    height: 500,
    color: 'Pink',
    size: 100
}