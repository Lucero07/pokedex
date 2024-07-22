import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePokemon } from '../hooks/usePokemon';
import Chip from '../components/ChipType';
import { useBackgroundColor } from '../context/BackgroundColorContext';

const typeColors: { [key: string]: string } = {
  grass: '#7AC74C',
  fire: '#F08030',
  water: '#6390F0',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33F30',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  normal: '#A8A878',
};

type RootStackParamList = {
  Detail: { id: number };
};

const DetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { id } = route.params;
  const {
    getDescriptionById,
    getPokemonById,
    setPokemonDetails,
    pokemonDetails,
  } = usePokemon();
  const { backgroundColor, setBackgroundColor } = useBackgroundColor();

  const [pokemonDescription, setLocalPokemonDescription] = useState<
    string | null
  >(null);

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
          const primaryType = pokemonData.types[0].type.name;
          const color = typeColors[primaryType] || 'blue'; // Color por defecto si no se encuentra el tipo
          setBackgroundColor(color);
        } else {
          console.error('Pokémon not found');
        }

        const descriptionData = await getDescriptionById(id);
        if (descriptionData) {
          const englishDescription = descriptionData.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'en',
          );
          if (englishDescription) {
            setLocalPokemonDescription(englishDescription.flavor_text);
          }
        } else {
          console.error('Description not found');
        }
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setBackgroundColor('#DC0A2D');
      };
    }, [setBackgroundColor]),
  );

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
      <View style={[styles.halfBackgroundTop, { backgroundColor }]} />
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
        {id > 1 ? (
          <TouchableOpacity onPress={handlePrev} style={styles.navButton}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}

        <TouchableOpacity onPress={handleNext} style={styles.navButton}>
          <Ionicons name="arrow-forward" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.typesContainer}>
          {pokemonDetails.types.map((typeInfo: any) => (
            <Chip
              key={typeInfo.type.name}
              type={typeInfo.type.name}
              color={typeColors[typeInfo.type.name] || '#CCCCCC'}
            />
          ))}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            {' '}
            <MaterialCommunityIcons
              name="weight"
              size={24}
              color={backgroundColor}
              style={styles.iconRight}
            />
          </Text>
          <Text style={styles.value}> {pokemonDetails.weight / 10} kg </Text>
          <Text style={styles.label}>
            {' '}
            <MaterialCommunityIcons
              name="human-male-height"
              size={24}
              color={backgroundColor}
              style={styles.iconRight}
            />
          </Text>
          <Text style={styles.value}> {pokemonDetails.height / 10} m </Text>
          <Text style={[styles.label, { color: backgroundColor }]}> Moves</Text>
          <Text style={styles.value}> {pokemonDetails.moves.length} </Text>
        </View>
        <Text style={styles.sectionTitle}>Description</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{pokemonDescription}</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: backgroundColor }]}>
          {' '}
          Stats{' '}
        </Text>
        {pokemonDetails.stats.map((stat: any) => (
          <View key={stat.stat.name} style={styles.statContainer}>
            <Text style={styles.statName}> {stat.stat.name} </Text>
            <ProgressBar
              progress={stat.base_stat / 100}
              color={backgroundColor}
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
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
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
  descriptionContainer: {
    width: '100%',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
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
});

export default DetailScreen;
