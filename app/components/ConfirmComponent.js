import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ConfirmComponent = ({ route, navigation }) => {
  const { session } = route.params;
  const { patientInfo } = route.params;
  return (
    <View>
      <Text>Booking success:{session}</Text>
      <Text>{patientInfo.patient.name}</Text>
      <Text>{patientInfo.patient.contactno}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ConfirmComponent;
