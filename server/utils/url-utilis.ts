/**
 * Generates a random string for use as a short URL
 * @returns A random string of 7 characters
 */
export const generateRandomShortUrl = (): string => {
  return Math.random().toString(36).substring(7);
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
