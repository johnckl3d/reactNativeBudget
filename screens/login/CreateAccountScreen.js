import React from 'react';
import  {AuthContext} from "@Context/Context";
import { View, Text, StyleSheet, Button } from "react-native";


const CreateAccount = ({ navigation }) => {
    const { signUp } = React.useContext(AuthContext);
  
    return (
      <View>
        <Text>Create Account Screen</Text>
        <Button title="Sign Up" onPress={() => signUp()} />
        </View>
    );
  };

  export default CreateAccount;