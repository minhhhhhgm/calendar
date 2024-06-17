import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Timetable from 'react-native-calendar-timetable';
const { width, height } = Dimensions.get('screen');

interface IData {
    title: string,
    subtitle?: string,
    startDate: Date,
    endDate: Date,
    color: string
}

const TestCalendar = () => {
    const today = moment().startOf('day').toDate();
    const [widthCalendar, setWidthCalendar] = React.useState<number>(0)
    const [items] = React.useState([
        {
            title: '予約',
            subtitle: '12:35',
            startDate: moment(today).set({ hour: 9, minute: 0 }).toDate(),
            endDate: moment(today).set({ hour: 12, minute: 35 }).toDate(),
            color: '#F5F5F5'
        },

        {
            title: '運転',
            subtitle: '運転評価:A(95点)',
            startDate: moment(today).set({ hour: 10, minute: 0 }).toDate(),
            endDate: moment(today).set({ hour: 12, minute: 0 }).toDate(),
            color: '#D9F8F1'
        },
        // {
        //     title: '運転',
        //     subtitle: '運転評価:A(95点)',
        //     startDate: moment(today).set({ hour: 12, minute: 30 }).toDate(),
        //     endDate: moment(today).set({ hour: 14, minute: 0 }).toDate(),
        //     color: '#D9F8F1'
        // },
        {
            title: '予約',
            subtitle: '18:00',
            startDate: moment(today).set({ hour: 13, minute: 30 }).toDate(),
            endDate: moment(today).set({ hour: 18, minute: 0 }).toDate(),
            color: '#F5F5F5'
        },
        {
            title: '休憩',
            startDate: moment(today).set({ hour: 14, minute: 30 }).toDate(),
            endDate: moment(today).set({ hour: 15, minute: 30 }).toDate(),
            color: '#D9F8F1'
        },
        {
            title: '運転',
            startDate: moment(today).set({ hour: 16, minute: 30 }).toDate(),
            endDate: moment(today).set({ hour: 17, minute: 30 }).toDate(),
            color: '#D9F8F1'
        },
        {
            title: '予約',
            subtitle: '22:00',
            startDate: moment(today).set({ hour: 19, minute: 0 }).toDate(),
            endDate: moment(today).set({ hour: 24, minute: 0 }).toDate(),
            color: '#F5F5F5'
        },
        {
            title: '運転',
            startDate: moment(today).set({ hour: 19, minute: 30 }).toDate(),
            endDate: moment(today).set({ hour: 22, minute: 30 }).toDate(),
            color: 'pink'
        },
    ]);

    const TIME_COLUMN_WIDTH = 50;

    const onLayout = (event: any) => {
        const { height, width } = event.nativeEvent.layout;
        setWidthCalendar(width);
    }

    const calendarWithoutTimeline = widthCalendar - TIME_COLUMN_WIDTH
    const smallPercent = 0.15;
    const largePercent = 0.75;
    const smallColumn = calendarWithoutTimeline * smallPercent;
    const largeColumn = calendarWithoutTimeline * largePercent;

    const styles = useStyles(smallColumn, largeColumn);


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
                {item.subtitle && <Text style={{
                    textAlign: 'right',
                    fontSize: 11
                }}>{item.subtitle}</Text>}
            </TouchableOpacity>
        );
    };




    return (
        <SafeAreaView
            style={{
                backgroundColor: 'gray',
                flex: 1
            }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View
                    onLayout={onLayout}
                    style={{
                        marginTop: 20,
                        // marginHorizontal: 16,
                        backgroundColor: 'white',
                        borderRadius: 9,
                    }}>
                    <Timetable
                        // customWidth={150} 
                        // customHeight={50}   
                        scrollViewProps={{
                            showsHorizontalScrollIndicator: false,
                            style: {
                                // backgroundColor:'red',
                                // paddingHorizontal:52,
                                // width : width - 32,
                                // justifyContent:'center'
                            },

                            // scrollEnabled:false,
                            // nestedScrollEnabled:false
                        }}
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

                        // timeWidth={100}
                        columnHorizontalPadding={0}
                        hourHeight={40}
                        // renderHeader={()=>{
                        //     return <Text>Header</Text>
                        // }}
                        // columnWidth={90}
                        hideNowLine
                        // startProperty=''
                        // width={width - 32}
                        style={{
                            contentContainer: styles.contentContainer,
                            lines: styles.lines,
                            timeContainer: {
                                // backgroundColor:'red',
                                // paddingRight: 10
                            }
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const useStyles = (widthSmallColumn?: number, widthLargeColumn?: number) => {
    const styles = StyleSheet.create({
        smallColumn: {
            width: 55,
            alignItems: 'center'
        },
        largeColumn: {
            width: widthLargeColumn,
            position: 'absolute',
            // alignItems :'center',
            left: 55 + 50 + 10
        },
        contentScroll: {},
        container: {
            borderRadius: 16,
        },
        contentContainer: {
            marginVertical: 10,
            // paddingHorizontal: 32
        },
        headerContainer: {

        },
        timeContainer: {},
        time: {
            fontSize: 12,
            color: '#555',
        },
        lines: {
            borderColor: '#EDEDED',
            borderLeftWidth: 0,
            borderRightWidth: 0,
        },
        hourContainer: {
            // backgroundColor: 'red',
            // marginRight : 10
        },
        hourText: {
            fontSize: 12,
            color: '#606163',
        },
    });
    return styles;
}


export default TestCalendar;
