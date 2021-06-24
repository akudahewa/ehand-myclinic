"use strict";

var { StyleSheet } = require("react-native");

export default StyleSheet.create({
  main_screen: { flex: 1 },
  main_topic: {
    fontSize: 22,
    color: "#1d72a3",
    fontWeight: "bold",
    padding: 25,
  },
  container: {
    justifyContent: "flex-start",
  },
  sub_header: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
