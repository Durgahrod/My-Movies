import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AddButton from './AddButton';
import Fire from '../Fire';
import CommentForm from './CommentForm';

export default function CommentModal(props) {
    const [author, setAuthor] = useState(props.commentEdit ? props.commentEdit.author : "")
    const [content, setContent] = useState(props.commentEdit ? props.commentEdit.content : "")
    const [mark, setMark] = useState(props.commentEdit ? props.commentEdit.mark : "")
    console.log(props);

    const handleSubmit = () => {
        console.log(author, content, mark);

        const firebase = new Fire()
        let movie = {
            "title": props.movie.title,
            "synopsis": props.movie.synopsis,
            "image": props.movie.image,
            "comments": props.movie.comments
        }
        console.log("Movie:" + movie);
        let comment = {
            "author": author,
            "content": content,
            "mark": mark,
        }
        console.log("Comment:" + comment);
        if (props.commentEdit) {
            movie.id = props.movie.id;
            movie.title = props.movie.title;
            movie.synopsis = props.movie.synopsis;
            movie.image = props.movie.image;
            movie.comments = props.movie.comments;

            firebase.updateMovie(movie);
        } else {
            movie.id = props.movie.id;
            movie.title = props.movie.title;
            movie.synopsis = props.movie.synopsis;
            movie.image = props.movie.image;
            props.movie.comments.push(comment);
            console.log(props.movie);
            movie.comments = props.movie.comments;
            
            firebase.updateMovie(movie);
        }
        props.onClose()
    }


    return (
        <View style={styles.container}>
            <Modal visible={props.isVisible} style={styles.modal}>
                <View style={styles.centered}>
                    <CommentForm author={author} content={content} mark={mark} handleAuthorChange={newAuthor => setAuthor(newAuthor)} handleContentChange={newContent => setContent(newContent)} handleMarkChange={newMark => setMark(newMark)} />
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