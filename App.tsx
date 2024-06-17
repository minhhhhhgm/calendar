import "react-native-gesture-handler";
import React, { useState } from 'react';
import TestCalendar from './src/test/test-calendar';
import TestTopCalendar from './src/test/test-top-calendar';
import TestTopCalendar2 from './src/test/test-top-calendar2';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RenderDays from "./src/test/test-swipe";
import WeekCalendarScreen from "./src/test/week-calendar";
import TestCalendarApp from "./src/test/test-calendar-app";
import TestRps from "./src/test/test-rps";
import CheckBox from "./src/component/checkBox";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import TextInput, { RequiredType } from "./src/component/input";
import TextButton from "./src/component/textButton";
import CheckBoxSelected from "./src/assets/check-box-selected";
import SelectedIcon from './src/assets/radiobutton.svg'
import TestListItem from "./src/test/test-list-item";
import CheckBoxUnSelected from "./src/assets/check-box-un-selected";
import IconData from './src/assets/icon.svg'


const App = () => {
  const [value, setValue] = useState<boolean>(false)
  const [value2, setValue2] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  return (
    <GestureHandlerRootView>
      {/* <TestCalendar /> */}
      {/* <WeekCalendarScreen/>
      <TestCalendarApp/> */}
      {/* <TestCalendar /> */}


      <CheckBox
        isGrayBackground
        value={value}
        onValueChange={setValue}
        title="すべての車両"
        isBoldLable
        checkBoxStyle={{
          marginHorizontal: 16,
          marginTop: 100,
        }}
      />

      <View
        style={{
          marginTop: 30,
          marginHorizontal: 16,
        }}>

        <TextInput
          requiredType={RequiredType.Primary}
          label="フリガナ（姓）"
          placeholder="000000000"
          onChangeText={setInput}
          value={input}
          // secureTextEntry
        />
        {/* <Text>{input}</Text> */}


      </View>


      <TextButton
        containerButtonStyle={{ marginTop: 15, padding: 8, justifyContent:'center'}}
        textStyle={{ color: 'blue', fontWeight: '700' }}
        text='TEXT BUTTON'
        onPress={() => { }}
        icon={<IconData />}
        spacing={8}
      />






      {/* <View
        style={{
          marginTop: 30,
          padding: 8,
          alignItems: 'center'
        }}> */}
      {/* <TestListItem /> */}
      {/* </View> */}




      {/* <SelectedIcon/> */}

      {/* <TestRps/> */}

      {/* // <TestCalendar />
    <TestTopCalendar /> */}
      {/* <TestTopCalendar /> */}
      {/* <TestTopCalendar2/> */}
      {/* <RenderDays/> */}


    </GestureHandlerRootView>

  )
};


export default App;
