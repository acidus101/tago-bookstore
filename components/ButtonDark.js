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
            <View>
                <Text style = {{color:'#ffffff'}}>{props.children}</Text>
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
        height: 60,
        width: 120,
        margin: 20,
        padding: 10,
        borderColor:'#000000',
        backgroundColor:'#181818'
    }
});