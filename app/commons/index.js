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

export const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
};

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
  console.log("closeApp event is fired :isFocused :" + navigation.isFocused());
  if (navigation.isFocused()) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "WelcomeScreen" }],
      })
    );
  }
  return false;
};
