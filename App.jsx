import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AddButton from './Components/AddButton';
import MovieModal from './Components/MovieModal';
import CommentListModal from './Components/CommentListModal';
import Fire from './Fire';

export default function App() {
  const [isModalMovieVisible, setIsModalMovieVisible] = useState(false)
  const [isModalCommentListVisible, setIsModalCommentListVisible] = useState(false)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState()

  useEffect(() => {
    const firebase = new Fire()
    firebase.getMovies(movies => {
      setMovies(movies)
      setLoading(false)
    })
  }, [])

  function deleteMovie(movie) {
    const firebase = new Fire()
    firebase.deleteMovie(movie)
  }

  const handleFilter = (e) => {
    let moviesFilter = movies
    moviesFilter.filter(movie => {
      movie.title.includes(e);
    })
    setMovies(moviesFilter);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenu sur</Text>
      <Text style={styles.frog}>Froggy Movies</Text>
      <Image
        style={styles.icon}
        source={"./assets/grenouille.png"}
      />

      <TextInput placeholder='Rechercher' style={styles.searchBar} onChangeText={handleFilter} />

      <View>
        {loading && <ActivityIndicator />}
      </View>
      <ScrollView>
        {movies.map(movie => (
          <View style={styles.scrollView}>
            <View style={styles.centered}>
              <Image
                style={styles.image}
                source={{
                  uri: movie.image,
                }}
              />
            </View>

            <Text key={movie.id} style={styles.title}>
              {movie.title}
            </Text>
            <ScrollView>
              <Text style={styles.content}>
                {movie.synopsis}
              </Text>
            </ScrollView>

            <View style={styles.buttons}>
              <AddButton key={movie.id + "edit"} onButtonPress={() => { setIsModalMovieVisible(true); setSelectedMovie(movie) }} content="Modifier" buttonColor="orange" />

              <AddButton key={movie.id + "delete"} onButtonPress={() => deleteMovie(movie)} content="Supprimer" buttonColor="red" />
            </View>
            <View style={styles.buttons}>
              <AddButton onButtonPress={() => { setIsModalCommentListVisible(true); setSelectedMovie(movie) }} content="Commentaires" buttonColor="dodgerblue" />
            </View>
          </View>
        ))}
        {isModalMovieVisible && (
          <MovieModal isVisible={isModalMovieVisible} onClose={() => setIsModalMovieVisible(false)} movieEdit={selectedMovie} content="Fermer" />
        )}
        {isModalCommentListVisible && (
          <CommentListModal isVisible={isModalCommentListVisible} onClose={() => setIsModalCommentListVisible(false)} movie={selectedMovie} content="Fermer" />
        )}
      </ScrollView>
      <AddButton onButtonPress={() => setIsModalMovieVisible(true)} content="Ajouter un film" buttonColor="#008000" />
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
    color: '#008000',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
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
