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
import { API_TNX, SERVER_HOST } from "../commons/constants";
import { getResources } from "../components/ApiClient";
import { PatientContextConsumer } from "../provider/PatientProvider";
import { ScrollView } from "react-native-gesture-handler";

function BookingConfirmScreen({ route, navigation }) {
  const navi = useNavigation();
  const tnxId = route.params.tnxId;
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState({});

  function onSubmit() {
    let booking = {
      status: 1,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    };
    fetch(`${SERVER_HOST}/api/${API_TNX}/${tnxId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("********************************* " + data);
        console.log(JSON.stringify(data));
        navigation.navigate("BookingSuccessScreen", {
          tnxId: data.id,
        });
      })
      .catch((error) => {
        console.log("Error occur while " + JSON.stringify(error));
      });
  }

  /**
   * cancel the transaction
   */
  // const cancel = () => {};
  useEffect(() => {
    console.log("BookingConfirmScreen : useEffect -> fetch API records");
    getResources(`${API_TNX}/${tnxId}`)
      .then((resource) => {
        console.log("BookingConfirmScreen => GET :" + JSON.stringify(resource));
        setTransaction(resource);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(
          "Error => GET BookingConfirmScreen :" + JSON.stringify(error)
        );
        setIsLoading(false);
        showExceptionAlert(navigation);
        return true;
      })
      .finally(() => { });
  }, []);

  return (
    <PaperProvider>
      <Header name="Confirmation" showBackArrow={true} />
      <View style={styles.main_screen}>
        {isLoading ? (
          <LoadSpinner loading={isLoading} loadingText="Please wait ..." />
        ) : (
          <View>
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.header_search}>Confirm your Booking</Text>
                </View>
                <View style={styles.countdown}>
                  <Text style={styles.notice}>Make your booking within</Text>
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
                <>
                  <View style={styles.summary}>
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
                      <Text style={styles.value_display}>sss</Text>
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
                        {
                          transaction.doctorScheduleGrid.doctorDispensary
                            .bookingFee
                        }
                      </Text>
                    </View>
                    <View style={styles.key_value_display}>
                      <Text style={styles.key_display}>Total Fee :</Text>
                      <Text style={styles.value_display}>10.00</Text>
                    </View>

                    <View style={styles.key_value_display}>
                      <Text style={styles.key_display}>Patient Name</Text>
                      <Text style={styles.value_display}>dsdsds</Text>
                    </View>
                    <View style={styles.key_value_display}>
                      <Text style={styles.key_display}>Contact Number</Text>
                      <Text style={styles.value_display}>
                        {transaction.mobileNo}
                      </Text>
                    </View>
                  </View>
                </>
                <View>
                  <Text style={styles.important_note}>
                    ** Service charge you have to pay to the dispensary
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <View style={styles.touchable_center}>
                    <TouchableOpacity
                      style={styles.change}
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
                    <TouchableOpacity
                      style={styles.confirm}
                      onPress={() => {
                        onSubmit();
                      }}
                    >
                      <Text style={styles.channel_text}>Confirm </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
        {/* </View> */}
      </View>
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
    fontSize: 12,
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
  confirm: {
    backgroundColor: '#43b366',
    height: 35,
    margin: 10,
    padding: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  change: {
    backgroundColor: '#1d72a3',
    height: 35,
    margin: 10,
    padding: 5,
    alignItems: "center",
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
