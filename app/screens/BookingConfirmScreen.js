import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  IconButton,
} from "react-native-paper";
import BookingSuccessScreen from "./BookingSuccesScreen";
import CountDown from "react-native-countdown-component";
import { useNavigation } from "@react-navigation/native";
import LoadSpinner from "../components/SpinnerComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_TNX } from "../commons/constants";
import { PatientContextConsumer } from "../provider/PatientProvider";

function BookingConfirmScreen({ route, navigation }) {
  console.log(
    "===========================booking conform screen ============="
  );
  const navi = useNavigation();
  const tnxId = route.params.tnxId;
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState({});
  let { booking } = {};

  function onSubmit(code, docId, sessionId, date, patientName, patientNumber) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    };
    fetch(`${SERVER_HOST}/api/${API_TNX}/${sessionId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        console.log(">>>>>>>>>>>>>>>>>>>>>>>. " + data.id);
        navigation.navigate("BookingConfirmScreen", {
          tnxId: data.id,
        });
      })
      .catch((error) => {
        console.log("MMMMMMMMMMMMM :: " + JSON.stringify(error));
      });
  }

  /**
   * cancel the transaction
   */
  const cancel = () => {};
  useEffect(() => {
    // call POST request to initiate the booking
    // post request body
    // doctor, dispensary,session,patient number
    console.log("BookingConfirmScreen : useEffect -> fetch API records");
    getResources(API_TNX)
      .then((resource) => {
        console.log("DistrictScreen => GET :" + JSON.stringify(resource));
        setTransaction(resource);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error => GET districts :" + JSON.stringify(error));
        setIsLoading(false);
        showExceptionAlert(navigation);
        return true;
      })
      .finally(() => {});
  }, []);
  return (
    <PaperProvider>
      <Header name="Confirmation" showBackArrow={true} />
      <View style={styles.main_screen}>
        <LoadSpinner loading={isLoading} />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_search}>Confirm your Booking</Text>
          </View>

          <View style={styles.countdown}>
            <Text style={styles.notice}>Make your booking within </Text>
            <CountDown
              until={330}
              size={18}
              onFinish={() => {
                //this.state.navi.navigate("LoadHomeScreen");
              }}
              digitStyle={{ backgroundColor: "red" }}
              digitTxtStyle={{ color: "white" }}
              timeToShow={["M", "S"]}
              timeLabels={{ m: "MM", s: "SS" }}
            />
          </View>
          <PatientContextConsumer>
            {(context) => (
              <>
                {/* <ContentTitle titleText={context.state.dispensaryName} /> */}
                {/* <UserProfile user={context.state.doctor} /> */}
                <View elevation={2} style={styles.summary}>
                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>REFERENCE NO :</Text>
                    <Text style={styles.value_display}>
                      {transaction.refNumber}
                    </Text>
                  </View>
                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>APPOINMNET NO :</Text>
                    <Text style={styles.value_display}>15</Text>
                  </View>
                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>APPOINMNET TIME :</Text>
                    <Text style={styles.value_display}>
                      Wed 2:45 PM
                      <Text style={styles.display_small}>
                        (Time may vary doctor's arrival time)
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>PATIENT NAME :</Text>
                    <Text style={styles.value_display}></Text>
                  </View>

                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>DOCTOR:</Text>
                    <Text style={styles.value_display}>
                      {context.state.doctor.doctorName}
                    </Text>
                  </View>

                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>DISPENSARY :</Text>
                    <Text style={styles.value_display}>
                      {
                        transaction.doctorScheduleGrid.doctorDispensary
                          .dispensary.name
                      }
                    </Text>
                  </View>
                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>Patient No :</Text>
                    <Text style={styles.value_display}>10</Text>
                  </View>
                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>Service Chanrge :</Text>
                    <Text style={styles.value_display}>Rs 30.00</Text>
                  </View>
                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>Patient Name</Text>
                    <Text style={styles.value_display}>dsdsds</Text>
                  </View>
                  <View style={styles.key_value_display}>
                    <Text style={styles.key_display}>Contact Number</Text>
                    <Text style={styles.value_display}>4444444</Text>
                  </View>
                </View>
              </>
            )}
          </PatientContextConsumer>

          <View style={styles.noticeService}>
            <Text style={styles.important_note}>
              ** Service charge you have to pay to the dispensary
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", marginLeft: 10, marginRight: 10 }}
          >
            <View style={styles.touchable_center}>
              <TouchableOpacity
                style={styles.channel}
                onPress={() =>
                  navigation.navigate("BookingScreen", {
                    doctor: {
                      // id: doctor.id,
                      // name: doctor.name,
                      // photo: doctor.photo,
                      // speciality: doctor.speciality,
                    },
                    dispensary: {
                      // id: dispensary.id,
                      // name: dispensary.name,
                    },
                    session: {
                      // id: item.id,
                      // date: item.date,
                      // time: item.session,
                    },
                  })
                }
              >
                <Text style={styles.channel_text}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.touchable_center}>
              <PatientContextConsumer>
                {(context) => (
                  <TouchableOpacity
                    style={styles.channel}
                    onPress={() => {
                      onSubmit(
                        "1234",
                        context.state.doctor.doctorId,
                        context.state.session.sessionId,
                        context.state.session.date,
                        "tesT USER",
                        "0762199100"
                      );
                    }}
                  >
                    <Text style={styles.channel_text}>Confirm </Text>
                  </TouchableOpacity>
                )}
              </PatientContextConsumer>
            </View>
          </View>
        </View>
        {/* </View> */}
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
    marginTop: 10,
  },
  countdown: {
    padding: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "red",
  },
  notice: {
    flexDirection: "row",
    marginBottom: 10,
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
    // backgroundColor: "yellow",
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
    height: 35,
    //width: 100,
    margin: 10,
    padding: 5,
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
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BookingConfirmScreen;
