import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import Colors from "@Styles/colors";
import {
  column,
  row,
  highlightRed,
  highlightYellow,
  centered,
  shadow,
  bottom,
  centeredStretch,
  highlightGreen,
} from "@Styles/presentation";

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: Colors.p1
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingVertical: wp(5),
    backgroundColor: Colors.b2,
  },
  paddingHorizontal: {
    paddingHorizontal: wp(5),
  },
  headerLeftContainer: {
    paddingLeft: wp(3),
    paddingBottom: hp(1),
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightContainer: {
    paddingRight: wp(3),
    paddingBottom: hp(1),
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeftIcon: {
    width: wp(8),
    height: wp(8),
  },
  headerRightIcon: {
    width: wp(8),
    height: wp(8),
  },
  //For Full Screen Modal
  modal: {
    justifyContent: "flex-end",
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
    flexDirection: "row",
    backgroundColor: Colors.w,
  },
  modalTitleText: {
    flex: 1,
    paddingTop: hp(1),
    paddingBottom: hp(0.5),
  },
  modalCloseIcon: {
    width: wp(8),
    height: wp(8),
    marginBottom: hp(0.5),
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: Colors.b2,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
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
  costSnapShotContainer: {
    height: hp(10),
    margin: hp(0.5),
    padding: hp(0.5),
    backgroundColor: Colors.primary,
    ...centered,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: Colors.primary,
  },
  buttonBottom: {
    height: hp(7),
    right: 10,
    left: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
  },
  buttonLargeOutline: {
    height: hp(6),
    width: wp(80),
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: hp(2),
    margin: hp(1),
  },
  buttonLarge: {
    height: hp(6),
    width: wp(80),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: hp(2),
    margin: hp(1),
  },
  buttonIcon: {
    height: hp(6),
    width: wp(70),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: Colors.primary,
  },
  textTitle: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 30,
  },
  textHeading1: {
    color: Colors.primary,
    fontSize: 18,
  },
  textHeading5: {
    fontSize: 13,
  },
  textCitation: {
    fontSize: 12,
  },
  layoutList: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  listItemTight: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  footer: {
    flex: 3,
    backgroundColor: Colors.white,
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    // paddingHorizontal: 20,
    // paddingVertical: 30,
  },
  highlightRed: {
    borderColor: Colors.red,
    borderWidth: 2,
  },
});
