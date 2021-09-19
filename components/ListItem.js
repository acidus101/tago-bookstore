import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../Redux/actions/index';

const windowWidth = Dimensions.get('window').width;

export default function ListItem({ item }) {
    const bookImage = item.volumeInfo.imageLinks.thumbnail;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { addBook, removeBook } = bindActionCreators(actionCreators, dispatch);
    const state = useSelector((state) => state);
    const itemAddHandler = () => {
            addBook(item);
    }
    const itemRemoveHandler = () => {
        removeBook(item);
    }
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Desc", { item })}>
            <View style={styles.container}>
                <View style={styles.imageborder}>
                    <Image style={styles.thumbnail} source={{ uri: bookImage }} />
                </View>
                <View style={styles.bookDetails}>
                    <Text style={styles.title}>{item.volumeInfo.title}</Text>
                    <Text style={styles.price}>RS {item.volumeInfo.pageCount}</Text>
                </View>
                {
                    state.books.books.includes(item) ? (
                        <TouchableOpacity onPress={()=> {itemRemoveHandler()}}>
                            <Ionicons name={'add-circle-outline'} size={30} color={'tomato'} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => { itemAddHandler() }}>
                            <Ionicons name={'add-circle-outline'} size={30} color={'gray'} />
                        </TouchableOpacity>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 20,
        width: windowWidth - 60
    },
    bookDetails: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageborder: {
        height: 200,
        width: 120,
        borderRadius: 5,
    },
    thumbnail: {
        height: 200,
        width: 120,
        borderRadius: 5,
        overflow: 'hidden'
    },
    price: {
        flex: 1,
        justifyContent: 'flex-start',
        color: '#808080',
        fontFamily: 'Roboto_400Regular'
    },
    title: {
        flex: 1,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        fontFamily: 'Roboto_400Regular'
    }
});