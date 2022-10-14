import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import i18n from "@I18N/i18n";
import { useDispatch, useSelector } from "react-redux";
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
import CustomLargeOutlineButton from "@UIComponents/CustomLargeOutlineButton";
import * as loginActions from "../../store/actions/login";

const AccountDeletionScreen = () => {
  const login = useSelector((store) => store.login);
  const dispatch = useDispatch();

  const deleteAccount = useCallback(async () => {
    dispatch(loginActions.deleteAccount(login.accessToken));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>{i18n.t("accountDeletion.title")}</Text>
      <CustomLargeOutlineButton
        text={i18n.t("common.yes")}
        onPress={() => {
          deleteAccount();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AccountDeletionScreen;
