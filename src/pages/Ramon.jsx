import React, { useEffect, useState } from 'react';

export function Ramon() {
  const [num, setNum] = useState();
  const [jogos, setJogos] = useState([]);


  function sorteio() {

    var sorteados = Math.floor(Math.random() * 61);
    // console.log(sorteados)
    setJogos([...jogos, sorteados])
  }

  function gerador(num) {
    if (num != 0 || num <= 61) {
      for (let i = 1; i <= num; i++) {
        sorteio()
      }
    }
  }

  console.log(jogos)

  return (
    <main>

        <input
          onChange={(text) => setNum(text.target.value)}
        />
        <button
          onClick={() => gerador(num)}
        >Gerar Numeros</button>

    </main>
  )
}