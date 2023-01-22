import { View, Text, TextInput, StyleSheet } from 'react-native'
import DateField from 'react-native-datefield';
import React from 'react'

export default function MovieForm(props) {
    return (
        <View style={styles.container}>
            <Text>Titre du film</Text>
            <TextInput placeholder="Titre" value={props.title} onChangeText={props.handleTitleChange} style={styles.inputFirst}></TextInput>
            <Text>Synopsis du film</Text>
            <TextInput multiline placeholder="Synopsis" value={props.synopsis} onChangeText={props.handleSynopsisChange} style={[styles.inputFirst, styles.inputSecond]}></TextInput>
            <Text>Synopsis du film</Text>
            <TextInput placeholder="Image (URL)" value={props.image} onChangeText={props.handleImageChange} style={styles.inputFirst}></TextInput>
            <Text>Date de sortie</Text>
            <DateField
                styleInput={styles.dateInput}
                containerStyle={backgroundColor="white"}
                labelDate="Jour"
                labelMonth="Mois"
                labelYear="Année"
                onSubmit={(value) => console.log(value)}
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
    dateInput: {
        backgroundColor: 'fff',
        padding: 30,
        marginBottom: 30,
    }
    ,
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