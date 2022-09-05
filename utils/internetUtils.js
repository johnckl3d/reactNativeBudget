import NetInfo from "@react-native-community/netinfo";

export const isConnected = async () => {
  let state = await NetInfo.fetch();
  return state.isConnected;
};
