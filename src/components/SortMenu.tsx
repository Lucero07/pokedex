import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { RadioButton, Text } from 'react-native-paper';
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from 'react-native-vector-icons';
import { usePokemon } from '../hooks/usePokemon';

const SortMenu: React.FC = () => {
  const actionSheetRef = useRef<ActionSheet>(null);
  const [sortBy, setSortBy] = useState<'id' | 'alpha'>('id');
  const { sortPokemonsByName, sortPokemonsById } = usePokemon();

  const handleSortByName = () => {
    sortPokemonsByName();
    setSortBy('alpha');
    actionSheetRef.current?.hide();
  };

  const handleSortById = () => {
    sortPokemonsById();
    setSortBy('id');
    actionSheetRef.current?.hide();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => actionSheetRef.current?.show()}
      >
        {sortBy === 'id' ? (
          <MaterialIcons
            name="numbers"
            size={18}
            color="#DC0A2D"
            style={styles.icon}
          />
        ) : (
          <MaterialCommunityIcons
            name="format-letter-starts-with"
            size={18}
            color="#DC0A2D"
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionContainer}>
          <RadioButton.Group
            onValueChange={value => {
              if (value === 'alpha') {
                handleSortByName();
              } else if (value === 'id') {
                handleSortById();
              }
            }}
            value={sortBy}
          >
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSortByName}
            >
              <RadioButton
                value="alpha"
                color="#DC0A2D"
                status={sortBy === 'alpha' ? 'checked' : 'unchecked'}
              />
              <Text style={styles.actionText}> Name </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSortById}
            >
              <RadioButton
                value="id"
                color="#DC0A2D"
                status={sortBy === 'id' ? 'checked' : 'unchecked'}
              />
              <Text style={styles.actionText}> Number </Text>
            </TouchableOpacity>
          </RadioButton.Group>
        </View>
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 50,
    padding: 8,
    width: 40,
    height: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 0,
  },
  actionContainer: {
    padding: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 18,
    color: '#DC0A2D',
    marginLeft: 10,
  },
});

export default SortMenu;
