import {expect, test} from '@jest/globals';
import APIError from '../src/utils/APIError.js';
import {ApiError} from '@google-cloud/storage';

test('APIError without argument should have status 500 and Internal server error message', () => {
  const err = new APIError();
  expect(err).toHaveProperty('status', 500);
  expect(err).toHaveProperty('message', 'Internal Server error');
});

test('APIError without message argument should have Internal server error message', () => {
  const err = new APIError(400);
  expect(err).toHaveProperty('status', 400);
  expect(err).toHaveProperty('message', 'Internal Server error');
});

test('APIError with all argument attached', () => {
  const err = new APIError(400, 'Not Found');
  expect(err).toHaveProperty('status', 400);
  expect(err).toHaveProperty('message', 'Not Found');
});

test('APIError parse error static function should always throw APIError instance', () => {
  const err = new Error();
  const storageErr = new ApiError('Something wrong');
  expect(() => APIError.parseError(err)).toThrow(APIError);
  expect(() => APIError.parseError(storageErr)).toThrow(APIError);
});
