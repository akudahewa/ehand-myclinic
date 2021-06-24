import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  BackHandler,
  ScrollView,
  Picker,
  Dimensions,
  FlatList,
} from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
} from "react-native-paper";
import { Avatar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import ListItemSeparator from "../components/ListItemSeparator";
import { PatientContextConsumer } from "../provider/PatientProvider";

import {
  APP_HEADER_TEXT,
  API_DOCTOR_DISPENSARY_URL,
} from "../commons/constants";
import { getResources } from "../components/ApiClient";

const DispensaryList = (props) => {
  let cityId = 1;
  const [doctors, setDoctors] = useState([]);
  const [dispensaries, setDispensaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = React.useState(new Map());

  //   useEffect(() => {
  //     getResources(`${API_DOCTOR_DISPENSARY_URL}/${cityId}`)
  //       .then((resources) => {
  //         console.log(JSON.stringify(resources));
  //         let tmpDoctor = [];
  //         let tmpDispensaries = [];

  //         resources.forEach((resource) => {
  //           tmpDoctor.push(resource.doctor);
  //           tmpDispensaries.push(resource.dispensary);
  //         });
  //         console.log(JSON.stringify(">>>>>>>>>>" + JSON.stringify(tmpDoctor)));
  //         setDoctors(tmpDoctor);
  //         setDispensaries(tmpDispensaries);
  //       })
  //       .catch((error) => {
  //         showExceptionAlert(navigation);
  //         return true;
  //       })
  //       .finally(() => {
  //         console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
  //         console.log(JSON.stringify(doctors));
  //         setIsLoading(false);
  //       });
  //   }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View>
          {props.dispensaries.map((l, i) => (
            <PatientContextConsumer>
              {(context) => (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => {
                    alert("doctor click");
                    console.log("Works!");
                    let selected = {
                      dispensary: {
                        dispensaryId: l.dispensaryId,
                        dispensaryName: l.name,
                      },
                    };
                    context.updatePatient({ selected }),
                      props.navi.navigate("ChannelScreen", {
                        dispensary: { id: l.dispensaryId, name: l.name },
                        // dispensary: {
                        //   id: selectedDispensary,
                        //   name: "dispensary",
                        // },
                      });
                  }}
                >
                  <Avatar
                    size="small"
                    rounded
                    title="MT"
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.address}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )}
            </PatientContextConsumer>
          ))}
        </View>
      </ScrollView>

      {/* <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data={doctors}
        renderItem={({ item }) => (
          <PatientContextConsumer>
            {(context) => (
              <TouchableOpacity
                onPress={() => {
                  // let selectedModel = {
                  //   city: {
                  //     cityId: item.cityId,
                  //     cityName: item.name,
                  //   },
                  // };
                  // console.log(JSON.stringify(selectedModel));
                  // context.updatePatient({ selectedModel }),
                  //   navigation.navigate("DoctorDispensaryScreen", {
                  //     district: { id: "1", name: "districtId" },
                  //   });
                }}
                style={[styles.item]}
              >
                <Text style={styles.title}>{item.name}</Text>
              </TouchableOpacity>
            )}
          </PatientContextConsumer>
        )}
        keyExtractor={(item) => item.doctorId}
        extraData={selected}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
    borderBottomColor: "#2a3d6f",
    borderBottomWidth: 1,
  },
});

export default DispensaryList;

// const doctorList = () => {
//   let cityId = 1;
//   // const patient = useContext(PatientContextConsumer);
//   const [doctors, setDoctors] = useState([]);
//   const [dispensaries, setDispensaries] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selected, setSelected] = React.useState(new Map());

//   useEffect(() => {
//     getResources(`${API_DOCTOR_DISPENSARY_URL}/${cityId}`)
//       .then((resources) => {
//         console.log(JSON.stringify(resources));
//         let tmpDoctor = [];
//         let tmpDispensaries = [];

//         resources.forEach((resource) => {
//           tmpDoctor.push(resource.doctor);
//           tmpDispensaries.push(resource.dispensary);
//         });
//         console.log(JSON.stringify(">>>>>>>>>>" + JSON.stringify(tmpDoctor)));
//         setDoctors(tmpDoctor);
//         setDispensaries(tmpDispensaries);
//       })
//       .catch((error) => {
//         showExceptionAlert(navigation);
//         return true;
//       })
//       .finally(() => {
//         console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
//         console.log(JSON.stringify(doctors));
//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
// <FlatList
//   ItemSeparatorComponent={ListItemSeparator}
//   data={cities}
//   renderItem={({ item }) => (
//     <PatientContextConsumer>
//       {(context) => (
//         <TouchableOpacity
//           onPress={() => {
//             // let selectedModel = {
//             //   city: {
//             //     cityId: item.cityId,
//             //     cityName: item.name,
//             //   },
//             // };
//             // console.log(JSON.stringify(selectedModel));
//             // context.updatePatient({ selectedModel }),
//             //   navigation.navigate("DoctorDispensaryScreen", {
//             //     district: { id: "1", name: "districtId" },
//             //   });
//           }}
//           style={[styles.item]}
//         >
//           <Text style={styles.title}>{item.name}</Text>
//         </TouchableOpacity>
//       )}
//     </PatientContextConsumer>
//   )}
//   keyExtractor={(item) => item.cityId}
//   extraData={selected}
// />
//   );
// };
