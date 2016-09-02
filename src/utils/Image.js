import { Dimensions } from 'react-native';

export const getWindowDimensions = () => Dimensions.get('window');

/**
 * Returns a scaled version of the desired ratio in the width direction.
 * @param {Object} dims Contains the width / height of the object to be scaled.
 * @param {Object} scaleWidth The width that the ratio should be scaled to.
 * @return {Object} A scaled version of the given dimensions' ratio.
 */
export const scaleHeight = ({width, height}, scaleWidth) => (
  {
    width: scaleWidth,
    height: (scaleWidth / width) * height,
  }
);

/** Function to retrurn the heights of the post images
  * @return {Number} - The height of the image post
  */
export const getPostImageHeight = () => {
  const width = getWindowDimensions().width;
  switch (width) {
  case 320: return 200;
  case 375: return 225;
  case 414: return 250;
  default: return 250;
  }
};

/**
 * Returns a scaled version of the desired ratio in the width direction
 * according to the device width.
 * @param {Object} dims Contains the width / height of the object to be scaled.
 * @return {Object} A scaled version of the given dimensions' ratio.
 */
export const scaleHeightToDevice = (dims) => {
  const deviceWidth = getWindowDimensions('window').width;
  return scaleHeight(dims, deviceWidth);
};
