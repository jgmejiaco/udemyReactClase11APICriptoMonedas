import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import useMoneda from '../../Hooks/useMoneda';
import useCriptomoneda from '../../Hooks/useCriptomoneda';
import axios from 'axios';
import Error from '../Error/error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda ,guardarCriptomoneda}) => {

    //  state del listado de Criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dólar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'COL', nombre: 'Peso Colombiano'},
    ]

    //  Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

    //  Utilizar useCritomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Critomoneda', '', listacripto);

    //  Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
            // console.log(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    //  Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //  Validar si ambos campos están llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        //  Pasar los dtos al componente ppal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (
        <form action="" onSubmit={cotizarMoneda}>

            {error ? <Error mensaje="Los campos son obligatorios" /> :  null}

            <SelectMonedas />

            <SelectCripto />

            <Boton type="submit" value="Calcular" />
        </form>
     );
}
 
export default Formulario;