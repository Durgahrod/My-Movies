import { View, Text, Modal, Button, StyleSheet, TextInput, ActivityIndicator, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddButton from './AddButton';
import Fire from '../Fire';
import CommentModal from './CommentModal';

export default function CommentListModal(props) {
    const [isModalCommentVisible, setIsModalCommentVisible] = useState(false)
    const [selectedComment, setSelectedComment] = useState()

    const initialComments = props.movie.comments
    const [listComments, setListComments] = useState(initialComments)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const firebase = new Fire()
        firebase.getMovies(movies => {
            setListComments(props.movie.comments)
            setLoading(false)
        })
    }, [])

    function deleteComment(selectedComment) {
        console.log(selectedComment);
        const newListComments = listComments.filter((comment) => comment !== selectedComment)
        console.log(newListComments);
        setListComments(newListComments)

        const firebase = new Fire()
        let movie = {
            "title": props.movie.title,
            "synopsis": props.movie.synopsis,
            "image": props.movie.image,
            "comments": props.movie.comments
        }
        movie.id = props.movie.id;
        movie.title = props.movie.title;
        movie.synopsis = props.movie.synopsis;
        movie.image = props.movie.image;
        movie.comments = newListComments;
        firebase.updateMovie(movie);
    }

    const handleFilter = (e) => {
        const moviesFilter = movies.filter(movie => {
            return movie.title.includes(e.target.value) ||
                movie.content.includes(e.target.value);
        })
        this.setState({ filteredMovies: moviesFilter });
    };

    return (
        <View style={styles.container}>
            <Modal>
                <Text style={[styles.title, styles.frog]}>Froggy Movies</Text>
                <Image
                    style={styles.icon}
                    source={'/assets/grenouille.png'}
                />
                <View style={styles.button}>
                    <AddButton
                        onButtonPress={props.onClose}
                        title={props.content}
                        color="red"
                        content="Fermer">
                    </AddButton>
                </View>
                <TextInput placeholder='Rechercher' style={styles.searchBar} onChangeText={handleFilter} />
                <View>
                    {loading && <ActivityIndicator />}
                </View>
                <View style={styles.centered}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: props.movie.image,
                        }}
                    />
                </View>
                <Text style={styles.title}>
                    {props.movie.title}
                </Text>
                <Text style={styles.title}>
                    Commentaires :
                </Text>
                <ScrollView>
                    {props.movie.comments.map((comment, i) => (
                        <View style={styles.scrollView}>
                            <Text key={comment + i} style={styles.title}>
                                {comment.author}
                            </Text>
                            <ScrollView>
                                <Text style={styles.content}>
                                    {comment.content}
                                </Text>
                            </ScrollView>

                            <View style={styles.buttons}>
                                <AddButton key={i + "edit"} onButtonPress={() => { setIsModalCommentVisible(true); setSelectedComment(comment) }} content="Modifier" buttonColor="orange" />

                                <AddButton key={i + "delete"} onButtonPress={() => deleteComment(comment)} content="Supprimer" buttonColor="red" />
                            </View>
                        </View>
                    ))}
                    {isModalCommentVisible && (
                        <CommentModal isVisible={isModalCommentVisible} onClose={() => setIsModalCommentVisible(false)} movie={props.movie} commentEdit={selectedComment} content="Fermer" />
                    )}
                </ScrollView>
                <AddButton onButtonPress={() => setIsModalCommentVisible(true)} content="Ajouter un commentaire" buttonColor="#008000" />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    frog: {
        color: '#08000'
    },
    icon: {
        width: 50,
        height: 50,
    },
    bgBlue: {
        backgroundColor: 'dodgerblue',
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C0C0C0',
        padding: 5,
    },
    image: {
        width: 140,
        height: 200,
        margin: 30
    },
    centered: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        border: "1px solid black",
        borderRadius: 5,
        padding: 5,
        margin: 5,
        width: "90%"
    },
    title: {
        textAlign: 'center',
        fontSize: 25
    },
    content: {
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 15,
        padding: 10,

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonModif: {
        size: 'small'
    }
});
