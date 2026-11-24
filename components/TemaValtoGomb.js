import { useContext } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { TemaContext } from '../context/TemaContext';

export default function TemaValtoGomb() {
  const { tema, valt } = useContext(TemaContext);

  return (
    <Pressable onPress={valt} style={({ pressed }) => [styles.gomb, pressed && styles.lenyomva]}>
      <Text style={styles.szoveg}>{tema === 'vilagos' ? 'Sötét téma' : 'Világos téma'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gomb: {
    backgroundColor: '#2f6fed',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  szoveg: {
    color: '#ffffff',
  },
  lenyomva: {
    opacity: 0.5,
  },
});
