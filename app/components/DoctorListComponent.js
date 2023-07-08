import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
  ScrollView,
  Picker,
  Dimensions,
  FlatList,
} from "react-native";
import { Avatar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import ListItemSeparator from "../components/ListItemSeparator";
import { SERVER_HOST, SCREEN_CHANNEL } from "../commons/constants";
import {GlobalStyle} from "../style/style";

const DoctorList = (props) => {
  let cityId = 1;
  const [doctors, setDoctors] = useState([]);
  const [dispensaries, setDispensaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = React.useState(new Map());

  return (
    <View style={{ backgroundColor: "white", flex:1 }}>
      <ScrollView>
        <View>
          {props.doctors.map((doctor, i) => (
            <ListItem
              key={'doctor'+i}
              bottomDivider
              onPress={() => {
                props.navi.navigate(SCREEN_CHANNEL, {
                  doctor: { id: doctor.doctorId, name: doctor.name },
                });
              }}
            >
              <Avatar
                rounded
                title={
                  doctor.name.split(" ")[0][0] + doctor.name.split(" ")[1][0]
                }
                size={40}
                source={{
                  uri: `${SERVER_HOST}/images/${doctor.image}`,
                }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                containerStyle={{
                  backgroundColor: "#e3e3de",
                }}
              />
              <ListItem.Content>
                <ListItem.Title style={GlobalStyle.listTitleBold}>{doctor.name}</ListItem.Title>
                <ListItem.Subtitle style={{color:'#50a584'}}>{doctor.speciality}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </ScrollView>
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

export default DoctorList;

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
