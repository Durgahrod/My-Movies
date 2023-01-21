import { View, Text, TextInput, StyleSheet } from 'react-native'
import NumberPlease from "react-native-number-please";
import React, { useState } from 'react'

export default function CommentForm(props) {
    const initialValue = [{ id: "pizza", value: 3 }]
    const [mark, setMark] = useState(initialValue)
    const markRange = [{ id: "markRange", min: 1, max: 5 }]

    return (
        <View style={styles.container}>
            <Text>Auteur</Text>
            <TextInput placeholder="Auteur" value={props.title} onChangeText={props.handleTitleChange} style={styles.inputFirst}></TextInput>
            <Text>Contenu</Text>
            <TextInput multiline placeholder="Contenu" value={props.synopsis} onChangeText={props.handleSynopsisChange} style={[styles.inputFirst, styles.inputSecond]}></TextInput>
            <Text>Note</Text>
            <NumberPlease
                digits={markRange}
                values={mark}
                onChange={(values) => setMark(values)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C0C0C0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        marginBottom: 30,
    },
    inputFirst: {
        padding: 10,
        width: "90%",
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40
    },
    inputSecond: {
        height: 120
    }
});