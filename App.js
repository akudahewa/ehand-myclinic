import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChannelScreen from "./app/screens/ChannelScreen";
import SessionScreen from "./app/screens/SessionScreen";
import BookingScreen from "./app/screens/BookingScreen";
import SaveBookingScreen from "./app/screens/SaveBookingScreen";
import DistrictScreen from "./app/screens/DistrictScreen";
import CityScreen from "./app/screens/CityScreen";
import BookingConfirmScreen from "./app/screens/BookingConfirmScreen";
import BookingSuccessScreen from "./app/screens/BookingSuccesScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import DoctorDispensaryScreen from "./app/screens/DoctorDispensaryScreen";
import MyBookings from "./app/screens/MyBookings";
import { PatientContextProvider } from "./app/provider/PatientProvider";
import { createAppContainer } from "react-navigation";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="DistrictScreen" component={DistrictScreen} />
      <Stack.Screen name="CityScreen" component={CityScreen} />
      <Stack.Screen
        name="DoctorDispensaryScreen"
        component={DoctorDispensaryScreen}
      />
      <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
      <Stack.Screen name="SessionScreen" component={SessionScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="SaveBookingScreen" component={SaveBookingScreen} />
      <Stack.Screen
        name="BookingConfirmScreen"
        component={BookingConfirmScreen}
      />
      <Stack.Screen
        name="BookingSuccessScreen"
        component={BookingSuccessScreen}
      />
      <Stack.Screen
        name="MyBookings"
        component={MyBookings}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const contextUser = { name: "Tania", loggedIn: true };
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
