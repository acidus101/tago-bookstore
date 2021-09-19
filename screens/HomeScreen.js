import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import ListItem from '../components/ListItem';
import axios from 'axios';

import {
    useFonts,
    Roboto_400Regular,
    Roboto_300Light
} from "@expo-google-fonts/roboto";

export default function HomeScreen({ route, navigation }) {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const state = useSelector((state) => state);

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_300Light
    });
    useEffect(() => {
        findBooks();
    }, [])
    async function findBooks() {
        setLoading(true);
        let response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=20');
        setBooks(response.data.items);
        setLoading(false);
    }
    const { user } = route.params;
    if (!fontsLoaded || loading) {
        return (
            <View style = {styles.actcontainer}>
                <ActivityIndicator size="large" color="tomato" />
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerName}>Hi, {user.givenName}!</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>List</Text>
                </View>
                <View style={styles.list}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 10, paddingTop: 8 }}
                        data={books}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <ListItem item={item}/>}
                    />
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
        paddingTop: 25
    },
    actcontainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        paddingTop: 25,
        justifyContent:'center',
        alignItems:'center'
    },
    headerName: {
        fontFamily: 'Roboto_300Light',
        fontSize: 20
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
    }
});