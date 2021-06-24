"use strict";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  body_container: {
    margin: 15,
  },
  title: {
    fontSize: 22,
    color: "#1d72a3",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: "center",
  },
  content_list: {
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 10,
    position: "relative",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    padding: 10,
    borderRadius: 5,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
  },
  item_text: {
    fontSize: 16,
    color: "#2a3d6f",
  },
});
