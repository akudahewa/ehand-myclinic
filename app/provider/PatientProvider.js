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
      // if(selectedModel.doctorId ==undefined){
      //   console.log("---------doctorId is undefined -----")
      //   console.log("ppppppppp :"+this.state.doctorId)
      // }
      // return {
      //   doctor: {
      //     id: selectedModel.doctorId != undefined ? selectedModel.doctorId : prevState.doctorId,
      //     name: selectedModel.doctorName != undefined ? selectedModel.doctorName : prevState.doctorName,
      //     photo: selectedModel.profile_pic != undefined ? selectedModel.profile_pic :prevState.profile_pic,
      //     speciality: selectedModel.speciality != undefined ? selectedModel.speciality : prevState.speciality,
      //   },
      //   dispensary: {
      //     id: selectedModel.dispensaryId != undefined ? selectedModel.dispensaryId : prevState.dispensaryId,
      //     name: selectedModel.dispensaryName != undefined ? selectedModel.dispensaryName : prevState.dispensaryName,
      //   },
      //   session: {
      //     id: selectedModel.sessionId != undefined ? selectedModel.sessionId : prevState.sessionId,
      //     date: selectedModel.date != undefined ? selectedModel.date :prevState.date,
      //     time: selectedModel.session != undefined ? selectedModel.session : prevState.session,
      //   },
      // };
    });
    // console.log("nnnnnnnnnnnnnnnnnnnn")
    // console.log(this.state);
    // console.log("nnnnnnnnnnnnnnnnnnnnnnn")
  };

  render() {
    return (
      //   <Provider
      //     value={{ name: this.state.name, updatePatient: this.updateContext }}
      //   >
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
