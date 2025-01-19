import crypto from 'crypto';

/**
 * Generates a cryptographically secure random string for use as a short URL
 * The length is fixed to 9 characters.
 * @returns A random string of 9 characters
 */
export const generateRandomShortUrl = (): string => {
  const length = 9; // Length is fixed to 9 characters
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = crypto.randomBytes(length);
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = charset[bytes[i] % charset.length];
  }

  return result.join('');
};
/**
 * Validates that the short URL is different from the destination URL
 * @param shortUrl - The proposed short URL
 * @param destinationUrl - The destination URL
 * @returns True if valid, false if URLs are the same
 */
export const validateUrlDifference = (
  shortUrl: string,
  destinationUrl: string
): boolean => {
  return shortUrl !== destinationUrl;
};
