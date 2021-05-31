import React from 'react';

import { View, Text, StyleSheet, Button } from "react-native";


export const CreateAccount = () => {
    const { signUp } = React.useContext(AuthContext);
  
    return (
      <ScreenContainer>
        <Text>Create Account Screen</Text>
        <Button title="Sign Up" onPress={() => signUp()} />
      </ScreenContainer>
    );
  };