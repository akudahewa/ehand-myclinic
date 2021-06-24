import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
  SafeAreaView,
  Alert,
  BackHandler,
  Avatar,
} from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Icon } from "react-native-elements";
import LoadSpinner from "../components/SpinnerComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ListItemSeparator from "../components/ListItemSeparator";
import { PatientContextConsumer } from "../provider/PatientProvider";
import { closeApp } from "../utils/Utility";
import { getResources } from "../components/ApiClient";
import { API_DOCTOR_DISPENSARY_URL, SERVER_HOST } from "../commons/constants";
import { storeData } from "../service/AppLocalCache";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function ChannelScreen({ route, navigation }) {
  console.log("ChannelScreen : component loading ");
  const doctor = route.params.doctor;
  const dispensary = route.params.dispensary;
  const [isLoading, setIsLoading] = useState(true);
  const [availabilityGrid, setAvailabilityGrid] = useState([]);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "blue",
      accent: "tomato",
    },
  };

  const queryParam = () => {
    let queryParam = "";
    let join = "";
    if (
      doctor != undefined &&
      doctor.id != "" &&
      dispensary != undefined &&
      dispensary.id != ""
    ) {
      join = "&";
    }
    if (doctor != undefined && doctor.id != "") {
      queryParam += `doctorId=${doctor.id}${join}`;
    }
    if (dispensary != undefined && dispensary.id != "") {
      queryParam += `dispensaryId=${dispensary.id}`;
    }

    return queryParam;
  };

  const key = (dispensaryId, dispensaryName, address) => {
    return {
      id: dispensaryId,
      name: dispensaryName,
      address: address,
    };
  };

  const populateGrid = (map) => {
    let tmpAvailabilityGrid = [];
    for (let [key, value] of map) {
      let obj = {
        title: key,
        data: value,
      };
      tmpAvailabilityGrid.push(obj);
    }

    return tmpAvailabilityGrid;
  };

  const buildDoctorDispensay = (doctor, dispensary, displayDays) => {
    let doctorDispensary = {
      doctor: doctor,
      dispensary: dispensary,
      onlineDisplayDays: displayDays,
    };

    return doctorDispensary;
  };

  const margeResourceItems = (map, resource) => {
    let tmpDoctorDispensary = map.get(resource.dispensary.dispensaryId);
    if (tmpDoctorDispensary === undefined) {
      tmpDoctorDispensary = [];
    }
    tmpDoctorDispensary.push(
      buildDoctorDispensay(
        resource.doctor,
        resource.dispensary,
        resource.onlineDisplayDays
      )
    );
    return tmpDoctorDispensary;
  };

  useEffect(() => {
    console.log("ChannelScreen : component loading ");
    getResources(`${API_DOCTOR_DISPENSARY_URL}?${queryParam()}`)
      .then((resources) => {
        console.log("ChannelScreen => GET :" + JSON.stringify(resources));
        let map = new Map();
        resources.forEach((resource) => {
          console.log(
            "dispensary :" +
              map.get(resource.dispensary.dispensaryId) +
              " doctor :" +
              map.get(resource.doctor.doctorId)
          );
          map.set(
            key(
              resource.dispensary.dispensaryId,
              resource.dispensary.name,
              resource.dispensary.address
            ),
            margeResourceItems(map, resource)
          );
        });
        setAvailabilityGrid(populateGrid(map));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        showExceptionAlert(navigation);
        return true;
      })
      .finally(() => {});
  }, []);

  return (
    <PaperProvider theme={theme}>
      <Header name="Channels" showBackArrow={true} />
      <View style={styles.main_screen}>
        <View style={styles.container}>
          {isLoading ? (
            <LoadSpinner loading={isLoading} loadingText="Please wait .." />
          ) : (
            <View style={styles.channel_list}>
              <SectionList
                ItemSeparatorComponent={ListItemSeparator}
                sections={availabilityGrid}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <View>
                    <View>
                      <Text style={styles.item}>{item.doctor.name}</Text>
                      <Text style={styles.grid_doc_title_text}>
                        {item.doctor.speciality}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.channel}
                        onPress={() => {
                          let selectedModel = {
                            doctor: {
                              doctorId: item.doctor.doctorId,
                              doctorName: item.doctor.name,
                              photo: item.doctor.image,
                              speciality: item.doctor.speciality,
                            },
                            dispensary: {
                              dispensaryId: item.dispensary.dispensaryId,
                              dispensaryName: item.dispensary.name,
                              address: item.dispensary,
                            },
                            onlineDisplayDays: item.onlineDisplayDays,
                          };
                          storeData("doc_dis_cache", selectedModel);
                          navigation.navigate("SessionScreen");
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Icon
                            name="stethoscope"
                            type="font-awesome"
                            color="white"
                          />
                          <Text style={styles.channel_text}>Channels</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                renderSectionHeader={({ section }) => (
                  <View>
                    <Text style={styles.sectionHeader}>
                      {section.title.name}
                    </Text>
                    <Text style={styles.sectionSubHeader}>
                      {section.title.address}
                    </Text>
                  </View>
                )}
              />
              {/* </ScrollView> */}
            </View>
          )}
        </View>
      </View>
      <Footer />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  main_screen: {
    // flex: 1,
  },
  screen_header: {
    flex: 1,
  },
  channel_list: {
    // flex: 1,
    // alignItems: "stretch",
    padding: 5,
    // flexDirection: "column",
    // paddingRight: 5,
    borderRadius: 5,
    borderStyle: "solid",
    justifyContent: "center",
    borderColor: "red",
  },
  container: {
    // flex: 1,
    // justifyContent: "flex-start",
    //alignItems: "center",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#9ea59a",
    // flex: 1,
    // padding: 10,
    // backgroundColor: "#9ea59a",
  },
  item: {
    // padding: 20,
    marginVertical: 8,
    paddingLeft: 8,
    //fontSize: 18,

    // flex: 1,
    // height: 44,
  },
  header_text: {
    margin: 25,
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    paddingTop: 8,
    paddingBottom: 8,
    // marginTop: 5,
    paddingLeft: 10,
    // paddingRight: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#1d72a3",
    backgroundColor: "#e3f6fc",
    elevation: 3,
  },
  sectionSubHeader: {
    paddingTop: 8,
    paddingBottom: 8,
    // marginTop: 5,
    paddingLeft: 10,
    // paddingRight: 10,
    fontSize: 10,
    fontWeight: "bold",
    color: "#1d72a3",
    backgroundColor: "#e3f6fc",
    elevation: 3,
  },
  channel: {
    // flex: 1,
    height: 40,
    // width: 60,
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    // marginLeft: 100,
    // marginLeft: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d72a3",
    borderRadius: 3,
  },
  channel_text: {
    fontSize: 16,
    color: "white",
    paddingLeft: 4,
  },
  same_row: {
    flexDirection: "row",
  },
  grid_dis_text: {
    // backgroundColor: "#A5BFB2",
    fontSize: 18,
    // width: "100%",
    // fontWeight: "bold",
  },
  grid_doc_text: {
    fontSize: 18,
    padding: 5,
    width: 190,
  },
  grid_doc_title_text: {
    fontSize: 14,
    color: "#9ea59a",
    paddingLeft: 8,
  },
  fixToText: {
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ChannelScreen;
