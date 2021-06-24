import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  BackHandler,
  ScrollView,
} from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Icon } from "react-native-elements";
import LoadSpinner from "../components/SpinnerComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ListItemSeparator from "../components/ListItemSeparator";
import { PatientContextConsumer } from "../provider/PatientProvider";
import { closeApp } from "../utils/Utility";
import { showExceptionAlert } from "../utils/Utility";
import {
  API_DISTRICT_URL,
  API_CITY_URL,
  APP_HEADER_TEXT,
  SCREEN_DOC_DISPENSARY,
} from "../commons/constants";
import { getResources } from "../components/ApiClient";
import GlobalStyle from "../style/style";

function CityScreen({ route, navigation }) {
  const district = route.params.district;
  const [cities, setCities] = useState([]);
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

  const toCityArray = (resources) => {
    let tmpCity = [];
    resources.forEach((resource) => {
      tmpCity.push(resource);
    });
    return tmpCity;
  };

  useEffect(() => {
    getResources(`${API_DISTRICT_URL}/${district.id}/${API_CITY_URL}`)
      .then((resources) => {
        setCities(toCityArray(resources));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        showExceptionAlert(navigation);
      })
      .finally(() => {});
  }, []);

  return (
    <PaperProvider theme={theme}>
      <Header name={APP_HEADER_TEXT} />
      <View style={GlobalStyle.main_container}>
        {/* {<RenderStatusBar />} */}
        {isLoading ? (
          <LoadSpinner loading={isLoading} loadingText="Please wait ..." />
        ) : (
          <View style={GlobalStyle.body_container}>
            <View>
              <Text style={GlobalStyle.title}>District : {district.name}</Text>
              <Text style={styles.sub_title}>Select your City</Text>
            </View>

            <ScrollView>
              <View style={GlobalStyle.content_list}>
                <FlatList
                  ItemSeparatorComponent={ListItemSeparator}
                  data={cities}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(SCREEN_DOC_DISPENSARY, {
                          city: { cityId: item.cityId, name: item.name },
                        });
                      }}
                      style={[GlobalStyle.item]}
                    >
                      <Text style={styles.item_text}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.cityId}
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

const styles = StyleSheet.create({
  sub_title: {
    fontSize: 18,
    color: "#1d72a3",
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
  item_text: {
    fontSize: 16,
    color: "#2a3d6f",
  },
});

export default CityScreen;
