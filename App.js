import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Naplo from './components/Naplo';
import { TemaContext } from './context/TemaContext';

export default function App() {
  const [tema, setTema] = useState('vilagos');

  const valt = () => setTema((t) => (t === 'vilagos' ? 'sotet' : 'vilagos'));

  return (
    <TemaContext.Provider value={{ tema, valt }}>
      <Naplo />
      <StatusBar style={tema === 'vilagos' ? 'dark' : 'light'} />
    </TemaContext.Provider>
  );
}
