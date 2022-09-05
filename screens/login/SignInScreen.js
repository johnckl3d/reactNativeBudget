import React, { useCallback, useState, useEffect } from "react";
import {
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  Text,
  useTheme,
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Title,
  withTheme,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
//import LinearGradient from 'react-native-linear-gradient';
import * as loginActions from "@Actions/login";
import { SETTINGS } from "@Constants/settings";
import Colors from "@Styles/colors";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_TYPES from "@Actions/actionTypes";
import { centered } from "@Styles/presentation";
import i18n from "@I18N/i18n";
import Styles from "@Styles/styles";
import CustomLargeOutlineButton from "@UIComponents/CustomLargeOutlineButton";
import CustomLargeButton from "@UIComponents/CustomLargeButton";
import { isConnected } from "@Utils/internetUtils";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [isInternetOn, setIsInternetOn] = useState(true);
  const dispatch = useDispatch();
  const FSM = useSelector((store) => store.FSM);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = () => {
    if (SETTINGS.ACCESS_TOKEN_BYPASS) {
      signInHandler("admin", "Aia@13579");
    } else {
      if (data.username.length == 0 || data.password.length == 0) {
        Alert.alert(
          "Wrong Input!",
          "Username or password field cannot be empty.",
          [{ text: "Okay" }]
        );
        return;
      }
      signInHandler(data.username, data.password);
    }
  };

  const signInHandler = useCallback(
    async (userId, password) => {
      try {
        await dispatch(loginActions.login(userId, password));
      } catch (err) {}
    },
    [dispatch]
  );

  const handleCloseError = () => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: "" });
  };

  useEffect(() => {
    checkConnectivity();
  }, []);

  const checkConnectivity = async () => {
    var result = await isConnected();
    console.log("signinscreen::checkConnectivity::" + result);
    setIsInternetOn(isInternetOn);
  };

  if (!isInternetOn) {
    console.log("signinscreen::isInternetOn::" + isInternetOn);
    Alert.alert("Error!", "Please check your internet connection", [
      { text: "Okay", onPress: () => {} },
    ]);
  }

  if (FSM.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        ></ActivityIndicator>
      </View>
    );
  }

  if (FSM.hasError && FSM.hasError != "") {
    Alert.alert("Error!", FSM.hasError, [
      { text: "Okay", onPress: () => handleCloseError() },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textTitle}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: Colors.background,
          },
        ]}
      >
        <Text style={styles.textHeading1}>{i18n.t("login.username")}</Text>
        <View style={styles.action}>
          <Icon name="account-edit-outline" color={Colors.primary} size={20} />
          <TextInput
            placeholder={i18n.t("login.usernamePlaceholder")}
            placeholderTextColor={Colors.placeholder}
            style={[
              styles.textInput,
              {
                color: Colors.primary,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.textHeading1,
            {
              marginTop: 35,
            },
          ]}
        >
          {i18n.t("login.password")}
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={Colors.primary} size={20} />
          <TextInput
            placeholder={i18n.t("login.passwordPlaceholder")}
            placeholderTextColor={Colors.placeholder}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: Colors.primary,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: Colors.accent, marginTop: 15 }}>
            {i18n.t("login.forgotPassword")}
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <CustomLargeButton
            text={i18n.t("login.login")}
            onPress={() => {
              loginHandle();
            }}
          />
          <Text style={{ color: Colors.accent, marginTop: 35 }}>
            {i18n.t("login.signUp")}
          </Text>
          <CustomLargeOutlineButton
            text={i18n.t("signUp.signUp")}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { ...centered, flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textTitle: {
    ...Styles.textTitle,
  },
  textHeading1: {
    ...Styles.textHeading1,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: Colors.primary,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    flex: 1,
  },
  signUp: {
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default withTheme(SignInScreen);
