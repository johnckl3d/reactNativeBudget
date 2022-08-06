import React from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from '../screens/login/SignInScreen';
import SignUpScreen from '../screens/login/SignUpScreen';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreen;