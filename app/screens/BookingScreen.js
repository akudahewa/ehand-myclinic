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

function BookingScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [keyboardState, setKeyBoardState] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [patientTitle, setPatientTitle] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [doctorDispensaryCache, setDoctorDispensaryCache] = useState({});
  const [sessionCache, setSessionCache] = useState({});

  function onSubmit() {
    console.log(selectedValue + "|" + patientName + " |" + patientNumber);
    let sessionId = sessionCache.session.sessionId;

    let booking = {
      bookedDate: sessionCache.session.date,
      status: -1,
      mobileNo: patientNumber,
      patientName: patientName,
    };
    console.log(
      "::::::::::::::::::::::::: " +
        `${SERVER_HOST}/api/${API_TNX}/${sessionId}`
    );
    console.log(JSON.stringify(booking));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    };
    fetch(
      "http://192.168.1.5:8086/health-service/api/transaction/6",
      requestOptions
    )
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
    // (async () => {
    //   const rawResponse = await fetch(
    //     `${SERVER_HOST}api/${API_TNX}/${sessionId}`,
    //     requestOptions
    //   );
    //   console.log(
    //     "xxxxxxxxxxxx ttttttttttttttttttttttttttt " +
    //       JSON.stringify(rawResponse)
    //   );
    //   const content = await rawResponse.json();
    //   console.log(content);
    //   console.log("Created tnx id :" + content.id);
    //   navigation.navigate("BookingConfirmScreen", {
    //     tnxId: content.id,
    //   });
    // })();
  }

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
      if (key === "doc_dis_cache") {
        setDoctorDispensaryCache(value);
      } else {
        setSessionCache(value);
      }
    });
  };

  useEffect(() => {
    /** API call to get dispensary alone with doctor.
     * atleast one parameter required
     * params - doctor,dispensary
     * ex :
     */
    retrieveData(["doc_dis_cache", "session_cache"]).then((data) => {
      extractCacheValues(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <PaperProvider>
      <Header name="Booking" showBackArrow={true} />
      <View style={styles.main_screen}>
        <View style={styles.container}>
          {isLoading ? (
            <LoadSpinner loading={isLoading} loadingText="Loading" />
          ) : (
            <ScrollView>
              <View style={{ flex: 1, marginBottom: 30 }}>
                {keyboardState ? (
                  <>
                    <ContentTitle
                      titleText={
                        doctorDispensaryCache.dispensary.dispensaryName
                      }
                    />
                    <UserProfile user={doctorDispensaryCache.doctor} />
                    <View>
                      <Text>Special notes</Text>
                      <Text> Extra appoinmnets not given by the doctor</Text>
                    </View>
                    <View style={styles.sessions_header_bar}>
                      <Text style={styles.session_header}>SESSION</Text>
                    </View>
                    <View style={styles.seesion_list}>
                      <View style={styles.same_row}>
                        <Text style={styles.session_data}>
                          {/* {session.date} {"\n"}
                              {session.time} */}
                          {sessionCache.session.date}
                          {sessionCache.session.time}
                        </Text>
                        <Text style={styles.appoinment_box}>
                          Active {"\n"}Appoinment {"\n"} 10
                        </Text>
                        {/* <Text>Time remain {"\n"} 5:00 min</Text> */}
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

                <View style={styles.doc_profile}>
                  <SafeAreaView>
                    <Picker
                      selectedValue={selectedValue}
                      style={{ height: 50, width: 150 }}
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
                      // errorStyle={{ color: "red" }}
                      // value={patientName}
                      // onChangeText={text => setText(text)}
                      defaultValue={patientName}
                      onChangeText={(patientName) => {
                        // console.log(
                        //   "++++++++++++++++++++++++++++++++ " + patientName
                        // );
                        setPatientName(patientName);
                      }}
                      // errorMessage="Please enter name"
                    />
                    <Input
                      style={{
                        // height: 40,
                        borderColor: "gray",
                        borderBottomWidth: 1,
                        placeholderTextColor: "gray",
                      }}
                      keyboardType="number-pad"
                      // sonChangeText={(text) => setTextInputValue(text)}
                      defaultValue={patientNumber}
                      onChangeText={(patientNumber) => {
                        // console.log(
                        //   "++++++++++++++++++++++++++++++++ " + patientName
                        // );
                        setPatientNumber(patientNumber);
                      }}
                      placeholder="Patient phone number"
                      errorStyle={{ color: "red" }}
                      errorMessage="Please enter name"
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
      <Footer />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
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
  dis_header: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  image_container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  doc_description: {
    alignItems: "center",
    justifyContent: "center",
  },
  doc_name: {
    color: "#23b248",
    fontSize: 16,
    fontWeight: "bold",
  },
  sessions_header_bar: {
    marginTop: 10,
    backgroundColor: "white",
  },
  session_header: {
    padding: 10,
  },
  seesion_list: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, alignItems: "center", justifyContent: "center" },
  row: { height: 70, backgroundColor: "white" },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
  same_row: {
    flexDirection: "row",
    padding: 5,
  },
  session_data: {
    flex: 1,
  },
  appoinment_box: {
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
  countdown_box: {
    flex: 1,
  },
  grid_dis_text: {
    backgroundColor: "#A5BFB2",
    fontSize: 18,
    padding: 5,
    fontWeight: "bold",
  },
  grid_doc_text: {
    fontSize: 18,
    padding: 5,
    width: 190,
  },
  grid_doc_title_text: {
    fontSize: 14,
    padding: 2,
  },
  fixToText: {
    flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default BookingScreen;
