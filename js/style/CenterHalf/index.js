import React from "react";
import {View} from "react-native";

export const CenterHalf = (props) => <View style={{margin: 16, flex: 1, flexDirection: 'row'}}>
    <View style={{flex:1}}/>
    <View style={{flex:2 }}>
        {props.children}
    </View>
    <View style={{flex:1 }}/>
</View>;