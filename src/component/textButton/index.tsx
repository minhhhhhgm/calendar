import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface TextButtonProps {
    text: string,
    icon?: ReactNode,
    onPress: () => void,
    textStyle?: StyleProp<TextStyle>,
    fontSizeText?: number,
    fontWeightText?:
    'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
    colorText?: string,
    containerButtonStyle?: StyleProp<ViewStyle>,
    spacing?: number,
    disabled?: boolean
}

const TextButton = (props: TextButtonProps) => {
    const { icon, text, onPress, textStyle, containerButtonStyle, spacing = 8, fontSizeText, fontWeightText, colorText ,disabled} = props
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.container, containerButtonStyle]}
            onPress={onPress}
        >
            {icon && (
                <>
                    {icon}
                    <View style={{ width: spacing }} />
                </>
            )}
            <Text style={[
                textStyle,
                styles.title,
                !!fontSizeText && { fontSize: fontSizeText },
                !!fontWeightText  && { fontWeight: fontWeightText },
                !!colorText  && { color: colorText }
            ]}>{text}</Text>
        </TouchableOpacity>
    )
};


export default TextButton;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
    }
});