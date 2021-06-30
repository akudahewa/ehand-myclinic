import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  IconButton,
} from "react-native-paper";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_TNX, SERVER_HOST } from "../commons/constants";
import { getResources } from "../components/ApiClient";
import LoadSpinner from "../components/SpinnerComponent";
import { ScrollView } from "react-native-gesture-handler";

function BookingSuccessScreen({ route, navigation }) {
  console.log("BookingSuccessScreen !!!");
  const tnxId = route.params.tnxId;
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    console.log("BookingSuccessScreen : useEffect -> fetch API records");
    console.log(`${API_TNX}/${tnxId}`);
    getResources(`${API_TNX}/${tnxId}`)
      .then((resource) => {
        console.log("BookingSuccessScreen => GET :" + JSON.stringify(resource));
        setTransaction(resource);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(
          "Error => GET BookingSuccessScreen :" + JSON.stringify(error)
        );
        setIsLoading(false);
        showExceptionAlert(navigation);
        return true;
      })
      .finally(() => {});
  }, []);

  return (
    <PaperProvider>
      <Header name="My Clinic" showBackArrow={true} />
      <ScrollView>
        <View style={styles.main_screen}>
          {isLoading ? (
            <LoadSpinner loading={isLoading} loadingText="Please wait ..." />
          ) : (
            <View style={styles.container}>
              <View style={styles.success}>
                <Text style={styles.success_message}>Booking Completed !</Text>
              </View>
              <View style={styles.countdown}>
                <Text style={{ textAlign: "center", color:'#7f7e7e' }}>
                  You will be recevied a sms. please keep remember to show that
                  sms to dispensary{" "}
                </Text>
              </View>
              <View style={styles.summary}>
                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>REFERENCE NO :</Text>
                  <Text style={styles.value_display}>
                    {transaction.refNumber}
                  </Text>
                </View>
                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>APPOINMENT DATE :</Text>
                  <Text style={styles.value_display}>
                    {transaction.bookedDate}
                  </Text>
                </View>
                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>APPOINMNET TIME :</Text>
                  <Text style={styles.value_display}>
                    {transaction.doctorScheduleGrid.sessionStart}
                    <Text style={styles.display_small}>
                      (Time may vary doctor's arrival time)
                    </Text>
                  </Text>
                </View>

                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>APPOINMNET NO :</Text>
                  <Text style={styles.value_display}>10</Text>
                </View>

                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>PATIENT NAME :</Text>
                  <Text style={styles.value_display}>
                    {transaction.mobileNo}
                  </Text>
                </View>

                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>DOCTOR:</Text>
                  <Text style={styles.value_display}>
                    {
                      transaction.doctorScheduleGrid.doctorDispensary.doctor
                        .name
                    }
                  </Text>
                </View>

                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>DISPENSARY :</Text>
                  <Text style={styles.value_display}>
                    {
                      transaction.doctorScheduleGrid.doctorDispensary.dispensary
                        .name
                    }
                  </Text>
                </View>

                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>Doctor Fee :</Text>
                  <Text style={styles.value_display}>
                    {transaction.doctorScheduleGrid.doctorDispensary
                      .doctorFee === 0
                      ? `Pay at dispensary`
                      : transaction.doctorScheduleGrid.doctorDispensary
                          .doctorFee}
                  </Text>
                </View>
                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>Dispensary Fee :</Text>
                  <Text style={styles.value_display}>
                    {
                      transaction.doctorScheduleGrid.doctorDispensary
                        .dispensaryFee
                    }
                  </Text>
                </View>
                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>Booking Fee :</Text>
                  <Text style={styles.value_display}>
                    {transaction.doctorScheduleGrid.doctorDispensary.bookingFee}
                  </Text>
                </View>
                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>Total Fee :</Text>
                  <Text style={styles.value_display}>10.00</Text>
                </View>
                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>SPECIALITY</Text>
                  <Text style={styles.value_display}>
                    {
                      transaction.doctorScheduleGrid.doctorDispensary.doctor
                        .speciality
                    }
                  </Text>
                </View>
                <View style={styles.key_value_display}>
                  <Text style={styles.key_display}>CONTACT NUMBER</Text>
                  <Text style={styles.value_display}>
                    {transaction.mobileNo}
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
          )}
        </View>
      </ScrollView>
      {/* <Footer /> */}
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
    fontWeight: "bold",
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
    borderRadius: 5,
    margin: 15,
    borderColor: "#1896c5",
    borderWidth: 1
  },
  key_value_display: {
    flexDirection: "row",
  },
  key_display: {
    flex: 1,
    fontSize: 14,
    margin: 5,
    textTransform: 'capitalize',
    color: '#1896c5'
  },
  value_display: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: '#1896c5'
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
