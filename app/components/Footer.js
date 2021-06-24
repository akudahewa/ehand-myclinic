import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';

export default function MyFooter() {
  
    return (
      <Appbar style={styles.bottom}>
        <Text style={{color:'#8b8b8b', fontWeight:"bold"}}>Copyrights @MyClinic</Text>
      </Appbar>
    );
  }


const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#dfdfdf',
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
});