import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function CommentForm(props) {
    const initialValue = [{ id: "markRange", value: 3 }]
    const [mark, setMark] = useState(initialValue.value)
    const markRange = [{ id: "markRange", label: "", min: 1, max: 5 }]

    return (
        <View style={styles.container}>
            <Text>Auteur</Text>
            <TextInput placeholder="Auteur" value={props.author} onChangeText={props.handleAuthorChange} style={styles.inputFirst}></TextInput>
            <Text>Contenu</Text>
            <TextInput multiline placeholder="Contenu" value={props.content} onChangeText={props.handleContentChange} style={[styles.inputFirst, styles.inputSecond]}></TextInput>
            <Text>Note</Text>
            {/* <NumberPlease
                digits={markRange}
                values={mark}
                onChange={[(values) => setMark(values), props.handleMarkChange]}
            /> */}
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