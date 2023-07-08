import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  Alert,
  Picker,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Input } from "react-native-elements";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadSpinner from "../components/SpinnerComponent";
import SaveBookingScreen from "./SaveBookingScreen";
import ContentTitle from "../components/ContentTitle";
import UserProfile from "../components/UserProfile";
import CountDown from "react-native-countdown-component";

import PatientBookingForm from "../components/PatientBookingForm";
import { PatientContextConsumer } from "../provider/PatientProvider";
import { API_TNX, SERVER_HOST } from "../commons/constants";
import { storeData, retrieveData } from "../service/AppLocalCache";
import { showExceptionAlert, closeApp } from "../commons/index";
import {GlobalStyle} from "../style/style";
import { getResources } from "../components/ApiClient";

function BookingScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [keyboardState, setKeyBoardState] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [patientTitle, setPatientTitle] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [doctorDispensaryCache, setDoctorDispensaryCache] = useState({});
  const [sessionCache, setSessionCache] = useState({});
  const [patientNameError, setPatientNameError] = useState("");
  const [patientNumberError, setPatientNumberError] = useState("");
  const [patientMetaData, setPatientMetaData] = useState({});
  const [phoneErrorCheck, setphoneErrorCheck] = useState();

  const onSubmit = async () => {
    console.log("--------submit form ---------" + JSON.stringify(sessionCache));
    console.log(
      "############# patientMeta #################### " +
        JSON.stringify(patientMetaData)
    );
    if (validate()) {
      let sessionId = sessionCache.session.sessionId;
      let booking = {
        bookedDate: sessionCache.session.date,
        status: -1,
        mobileNo: patientNumber,
        patientAppointmentNumber: patientMetaData.patientAppoinmentNumber + 1,
        patientAppoinmentTime: patientMetaData.patientAppoinmentTime,
        deviceId: Expo.Constants.deviceId,
      };
      console.log(JSON.stringify(booking));
      fetch(`${SERVER_HOST}/api/${API_TNX}/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          navigation.navigate("BookingConfirmScreen", {
            tnxId: data.id,
          });
        })
        .catch(function (error) {
          showExceptionAlert(navigation);
          return true;
        });
    }
  };

  const onChangePatientName = (val) => {
    setPatientName(val);
  };
  useEffect(() => {
    const _keyboardDidShow = () => {
      setKeyBoardState(false);
    };

    const _keyboardDidHide = () => {
      setKeyBoardState(true);
    };

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      _keyboardDidHide
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });

  const extractCacheValues = (cacheValues) => {
    let key, value;
    let cacheJson = {};
    cacheValues.map((result, i, cacheValue) => {
      key = cacheValue[i][0];
      value = JSON.parse(cacheValue[i][1]);
      console.log("Extract cache values :" + JSON.stringify(value));
      if (key === "doc_dis_cache") {
        setDoctorDispensaryCache(value);
      } else {
        setSessionCache(value);
      }
    });
  };
  const validate = () => {
    const regex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/;
    let isValid = true;
    if (patientName.length < 5) {
      isValid = false;
      setPatientNameError("name should be minimum 4 letters");
    }
    if (regex.test(patientNumber) === false) {
      isValid = false;
      setPatientNumberError("Invalid phone number");
    }
    return isValid;
  };

  useEffect(() => {
    /** API call to get dispensary alone with doctor.
     * atleast one parameter required
     * params - doctor,dispensary
     * ex :
     */
    retrieveData(["doc_dis_cache", "session_cache"])
      .then((data) => {
        extractCacheValues(data);
      })
      .then((cache) => {
        console.log(
          ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.. " + JSON.stringify(sessionCache)
        );
        let doctorSessionGridId = sessionCache.session.sessionId;
        getResources(
          `${SERVER_HOST}/api/${API_TNX}?doctorSessionGridId=${sessionCache.session.sessionId}`
        )
          .then((resources) => resources.json())
          .then((data) => {
            setPatientMetaData(data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(
              "Error occur while getting next appoinment number :" +
                JSON.stringify(error)
            );
          });
      });
  }, []);

  useEffect(() => {});

  return (
    <PaperProvider>
      <Header name="Booking" showBackArrow={true} />
      <View style={styles.main_screen}>
        <View style={styles.container}>
          {isLoading ? (
            <LoadSpinner loading={isLoading} loadingText="Loading" />
          ) : (
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={{ flex: 1, marginBottom: 30 }}>
                {keyboardState ? (
                  <>
                    <UserProfile user={doctorDispensaryCache.doctor} />
                    <ContentTitle
                      titleText={
                        doctorDispensaryCache.dispensary.dispensaryName
                      }
                    />
                    <View style={styles.sessions_header_bar}>
                      <Text style={styles.session_header}>Session Details</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#f43838", fontSize: 12 }}>
                        *Extra appoinmnets not given by the doctor
                      </Text>
                    </View>

                    <View style={GlobalStyle.seesion_list}>
                      <View style={GlobalStyle.same_row}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={styles.session_data}>
                            {sessionCache.session.date}
                          </Text>
                          <Text style={GlobalStyle.session_data_time}>
                            MON / {sessionCache.session.time}
                          </Text>
                        </View>

                        <Text style={GlobalStyle.appoinment_box}>
                          Active {"\n"}Appoinment {"\n"}{" "}
                          {patientMetaData.patientAppoinmentNumber}
                        </Text>
                        <Text style={GlobalStyle.appoinment_box}>
                          {patientMetaData.patientTime}
                        </Text>
                        <View style={styles.countdown_box}>
                          <CountDown
                            until={330}
                            size={15}
                            onFinish={() => {
                              //this.state.navi.navigate("LoadHomeScreen");
                            }}
                            digitStyle={{ backgroundColor: "red" }}
                            digitTxtStyle={{ color: "white" }}
                            timeToShow={["M", "S"]}
                            timeLabels={{ m: "MM", s: "SS" }}
                          />
                        </View>
                      </View>
                    </View>
                  </>
                ) : null}

                <View style={styles.formView}>
                  <SafeAreaView>
                    <Picker
                      selectedValue={selectedValue}
                      style={{
                        height: 50,
                        width: 120,
                        color: "gray",
                        marginLeft: 2,
                        fontSize: 15,
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                      }
                    >
                      <Picker.Item label="Mr" value="mr" />
                      <Picker.Item label="Miss" value="miss" />
                      <Picker.Item label="Master" value="master" />
                      <Picker.Item label="Baby" value="baby" />
                    </Picker>
                    <Input
                      placeholder="Enter patient name"
                      defaultValue={patientName}
                      onChangeText={(patientName) => {
                        setPatientName(patientName);
                        if (patientName.length >= 5) {
                          setPatientNameError(" ");
                        }
                      }}
                      errorMessage={patientNameError}
                      inputContainerStyle={{ borderBottomColor: "#ddd" }}
                      style={{ fontSize: 14 }}
                    />
                    <Input
                      style={{
                        // height: 40,
                        // borderColor: "gray",
                        // borderBottomWidth: 1,
                        placeholderTextColor: "gray",
                        fontSize: 14,
                      }}
                      keyboardType="number-pad"
                      defaultValue={patientNumber}
                      onChangeText={(patientNumber) => {
                        setPatientNumber(patientNumber);
                        // if (validate()) {
                        //   setPatientNumberError(" ");
                        // }
                      }}
                      placeholder="Patient phone number"
                      errorStyle={{ color: "red" }}
                      errorMessage={patientNumberError}
                      inputContainerStyle={{ borderBottomColor: "#ddd" }}
                    />
                  </SafeAreaView>
                  <TouchableOpacity
                    style={styles.channel}
                    onPress={() => {
                      onSubmit();
                    }}
                  >
                    <Text style={styles.channel_text}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
      {/* <Footer /> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  main_screen: {
    flex: 1,
  },
  sub_header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3f6fc",
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 5,
  },
  doc_profile: {
    // margin: 10,
    padding: 20,
    backgroundColor: "white",
    flex: 1,
    // width: 335,
    // padding: 5,
  },

  formView: {
    paddingHorizontal: 15,
    backgroundColor: "rgba(24, 150, 197, 0.1)",
    flex: 1,
    margin: 15,
    borderRadius: 5,
    paddingBottom: 15,
  },

  sessions_header_bar: {
    marginTop: 10,
    backgroundColor: "white",
  },
  session_header: {
    //padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

  header_text: {
    margin: 25,
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  channel: {
    height: 40,

    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d72a3",
    borderRadius: 3,
  },
  channel_text: {
    fontSize: 14,
    color: "white",
  },
});
export default BookingScreen;
