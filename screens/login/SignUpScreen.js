import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Colors from "@Styles/colors";
import { SETTINGS } from "@Constants/settings";
import * as loginActions from "@Actions/login";
import i18n from "@I18N/i18n";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    userId: "",
    password: "",
    confirm_password: "",
    email: "",
    check_userIdInputChange: false,
    check_emailInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const userIDInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        userId: val,
        check_userIdInputChange: true,
      });
    } else {
      setData({
        ...data,
        userId: val,
        check_userIdInputChange: false,
      });
    }
  };

  const emailInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        userId: val,
        check_emailInputChange: true,
      });
    } else {
      setData({
        ...data,
        userId: val,
        check_emailInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const register = useCallback(async () => {
    console.log("register");
    var userId = "";
    var email = "";
    var firstName = "";
    var lastName = "";
    var password = "";
    var confirmPassword = "";
    var roleId = 0;

    const registerCallback = () => {
      navigation.goBack();
      Alert.alert(i18n.t("signUp.thanksTitle"), "", [
        { text: i18n.t("common.ok"), onPress: () => {} },
      ]);
    };

    if (SETTINGS.ACCESS_TOKEN_BYPASS) {
      userId = "admin5";
      email = "johnckl3d5@gmail.com";
      firstName = "John";
      lastName = "Cheang";
      password = "Aia@13579";
      confirmPassword = "Aia@13579";
      roleId = 1;
    }
    try {
      await dispatch(
        loginActions.register(
          userId,
          email,
          firstName,
          lastName,
          password,
          confirmPassword,
          roleId,
          registerCallback
        )
      );
    } catch (err) {
      console.log("register::err::" + err);
      Alert.alert(i18n.t("common.errorTitle"), i18n.t("common.errorMessage"), [
        { text: i18n.t("common.ok"), onPress: () => handleCloseError() },
      ]);
    }
  }, [dispatch]);

  const handleCloseError = () => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: "" });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <Icon
              name="account-edit-outline"
              color={Colors.primary}
              size={20}
            />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => userIDInputChange(val)}
            />
            {data.check_userIdInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <Icon name="email-outline" color={Colors.primary} size={20} />
            <TextInput
              placeholder="Your Email Address"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => emailInputChange(val)}
            />
            {data.check_emailInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={Colors.primary} size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
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

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={Colors.primary} size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: Colors.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => {
                register();
              }}
            >
              <View colors={Colors.primary} style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: Colors.primary,
                    },
                  ]}
                >
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: Colors.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: Colors.primary,
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
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
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: Colors.accent,
  },
});
