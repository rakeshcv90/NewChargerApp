import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export const s = (size) => scale(size);
export const vs = (size) => verticalScale(size);
export const ms = (size, factor = 0.5) => moderateScale(size, factor);
