import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar'; 
import { Ionicons } from 'react-native-vector-icons'; 
import { usePokemon } from '../hooks/usePokemon';

type RootStackParamList = {
  Detail: { id: number };
};

const DetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { id } = route.params;
  const { getPokemonById } = usePokemon();
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (id === undefined) {
          console.error('ID is undefined');
          return;
        }

        const pokemonData = await getPokemonById(id);
        if (pokemonData) {
          setPokemonDetails(pokemonData);
        } else {
          console.error('Pokémon not found');
        }
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };
    fetchPokemonDetails();
  }, [id, getPokemonById]);

  const handleNext = () => {
    const nextPokemonId = id + 1;
    navigation.navigate('Detail', { id: nextPokemonId });
  };

  const handlePrev = () => {
    const prevPokemonId = id - 1;
    navigation.navigate('Detail', { id: prevPokemonId });
  };

  if (!pokemonDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.halfBackgroundTop} />
      <View style={styles.halfBackgroundBottom} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={handlePrev} style={styles.navButton}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.navButton}>
          <Ionicons name="arrow-forward" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}> {pokemonDetails.name} </Text>
        <View style={styles.row}>
          <Text style={styles.label}> Weight: </Text>
          <Text style={styles.value}> {pokemonDetails.weight / 10} kg </Text>
          <Text style={styles.label}> Height: </Text>
          <Text style={styles.value}> {pokemonDetails.height / 10} m </Text>
          <Text style={styles.label}> Moves: </Text>
          <Text style={styles.value}> {pokemonDetails.moves.length} </Text>
        </View>
        <Text style={styles.sectionTitle}> Stats </Text>
        {pokemonDetails.stats.map((stat: any) => (
          <View key={stat.stat.name} style={styles.statContainer}>
            <Text style={styles.statName}> {stat.stat.name} </Text>
            <ProgressBar
              style={styles.progressBar}
              progress={stat.base_stat / 100}
              color="#DC0A2D"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  halfBackgroundTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#DC0A2D',
  },
  halfBackgroundBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    alignItems: 'center' ,
  },
  image: {
    width: 200,
    height: 200,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: 0,
  },
  navButton: {
    paddingHorizontal: 20,
  },
  infoContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  statName: {
    flex: 1,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  progressBar: {
    flex: 2,
    height: 10,
  },
});

export default DetailScreen;
