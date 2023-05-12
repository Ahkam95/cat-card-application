import axios from 'axios';
import Jimp from 'jimp';
import { SAVED_IMAGE_NAME } from '../common/configs.js';
import {bindTwoImagesIntoOne} from '../services/bindImageService.js'
import LogUtil from '../utils/logUtil.js'

jest.mock('axios');
jest.mock('jimp');
jest.mock('../utils/logUtil.js', () => {
  const errorMock = jest.fn();
  const getLogger = jest.fn().mockReturnValue({ error: errorMock, info: jest.fn() });
  return { getLogger };
});

describe('Verifying whether bindTwoImagesIntoOne Service works as expecter or not', () => {
  const firstImageText = 'First image text';
  const secondImageText = 'Second image text';
  const imageWidth = 800;
  const imageHeight = 600;
  const textColor = 'Pink';
  const imageSize = 'large';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch and combine two images', async () => {
    const firstImageData = new Uint8Array([0xFF, 0xD8, 0xFF]).buffer; // Example JPEG data
    const secondImageData = new Uint8Array([0xFF, 0xD8, 0xFF]).buffer; // Example JPEG data
    axios.get.mockResolvedValueOnce({ data: firstImageData });
    axios.get.mockResolvedValueOnce({ data: secondImageData });
    Jimp.read.mockResolvedValueOnce({ getWidth: () => 400, getHeight: () => 300, composite: jest.fn() }); // Mock the first image
    Jimp.read.mockResolvedValueOnce({ getWidth: () => 400, getHeight: () => 400, composite: jest.fn() }); // Mock the second image
    const writeAsyncMock = jest.fn();
    Jimp.prototype.writeAsync = writeAsyncMock;

    await bindTwoImagesIntoOne(firstImageText, secondImageText, imageWidth, imageHeight, textColor, imageSize);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(Jimp.read).toHaveBeenCalledTimes(2);
    expect(writeAsyncMock).toHaveBeenCalledTimes(1);
    expect(writeAsyncMock.mock.calls[0][0]).toMatch(new RegExp(`${SAVED_IMAGE_NAME}$`)); // Check that the output file path ends with '/cat-card.jpg'
  });

  test('should log error when fetching images fails', async () => {
    const mockError = new Error('Failed to fetch image');
    axios.get.mockRejectedValueOnce(mockError);
    await bindTwoImagesIntoOne(firstImageText, secondImageText, imageWidth, imageHeight, textColor, imageSize);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(Jimp.read).not.toHaveBeenCalled();
    expect(Jimp.prototype.writeAsync).not.toHaveBeenCalled();

    const logger = LogUtil.getLogger();
    expect(logger.error).toHaveBeenCalledTimes(2);
    expect(logger.error).toHaveBeenCalledWith('Failed to bind the images!');
    expect(logger.error).toHaveBeenCalledWith(mockError);

  });
});