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
import { ListItem, Icon } from "react-native-elements";
import ListItemSeparator from "../components/ListItemSeparator";
import { PatientContextConsumer } from "../provider/PatientProvider";

import {
  APP_HEADER_TEXT,
  API_DOCTOR_DISPENSARY_URL,
} from "../commons/constants";
import { getResources } from "../components/ApiClient";

const DispensaryList = (props) => {
  let cityId = 1;
  const [dispensaries, setDispensaries] = useState([]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View>
          {props.dispensaries.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => {
                console.log("Works!");
                let selected = {
                  dispensary: {
                    dispensaryId: l.dispensaryId,
                    dispensaryName: l.name,
                  },
                };
                props.navi.navigate("ChannelScreen", {
                  dispensary: { id: l.dispensaryId, name: l.name },
                });
              }}
            >
              <Icon name="location" type="evilicon" color="#4573a2" size={30} />
              <ListItem.Content>
                <ListItem.Title>
                  <Text>{l.name}</Text>
                </ListItem.Title>
                <ListItem.Subtitle>{l.address}</ListItem.Subtitle>
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

export default DispensaryList;
