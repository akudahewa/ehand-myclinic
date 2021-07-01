import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    Dimensions,
} from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Header from "../components/Header";
import { Avatar, ListItem, Button, Overlay } from "react-native-elements";
import LoadSpinner from "../components/SpinnerComponent";
import ListItemSeparator from "../components/ListItemSeparator";
import { SERVER_HOST, SCREEN_CHANNEL } from "../commons/constants";
import GlobalStyle from "../style/style";
import { getResources } from "../components/ApiClient";
const windowWidth = Dimensions.get('window').width;

const MyBookings = () => {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: "blue",
            accent: "tomato",
        },
    };

    const deleteBooking = () =>
        Alert.alert(
            "Are you sure you want to do this ?",
            "If you need to delete this booking press 'DELETE'",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: () => console.log("OK Pressed") }
            ]
        );


    const [isLoading, setLoading] = useState(true);
    const [bookingData, setbookingData] = useState([]);
    const [singleBooking, setsingleBooking] = useState({
        pName: "",
        refNumber: "",
        bDate: "",
        btime: "",
        bNumber: "",
        docName:"",
        hospitalName:"",
        phoneNumber:""

    });
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const currentTime = 5;
    const sessionTime = 12;

    // useEffect(() => {
    //     fetch('
    //     http://192.168.1.5:8086/health-service/api/bookings/266798fa-ea18-4c2b-9497-46409e6dc1ef')
    //         .then((response) => response.json())
    //         .then((json) => setbookingData(json))
    //         .catch((error) => console.error(error))
    //         .finally(() => setLoading(false));
    // }, []);
    useEffect(() => {
        getResources("bookings/nalinwijesinghe")
            .then((resources) => {
                console.log("Bookings => GET :" + JSON.stringify(resources));
                setbookingData(resources);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error => Bookings :" + JSON.stringify(error));
                setLoading(false);
                showExceptionAlert(navigation);
                return true;
            })
            .finally(() => { });
    }, [])


    return (
        <PaperProvider theme={theme}>
            <Header name="Manage Bookings" showBackArrow={true} />
            <View style={{ backgroundColor: "white", flex: 1 }}>
                {isLoading ? <LoadSpinner loading={isLoading} loadingText="Please wait .." /> : (
                    <ScrollView>
                        {bookingData.map((bookings, i) => (
                            <TouchableOpacity key={"booking" + i}
                                onPress={() => {
                                    setVisible(!visible);
                                    setsingleBooking({
                                        pName: bookings.patient,
                                        refNumber: bookings.refNumber,
                                        bDate: bookings.bookedDate,
                                        btime: bookings.patientAppoinmentTime,
                                        bNumber: bookings.patientAppointmentNumber,
                                        docName:bookings.doctorScheduleGrid.doctorDispensary.doctor.name,
                                        hospitalName:bookings.doctorScheduleGrid.doctorDispensary.dispensary.name,
                                        phoneNumber:bookings.mobileNo,
                                    })
                                }}
                            >
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={GlobalStyle.listTitle}>{bookings.patient}</ListItem.Title>
                                        <ListItem.Subtitle>
                                            <Text>Ref# - </Text><Text style={{fontWeight:'bold'}}>{bookings.refNumber}   /   </Text>
                                            <Text>Date - </Text><Text style={{fontWeight:'bold'}}>{bookings.bookedDate}</Text>
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem></TouchableOpacity>

                        ))
                        }
                    </ScrollView>
                )}


            </View>
            {/* Overlay component */}
            <Overlay overlayStyle={styles.overlayStyles} isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text style={styles.mainHeading}>Patient Details</Text>
                <View style={styles.singleRow}>
                    <Text style={styles.rowHeading}>Name</Text>
                    <Text style={styles.rowSeparator}>-</Text>
                    <Text style={styles.roeDetail}>{singleBooking.pName}</Text>
                </View>

                

                

                <View style={styles.singleRow}>
                    <Text style={styles.rowHeading}>Phone</Text>
                    <Text style={styles.rowSeparator}>-</Text>
                    <Text style={styles.roeDetail}>{singleBooking.phoneNumber}</Text>
                </View>


                <Text style={styles.mainHeading}>Booking Details</Text>
                <View style={styles.singleRow}>
                    <Text style={styles.rowHeading}>Reference #</Text>
                    <Text style={styles.rowSeparator}>-</Text>
                    <Text style={styles.roeDetail}>{singleBooking.refNumber}</Text>
                </View>

                <View style={styles.singleRow}>
                    <Text style={styles.rowHeading}>Booking #</Text>
                    <Text style={styles.rowSeparator}>-</Text>
                    <Text style={styles.roeDetail}>{singleBooking.bNumber}</Text>
                </View>

                <View style={styles.singleRow}>
                    <Text style={styles.rowHeading}>Date</Text>
                    <Text style={styles.rowSeparator}>-</Text>
                    <Text style={styles.roeDetail}>{singleBooking.bDate}</Text>
                </View>

                <View style={styles.singleRow}>
                    <Text style={styles.rowHeading}>Time</Text>
                    <Text style={styles.rowSeparator}>-</Text>
                    <Text style={styles.roeDetail}>{singleBooking.bDate}</Text>
                </View>

                <View style={styles.singleRow}>
                    <Text style={styles.rowHeading}>Doctor</Text>
                    <Text style={styles.rowSeparator}>-</Text>
                    <Text style={styles.roeDetail}>{singleBooking.docName}</Text>
                </View>
                <View style={styles.singleRow}>
                    <Text style={styles.rowHeading}>Hospital</Text>
                    <Text style={styles.rowSeparator}>-</Text>
                    <Text style={styles.roeDetail}>{singleBooking.hospitalName}</Text>
                </View>

                <View style={[styles.singleRow], [styles.alignSelf]}>
                    <Button
                        title="Delete"
                        type="outline"
                        titleStyle={{ color: '#f43838', fontSize: 14, }}
                        buttonStyle={{ borderColor: '#f43838' }}
                        onPress={deleteBooking}
                        disabled={(sessionTime - currentTime) > 0 ? true : false}
                    />
                </View>

            </Overlay>
            {/* Overlay component end */}
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    overlayStyles: {
        width: windowWidth - 50
    },
    singleRow: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 8
    },
    mainHeading:{
        backgroundColor:'#4573a2',
        padding:10,
        color:'#fff',
        fontWeight:'bold',
        borderRadius:4,
        marginVertical:5
    },
    rowHeading: {
        minWidth: 80,
        fontWeight: 'bold',
        color: "#4573a2"
    },
    rowSeparator: {
        marginHorizontal: 10,
        color: "#4573a2",
        fontWeight: "bold"
    },
    roeDetail: {
        color: '#4573a2',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    alignSelf: {
        alignSelf: 'center',
        marginVertical:10,
        width:100
    }
});

export default MyBookings;

