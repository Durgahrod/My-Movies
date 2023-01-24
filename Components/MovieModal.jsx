import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
// import DatePicker from 'react-native-date-picker'
import MovieForm from './MovieForm';
import AddButton from './AddButton';
import Fire from '../Fire';

export default function MovieModal(props) {
    const [title, setTitle] = useState(props.movieEdit ? props.movieEdit.title : "")
    const [synopsis, setSynopsis] = useState(props.movieEdit ? props.movieEdit.synopsis : "")
    const [image, setImage] = useState(props.movieEdit ? props.movieEdit.image : "")
    const [releaseDate, setReleaseDate] = useState(props.movieEdit ? props.movieEdit.releaseDate : new Date())
    console.log(props);

    const handleSubmit = () => {
        console.log(title);

        const firebase = new Fire()
        let movie = {
            "title": title,
            "synopsis": synopsis,
            "image": image,
            "releaseDate": releaseDate,
            "comments": []
        }
        if (props.movieEdit) {
            movie.id = props.movieEdit.id;
            movie.comments = props.movieEdit.comments;
            firebase.updateMovie(movie);
        } else {
            firebase.addMovie(movie)
        }
        props.onClose()
    }


    return (
        <View style={styles.container}>
            <Modal visible={props.isVisible} style={styles.modal}>
                <View style={styles.centered}>
                    <MovieForm title={title} synopsis={synopsis} image={image} date={releaseDate} handleTitleChange={newTitle => setTitle(newTitle)} handleSynopsisChange={newSynopsis => setSynopsis(newSynopsis)} handleImageChange={newImage => setImage(newImage)} handleDateChange={newDate => setDate(newDate)} />
                    <View style={styles.button}>
                        <AddButton
                            onButtonPress={handleSubmit}
                            title={props.title}
                            content="Valider"
                        >
                        </AddButton>
                    </View>

                    <View style={styles.button}>
                        <AddButton
                            onButtonPress={props.onClose}
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