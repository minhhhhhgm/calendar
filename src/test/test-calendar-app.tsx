import moment from 'moment';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Timetable from 'react-native-calendar-timetable';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const TIME_COLUMN_WIDTH = 50;
const SMALL_COLUMN_WIDTH = 55;
const SMALL_PERCENT = 0.15;
const LARGE_PERCENT = 0.75;

const INITIAL_EVENTS = [
    {
        title: '予約',
        subtitle: '12:35',
        startDate: moment().set({ hour: 9, minute: 0 }).toDate(),
        endDate: moment().set({ hour: 12, minute: 35 }).toDate(),
        color: '#F5F5F5'
    },
    {
        title: '運転',
        subtitle: '運転評価:A(95点)',
        startDate: moment().set({ hour: 10, minute: 0 }).toDate(),
        endDate: moment().set({ hour: 12, minute: 0 }).toDate(),
        color: '#D9F8F1'
    },
    {
        title: '予約',
        subtitle: '18:00',
        startDate: moment().set({ hour: 13, minute: 30 }).toDate(),
        endDate: moment().set({ hour: 18, minute: 0 }).toDate(),
        color: '#F5F5F5'
    },
    {
        title: '休憩',
        startDate: moment().set({ hour: 14, minute: 30 }).toDate(),
        endDate: moment().set({ hour: 15, minute: 30 }).toDate(),
        color: '#D9F8F1'
    },
    {
        title: '運転',
        startDate: moment().set({ hour: 16, minute: 30 }).toDate(),
        endDate: moment().set({ hour: 17, minute: 30 }).toDate(),
        color: '#D9F8F1'
    },
    {
        title: '予約',
        subtitle: '22:00',
        startDate: moment().set({ hour: 19, minute: 0 }).toDate(),
        endDate: moment().set({ hour: 22, minute: 0 }).toDate(),
        color: '#F5F5F5'
    },
    {
        title: '運転',
        startDate: moment().set({ hour: 19, minute: 0 }).toDate(),
        endDate: moment().set({ hour: 21, minute: 30 }).toDate(),
        color: 'pink'
    },
];



// TIMELINE CALENDAR


const TestCalendarApp = () => {
    const [widthCalendar, setWidthCalendar] = React.useState<number>(0);
    const [items] = React.useState(INITIAL_EVENTS);

    const today = moment().startOf('day').toDate();

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setWidthCalendar(width);
    };

    const calendarWithoutTimeline = widthCalendar - TIME_COLUMN_WIDTH;
    const smallColumnWidth = calendarWithoutTimeline * SMALL_PERCENT;
    const largeColumnWidth = calendarWithoutTimeline * LARGE_PERCENT;

    const styles = useStyles(smallColumnWidth, largeColumnWidth);

    const UIComponent = ({ style, item }: any) => {
        const columnStyle = item.title === "予約" ? styles.smallColumn : styles.largeColumn;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    ...style,
                    ...columnStyle,
                    backgroundColor: item.color,
                    borderRadius: 8,
                    padding: 10,
                    justifyContent: 'space-between'
                }}>
                <Text>{item.title}</Text>
                {item.subtitle && (
                    <Text style={styles.subtitleText}>{item.subtitle}</Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View onLayout={onLayout} style={styles.calendarContainer}>
                    <Timetable
                        scrollViewProps={{ showsHorizontalScrollIndicator: false }}
                        items={items}
                        renderItem={(props) => <UIComponent {...props} />}
                        date={today}
                        fromHour={8}
                        toHour={24}
                        renderHour={(hour) => (
                            <View style={styles.hourContainer}>
                                <Text style={styles.hourText}>{`${hour}:00`}</Text>
                            </View>
                        )}
                        // width={screenWidth-32}
                        columnHorizontalPadding={0}
                        hourHeight={40}
                        hideNowLine
                        style={{
                            contentContainer: styles.contentContainer,
                            lines: styles.lines,
                            
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const useStyles = (smallColumnWidth: number, largeColumnWidth: number) => {
    return StyleSheet.create({
        safeAreaView: {
            backgroundColor: 'gray',
            flex: 1
        },
        calendarContainer: {
            marginTop: 20,
            backgroundColor: 'white',
            borderRadius: 9,
            // marginHorizontal:16
        },
        smallColumn: {
            width: SMALL_COLUMN_WIDTH,
            alignItems: 'center'
        },
        largeColumn: {
            width: largeColumnWidth,
            position: 'absolute',
            left: TIME_COLUMN_WIDTH + SMALL_COLUMN_WIDTH + 10
        },
        contentContainer: {
            marginVertical: 10
        },
        lines: {
            borderColor: '#EDEDED',
            borderLeftWidth: 0,
            borderRightWidth: 0
        },
        hourContainer: {},
        hourText: {
            fontSize: 12,
            color: '#606163'
        },
        subtitleText: {
            textAlign: 'right',
            fontSize: 11
        }
    });
};

export default TestCalendarApp;
