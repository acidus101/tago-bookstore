import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, ActivityIndicator, Alert } from 'react-native';
import AppLoading from "expo-app-loading";
import OrderItem from '../components/OrderItem';
import ButtonDark from '../components/ButtonDark';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../Redux/actions/index';
import {
    useFonts,
    Roboto_400Regular,
    Roboto_300Light
} from "@expo-google-fonts/roboto";
const windowWidth = Dimensions.get('window').width;

export default function OrderScreen() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { cleanBooks } = bindActionCreators(actionCreators, dispatch);
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_300Light
    });
    const state = useSelector((state) => state);
    const price = () => {
        let count = 0;
        state.books.books.forEach(element => {
            if(element.volumeInfo.pageCount){
                count += element.volumeInfo.pageCount;
            }else{
                count += 0
            }
        });
        return count;
    };

    const orderHandler = () => {
        setLoading(true);
        let books = []
        state.books.books.forEach(element => {
            let a = {}
            a.id = element.id,
            a.title = element.title
            books.push(a)
        });
        const temp = {
            name: "Manish Sharma",
            total: price(),
            books: books
        }
        const order = JSON.stringify(temp);
        axios.post("https://api.tago.care/assignment/", order, {
            "headers": {
                "content-type": "application/json",
            },
        }).then((response) => {
            console.log(response);
            Alert.alert("order successful!!!")
        }).catch((error) => {

            console.log(error);
            
        });
        cleanBooks();
        setLoading(false);
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Shopping Cart</Text>
                </View>
                <View style={styles.list}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 10, paddingTop: 8 }}
                        data={state.books.books}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => <OrderItem item={item} />}
                    />
                </View>
                <View style={styles.buyNowBox}>
                    <Text style={styles.ModalText}>No. of items:-     {state.books.books.length}</Text>
                    <Text style={styles.ModalText}>Total Price:-     {price()}</Text>
                    {
                        loading ? <ActivityIndicator size="large" color="tomato" /> : <ButtonDark style={styles.buyNowButton} clicked={() => { orderHandler() }}>Buy Now</ButtonDark>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        paddingTop: 50
    },
    header: {
        marginLeft: 30,
        marginBottom: 15
    },
    headerText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 30
    },
    list: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 30,
    },
    buyNowBox: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        width: windowWidth
    },
    buyNowButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 1.2,
    },
    ModalText: {
        paddingTop: 5,
        fontSize: 15,
        fontFamily: 'Roboto_400Regular',
        color: '#808080',
    }
})
