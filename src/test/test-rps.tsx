import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useResponsive } from 'react-native-responsive-hook';
import { width, height, size, fontSize } from "react-native-responsive-sizes";

// Define the TestRps component
const TestRps = () => {
    const { styles } = useStyles(); // Use the hook to get styles
    
    
    return (
        <View style={styles.container}>
            <View style={styles.responsiveBox}>
                <Text style={styles.text}>Responsive Box - Adjusts based on orientation, screen size, and platform.</Text>
            </View>
        </View>
    );
};

// Define the useStyles hook
const useStyles = () => {
    const { isLandscape, isPortrait, wp, hp, vw, vh, rem, rf, isIOS, isAndroid, breakpointGroup } = useResponsive(); // Destructure all properties from useResponsive
    console.log(width(15),wp(15),);
    // Utilize the hook values to create dynamic styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isLandscape ? 'lightblue' : 'gray', // Change background color based on orientation
            alignItems: 'center',
            justifyContent: 'center',
        },
        responsiveBox: {
            borderWidth: 2,
            borderColor: 'orange',
            flexDirection: 'column',
            justifyContent: 'space-around',
            //   width: isPortrait ? wp(85) : wp(50),  // Adjust width based on orientation
            // width: wp(15),
            width: width(15),
            height: hp(17),                       // Adjust height using hp function
            backgroundColor: getBackgroundColorByGroup(breakpointGroup) // Change box color based on breakpoint group
        },
        text: {
            color: 'white',
            fontSize: rem(16), // Use rem for font size
            fontFamily: isIOS ? 'Helvetica' : 'Roboto', // Use different font families for iOS and Android
        }
    });

    return { styles };
};

function getBackgroundColorByGroup(breakpointGroup: string) {
    switch (breakpointGroup) {
        case 'group1': return 'lightgreen';
        case 'group2': return 'lightpink';
        case 'group3': return 'lightyellow';
        case 'group4': return 'lightcoral';
        case 'group5': return 'lightskyblue';
        case 'group6': return 'lightsteelblue';
        default: return 'white';
    }
}

export default TestRps;