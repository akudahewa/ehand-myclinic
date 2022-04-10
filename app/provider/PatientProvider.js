import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class PatientContextProvider extends Component {
  state = {
    district: {
      districtId: "",
      districtName: "",
    },
    city: {
      cityId: "",
      cityName: "",
    },
    doctor: {
      doctorId: "",
      doctorName: "",
      photo: "",
      speciality: "",
    },
    dispensary: {
      dispensaryId: "",
      dispensaryName: "",
    },
    session: {
      sessionId: "",
      date: "",
      time: "",
    },
    onlineDisplayDays: 0,
  };

  updateContext = ({ selectedModel }) => {
    console.log("patient provider :" + JSON.stringify(selectedModel));
    Object.keys(selectedModel).forEach(function eachKey(key) {
      console.log("!!!!!!!! key !!!!!!!! " + key); // alerts key
      console.log("*********** value ****** " + selectedModel[key]); // alerts value
    });
    let tmp = {};
    for (const [key, value] of Object.entries(selectedModel)) {
      console.log(`${key}: ${value}`);
      tmp[key] = value;
    }
    this.setState((prevState) => {
      console.log("..............tmp......");
      console.log(tmp);
      console.log(".............end tmp ..........");
      return tmp;
    });
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          updatePatient: (e) => this.updateContext(e),
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
export { PatientContextProvider, Consumer as PatientContextConsumer };
