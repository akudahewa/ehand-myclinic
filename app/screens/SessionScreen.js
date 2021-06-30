import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Avatar } from "react-native-elements";
import LoadSpinner from "../components/SpinnerComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentTitle from "../components/ContentTitle";
import UserProfile from "../components/UserProfile";
import ListItemSeparator from "../components/ListItemSeparator";
import { PatientContextConsumer } from "../provider/PatientProvider";
import { getResources } from "../components/ApiClient";
import { showExceptionAlert, closeApp } from "../commons/index";
import { API_SCHEDULE, CACHE_DOC_DIS } from "../commons/constants";
import { retrieveData } from "../service/AppLocalCache";
import { storeData } from "../service/AppLocalCache";
import GlobalStyle from "../style/style";

function RenderSeparator() {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#ddd",
      }}
    />
  );
}

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
      {/* <Image
          style={{ width: 30, height: 30 }}
          source={require("../assets/myclinic_logo.jpg")}
        /> */}
    </TouchableOpacity>
  );
};

function loadBookAction(status) {
  if (status == "AVAILABLE") {
    return {
      flex: 1,
      height: 40,
      // width: 70,
      margin: 5,
      marginTop: 10,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#43b366",
      borderRadius: 3,
    };
  } else {
    return {
      flex: 1,
      height: 40,
      // width: 70,
      margin: 5,
      marginTop: 10,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#9ea59a",
      borderRadius: 3,
    };
  }
}
function isDisabled(availability) {
  if (availability) {
    return false;
  } else {
    return true;
  }
}

const query = (doctorId, dispensaryId, displayDays) => {
  return `/doctor/${doctorId}/dispensary/${dispensaryId}?displayDays=${displayDays}`;
};

var deviceHeight = Dimensions.get("window").height;

function SessionScreen({ route, navigation }) {
  console.log("SessionScreen : session component loading ");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appCache, setAppCache] = useState({});

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "blue",
      accent: "tomato",
    },
  };

  const extractCacheValues = (cacheValues) => {
    let key, value;
    cacheValues.map((result, i, cacheValue) => {
      key = cacheValue[i][0];
      value = JSON.parse(cacheValue[i][1]);
    });
    return value;
  };

  useEffect(() => {
    console.log("SessionScreen : useEffect -> fetch data from AsyncStorage");
    let doctorId, dispensaryId, onlineDisplayDays;
    retrieveData(["doc_dis_cache"]).then((data) => {
      console.log(JSON.stringify(data));
      let cacheObj = extractCacheValues(data);
      setAppCache(cacheObj);
      doctorId = cacheObj.doctor.doctorId;
      dispensaryId = cacheObj.dispensary.dispensaryId;
      //onlineDisplayDays = cacheObj.onlineDisplayDays;
      onlineDisplayDays = 3;

      getResources(
        `${API_SCHEDULE}${query(doctorId, dispensaryId, onlineDisplayDays)}`
      )
        .then((resources) => {
          console.log("SessionScreen => GET :" + JSON.stringify(resources));
          let sessionList = [];
          resources.forEach((resource) => {
            sessionList.push(resource);
          });
          setData(sessionList);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error => GET Session :" + JSON.stringify(error));
          setIsLoading(false);
          showExceptionAlert(navigation);
        })
        .finally(() => {});
    });
  }, []);

  return (
    <>
      <PaperProvider theme={theme}>
        <Header name="Session" showBackArrow={true} />
        <View style={styles.main_screen}>
          <View style={styles.container}>
            {isLoading ? (
              <LoadSpinner loading={isLoading} loadingText="Loading" />
            ) : (
              <View style={{ flex: 1 }}>
                <PatientContextConsumer>
                  {(context) => (
                    <>
                      <UserProfile user={appCache.doctor} />
                      <ContentTitle
                        titleText={
                          appCache.dispensary.dispensaryName + " Sessions"
                        }
                      />
                    </>
                  )}
                </PatientContextConsumer>

                {/* <View style={styles.sessions_header_bar}>
                  <Text style={styles.session_header}>
                    {appCache.dispensary.dispensaryName} SESSIONS
                  </Text>
                </View> */}
                <View style={styles.scrollContainer}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={GlobalStyle.seesion_list}>
                      <FlatList
                        //ItemSeparatorComponent={ListItemSeparator}
                        data={data}
                        renderItem={({ item }) => (
                          <View>
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
                                  {item.date}
                                </Text>
                                <Text style={GlobalStyle.session_data_time}>
                                  MON / {item.sessionStartTime}
                                </Text>
                              </View>

                              <Text style={GlobalStyle.appoinment_box}>
                                Active {"\n"}Appoinment {"\n"}{" "}
                                {item.nextAppoinmentNo}
                              </Text>
                              <PatientContextConsumer>
                                {(context) => (
                                  <TouchableOpacity
                                    // disabled={isDisabled(item.availability)}
                                    style={loadBookAction(item.status)}
                                    onPress={() => {
                                      alert(item.id);
                                      let sessionModel = {
                                        session: {
                                          sessionId: item.id,
                                          date: item.date,
                                          time: item.sessionStartTime,
                                        },
                                      };
                                      storeData("session_cache", sessionModel);
                                      navigation.navigate("BookingScreen");
                                    }}
                                  >
                                    <Text style={GlobalStyle.channel_text}>
                                      Book
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </PatientContextConsumer>
                            </View>
                            <RenderSeparator />
                          </View>
                        )}
                      />
                    </View>
                  </ScrollView>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* <Footer /> */}
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  main_screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },

  sessions_header_bar: {
    backgroundColor: "white",
  },
  session_header: {
    padding: 10,
    textAlign: "center",
  },

  scrollContainer: {
    display: "flex",
    height: deviceHeight - 460,
  },
});

export default SessionScreen;
