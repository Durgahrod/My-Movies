import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MovieForm from './MovieForm';
import AddButton from './AddButton';
import Fire from '../Fire';

export default function MovieModal(props) {
    const [title, setTitle] = useState("")
    const [synopsis, setSynopsis] = useState("")
    console.log(title, synopsis);

    const handleSubmit = () => {
        const firebase = new Fire()
        firebase.addMovie({
            title: title,
            synopsis: synopsis,
            comments: []
        }
        /* if (props.movie){
            movie.id
        } */
        )
        
        props.onClose()
    }

    return (
        <View style={styles.container}>
            <Modal visible={props.isVisible} style={styles.modal}>
                <View style={styles.centered}>
                    <MovieForm title={title} synopsis={synopsis} handleTitleChange={newTitle => setTitle(newTitle)} handleSynopsisChange={newSynopsis => setSynopsis(newSynopsis)} />
                    <View style={styles.button}>
                        <AddButton
                            onPress={handleSubmit}
                            title={props.title}
                            content="Valider"
                        >
                        </AddButton>
                    </View>

                    <View style={styles.button}>
                        <AddButton
                            onPress={props.onClose}
                            title={props.content}
                            color="red"
                            content="Fermer">
                        </AddButton>
                    </View>
                </View>
            </Modal>
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