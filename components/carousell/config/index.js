/**
 *
 * @format
 * @flow
 *
 */

import { Dimensions } from 'react-native';


const devWidth = Dimensions.get('window').width;

export const HIDE_BACKGROUND_LIMIT = 20;

// Header height
let maxHeight = 130;
let minHeight = 75;
let previewHeight = devWidth - 48;
let previewWidth = previewHeight;
let buttonMargin = 20;
let helperMargin = 10;



const maxImageSize = 4 * 1024 * 1024;

export const HEADER_MIN_HEIGHT = minHeight;
export const HEADER_MAX_HEIGHT = maxHeight;
export const IMAGE_MAX_SIZE = maxImageSize;
export const HEADER_HEIGHT = 56;
export const DEVICE_WIDTH = devWidth;
export const PREVIEW_HEIGHT = previewHeight;
export const PREVIEW_WIDTH = previewWidth;
export const BUTTON_MARGIN = buttonMargin;
export const HELPER_MARGIN = helperMargin;
