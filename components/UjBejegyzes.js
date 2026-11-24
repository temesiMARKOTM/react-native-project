import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { SZINEK, TemaContext } from '../context/TemaContext';

export default function UjBejegyzes({ onHozzaad }) {
  const { tema } = useContext(TemaContext);
  const szinek = SZINEK[tema];

  const [cim, setCim] = useState('');
  const [hely, setHely] = useState('');
  const [probalt, setProbalt] = useState(false);

  // Piros keret csak akkor, ha már megpróbáltuk menteni, és a mező üres.
  const cimHibas = probalt && cim.trim() === '';
  const helyHibas = probalt && hely.trim() === '';

  const mentes = () => {
    setProbalt(true);
    if (cim.trim() === '' || hely.trim() === '') {
      return; // hiányos mező: nem kerül be a listába
    }
    onHozzaad(cim.trim(), hely.trim());
    setCim('');
    setHely('');
    setProbalt(false);
  };

  const mezo = [styles.mezo, { color: szinek.szoveg, backgroundColor: szinek.kartya }];

  return (
    <>
      <TextInput
        style={[...mezo, cimHibas && styles.hibas]}
        placeholder="Cím"
        placeholderTextColor={szinek.szurke}
        value={cim}
        onChangeText={setCim}
      />
      <TextInput
        style={[...mezo, helyHibas && styles.hibas]}
        placeholder="Helyszín"
        placeholderTextColor={szinek.szurke}
        value={hely}
        onChangeText={setHely}
      />
      <Pressable onPress={mentes} style={({ pressed }) => [styles.gomb, pressed && styles.lenyomva]}>
        <Text style={styles.gombSzoveg}>Bejegyzés hozzáadása</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  mezo: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    padding: 10,
  },
  hibas: {
    borderColor: '#d62828',
  },
  gomb: {
    backgroundColor: '#2f6fed',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  gombSzoveg: {
    color: '#ffffff',
  },
  lenyomva: {
    opacity: 0.5,
  },
});
