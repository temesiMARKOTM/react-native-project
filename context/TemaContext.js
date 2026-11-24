import { createContext } from 'react';

export const SZINEK = {
  vilagos: {
    hatter: '#f2f2f2',
    kartya: '#ffffff',
    szoveg: '#222222',
    szurke: '#777777',
    keret: '#d0d0d0',
  },
  sotet: {
    hatter: '#121212',
    kartya: '#1e1e1e',
    szoveg: '#f2f2f2',
    szurke: '#aaaaaa',
    keret: '#444444',
  },
};

// Az értéke { tema, valt } lesz: 'tema' 'vilagos' vagy 'sotet', a 'valt' pedig átkapcsol a másikra.
export const TemaContext = createContext(null);
