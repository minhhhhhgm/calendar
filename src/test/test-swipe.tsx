import React, { useRef, useState } from 'react';
import { View, Text, PanResponder, StyleSheet } from 'react-native';
import moment from 'moment';

const RenderDays = () => {
    const days = [];
    const [currentDate, setCurrentDate] = useState(moment());
    const [isToday, setIsToday] = useState<boolean>(false);
    const [dayT, setDayT] = useState<string>(moment().format('YYYY-M-D').toString())
    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');  
    let day = startOfMonth.clone().startOf('week');

    // Create PanResponder
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                // Check if the swipe is horizontal
                if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
                    if (gestureState.dx > 0) {
                        console.log('Swiped right');
                    } else {
                        console.log('Swiped left');
                    }
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                // Optional: handle release events
            },
        })
    ).current;

    while (day.isBefore(endOfMonth.clone().endOf('week'))) {
        const dayNum = day.format('D');
        const dayNumPress = day.format('YYYY-M-D');

        days.push(
            <View key={day.format('YYYY-MM-DD')} style={styles.dayContainer}>
                <View
                    style={[
                        day.isSame(moment(), 'day') && day.isSame(moment(), 'month')
                        && styles.selectedDay
                    ]}>

                    <Text
                        style={styles.dayText}
                        onPress={() => {
                            console.log('day', dayNumPress);
                        }}
                    >
                        {dayNum}
                    </Text>
                </View>
            </View>
        );
        day = day.clone().add(1, 'day');
    }

    return (
        <View {...panResponder.panHandlers} style={styles.calendarContainer}>
            {days}
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
    },
    dayContainer: {
      
    },
    selectedDay: {
    },
    dayText: {
        // Style for the day text
    },
});

export default RenderDays;