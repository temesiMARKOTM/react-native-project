import { useContext, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SZINEK, TemaContext } from '../context/TemaContext';
import useBejegyzesek from '../hooks/useBejegyzesek';
import Bejegyzes from './Bejegyzes';
import TemaValtoGomb from './TemaValtoGomb';
import UjBejegyzes from './UjBejegyzes';

const SZUROK = [
  { kulcs: 'osszes', felirat: 'Összes' },
  { kulcs: 'kedvenc', felirat: 'Kedvencek' },
  { kulcs: 'nemkedvenc', felirat: 'Nem kedvencek' },
];

export default function Naplo() {
  const { tema } = useContext(TemaContext);
  const szinek = SZINEK[tema];
  const { bejegyzesek, betoltes, hozzaad, kedvencValt } = useBejegyzesek();

  const [kereses, setKereses] = useState('');
  const [szuro, setSzuro] = useState('osszes');

  // Renderelés közben számolt értékek, nincs rájuk külön state.
  const osszes = bejegyzesek.length;
  const kedvencek = bejegyzesek.filter((b) => b.kedvenc).length;

  const lathato = useMemo(() => {
    const kifejezes = kereses.trim().toLowerCase();
    return bejegyzesek.filter((b) => {
      const talalat = b.cim.toLowerCase().includes(kifejezes) || b.hely.toLowerCase().includes(kifejezes);
      const szuroOk =
        szuro === 'osszes' || (szuro === 'kedvenc' && b.kedvenc) || (szuro === 'nemkedvenc' && !b.kedvenc);
      return talalat && szuroOk;
    });
  }, [bejegyzesek, kereses, szuro]);

  return (
    <View style={[styles.gyoker, { backgroundColor: szinek.hatter }]}>
      <ScrollView contentContainerStyle={styles.tartalom} keyboardShouldPersistTaps="handled">
        <TemaValtoGomb />

        <View style={styles.sor}>
          <View style={[styles.statDoboz, { backgroundColor: szinek.kartya }]}>
            <Text style={{ color: szinek.szoveg }}>Összes: {osszes}</Text>
          </View>
          <View style={[styles.statDoboz, { backgroundColor: szinek.kartya }]}>
            <Text style={{ color: szinek.szoveg }}>Kedvenc: {kedvencek}</Text>
          </View>
        </View>

        <UjBejegyzes onHozzaad={hozzaad} />

        <TextInput
          style={[styles.mezo, { color: szinek.szoveg, backgroundColor: szinek.kartya }]}
          placeholder="Keresés cím vagy helyszín alapján"
          placeholderTextColor={szinek.szurke}
          value={kereses}
          onChangeText={setKereses}
        />
        <View style={styles.sor}>
          {SZUROK.map((s) => (
            <Pressable
              key={s.kulcs}
              onPress={() => setSzuro(s.kulcs)}
              style={({ pressed }) => [styles.gomb, szuro !== s.kulcs && styles.inaktiv, pressed && styles.lenyomva]}
            >
              <Text style={styles.gombSzoveg}>{s.felirat}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={{ color: szinek.szoveg }}>
          Találatok: {lathato.length} / {osszes}
        </Text>

        {betoltes ? (
          <Text style={{ color: szinek.szoveg }}>Betöltés...</Text>
        ) : (
          lathato.map((b) => (
            <Bejegyzes
              key={b.id}
              cim={b.cim}
              hely={b.hely}
              leiras={b.leiras}
              kedvenc={b.kedvenc}
              onKedvencValt={() => kedvencValt(b.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  gyoker: {
    flex: 1,
  },
  tartalom: {
    padding: 16,
    paddingTop: 56,
    gap: 10,
  },
  sor: {
    flexDirection: 'row',
    gap: 8,
  },
  statDoboz: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  mezo: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    padding: 10,
  },
  gomb: {
    flex: 1,
    backgroundColor: '#2f6fed',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  inaktiv: {
    backgroundColor: '#8a8a8a',
  },
  gombSzoveg: {
    color: '#ffffff',
  },
  lenyomva: {
    opacity: 0.5,
  },
});
