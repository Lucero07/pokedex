import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="search"
        size={24}
        color="#DC0A2D"
        style={styles.iconLeft}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Search Pokémon"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChange('')}>
          <MaterialIcons
            name="close"
            size={24}
            color="#DC0A2D"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
});

export default SearchBar;
