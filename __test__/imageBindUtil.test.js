import { getImageURL, getImageRequstParam } from '../src/utils/imageBindUtil.js';
import { DEFAULT_PARAM_VALUES } from "../src/common/configs.js";

test('Verifying the getImageURL method', () => { 
    expect(getImageURL()).toBe('https://cataas.com/cat/says/Default Text');
    expect(getImageURL('Ahkam')).toBe('https://cataas.com/cat/says/Ahkam');
 })

 test('Verifying whether getImageRequstParam return correct API request query param', () => { 
    expect(getImageRequstParam()).toStrictEqual({
        params: {
            width: DEFAULT_PARAM_VALUES.width,
            height: DEFAULT_PARAM_VALUES.height,
            color: DEFAULT_PARAM_VALUES.color,
            s: DEFAULT_PARAM_VALUES.size
        }
    });
    expect(getImageRequstParam(300, 400, 'Pink', 200)).toStrictEqual({
        params: {
            width: 300,
            height: 400,
            color: 'Pink',
            s: 200
        }
    });
 })