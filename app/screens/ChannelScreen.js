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
import { Icon, ListItem, Button } from "react-native-elements";
import LoadSpinner from "../components/SpinnerComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ListItemSeparator from "../components/ListItemSeparator";
import { PatientContextConsumer } from "../provider/PatientProvider";
import { closeApp } from "../utils/Utility";
import { getResources } from "../components/ApiClient";
import { API_DOCTOR_DISPENSARY_URL, SERVER_HOST } from "../commons/constants";
import { storeData } from "../service/AppLocalCache";
import UserProfile from "../components/UserProfile";
import {GlobalStyle} from "../style/style";

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
  const [dispensaryList, setDispensaryList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [onlineDisplayDays, setOnlineDisplayDays] = useState(1);

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
        let tmpDispensary = [];
        setSelectedDoctor(resources[0].doctor);
        resources.forEach((resource) => {
          console.log(
            "dispensary :" +
            map.get(resource.dispensary.dispensaryId) +
            " doctor :" +
            map.get(resource.doctor.doctorId)
          );

          tmpDispensary.push(resource.dispensary);
          setOnlineDisplayDays(resource.onlineDisplayDays);
        });
        setDispensaryList(tmpDispensary);
        setAvailabilityGrid(populateGrid(map));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        showExceptionAlert(navigation);
        return true;
      })
      .finally(() => { });
  }, []);

  return (
    <PaperProvider theme={theme}>
      <Header name="Channels" showBackArrow={true} />
      <View style={styles.main_screen}>
        <View style={styles.container}>
          {isLoading ? (
            <LoadSpinner loading={isLoading} loadingText="Please wait .." />
          ) : (
            <View>
              <>
                <UserProfile user={selectedDoctor} />
              </>
              <View style={styles.channel_list}>
                {dispensaryList.map((dispensary, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    
                  >
                    <ListItem.Content>
                      <View style={{ display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent:'space-between' }}>
                        <View style={{ flex: 1, flexWrap:'wrap', flexDirection:'row' }}>
                          <ListItem.Title style={GlobalStyle.listTitleBold}>{dispensary.name}</ListItem.Title>
                          <ListItem.Subtitle>
                            {dispensary.address}
                          </ListItem.Subtitle>
                        </View>
                        <Button
                          // icon={
                          //   <Icon
                          //     name="stethoscope"
                          //     size={15}
                          //     color="white"
                          //     type="font-awesome"
                          //     style={{ marginRight: 10 }}
                          //   />
                          // }
                          title="Select"
                          raised
                          buttonStyle={{backgroundColor:'#43b366', paddingHorizontal:15}}
                          onPress={() => {
                            let selectedModel = {
                              doctor: {
                                doctorId: selectedDoctor.doctorId,
                                name: selectedDoctor.name,
                                photo: selectedDoctor.image,
                                speciality: selectedDoctor.speciality,
                              },
                              dispensary: {
                                dispensaryId: dispensary.dispensaryId,
                                dispensaryName: dispensary.name,
                                address: dispensary.address,
                              },
                              onlineDisplayDays: onlineDisplayDays,
                            };
                            storeData("doc_dis_cache", selectedModel);
                            navigation.navigate("SessionScreen");
                          }}
                          
                        />
                      </View>



                    </ListItem.Content>
                  </ListItem>
                ))}

                {/* </ScrollView> */}
              </View>
            </View>
          )}
        </View>
      </View>
      {/* <Footer /> */}
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
