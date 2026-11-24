import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SZINEK, TemaContext } from '../context/TemaContext';

export default function Bejegyzes({ cim, hely, leiras, kedvenc, onKedvencValt }) {
  const { tema } = useContext(TemaContext);
  const szinek = SZINEK[tema];

  return (
    <View
      style={[styles.kartya, { backgroundColor: szinek.kartya, borderColor: szinek.keret }, kedvenc && styles.kedvenc]}
    >
      <View style={styles.fejlec}>
        <Text style={[styles.cim, { color: szinek.szoveg }]}>{cim}</Text>
        <Pressable onPress={onKedvencValt} style={({ pressed }) => [styles.gomb, pressed && styles.lenyomva]}>
          <Text style={styles.gombSzoveg}>{kedvenc ? '★ Kedvenc' : '☆ Kedvenc'}</Text>
        </Pressable>
      </View>

      {/* A beágyazott Text örökli a külső szövegstílust (méret, betűtípus). */}
      <Text style={{ color: szinek.szoveg }}>
        Helyszín: <Text style={{ color: szinek.szurke }}>{hely}</Text>
      </Text>

      {leiras ? (
        <Text numberOfLines={2} style={{ color: szinek.szoveg }}>
          {leiras}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  kartya: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  kedvenc: {
    borderLeftWidth: 5,
    borderLeftColor: '#f5b400',
  },
  fejlec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  cim: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  gomb: {
    backgroundColor: '#2f6fed',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  gombSzoveg: {
    color: '#ffffff',
  },
  lenyomva: {
    opacity: 0.5,
  },
});
