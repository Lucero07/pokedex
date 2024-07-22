import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ChipProps = {
  type: string;
  color: string;
};

const Chip: React.FC<ChipProps> = ({ type, color }) => {
  return (
    <View style={[styles.chip, { backgroundColor: color }]}>
      <Text style={styles.chipText}> {type} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default Chip;
