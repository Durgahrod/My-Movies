import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CommentForm from './CommentForm';
import AddButton from './AddButton';
import Fire from '../Fire';

export default function CommentListModal(props) {
    const [author, setAuthor] = useState("")
    const [synopsis, setSynopsis] = useState("")
    console.log(title, synopsis);

    const handleSubmit = () => {
        const firebase = new Fire()
        firebase.addMovie({
            title: title,
            synopsis: synopsis,
            comments: []
        })
        props.onClose()
    }

    return (
        <View style={styles.container}>
            <Text>Commentaires</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C0C0C0',
    },
    modal: {
        width: 10,
        height: 25,
        borderRadius: 10
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 10,
    }
});