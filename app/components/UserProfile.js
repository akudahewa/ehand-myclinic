import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar } from "react-native-elements";
import { SERVER_HOST } from "../commons/constants";

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
          />
        </View>
      </View>
      <View style={styles(props).profileInfo}>
        <Text style={styles(props).name}>{props.user.doctorName}</Text>
        <Text style={styles(props).title}>{props.user.speciality}</Text>
        {/* <Text>Special notes</Text> */}
      </View>
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    profile_container: {
      margin: 10,
      backgroundColor: "white",
      padding: 8,
    },
    image_container: {
      paddingTop: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    profileInfo: {
      alignItems: "center",
      justifyContent: "center",
      padding: 6,
    },
    name: {
      color: "#23b248",
      fontSize: 16,
      fontWeight: "bold",
    },
    title: {
      color: "#1d72a3",
    },
  });

export default UserProfile;
