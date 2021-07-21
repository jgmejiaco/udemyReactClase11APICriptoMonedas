import React, {useState, useEffect} from 'react';
import imagen from './cryptomonedas.png'
import styled from 'styled-components';
import Formulario from './components/Formulario/formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion/cotizacion';
import Spinner from './components/Spinner/spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;


function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
        //  Evitamos la ejecución la primera vez
      if(moneda === '') return;

      //  Consultar la API para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url); //  Envía el get request para obtener datos del servidor

      //  MOstrar el spinner
      guardarCargando(true);

      //  ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        //  cambiar el estado de cargando
        guardarCargando(false);

        //  guardar cotización
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);

    }
      cotizarCriptomoneda();
  }, [moneda, criptomoneda]);
    
  //  mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <div>
      {/* https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD */}
      {/* Link a todos los endpoints
      https://min-api.cryptocompare.com/documentation?key=Price&cat=multipleSymbolsFullPriceEndpoint */}

            <Contenedor>
        <div>
          <Imagen src={imagen} alt="imagen-crytomoneda"/>
        </div>

        <div>
          <Heading>Cotiza Criptomonedas al instante </Heading>

          <Formulario
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />

          {componente}

          {/* <Cotizacion resultado={resultado} /> */}
        </div>
      </Contenedor>
      
    </div>
  );
}

export default App;
