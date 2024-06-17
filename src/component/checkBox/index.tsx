import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text,  View, ViewStyle } from 'react-native';
import CheckBoxSelected from '../../assets/check-box-selected';
import CheckBoxUnSelected from '../../assets/check-box-un-selected';

interface CheckBoxProps {
    value: boolean,
    onValueChange: (value: boolean) => void,
    title: string,
    isGrayBackground?: boolean,
    isBoldLable?: boolean,
    checkBoxStyle?: StyleProp<ViewStyle>
}

const CheckBox = (props: CheckBoxProps) => {
    const { value = false, onValueChange, title, isGrayBackground, isBoldLable, checkBoxStyle } = props
    return (
        <View style={[
            styles.container,
            isGrayBackground && { backgroundColor: '#EFEFEF', padding: 8, borderRadius: 8 },
            checkBoxStyle,
            ]}>
            <Pressable
                style={styles.checkBox}
                onPress={() => onValueChange(!value)}
            >
                {value ? <CheckBoxSelected /> : <CheckBoxUnSelected />}
                <View style={styles.sizeBox} />
                <Text style={[styles.title, isBoldLable && { fontWeight: '700' }]}>{title}</Text>
            </Pressable>
        </View>

    )
};


export default CheckBox;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    checkBox:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    sizeBox: {
        width: 8
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        color: '#212127'
    }
});