import { AsyncStorage } from "react-native";

// function AppLocalCache() {
// create a function that saves your data asyncronously
export const storeData = async (key, obj) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
    // let localCache;
    // console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm " + JSON.stringify(obj));
    // AsyncStorage.getItem("doctor-dispensary").then((value) => {
    //   console.log(
    //     "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4444444 " + JSON.stringify(value)
    //   );
    //   console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb " + value);
    //   if (value !== null) {
    //     AsyncStorage.mergeItem("doctor-dispensary",obj)
    //     // let localCache = value;
    //     // console.log(
    //     //   "7777777777777777777777777777777777777777777 " + localCache
    //     // );
    //     // console.log(
    //     //   "00000000000000000000000000000000000 " + JSON.stringify(obj)
    //     // );
    //     // localCache.sessions = obj;
    //   } else {
    //     console.log(
    //       "ssssssssssssssssssssssssssssssssssssssssssssss " +
    //         JSON.stringify(obj)
    //     );
    //     await AsyncStorage.setItem("doctor-dispensary", JSON.stringify(obj));
    //   }

    // return value;
    // });

    //   console.log(
    //     "======= SAVE =========localCache ================== " +
    //       JSON.stringify(AsyncStorage.getItem("doctor-dispensary")) +
    //       "......" +
    //       (AsyncStorage.getItem("doctor-dispensary") != null)
    //   );
    //   if (AsyncStorage.getItem("doctor-dispensary") != null) {
    //     console.log("8*******************************************");
    //     let localCache = JSON.parse(AsyncStorage.getItem(key));
    //     console.log("7777777777777777777777777777777777777777777 " + localCache);
    //     localCache.sessions = obj;
    //   } else {
    //     console.log("EEEEEEEEEEEEEEEEEEEEEEEEEeeee else ");
    //     localCache = obj;
    //   }
    //   console.log("@@@@@@@@@@@@@@@@@@ saving @@@@@@@@@@@@ " + localCache);
    //   await AsyncStorage.setItem("doctor-dispensary", JSON.stringify(localCache));
  } catch (error) {
    // Error saving data
  }
};

// fetch the data back asyncronously
export function retrieveData(keys) {
  console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" + keys);
  return AsyncStorage.multiGet(keys)
    .then((value) => {
      console.log(
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx " +
          JSON.stringify(value)
      );
      return value;
    })
    .catch((error) => {
      console.log(
        "Error occur while getting from cache ........." + JSON.stringify(error)
      );
      return Promise.reject(json);
    });
}
// export const retrieveData = () => {
//   console.log("ccccccccccccccccccccccccccccccccccccccccccccccccccccc");
//   AsyncStorage.getItem("name")
//     .then((value) => {
//       console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4444444 " + value);
//       return Promise.resolve(value);
//     })
//     .catch((error) => {
//       console.log(
//         "Error occur while getting from cache ........." + JSON.stringify(error)
//       );
//       return Promise.reject(json);
//     });
// };
// }

// AsyncStorage.getItem("phoneNumber")
//   .then((value) => {
//     this.setState({ phoneNumber: value });
//   })
//   .then((res) => {
//     //do something else
//   });

// export default AppLocalCache;
