import React, { useState } from 'react';
import { StyleSheet, Text, TextInputProps, TextInput as TextInputRN, View } from 'react-native';

export enum RequiredType {
    Primary = 'primary',
    Secondary = 'secondary'
}

interface MInputProps extends TextInputProps {
    label: string,
    requiredType?: RequiredType
}

function MTextInput(props: MInputProps) {
    const { label, requiredType } = props;
    const [isFocused, setFocused] = useState(false);
    const onFocus = () => {
        setFocused(true)
    }
    const onBlur = () => {
        setFocused(false)
    }
    return (
        <View style={styles.container}>
            <View style={styles.rowLabel}>
                <Text style={styles.textFieldLabel}>{label}</Text>
                {requiredType === RequiredType.Primary && <Text style={styles.textFieldRequired}>必須</Text>}
                {
                    requiredType === RequiredType.Secondary &&
                    <View style={styles.viewSecondary}>
                        <Text style={styles.textFieldRequiredSecondary}>必須</Text>
                    </View>
                }
            </View>
            <TextInputRN
                {...props}
                style={[
                    styles.inputContainer,
                    requiredType === RequiredType.Secondary && styles.inputContainerSecondary,
                    isFocused && { borderColor: '#1E55E6' }
                ]}
                placeholderTextColor={'#B8B9BA'}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </View>
    );
}

export default MTextInput;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
    },
    textFieldLabel: {
        fontSize: 14,
        fontWeight: '400',
        color: '#212127',
    },
    textFieldRequired: {
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 8,
        color: '#FF4DAD'
    },
    viewSecondary: {
        backgroundColor: '#FF8549',
        paddingTop: 2,
        paddingBottom: 3,
        paddingHorizontal: 7,
        marginLeft: 8,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textFieldRequiredSecondary: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    inputContainer: {
        fontSize: 14,
        fontWeight: '400',
        borderColor: '#D3D3D4',
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: '#fff',
        height: 53,
        padding: 16,
        color: '#212127'
    },
    inputContainerSecondary: {
        fontSize: 14,
        fontWeight: '400',
        borderColor: '#C9C9C9',
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#fff',
        height: 44,
        padding: 12,
        color: '#323232'
    },
    rowLabel: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    }
});
