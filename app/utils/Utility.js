import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
  FlatList,
  BackHandler,
} from "react-native";
import { CommonActions } from "@react-navigation/native";

export const showExceptionAlert = (nav) => {
  console.log("ppppppppppppppppppp :" + nav);
  Alert.alert(
    "My Clinic",
    "Something went wrong.Try again later",
    [
      {
        text: "OK",
        onPress: () => {
          // alert("dddd" + props.navigation);
          closeApp(nav),
            setTimeout(function () {
              BackHandler.exitApp();
            }, 500);
          return true;
        },
      },
    ],
    { cancelable: false }
  );
};

export const closeApp = (navigation) => {
  alert("close event is fired :" + navigation);
  if (navigation.isFocused()) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "WelcomeScreen" }],
      })
    );
  } else {
    console.log(navigation);
  }
  return false;
};

export const contextObj = {
  doctor: {
    id: "",
    name: "",
    photo: "",
    speciality: "",
  },
  dispensary: {
    id: "",
    name: "",
  },
  session: {
    id: "",
    date: "",
    time: "",
  },
};
