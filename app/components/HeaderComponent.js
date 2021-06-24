import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { Icon, Header } from "react-native-elements";

const renderLogo = () => {
  return (
    <TouchableOpacity
      style={{ marginBottom: 25 }}
      onPress={() => {
        console.log("A Pressed!");
      }}
    >
      <Image
        style={{ width: 30, height: 30 }}
        source={require("../assets/myclinic_logo.jpg")}
      />
    </TouchableOpacity>
  );
};
const renderMyBookings = () => {
  return (
    <TouchableOpacity
      style={{ marginBottom: 25 }}
      onPress={() => {
        alert("My Bookings");
      }}
    >
      <Text style={{ fontSize: 14, color: "white" }}>My Bookings</Text>
    </TouchableOpacity>
  );
};

function AppHeader() {
  return (
    <Header
      leftComponent={() => renderLogo()}
      centerComponent={{}}
      rightComponent={() => renderMyBookings()}
      containerStyle={{ backgroundColor: "#1d72a3", height: 50 }}
    />
  );
}

export default AppHeader;
