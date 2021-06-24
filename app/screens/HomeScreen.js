import React, { useState, useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import DistrictScreen from "./DistrictScreen";

function splashTimeOut() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("result");
    }, 3000)
  );
}

/** main screen of the application */
function HomeScreen({ navigation }) {
  const [isSplashImgDisplay, setIsSplashImgDisplay] = useState(true);
  console.log("MyClinic application is loading ");

  useEffect(() => {
    async function performTimeConsumingTask() {
      let data = await splashTimeOut();
      console.log(
        "Spash Image fadeout and loading home screen " + isSplashImgDisplay
      );
      setIsSplashImgDisplay(false);
    }
    performTimeConsumingTask();
  }, []);

  if (isSplashImgDisplay == true) {
    return <WelcomeScreen />;
  } else {
    return <DistrictScreen navigation={navigation} />;
  }
}

export default HomeScreen;
