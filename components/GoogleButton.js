import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function Button(props){
    return (
        <TouchableOpacity onPress={props.clicked} style={{ ...styles.screen, ...props.style }}>
            <View style = {styles.inside}>
                {props.children}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        margin: 20,
        padding: 10,
        borderColor:'#000000'
    },
    inside: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    }
});