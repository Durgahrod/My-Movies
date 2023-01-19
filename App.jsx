import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Button } from '@ant-design/react-native'
import AddButton from './Components/AddButton';
import MovieModal from './Components/MovieModal';
import Fire from './Fire';

export default function App() {
  const [isModalMovieVisible, setIsModalMovieVisible] = useState(false)
  const [isModalCommentListVisible, setIsModalCommentVisible] = useState(false)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <View style={styles.container}>
      <Text>Bienvenu sur l'<Text style={styles.effeil65}>application</Text> !</Text>
      {loading && <ActivityIndicator />}
      {movies.map(movie => (
        <View>
          <Text key={movie.id}>
            {movie.title}
          </Text>
          <Button key={movie.id + "edit"} type="primary" >Modifier</Button>
          <Button key={movie.id + "delete"} type="warning" onPress={() => deleteMovie(movie)}>Supprimer</Button>
        </View>

      ))}
      <AddButton onPress={() => setIsModalMovieVisible(true)} content="Ajouter un film" buttonColor="#008000" />
      {isModalMovieVisible && (
        <MovieModal isVisible={isModalMovieVisible} onClose={() => setIsModalMovieVisible(false)} content="Fermer" />
      )}
      <AddButton onPress={() => setIsModalCommentListVisible(true)} content="Commentaires" buttonColor="dodgerblue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  effeil65: {
    color: 'dodgerblue',
    fontWeight: 'bold'
  },
  bgBlue: {
    backgroundColor: 'dodgerblue',
  },
});
