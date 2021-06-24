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

function RenderSeparator() {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#000",
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
      height: 35,
      // width: 70,
      margin: 5,
      marginTop: 10,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1d72a3",
      borderRadius: 3,
    };
  } else {
    return {
      flex: 1,
      height: 35,
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
  console.log("SessionScreen : component loading ");
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
      onlineDisplayDays = cacheObj.onlineDisplayDays;

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
                      <ContentTitle
                        titleText={appCache.dispensary.dispensaryName}
                      />
                      <UserProfile user={appCache.doctor} />
                    </>
                  )}
                </PatientContextConsumer>

                <View style={styles.sessions_header_bar}>
                  <Text style={styles.session_header}>
                    {appCache.dispensary.dispensaryName} SESSIONS
                  </Text>
                </View>
                <View style={styles.scrollContainer}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.seesion_list}>
                      <FlatList
                        ItemSeparatorComponent={ListItemSeparator}
                        data={data}
                        renderItem={({ item }) => (
                          <View>
                            <View style={styles.same_row}>
                              <Text style={styles.session_data}>
                                {item.date} {"\n"} {item.sessionStartTime}
                              </Text>
                              <Text style={styles.appoinment_box}>
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
                                    <Text style={styles.channel_text}>
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

        <Footer />
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
  doc_profile: {
    margin: 10,
    backgroundColor: "white",
    padding: 8,
  },
  dis_header: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3f6fc",
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 5,
  },
  image_container: {
    paddingTop: 20,
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
    padding: 6,
  },
  doc_name: {
    color: "#23b248",
    fontSize: 16,
    fontWeight: "bold",
  },
  sessions_header_bar: {
    margin: 10,
    backgroundColor: "white",
  },
  session_header: {
    padding: 10,
    textAlign: "center",
  },
  seesion_list: {
    margin: 10,
    backgroundColor: "white",
    flex: 1,
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, alignItems: "center", justifyContent: "center" },
  row: {
    //height: 70,
    backgroundColor: "white",
  },
  item: {
    padding: 10,
    fontSize: 18,
    //height: 44,
  },
  header_text: {
    margin: 25,
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  channel: {
    flex: 1,
    //height: 35,
    // width: 70,
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
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
    justifyContent: "center",
    alignContent: "center",
  },
  session_data: {
    flex: 1,
    padding: 5,
  },
  appoinment_box: {
    flex: 1,
    padding: 5,
    textAlign: "center",
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
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scrollContainer: {
    display: "flex",
    height: deviceHeight - 460,
  },
});

export default SessionScreen;
