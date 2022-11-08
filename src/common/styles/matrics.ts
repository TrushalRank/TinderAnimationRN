import { Dimensions, Platform, StatusBar } from 'react-native';
import { scale } from '../helper';

const WINDOW_WIDTH = Dimensions.get('window').width;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const scaleSize = (size: number) => (WINDOW_WIDTH/X_WIDTH) * size;

const { width, height } = Dimensions.get('window');

const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
  ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
  : false;

const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 40 : 20,
  android: StatusBar.currentHeight,
  default: 0
})

const Matrics = {
  screenHeight,
  screenWidth,

  navBarHeight: Platform.OS == 'ios' ? (screenHeight == 812 ? 44 : 20) : 0,

  profileImage: scale(100),
  profileImageSmall: scale(80),

  orderImage: scale(70),
  productImage: scale(72),
  categoryView: screenWidth / 4 - 20,
  newShopsImage: screenHeight / 5.5,
  foodImage: scale(70),
  itemImage: scale(90),
  offerViewHeight: screenWidth / 2.5,

  btnHeight:
    Platform.OS === 'ios'
      ? height == 812
        ? scale(120)
        : scale(90)
      : scale(120),

  fontBold: 'bold',
  keyboardShouldPersistTaps: 'handled',
  // keyboardVerticalOffset: Header.HEIGHT,
  extraScrollHeight: 10,
  // headerHeight: Header.HEIGHT,
  /* App tour style */
  introPaddingTop: scale(80),
  font20: scale(20),

  ScaleValue: val => {
    return scale(val);
  },

  ScaleHeaderValue: val => {
    return scale(Platform.OS === 'ios' ? StatusBarHeight + val : val + 2);
  },

  width: width,
  height: height,
};

export default Matrics;
