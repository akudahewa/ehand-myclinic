import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar } from "react-native-elements";
import { SERVER_HOST } from "../commons/constants";
import {GlobalStyle} from "../style/style";

const UserProfile = (props) => {
  return (
    <View style={styles(props).profile_container}>
      <View style={styles(props).image_container}>
        {/* {doctor.photo === "" ? ( */}
        <Text>{props.user.photo}</Text>
        <View>
          <Avatar
            rounded
            size={100}
            source={{
              uri: `${SERVER_HOST}/images/${props.user.photo}`,
            }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{
              // marginLeft: 20,
              // marginTop: 2,
              backgroundColor: "#e3e3de",
            }}
            title={
              props.user.name.split(" ")[0][0] + props.user.name.split(" ")[1][0]
            }
          />
        </View>
      </View>
      <View style={styles(props).profileInfo}>
        <Text style={styles(props).name}>{props.user.name}</Text>
        <Text style={styles(props).title}>{props.user.speciality}</Text>
        {/* <Text>Special notes</Text> */}
      </View>
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    profile_container: {

      backgroundColor: "#1896c5",
      paddingBottom:12

    },
    image_container: {

      alignItems: "center",
      justifyContent: "center",
    },
    profileInfo: {
      alignItems: "center",
      justifyContent: "center",
      padding: 6,
    },
    name: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    title: {
      color: "#fff",
      textTransform:'capitalize'
    },
  });

export default UserProfile;
