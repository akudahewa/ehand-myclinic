import { AsyncStorage } from "react-native";

// create a function that saves your data asyncronously
export const storeData = async (key, obj) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {
    console.log(error);
  }
};

// fetch the data back asyncronously
export function retrieveData(keys) {
  return AsyncStorage.multiGet(keys)
    .then((value) => {
      return value;
    })
    .catch((error) => {
      console.log(
        "Error occur while getting from cache ........." + JSON.stringify(error)
      );
      return Promise.reject(json);
    });
}

// fetch the data back asyncronously
export function retrieveSingleItem(key) {
  return AsyncStorage.getItem(key)
    .then((value) => {
      return value;
    })
    .catch((error) => {
      console.log(
        "Error occur while getting from cache ........." + JSON.stringify(error)
      );
      return Promise.reject(json);
    });
}
