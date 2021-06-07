import { AsyncStorage } from "@react-native-community/async-storage";

const useAsyncStorage = () => {
  async function SaveInAsyncStorage(INDEX, data) {
    try {
      await AsyncStorage.setItem(INDEX, JSON.stringify(data));
    } catch (error) {
      return error;
    }
  }

  async function GetFromAsyncStorage(INDEX) {
    try {
      const data = await AsyncStorage.getItem(INDEX);

      return data;
    } catch (error) {
      return error;
    }
  }

  return { GetFromAsyncStorage, SaveInAsyncStorage };
};

export default useAsyncStorage;
