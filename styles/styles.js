import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@Utils/scalingUtils';
import Colors from '@Styles/colors'

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: Colors.p1
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingVertical: wp(5),
    backgroundColor: Colors.b2
  },
  paddingHorizontal: {
    paddingHorizontal: wp(5)
  },
  headerLeftContainer: {
    paddingLeft: wp(3),
    paddingBottom: hp(1),
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerRightContainer: {
    paddingRight: wp(3),
    paddingBottom: hp(1),
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerLeftIcon: {
    width: wp(8),
    height: wp(8)
  },
  headerRightIcon: {
    width: wp(8),
    height: wp(8)
  },
  //For Full Screen Modal
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    // height: hp(35),
    flex: 1,
    backgroundColor: Colors.w,
    // borderTopLeftRadius: hp(2),
    // borderTopRightRadius: hp(2),
    // paddingHorizontal: wp(5),
    //paddingVertical: wp(5)
  },
  modalTitleContainer: {
    padding: wp(5),
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    backgroundColor: Colors.w
  },
  modalTitleText: {
    flex: 1
  },
  modalCloseIcon: {
    width: wp(8),
    height: wp(8),
    marginBottom: hp(0.5)
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: Colors.b2,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2)
  },
});
