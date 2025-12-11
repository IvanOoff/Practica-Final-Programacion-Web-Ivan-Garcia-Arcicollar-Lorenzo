/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/

// IMPORTS
import { useEffect, useState } from 'react';
import { getAvailableGenres } from '@/lib/spotify';

// WIDGET PARA LAS DÉCADAS MUSICALES.
export default function DecadeWidget({decadaSeleccionadaUsuario, cambioDeDecadaC}) {

    // LISTA CON TODAS LAS DÉCADAS POSIBLES HASTA DÍA DE HOY.
    const decadasBasics = ['1950s','1960s', '1970s', '1980s', '1990s', '2000s','2010s','2020s'];

    return (
        <div className="text-white">

            {/* MAPEAMOS CADA DÉCADA -> BOTÓN PARA CADA UNA DE ELLAS -> */}
            {decadasBasics.map(decada =>
                    <button onClick={() => cambioDeDecadaC(decada)} key={decada} className={`px-4 py-2 rounded-full font-semibold transition ${decadaSeleccionadaUsuario.includes(decada) ? 'bg-white text-black' : 'bg-black hover:bg-gray-600'}`}>
                    {decada}
                    </button>
                )}
            </div>
    );
}