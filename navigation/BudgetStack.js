import * as React from "react";
import { Appbar } from 'react-native-paper';
//import { DrawerNavigationProp } from '@react-navigation/drawer';
import { View, Text, Button } from "react-native";
// import {
//     createStackNavigator
//   } from 'react-navigation-stack';
import { createStackNavigator } from "@react-navigation/stack";
//import ExampleList, { examples } from './ExampleList';
//import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

export default function BudgetStack() {
  return (
  
    <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      header: ({ navigation, scene, previous }) => (
        <Appbar.Header>
          {previous ? (
            <Appbar.BackAction onPress={() => navigation.goBack()} />
          ) : navigation.openDrawer ? (
            <Appbar.Action
              icon="menu"
              onPress={() =>
                navigation.openDrawer()
              }
            />
          ) : null}
          <Appbar.Content title={scene.descriptor.options.title} />
        </Appbar.Header>
      ),
    }}
  >
      <Stack.Screen name="Home" component={Feed} />
    </Stack.Navigator>
  );
}
