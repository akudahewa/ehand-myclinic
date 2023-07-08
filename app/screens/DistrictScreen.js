import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler,
  ScrollView,
} from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import RenderStatusBar from "../components/StatusBarComponent";
import LoadSpinner from "../components/SpinnerComponent";
import { Icon } from "react-native-elements";
import { CommonActions, useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ListItemSeparator from "../components/ListItemSeparator";
import { PatientContextConsumer } from "../provider/PatientProvider";
import { getResources } from "../components/ApiClient";
import { showExceptionAlert, closeApp } from "../commons/index";
import {
  API_DISTRICT_URL,
  APP_HEADER_TEXT,
  LOADING_TEXT,
  SELECT_DISTRICT,
  SCREEN_CITY,
} from "../commons/constants";
import {GlobalStyle} from "../style/style";
import CityScreen from "./CityScreen";

function DistrictScreen({ navigation }) {
  console.log("DistrictScreen : component loading ");
  const [district, setDistrict] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = React.useState(new Map());

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "blue",
      accent: "tomato",
    },
  };

  /** call rest api to fetch all the distrcits.
   * target only to SL
   */
  React.useEffect(() => {
    console.log("DistrictScreen : useEffect -> fetch API records");
    getResources(API_DISTRICT_URL)
      .then((resources) => {
        console.log("DistrictScreen => GET :" + JSON.stringify(resources));
        setDistrict(resources);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error => GET districts :" + JSON.stringify(error));
        setIsLoading(false);
        showExceptionAlert(navigation);
        return true;
      })
      .finally(() => { });
  }, []);

  useEffect(() => {
    const backAction = () => {
      closeApp(navigation);
      setTimeout(function () {
        BackHandler.exitApp();
      }, 500);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <Header name={APP_HEADER_TEXT} />
      <View style={GlobalStyle.main_container}>
        {<RenderStatusBar />}
        {isLoading ? (
          <LoadSpinner loading={isLoading} loadingText={LOADING_TEXT} />
        ) : (
          <View style={GlobalStyle.body_container}>
            <Text style={GlobalStyle.title}>{SELECT_DISTRICT}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={GlobalStyle.content_list}>
                <FlatList
                  ItemSeparatorComponent={ListItemSeparator}
                  data={district}
                  renderItem={({ item }) => (
                    <PatientContextConsumer>
                      {(context) => (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate(SCREEN_CITY, {
                              district: { id: item.id, name: item.name },
                            });
                          }}
                          style={[GlobalStyle.item]}
                        >
                          <Icon
                            name='location'
                            type='evilicon'
                            color='#4573a2'
                            size={20} />
                          <Text style={GlobalStyle.item_text}>{item.name}</Text>
                        </TouchableOpacity>
                      )}
                    </PatientContextConsumer>
                  )}
                  keyExtractor={(item) => 'distric'+item.id}
                  extraData={selected}
                />
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </PaperProvider>
  );
}

export default DistrictScreen;
