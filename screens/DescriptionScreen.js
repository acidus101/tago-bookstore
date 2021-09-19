import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../Redux/actions/index';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DescriptionScreen({ route }) {
    const { item } = route.params;
    const bookImage = item.volumeInfo.imageLinks.thumbnail;
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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.imageborder}>
                    <Image style={styles.thumbnail} source={{ uri: bookImage }} />
                </View>
                <Text style={styles.title}>{item.volumeInfo.title}</Text>
                <Text style={styles.price}>RS {item.volumeInfo.pageCount}</Text>
                <Text style={styles.description}>{item.volumeInfo.description}</Text>
                {
                    state.books.books.includes(item)?(
                        <Button style={styles.button} clicked={() => { itemRemoveHandler() }}>Remove from cart</Button>
                    ):(
                        <Button style={styles.button} clicked={() => { itemAddHandler() }}>Add to cart</Button>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 25
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        lineHeight: 1.5,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    imageborder: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 350,
        width: 250,
        borderRadius: 5,
    },
    thumbnail: {
        height: 350,
        width: 200,
        borderRadius: 5,
        overflow: 'hidden'
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    price: {
        color: '#808080',
        fontSize: 20,
        textAlign: 'center'
    },
    description: {
        color: '#808080',
        textAlign: 'center'
    },
    button: {
        height: windowHeight / 12,
        width: windowWidth / 1.5,
    }
})