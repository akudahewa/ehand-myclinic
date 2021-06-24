import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  IconButton,
} from "react-native-paper";
import CountDown from "react-native-countdown-component";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BookingSuccessScreen({ route, navigation }) {
  console.log("Booking suceess screen!!!");
  const { bookingInfo } = route.params;

  //   const [isLoading, setIsLoading] = useState(true);
  //   useEffect(() => {
  //     // call POST request to initiate the booking
  //     // post request body
  //     // doctor, dispensary,session,patient number
  //     fetch("https://reactnative.dev/movies.json")
  //       .then((response) => response.json())
  //       .then((json) => {
  //         var sampleData = {
  //           doctorId: doctor.id,
  //           dispensaryId: dispensary.id,
  //           //   photo: doctor.doctor.photo,
  //           //   dispensary: dispensary.name,
  //           //   speciality: doctor.doctor.speciality,
  //           session: session,
  //         };
  //         setData(sampleData);
  //         // let tmp = [];
  //         // json.movies.map(function (m) {
  //         //   let j = { label: m.title, value: m.id };
  //         //   tmp.push(j);
  //         // });
  //         // setDrList(tmp);
  //       })
  //       .catch((error) => {
  //         Alert.alert("My Clinic", "Data not loading properly.Try again later");
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }, []);
  return (
    <PaperProvider>
      <Header name="My Clinic" showBackArrow={true} />
      <View style={styles.main_screen}>
        <View style={styles.container}>
          <View style={styles.success}>
            <Text style={styles.success_message}>Booking Completed !</Text>
          </View>
          <View style={styles.countdown}>
            <Text style={{ textAlign: "center" }}>
              You will be recevied a sms. please keep remember to show that sms
              to dispensary{" "}
            </Text>
          </View>
          <View elevation={2} style={styles.summary}>
            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>REFERENCE NO :</Text>
              <Text style={styles.value_display}>
                {bookingInfo.referenceNo}
              </Text>
            </View>
            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>APPOINMENT DATE :</Text>
              <Text style={styles.value_display}>
                {bookingInfo.appoinmentDate}
              </Text>
            </View>
            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>APPOINMNET TIME :</Text>
              <Text style={styles.value_display}>
                {bookingInfo.appoinmentTime}
                <Text style={styles.display_small}>
                  (Time may vary doctor's arrival time)
                </Text>
              </Text>
            </View>

            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>APPOINMNET NO :</Text>
              <Text style={styles.value_display}>
                {bookingInfo.appoinmentNo}
              </Text>
            </View>

            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>PATIENT NAME :</Text>
              <Text style={styles.value_display}>{bookingInfo.patient}</Text>
            </View>

            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>DOCTOR:</Text>
              <Text style={styles.value_display}>{bookingInfo.doctor}</Text>
            </View>

            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>DISPENSARY :</Text>
              <Text style={styles.value_display}>{bookingInfo.dispensary}</Text>
            </View>

            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>BOOKING FEE :</Text>
              <Text style={styles.value_display}>{bookingInfo.bookingFee}</Text>
            </View>
            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>SPECIALITY</Text>
              <Text style={styles.value_display}>{bookingInfo.speciality}</Text>
            </View>
            <View style={styles.key_value_display}>
              <Text style={styles.key_display}>CONTACT NUMBER</Text>
              <Text style={styles.value_display}>
                {bookingInfo.contactNumber}
              </Text>
            </View>
          </View>
          <View style={styles.noticeService}>
            <Text style={styles.important_note}>
              ** Booking fee you have to pay to the dispensary
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.touchable_center}>
              <TouchableOpacity
                style={styles.channel}
                onPress={() => navigation.navigate("DistrictScreen")}
              >
                <Text style={styles.channel_text}>Go to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  main_screen: { flex: 1 },
  container: {
    justifyContent: "flex-start",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  header_search: {
    fontSize: 22,
    color: "#1d72a3",
    fontWeight: "bold",
    padding: 10,
  },
  success: {
    justifyContent: "center",
    alignItems: "center",
  },
  success_message: {
    fontSize: 18,
    color: "green",
    // fontWeight: "bold",
    //padding: 15,
    textAlign: "center",
    marginTop: 15,
  },
  countdown: {
    padding: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "red",
  },
  notice: {
    flexDirection: "row",
    margin: 10,
  },
  noticeService: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  important_note: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  summary: {
    padding: 10,
    borderRadius: 3,
    margin: 15,
  },
  key_value_display: {
    flexDirection: "row",
  },
  key_display: {
    flex: 1,
    fontSize: 14,
    margin: 5,
  },
  value_display: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
  },
  display_small: {
    fontSize: 12,
    fontWeight: "normal",
  },
  channel: {
    marginTop: 15,
    marginRight: 25,
    marginLeft: 25,
    paddingTop: 15,
    paddingBottom: 15,
    // marginTop: 10,
    // marginLeft: 50,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#1d72a3",
    borderRadius: 5,
  },
  channel_text: {
    color: "white",
  },
  touchable_center: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "green",
  },
});

export default BookingSuccessScreen;
