import { useEffect, useState } from 'react';

const MINTALISTA = [
  {
    id: 1,
    cim: 'Balatoni hétvége',
    hely: 'Siófok',
    leiras: 'Napsütés, fagyi és hosszú séta a parton.',
    kedvenc: false,
  },
  {
    id: 2,
    cim: 'Egri vár',
    hely: 'Eger',
    leiras: 'Felmentünk a bástyákra, onnan szép a kilátás a városra.',
    kedvenc: true,
  },
  { id: 3, cim: 'Tokaji borvidék', hely: 'Tokaj', kedvenc: false },
];

export default function useBejegyzesek() {
  const [bejegyzesek, setBejegyzesek] = useState([]);
  const [betoltes, setBetoltes] = useState(true);

  // Csak az első renderelés után fut le (üres függőségi lista).
  // A setTimeout egy lassú betöltést szimulál.
  useEffect(() => {
    const idozito = setTimeout(() => {
      setBejegyzesek(MINTALISTA);
      setBetoltes(false);
    }, 800);

    // Takarítás: ha a komponens eltűnik betöltés előtt, ne maradjon időzítő.
    return () => clearTimeout(idozito);
  }, []);

  const hozzaad = (cim, hely) => {
    const uj = { id: Date.now(), cim, hely, kedvenc: false };
    setBejegyzesek((b) => [...b, uj]);
  };

  const kedvencValt = (id) => {
    setBejegyzesek((b) => b.map((elem) => (elem.id === id ? { ...elem, kedvenc: !elem.kedvenc } : elem)));
  };

  return { bejegyzesek, betoltes, hozzaad, kedvencValt };
}
