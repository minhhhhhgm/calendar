import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, FlatList, ScrollView, TextInput } from 'react-native';
import moment from 'moment';
import 'moment/locale/ja';
import TestTopCalendar from './test-top-calendar';
import Swipeable from 'react-native-gesture-handler/Swipeable';


moment.locale('ja');

const TestTopCalendar2 = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [isToday, setIsToday] = useState<boolean>(false);
    const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [dayT, setDayT] = useState<string>(moment().format('YYYY-M-D').toString())
    const startOfMonth = currentDate.clone().startOf('week');
    const endOfMonth = currentDate.clone().endOf('week');
    const newRef = useRef<Text>(null);
    const swipeRef = React.useRef<Swipeable>(null)
    const day = moment().set({ year: 2024,
        month: 5,
        date: 30,
        hour: 10,
        minute: 0}).toDate();

    console.log('day',moment(day).format('YYYY - MM - DD / HH/mm/ss'));
    

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'week'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, 'week'));
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

    const renderTest = () => {
        const test = [];
        for (let i = 0; i < 5; i++) {
            test.push(
                <Text key={i} >{i}</Text>
            )
        }
        return test;
    }

    const renderDays = () => {
        const days = [];
        let day = startOfMonth.clone().startOf('week');

        while (day.isBefore(endOfMonth.clone().endOf('week'))) {
            const dayNum = day.format('DD')
            const dayNumPress = day.format('YYYY-M-D')
            // console.log(day.clone().add(1, 'day').format('YYYY-M-D'));
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
        return days;
    };

    const LeftSwipeActions = () => {
        return (
            // <View style={styles.daysContainer}>
            //     {renderDays()}
            // </View>
            <View style={{
                // padding:10,
                width: 0.5,
                backgroundColor: 'white'
            }}></View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* <TouchableOpacity onPress={handlePrevMonth}>
                    <Text style={styles.arrow}>{"<"}</Text>
                </TouchableOpacity> */}
                <View style={{
                    flexDirection: 'row',
                    // flex:2,
                    // backgroundColor:'red'
                }}>
                    <Text style={styles.monthText}>{currentDate.format('YYYY MMMM')}</Text>
                    <TouchableOpacity onPress={handleNextMonth}>
                        <Text style={styles.arrow}>{">"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    // justifyContent: 'center',

                    // backgroundColor:'red',
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: '#16AB89',
                    // flex:1,
                }}>

                    <View style={{
                        // flex:1,
                        // backgroundColor:'red',
                        alignItems: 'center',
                        paddingVertical: 6,
                        paddingLeft: 14,
                        paddingRight: 10
                    }}>
                        <Text
                            ref={newRef}
                            onPress={() => {
                                setIsShowCalendar(!isShowCalendar)
                                newRef.current?.measureInWindow((x, y) => {
                                    console.log(x, y);

                                    setOffset({ x, y });
                                })
                            }}>Icon </Text>

                    </View>
                    {/* <View style={{
                        borderWidth: 0.5
                    }}></View> */}
                    <View style={{
                        // flex:1,
                        // backgroundColor:'pink',
                        alignItems: 'center',
                        paddingVertical: 6,
                        paddingLeft: 10,
                        paddingRight: 15
                    }}>
                        <Text
                            ref={newRef}
                            onPress={() => {
                                setIsShowCalendar(!isShowCalendar)
                                newRef.current?.measureInWindow((x, y) => {
                                    console.log(x, y);

                                    setOffset({ x, y });
                                })
                            }}>Icon </Text>

                    </View>
                </View>

            </View>
            <View style={styles.dayNamesContainer}>
                {renderDayNames()}
            </View>

            

            {/* <Swipeable
                friction={8}
                renderLeftActions={LeftSwipeActions}
                renderRightActions={LeftSwipeActions}
                onSwipeableOpen={(direction) => {
                    swipeRef.current?.close()
                    if (direction == 'left') {
                        handlePrevMonth()
                    } else {
                        handleNextMonth()
                    }
                }}
                ref={swipeRef}>

                <View style={styles.daysContainer}>
                    {renderDays()}
                </View>
            </Swipeable> */}
            <ScrollView pagingEnabled>
                <Swipeable
                    friction={8}
                    renderLeftActions={LeftSwipeActions}
                    renderRightActions={LeftSwipeActions}
                    onSwipeableOpen={(direction) => {
                        swipeRef.current?.close()
                        if (direction == 'left') {
                            handlePrevMonth()
                        } else {
                            handleNextMonth()
                        }
                    }}
                    ref={swipeRef}>

                    <View style={styles.daysContainer}>
                        {renderDays()}
                    </View>
                </Swipeable>
                

            </ScrollView>
                    <Text style={{
                        color:'red',
                        fontSize:90
                    }}> HELLO</Text>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isShowCalendar}>
                <View style={{
                    flex: 1,
                    // backgroundColor: '#000000B8',
                    paddingHorizontal: 32,
                    alignItems: 'center',

                }}>
                    <View style={{
                        position: 'absolute',
                        borderRadius: 15,
                        padding: 10,
                        backgroundColor: 'white',
                        top: offset.y + 15,
                        // right:offset.x,
                        // right:offset.y,
                        right: 16,
                        shadowColor: '#00000099',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 1,
                        opacity: 3,
                        elevation: 10,
                        shadowRadius: 5,
                        // left: offset.x,
                    }}>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                // paddingHorizontal:30,
                            }}
                            onPress={() => setIsShowCalendar(!isShowCalendar)}>
                            <TestTopCalendar onClose={() => { }} />
                        </TouchableOpacity>

                    </View>


                </View>
            </Modal>

            <View style={{
                flexDirection:'row'
            }}>
              
                <View style={{
                    flexDirection:'row',
                    borderWidth:0.5,
                    justifyContent:'space-between',
                    flex:1
                }}>
                    <Text>as</Text>
                    <Text>as</Text>

                </View>
                <View style={{
                    width:8
                }}></View>
                <View style={{
                    flexDirection:'row',
                    borderWidth:0.5,
                    justifyContent:'space-between',
                    flex:1
                }}>
                    <Text>as</Text>
                    <Text>as</Text>

                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 30,
        // backgroundColor: 'red',
        marginHorizontal: 15,
        marginTop: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 15,
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
        width: `${100 / 7}%`, // 7 columns
        height: 50,
    },
    dayText: {
        fontSize: 16,
        color: '#000',
    },
    selectedDay: {
        backgroundColor: '#D9F8F1',
        // borderWidth:1,
        borderRadius: 30,
        // opacity: 0.1,
        padding: 10,
        color: '#ffffff',
    },
});

export default TestTopCalendar2;
