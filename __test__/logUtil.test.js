import LogUtil from '../src/utils/logUtil.js'

describe('Verifying getLogger results', () => {
    test('should return a logger object with the debug log level', () => {
        const logLevel = 'debug';
        const logger = LogUtil.getLogger(logLevel);
        expect(logger.level.levelStr).toBe('DEBUG');
    });
    test('should return a logger object with the info log level', () => {
        const logLevel = 'info';
        const logger = LogUtil.getLogger(logLevel);
        expect(logger.level.levelStr).toBe('INFO');
    });
  });
  