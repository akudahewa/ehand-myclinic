import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ContentTitle = (props) => {
  return (
    <View style={styles(props).contentTitle}>
      <Text style={styles(props).titleText}>{props.titleText}</Text>
      {/* <Text style={styles(props).addressText}>{props.addressText}</Text> */}
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    contentTitle: {
      padding: props.padding || 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: props.backgroundColor || "#e3f6fc",
      paddingBottom: props.paddingBottom || 10,
      paddingTop: props.paddingTop || 10,
      elevation: props.elevation || 5,
    },
    titleText: {
      fontSize: props.fontSize || 18,
      fontWeight: props.fontWeight || "bold",
      color: props.color || "#1d72a3",
    },
    addressText: {
      fontSize: props.fontSize || 10,
      fontWeight: props.fontWeight || "bold",
      color: props.color || "#1d72a3",
    },
  });

export default ContentTitle;
