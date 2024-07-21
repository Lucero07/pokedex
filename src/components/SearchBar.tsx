import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <View style= { styles.container } >
    <TextInput
        style={ styles.input }
  placeholder = "Search Pokémon"
  value = { value }
  onChangeText = { onChange }
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 10,
    shadowColor: '#000222',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default SearchBar;
