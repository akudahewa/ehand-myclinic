import React from "react";
import { StatusBar } from "react-native";

const RenderStatusBar = () => {
  return (
    <StatusBar
      barStyle="light-content"
      // dark-content, light-content and default
      hidden={false}
      //To hide statusBar
      backgroundColor="#24bfd7"
      //Background color of statusBar
      translucent={false}
      //allowing light, but not detailed shapes
      networkActivityIndicatorVisible={true}
    />
  );
};

export default RenderStatusBar;
