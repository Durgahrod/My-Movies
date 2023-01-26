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
  const [secret, setSecret] = useState(false)
  const [alphaAsc, setAlphaAsc] = useState(true)

  useEffect(() => {
    if (secret == false) {
      if (alphaAsc == true) {
        const firebase = new Fire()

        firebase.getMovies((movies) => {
          setMovies(movies)
          setLoading(false)
        })
      } else {
        const firebase = new Fire()

        firebase.getMoviesDesc((movies) => {
          setMovies(movies)
          setLoading(false)
        })
      }
    } else {
      if (alphaAsc == true) {
        const firebase = new Fire()

        firebase.getMoviesSecret((movies) => {
          setMovies(movies)
          setLoading(false)
        })
      } else {
        const firebase = new Fire()

        firebase.getMoviesSecretDesc((movies) => {
          setMovies(movies)
          setLoading(false)
        })
      }
    }
  }, [])

  function deleteMovie(movie, secret) {
    const firebase = new Fire()
    firebase.deleteMovie(movie, secret)
  }

  function handleFilter(searchedTitle) {
    if (searchedTitle !== "") {
      console.log(searchedTitle);
      const newListMovies = movies.filter((movies) => String(movies.title).includes(searchedTitle));
      console.log(newListMovies);
      setMovies(newListMovies);
    } else {
      const firebase = new Fire()
      firebase.getMovies(movies => {
        setMovies(movies)
        setLoading(false)
      })
    }
  }

  return (
    <View style={styles.container}>
      <AddButton key="orderBy" content="Ordre alphabetique" onButtonPress={() => { if (alphaAsc == true) { setAlphaAsc(false) } else { setAlphaAsc(true) }; console.log(alphaAsc); }} />
      <Text style={styles.title}>Bienvenu sur</Text>
      <Text style={styles.frog}>Froggy Movies</Text>
      <View>
        {secret && <Text style={styles.secretText}>HARD</Text>}
      </View>
      <View>
        {secret ?
          <Image
            key="icon"
            style={styles.icon}
            source={require("./assets/grenouille-HARD.png")}
          />
          :
          <Image
            key="icon-HARD"
            style={styles.icon}
            source={require("./assets/grenouille.png")}
          />
        }
      </View>


      <TextInput key="searchbar" placeholder='Rechercher' style={styles.searchBar} onChangeText={handleFilter} />

      <View>
        {loading && <ActivityIndicator key="movies-loading" />}
      </View>
      <ScrollView>
        {movies.map(movie => (
          <View style={styles.scrollView}>
            <View style={styles.centered}>
              <Image
                key={movie.id + 'image'}
                style={styles.image}
                source={{
                  uri: movie.image,
                }}
              />
            </View>

            <Text key={movie.id + 'title'} style={styles.title}>
              {movie.title}
            </Text>
            <ScrollView style={styles.synopsis}>
              <Text
                key={movie.id + 'synopsis'}
                style={styles.content}>
                {movie.synopsis}
              </Text>
            </ScrollView>

            <View style={styles.buttons}>
              <AddButton key={movie.id + "edit"} onButtonPress={() => { setIsModalMovieVisible(true); setSelectedMovie(movie) }} content="Modifier" buttonColor="orange" />

              <AddButton key={movie.id + "delete"} onButtonPress={() => deleteMovie(movie, secret)} content="Supprimer" buttonColor="red" />
            </View>
            <View style={styles.buttons}>
              <AddButton key={movie.id + "comments"} onButtonPress={() => { setIsModalCommentListVisible(true); setSelectedMovie(movie) }} content="Commentaires" buttonColor="dodgerblue" />
            </View>
          </View>
        ))}


        {isModalMovieVisible && (
          <MovieModal isVisible={isModalMovieVisible} onClose={() => { setIsModalMovieVisible(false); setSelectedMovie("") }} movieEdit={selectedMovie} content="Fermer" secret={secret} />
        )}
        {isModalCommentListVisible && (
          <CommentListModal isVisible={isModalCommentListVisible} onClose={() => { setIsModalCommentListVisible(false); setSelectedMovie("") }} movie={selectedMovie} content="Fermer" secret={secret} />
        )}
      </ScrollView>


      <AddButton key="add Movie" onButtonPress={() => setIsModalMovieVisible(true)} content="Ajouter un film" buttonColor="#008000" />
      <View style={styles.hardButton}>
        <AddButton key="secret" content="+18" onButtonPress={() => { if (secret == true) { setSecret(false) } else { setSecret(true) }; console.log(secret); }} buttonColor="red" />
      </View>
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
    // fontFamily: 'Helvetica',
  },
  icon: {
    width: 50,
    height: 50,
    margin: 5
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
    fontSize: 15,
    padding: 10,
  },
  synopsis: {
    heightMax: 150,
    margin: 5,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonModif: {
    size: 'small'
  },
  secretText: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
  hardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  }
});
