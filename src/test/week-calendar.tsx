import React, { useRef, useState } from 'react';
import { Button, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { WeekCalendarRef, WeekCalendar } from 'react-native-scrollable-calendars-jp';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import TestTopCalendar from './test-top-calendar';


// CALENDAR WEEK SCROLL


const WeekCalendarScreen = () => {
    const [date, setDate] = useState(new Date());
    const [datePicker, setDatePicker] = useState(moment().toDate());
    const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [week, setWeek] = useState(new Date().toISOString());
    const ref = useRef<WeekCalendarRef>(null);
    const newRef = useRef<Text>(null);
    // console.log('date',moment().toDate());
    const [open, setOpen] = useState(false)

    return (
        <SafeAreaView style={{ flex: 0.3 }}>
            <View
                style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    justifyContent: 'space-between'
                }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text
                        onPress={() => setOpen(true)}
                        style={{
                            marginLeft: 12,
                            fontSize: 24,
                            fontWeight: 'bold',
                        }}>
                        {dayjs(week).format('YYYY年MM月')}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        // ref.current?.scrollToDate(new Date());
                        ref.current?.scrollToNextWeek()
                        // ref.current?.scrollToDate('2025-05-01');
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: '#16AB89',
                            marginLeft: 10
                        }}>{">"}</Text>
                    </TouchableOpacity>
                </View>

                <Text
                    ref={newRef}
                    onPress={() => {
                        setIsShowCalendar(!isShowCalendar)
                        newRef.current?.measureInWindow((x, y) => {
                            setOffset({ x, y });
                        })
                    }}
                >SHOW</Text>
                {/* <View style={{ flex: 1 }} /> */}
                {/* <Button title="Prev" onPress={() => ref.current?.scrollToPrevWeek()} />
                <Button title="Next" onPress={() => ref.current?.scrollToNextWeek()} /> */}
            </View>
            <View style={{
                marginHorizontal: 0
            }}>
                <WeekCalendar
                    headerStyle={{
                        color: '#3C3C434D',
                    }}
                    ref={ref}
                    //    autoSelect="markedDate"
                    selected={date}
                    onSelectDate={(value, source) => {
                        if (source === 'pageScroll') {
                            return;
                        }
                        setDatePicker(new Date(value))
                        setDate(value as Date);

                    }}
                    onWeekChange={(w) => {
                        setWeek(w);
                    }}
                    firstDay={0}
                    dayNames={['日', '月', '火', '水', '木', '金', '土']}
                />
            </View>
            <DatePicker
                mode='date'
                modal
                // maximumDate={moment().toDate()}
                open={open}
                date={datePicker}

                // onDateChange={(date) => {
                //     setOpen(false)
                //     setDatePicker(date)
                //     ref.current?.scrollToDate(date);
                // }}
                title={''}
                onConfirm={(date) => {
                    setOpen(false)
                    setDatePicker(date)
                    const day = moment(date).format('YYYY-MM-DD')
                    ref.current?.scrollToDate(day);
                    setDate(date)
                    // ref.current?.scrollToDate(moment(date).format('YYYY-MM-DD'));
                }}
                id={date.toString()}
                onCancel={() => {
                    setOpen(false)
                }}
            // cancelText='okoko'
            />

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

                        <TestTopCalendar onClose={() => setIsShowCalendar(!isShowCalendar)} />

                    </View>


                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default WeekCalendarScreen;
