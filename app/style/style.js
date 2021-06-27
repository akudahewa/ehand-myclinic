"use strict";
import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#fff'
  },
  body_container: {
    //margin: 15,
  },
  title: {
    fontSize: 18,
    color: "#1d72a3",
    padding:10,
    backgroundColor:'#f3f0f0',
    marginVertical:15,
    borderRadius:5,
    textAlign:'center'
  },
  content_list: {
    //justifyContent: "center",
    backgroundColor: "white",
    //position: "relative",
    marginTop: 5,
    marginBottom: 5,
    //padding: 10,
    //borderRadius: 5,
    width:windowWidth-20
    
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  item_text: {
    fontSize: 16,
    color: "#2a3d6f",
    textTransform:'capitalize',
    marginLeft:15
  },
  listTitle:{
    color:'#4573a2'
  },
  listTitleBold:{
    fontWeight:'bold',
    color:'#4573a2'
  }
});
