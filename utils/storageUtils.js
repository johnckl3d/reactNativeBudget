
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeStringData = async (id, value) => {
  try {
    await AsyncStorage.setItem(id, value)
  } catch (e) {
    // saving error
  }
}

const storeObjectData = async (id, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(id, jsonValue)
  } catch (e) {
    // saving error
  }
}

const getStringData = async (id) => {
  try {
    const value = await AsyncStorage.getItem(id);
    if(value !== null) {
      return value;
    }
  } catch(e) {
    // error reading value
  }
}