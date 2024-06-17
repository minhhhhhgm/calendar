import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import moment from 'moment';
import 'moment/locale/ja';

moment.locale('ja');

interface IProps {
    onClose: () => void
}


// CALENDAR FULL MONTH

const TestTopCalendar = (props: IProps) => {
    const { onClose } = props
    const [currentDate, setCurrentDate] = useState(moment());
    const [isToday, setIsToday] = useState<boolean>(false);
    const [dayT, setDayT] = useState<string>(moment().format('YYYY-M-D').toString())
    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, 'month'));
    };

    const renderDayNames = () => {
        const dayNames = [];
        const startOfWeek = moment().startOf('week');
        for (let i = 0; i < 7; i++) {
            dayNames.push(
                <View key={i} style={styles.dayNameContainer}>
                    <Text style={styles.dayNameText}>{startOfWeek.clone().add(i, 'days').format('dd')}</Text>
                </View>
            );
        }
        return dayNames;
    };

    const renderDays = () => {
        const days = [];
        let day = startOfMonth.clone().startOf('week');

        while (day.isBefore(endOfMonth.clone().endOf('week'))) {
            const dayNum = day.format('D')
            const dayNumPress = day.format('YYYY-M-D')
            let textSelect =
                day.isSame(moment(), 'day')
                && day.isSame(moment(), 'month')
            let isSelect = dayNumPress.toString() === dayT;
            days.push(
                <View key={day.format('YYYY-MM-DD')} style={styles.dayContainer}>
                    <View
                        style={[
                            isSelect && styles.selectedDay, { backgroundColor: isSelect ? isToday ? '#16AB89' : '#D9F8F1' : 'white' }]}>
                        <Text
                            style={[styles.dayText, { color: textSelect || isSelect ? !isToday ? '#16AB89' : 'white' : '#000000' }]}
                            onPress={() => {
                                if (dayNumPress.toString() === moment().format('YYYY-M-D').toString()) {
                                    setIsToday(true)
                                } else {
                                    setIsToday(false)
                                }
                                setDayT(dayNumPress.toString())
                                console.log('day-press', dayNumPress);
                            }}>
                            {dayNum}
                        </Text>
                    </View>
                </View>
            );
            day = day.clone().add(1, 'day');
        }
        return days;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <TouchableOpacity onPress={handlePrevMonth}>
                    <Text style={styles.arrow}>{"<"}</Text>
                </TouchableOpacity> */}
                <View style={{
                    flexDirection: 'row',

                }}>
                    <Text onPress={onClose} style={styles.monthText}>{currentDate.format('YYYY MMMM')}</Text>
                    <TouchableOpacity onPress={handleNextMonth}>
                        <Text style={styles.arrow}>{">"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        // backgroundColor: '#16AB89',

                    }}>
                        <Text
                            onPress={handlePrevMonth}
                            style={{
                                fontSize: 20,
                                color: '#16AB89',
                            }}>{"<"}</Text>

                    </View>
                    <TouchableOpacity onPress={handleNextMonth}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#16AB89',
                                marginLeft: 15
                            }}>{">"}</Text>

                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.dayNamesContainer}>
                {renderDayNames()}
            </View>
            <View style={styles.daysContainer}>
                {renderDays()}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 30,
        flex: 1,

        // marginHorizontal: 50,
        // marginTop: 100,
        borderRadius: 8,
        backgroundColor: 'white'

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,

    },
    monthText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 20,
        color: '#16AB89',
        marginLeft: 10
    },
    dayNamesContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    dayNameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: `${100 / 7}%`,

    },
    dayNameText: {
        fontSize: 16,
        color: '#3C3C434D'
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: `${100 / 7}%`,
        height: 50,
        // padding:10,
        // margin:10,
        // marginVertical:10,
        // borderRadius:30,
        // backgroundColor: 'red'
    },
    dayText: {
        fontSize: 16,
        color: '#000',

        backgroundColor: 'transparent'
    },
    selectedDay: {
        backgroundColor: '#D9F8F1',
        // borderWidth:1,
        borderRadius: 30,
        // opacity: 0.1,
        padding: 5,
        // width: `${100 / 7}%`, // 7 columns
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // margin:10,
        color: '#ffffff',
    },
});

export default TestTopCalendar;
