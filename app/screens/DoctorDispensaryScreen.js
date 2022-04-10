import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
} from "react-native-paper";
import { Icon } from "react-native-elements";
import LoadSpinner from "../components/SpinnerComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TabView, TabBar } from "react-native-tab-view";
import DoctorList from "../components/DoctorListComponent";
import DispensaryList from "../components/DispensaryListComponent";
import GlobalStyle from "../style/style";
import { showExceptionAlert } from "../utils/Utility";
import {
  APP_HEADER_TEXT,
  API_DOCTOR_DISPENSARY_URL,
  LOADING_TEXT,
} from "../commons/constants";
import { getResources } from "../components/ApiClient";

function DoctorDispensaryScreen({ route, navigation }) {
  const cityId = route.params.city.cityId;
  const [doctors, setDoctors] = useState([]);
  const [dispensaries, setDispensaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = React.useState(0);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "blue",
      accent: "tomato",
    },
  };

  const [routes] = React.useState([
    { key: "doctor", title: "Find By Doctor" },
    { key: "dispensary", title: "Find By Clinic" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "doctor":
        return <DoctorList doctors={doctors} navi={navigation} />;
      case "dispensary":
        return <DispensaryList dispensaries={dispensaries} navi={navigation} />;
      default:
        return null;
    }
  };

  const pushToDoctor = (tmpArray, resource) => {
    let doctorExsist = tmpArray.filter(
      (doctor) => doctor.doctorId === resource.doctor.doctorId
    );
    return doctorExsist;
  };

  const pushToDispensary = (tmpDispensaries, resource) => {
    let dispensaryExsist = tmpDispensaries.filter(
      (dispensary) =>
        dispensary.dispensaryId === resource.dispensary.dispensaryId
    );
    return dispensaryExsist;
  };

  useEffect(() => {
    console.log("DoctorDispensaryScreen : useEffect -> fetch API records");
    getResources(`${API_DOCTOR_DISPENSARY_URL}/${cityId}`)
      .then((resources) => {
        console.log(
          "DoctorDispensaryScreen => GET :" + JSON.stringify(resources)
        );
        let tmpDoctor = [];
        let tmpDispensaries = [];

        resources.forEach((resource) => {
          if (pushToDoctor(tmpDoctor, resource) == 0) {
            tmpDoctor.push(resource.doctor);
          }
          if (pushToDispensary(tmpDispensaries, resource) == 0) {
            tmpDispensaries.push(resource.dispensary);
          }
        });
        setDoctors(tmpDoctor);
        setDispensaries(tmpDispensaries);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(
          "Error => GET DoctorDispensaries :" + JSON.stringify(error)
        );
        setIsLoading(false);
        showExceptionAlert(navigation);
        return true;
      })
      .finally(() => {});
  }, []);

  return (
    <PaperProvider theme={theme}>
      <Header showBackArrow name={APP_HEADER_TEXT} />
      <View style={styles.main_container}>
        {/* {<RenderStatusBar />} */}
        {isLoading ? (
          <LoadSpinner loading={isLoading} loadingText={LOADING_TEXT} />
        ) : (
          <View style={styles.content_container}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{
                width: Dimensions.get("window").width,
              }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  style={{ backgroundColor: "#e6e6e6" }}
                  indicatorStyle={{
                    backgroundColor: "#43b366",
                    position: "absolute",
                    top: 0,
                    height: 50,
                  }}
                  activeColor="#fff"
                  inactiveColor="#8b8a8a"
                />
              )}
            />
          </View>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    //paddingTop: 5,
  },
  heading: {
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    textAlign: "center",
    color: "#34495e",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 30,
  },
  underline: {
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "green",
  },
  contents: {
    flex: 1,
    width: "100%",
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  redContents: {
    backgroundColor: "red",
  },
  blueContents: {
    backgroundColor: "blue",
    color: "white",
  },
  contentsText: {
    color: "white",
    fontSize: 50,
    textAlign: "center",
  },

  content_container: {
    flex: 1,
    marginLeft: 1,
    marginRight: 1,
    // backgroundColor: "yellow",
    // flexDirection: "column",
    // margin: 5,
  },
  command: {
    fontSize: 22,
    color: "#1d72a3",
    fontWeight: "bold",
    padding: 25,
    textAlign: "center",
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 10,
    position: "relative",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    padding: 15,
    borderRadius: 5,
  },
  dropdown_picker: {
    width: 200,
    height: 50,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
    borderBottomColor: "#2a3d6f",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    color: "#2a3d6f",
    //fontWeight: "bold",
  },
  doctor_display_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2a3d6f",
    marginLeft: 15,
  },

  full_screen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  search_box: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 20,
    elevation: 4,
  },
  manu_context: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  manu_context1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },

  screen_header: {
    flex: 1,
  },

  search_tap: {
    height: 50,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d72a3",
    borderRadius: 6,
  },
  search_tap_text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default DoctorDispensaryScreen;
