import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { Icon, Header } from "react-native-elements";
import RenderStatusBar from "./StatusBarComponent";

function getSelected(index) {
  alert(index);
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

// const RenderStatusBar = () => {
//   return (
//     <StatusBar
//       barStyle="light-content"
//       // dark-content, light-content and default
//       hidden={false}
//       //To hide statusBar
//       backgroundColor="#24bfd7"
//       //Background color of statusBar
//       translucent={false}
//       //allowing light, but not detailed shapes
//       networkActivityIndicatorVisible={true}
//     />
//   );
// };

const DoctorComponent = ({ navigation }) => {
  const [drList, setDrList] = useState([]);
  const [isDrLoading, setIsDrLoading] = useState(true);
  const [DisList, setDisList] = useState([]);
  const [isDisLoading, setIsDisLoading] = useState(true);
  const [doc, setDoc] = useState("");
  const [dis, setDis] = useState("");
  useEffect(() => {
    fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((json) => {
        let tmp = [];
        json.movies.map(function (m) {
          let j = { label: m.title, value: m.id };
          tmp.push(j);
        });
        setDrList(tmp);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsDrLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((json) => {
        let tmp = [];
        json.movies.map(function (m) {
          let j = { label: m.title, value: m.id };
          tmp.push(j);
        });
        setDisList(tmp);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsDisLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={{ flex: 1 }}>
        {/* <StatusBar
          barStyle="default"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor="#24bfd7"
          //Background color of statusBar
          translucent={false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        /> */}
        {/* <RenderStatusBar /> */}
        {/* <StatusBar /> */}
        {<RenderStatusBar />}
        <Header
          leftComponent={() => renderLogo()}
          centerComponent={
            {
              // text: "MY TITLE111",
              //style: { color: "yellow" },
            }
          }
          rightComponent={() => renderMyBookings()}
          containerStyle={{ backgroundColor: "#1d72a3", height: 50 }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Channel your family practice</Text>
        <View elevation={5} style={styles.search_box}>
          {isDrLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="user-md"
                type="font-awesome"
                color="black"
                containerStyle={{
                  width: 25,
                  borderBottomWidth: 1,
                  paddingTop: 0,
                }}
              />
              <Dropdown
                //  label='Doctor'
                data={drList}
                baseColor="#5C8CEB"
                textColor="black"
                itemColor="#5C8CEB"
                itemPadding={4}
                value="Any Doctor"
                overlayStyle={{ color: "red" }}
                // dropdownMargins={{min:3,max:15}}
                dropdownOffset={{ top: 5, left: 0 }}
                containerStyle={{
                  width: 250,
                  borderBottomWidth: 1,
                  paddingTop: 0,
                  paddingLeft: 10,
                }}
                inputContainerStyle={{ borderBottomColor: "transparent" }}
                onChangeText={(index) => setDoc(index)}
              />
            </View>
          )}
          {isDrLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="hospital-o"
                type="font-awesome"
                color="black"
                containerStyle={{
                  width: 25,
                  borderBottomWidth: 1,
                  paddingTop: 10,
                }}
              />
              <Dropdown
                //  label='Doctor'
                data={DisList}
                baseColor="#5C8CEB"
                textColor="black"
                itemColor="#5C8CEB"
                itemPadding={4}
                value="Any Dispensary"
                // dropdownMargins={{min:3,max:15}}
                dropdownOffset={{ top: 5, left: 0 }}
                containerStyle={{
                  width: 250,
                  borderBottomWidth: 1,
                  paddingTop: 10,
                  paddingLeft: 10,
                }}
                inputContainerStyle={{ borderBottomColor: "transparent" }}
                onChangeText={(value) => setDis(value)}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.search_tap}
            onPress={() => {
              doc === "" && dis === ""
                ? Alert.alert(
                    "Error !!",
                    "You must select atleast option to seach doctor",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") },
                    ],
                    { cancelable: false }
                  )
                : navigation.navigate("ChannelScreen", {
                    doctor: doc,
                    dis: dis,
                  });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="search" type="material" color="white" />
              <Text style={styles.search_tap_text}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 7,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  search_tap: {
    height: 40,
    width: 200,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d72a3",
    borderRadius: 3,
  },
  search_tap_text: {
    fontSize: 16,
    color: "white",
  },
  heading: {
    fontSize: 22,
    color: "#1d72a3",
    fontWeight: "bold",
    padding: 15,
  },
  search_box: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default DoctorComponent;
