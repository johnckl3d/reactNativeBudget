import  {AuthContext} from "@Context/Context";
import React from 'react';

import { View, Text, StyleSheet, Button } from "react-native";

const SignIn = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);
  
    return (
      <View>
        <Button title="Sign In" onPress={() => signIn()} />
        <Button
          title="Create Account"
          onPress={() => navigation.push("CreateAccount")}
        />
      </View>
    );
  };

  export default SignIn;
  