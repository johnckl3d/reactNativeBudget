import React from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from '../screens/login/SignInScreen';
import { AuthContext } from "@Context/Context";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{ title: "Sign In" }}
    />
    {/* <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    /> */}
  </AuthStack.Navigator>
);

export default AuthStackScreen;