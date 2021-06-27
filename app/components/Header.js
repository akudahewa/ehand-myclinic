import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Appbar, Avatar, Button } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1896c5",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20
  },
  headerBA:{
    backgroundColor: "#1896c5",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  }
});
export default function MyHeader(props) {
  const navigation = useNavigation();

  return (
    <>
      {props.showBackArrow ? (
        <Appbar style={styles.headerBA}>
          <Appbar.Action
            icon="keyboard-backspace"
            size={30}
            onPress={() =>{ 
              
              navigation.goBack();
            }}
          />

          <Appbar.Content title={props.name} subtitle="Care close to home" />
          <Button
            icon="bookmark-multiple-outline"
            color="white"
            labelStyle={{ letterSpacing: 0.5 }}
            uppercase={false}
            mode="text"
            onPress={() => {navigation.navigate('MyBookings')}}
          >
            My Bookings
          </Button>
        </Appbar>
      ) : (
        <Appbar style={styles.header}>
          <Avatar.Image
            size={40}
            source={require("../assets/myclinic_logo.jpg")}
          />

          <Appbar.Content title={props.name} subtitle="Care close to home" />
          <Button
            icon="bookmark-multiple-outline"
            color="white"
            labelStyle={{ letterSpacing: 0.5 }}
            uppercase={false}
            mode="text"
            onPress={() => {navigation.navigate('MyBookings')}}
          >
            My Bookings
          </Button>
        </Appbar>
      )}
    </>
  );
}
