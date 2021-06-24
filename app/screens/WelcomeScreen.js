import React, { useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";

function WelcomeScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      console.log("WelcomeScreen : Navigating to DistrictScreen");
      navigation.navigate("DistrictScreen");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.splash_image}
        source={require("../assets/myclinic_logo.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  splash_image: {
    resizeMode: "contain",
    width: 400,
    height: 400,
  },
});

export default WelcomeScreen;
