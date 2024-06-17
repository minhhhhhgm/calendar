import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextInput from '../component/input';


const TestListItem = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, '大型特殊', '普通二輪', 31, 21, 331]
    const [brands, setBrands] = useState(new Set());
    const selectBrand = (brand: any) => {
        setBrands(brands => {
            if (!brands.has(brand)) {
                brands = new Set(brands);
                brands.add(brand);
            } else {
                brands = new Set(brands);
                brands.delete(brand)
            }
            return brands;
        });
    };

    return (
        <View>
            <FlatList
                numColumns={4}
                style={{
                    // flexWrap:'wrap',
                    // flexDirection:'row',
                    // marginHorizontal:30
                    // overflow:'hidden',
                }}
                data={data}
                renderItem={({ item, index }) => {
                    const isSelect = data.includes(item);
                    return (
                        <TouchableOpacity
                            onPress={() => selectBrand(item)}
                            style={{
                                width: 73,
                                // paddingHorizontal:10,
                                paddingVertical: 4,
                                borderWidth: 1,
                                margin: 8,
                                alignItems: 'center',
                                backgroundColor: brands.has(item)  ? 'red' : 'white'
                            }}>
                            <Text>
                                {item}
                            </Text>

                        </TouchableOpacity>
                    )
                }}
            />
        </View>
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : 'position'}
        //     keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
        //     <ScrollView >
        //         <View style={{
        //             backgroundColor: '#EFEFEF',
        //             marginTop: 30,
        //             padding: 8,
        //             marginHorizontal: 16,
        //         }}>
        //             <TextInput
        //                 isRequired
        //                 isPassword
        //                 label="フリガナ（姓）"
        //                 placeholder="Placeholder"
        //             />
        //             <TextInput
        //                 isRequired
        //                 isPassword
        //                 label="フリガナ（姓）"
        //                 placeholder="Placeholder"
        //             />
        //             <TextInput
        //                 isRequired
        //                 isPassword
        //                 label="フリガナ（姓）"
        //                 placeholder="Placeholder"
        //             />
        //             <TextInput
        //                 isRequired
        //                 isPassword
        //                 label="フリガナ（姓）"
        //                 placeholder="Placeholder"
        //             />
        //         </View>
        //     </ScrollView>
        // </KeyboardAvoidingView>
    )
}

export default TestListItem;