import React, { Component, useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
} from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown-v2";
import CountDown from "react-native-countdown-component";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import {
//   TextField,
//   FilledTextField,
//   OutlinedTextField,
// } from "react-native-material-textfield";
import { Icon, Avatar } from "react-native-elements";
import { Button } from "react-native";
import AppHeader from "../components/HeaderComponent";
import DefaultStyle from "../styles/DefaultStyle";
import LoadSpinner from "../components/SpinnerComponent";
import ContentTitle from "../components/ContentTitle";
import UserProfile from "../components/UserProfile";
import UserForm from "../components/PatientBookingForm";

class SaveBookingScreen extends Component {
  //   state = {
  //     keyboardState: true
  // }

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      data: [],
      doctor: "",
      dispensary: "",
      isLoading: true,
      showPatientForm: true,
      postLoading: false,
      error: "",
      patientTitle: "Mr",
      doctor: this.props.doctor,
      session: this.props.session,
      navigation: this.props.navigation,
      dispensary: this.props.dispensary,
      name: "",
      contactno: "",
      keyboardState: true,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onSubmitContactNo = this.onSubmitContactNo.bind(this);
    this.nameRef = this.updateRef.bind(this, "name");
    this.contactnoRef = this.updateRef.bind(this, "contactno");
  }
  onFocus() {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({ errors });
  }
  onChangeText(text) {
    ["contactno", "name"]
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          console.log("______________" + text.concat("AA"));
          this.setState({ [name]: text.concat("AA") });
        }
      });
  }
  onSubmitName() {
    this.name.focus();
  }

  onSubmitContactNo() {
    this.contactno.focus();
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    // console.log("ddd :" + this.props.navigation.getParam("doctor"));
    // const { doctor } = this.props.navigation.getParam("doctor");
    // this.setState({ doctor: this.props.navigation.params.doctor });
    console.log("kkkk " + this.state.doctor.name);

    // this.setState({ dispensary: this.props.navigation.state.params.dis });
    fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.movies });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      keyboardState: false,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      keyboardState: true,
    });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  onEdit = () => {
    // alert("dddd");
    this.state.showPatientForm = true;
    this.state.postLoading = false;
    // this.renderPatientForm();
    // alert(this.state.showPatientForm + ":::" + this.state.postLoading);
  };

  onSubmit = () => {
    const movies = {};
    this.state.postLoading = true;
    console.log("click submit button " + this.state.patientTitle);
    let errors = {};
    var phoneno = /^\d{10}$/;
    let patient = {};
    ["contactno", "name"].forEach((name) => {
      let value = this[name].value();
      console.log(name);
      patient[name] = value;
      console.log(name + " - " + this[name].value());
      console.log(value + "mmm :" + value.match(phoneno));
      if (!value) {
        errors[name] = "Should not be empty";
      } else {
        if ("name" === name && value.length < 5) {
          errors[name] = "name too short";
        }
        if ("contactno" === name && value.length < 2) {
          errors[name] = "Not a valid phone number";
        }
      }
    });
    console.log("======errors======" + Object.keys(errors).length);
    if (Object.keys(errors).length == 0) {
      console.log("No errors" + patient);
      this.state.navigation.navigate("BookingConfirmScreen", {
        doctor: this.state.doctor,
        dispensary: this.state.dispensary,
        session: this.state.session,
        patientInfo: patient,
      });
    }

    this.setState({ errors });
  };

  updateRef(name, ref) {
    this[name] = ref;
  }

  formatText = (text) => {
    return text.replace(/[^+\d]/g, "");
  };

  textStyle = () => {
    alert(this.value.val.trim() == "Enter name here");
    if (this.value.val.trim() == "Enter name here") {
      return {
        height: 40,
        borderColor: "red",
        borderWidth: 1,
      };
    } else {
      return {
        height: 40,
        borderColor: "blue",
        borderWidth: 4,
      };
    }
  };

  setPatientTitle = (value) => {
    this.setState({ patientTitle: value });
  };

  renderPatientForm = () => {
    let { errors = {} } = this.state;

    return (
      <View>
        <Dropdown
          // label='Any Dispensary'
          data={[
            { value: "Mr" },
            { value: "Miss" },
            { value: "Mrs" },
            { value: "Master" },
          ]}
          baseColor="#1d72a3"
          //textColor="green"
          //itemColor="blue"
          itemPadding={4}
          value="Mr"
          // dropdownMargins={{min:3,max:15}}
          dropdownOffset={{ top: 5, left: 0 }}
          containerStyle={{
            width: 100,
            borderWidth: 0,
            paddingTop: 0,
            margin: 5,
          }}
          inputContainerStyle={{ borderBottomColor: "#1d72a3" }}
          onChangeText={(value) => this.setPatientTitle(value)}
        />
        {/* <TextField
          ref={this.nameRef}
          placeholder="Enter Patient name "
          value={this.state.name}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitName}
          returnKeyType="next"
          label="PatientName"
          error={errors.name}
        />
        <TextField
          ref={this.contactnoRef}
          placeholder="Enter contact number"
          value="0762199100"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitContactNo}
          returnKeyType="next"
          label="Contact No"
          error={errors.contactno}
        /> */}
        <Text>{this.state.name}</Text>
      </View>
    );
  };

  render() {
    let {
      data,
      doctor,
      dispensary,
      isLoading,
      postLoading,
      showPatientForm,
      navi,
      errors = {},
      keyboardState,
    } = this.state;

    return (
      <PaperProvider>
        <Header name="Booking" showBackArrow={true} />
        <View style={styles.main_screen}>
          <View style={styles.container}>
            {isLoading ? (
              <LoadSpinner loading={isLoading} loadingText="Loading" />
            ) : (
              <View style={{ flex: 1 }}>
                {keyboardState ? (
                  <>
                    <ContentTitle titleText={this.state.dispensary.name} />
                    <UserProfile user={this.state.doctor} />
                    <View>
                      <Text>Special notes:</Text>
                      <Text> Extra appoinmnets not given by the doctor</Text>
                    </View>

                    <View style={styles.sessions_header_bar}>
                      <Text style={styles.session_header}>SESSION</Text>
                    </View>
                    <View style={styles.seesion_list}>
                      <View style={styles.same_row}>
                        <Text style={styles.session_data}>
                          {this.state.session.date} {"\n"}
                          {this.state.session.time}
                        </Text>
                        <Text style={styles.appoinment_box}>
                          Active {"\n"}Appoinment {"\n"} 10
                        </Text>
                        {/* <Text>Time remain {"\n"} 5:00 min</Text> */}
                        <View style={styles.countdown_box}>
                          <CountDown
                            until={330}
                            size={15}
                            onFinish={() => {
                              //this.state.navi.navigate("LoadHomeScreen");
                            }}
                            digitStyle={{ backgroundColor: "red" }}
                            digitTxtStyle={{ color: "white" }}
                            timeToShow={["M", "S"]}
                            timeLabels={{ m: "MM", s: "SS" }}
                          />
                        </View>
                      </View>
                    </View>
                  </>
                ) : null}

                <View style={styles.doc_profile}>
                  <UserForm />
                  {/* {this.renderPatientForm()} */}
                  <TouchableOpacity
                    style={styles.channel}
                    onPress={() => {
                      this.onSubmit();
                      // navi.navigate("ConfirmComponent");
                    }}
                  >
                    <Text style={styles.channel_text}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
        <Footer />
      </PaperProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  main_screen: {
    flex: 1,
  },
  sub_header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3f6fc",
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 5,
  },
  doc_profile: {
    // margin: 10,
    padding: 20,
    backgroundColor: "white",
    flex: 1,
    // width: 335,
    // padding: 5,
  },
  dis_header: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  image_container: {
    padding: 20,
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
  },
  doc_name: {
    color: "#23b248",
    fontSize: 16,
    fontWeight: "bold",
  },
  sessions_header_bar: {
    marginTop: 10,
    backgroundColor: "white",
  },
  session_header: {
    padding: 10,
  },
  seesion_list: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, alignItems: "center", justifyContent: "center" },
  row: { height: 70, backgroundColor: "white" },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header_text: {
    margin: 25,
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  channel: {
    height: 40,

    margin: 5,
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
    padding: 5,
  },
  session_data: {
    flex: 1,
  },
  appoinment_box: {
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
  countdown_box: {
    flex: 1,
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
    flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default SaveBookingScreen;

{
  /* <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
            {isLoading ? <ActivityIndicator/>:(

                <Dropdown  
                 label='dispensary'
                data={doc}
                containerStyle={{ width: 150 }}
                onChangeText={(value)=>this.getSelected(null,value)}
              />
              
                )}
          
            )}
            <Button
  onPress={()=>this.props.navigation.navigate('DoctorInfo',{doctor:"Chinthaka Senavi"})}
  title="Search"
  color="#841584"
/>
        </View> */
}
