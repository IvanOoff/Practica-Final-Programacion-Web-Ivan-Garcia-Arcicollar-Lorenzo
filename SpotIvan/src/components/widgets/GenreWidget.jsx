/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/
'use client';

// IMPORTS
import { useEffect, useState } from 'react';
import { getAvailableGenres } from '@/lib/spotify';


// WIDGET CON LOS GENEROS MUSICALES..
export default function GenreWidget({generoSeleccionado, generoC}) {

// LISTA CON TODOS LOS GENEROS POSIBLES -> básicos.
const generosBasics = [ 'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical', 'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm', 'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes', 'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish', 'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music' ];

return (
<div className="bg-linear-to-br from-black to-gray-900 rounded-lg p-10 text-white">
<div className="flex flex-wrap gap-2">

{/*MAPEAMOS CADA GENERO -> BOTON PARA CADA UNO*/}
{generosBasics.map(generosBasics =>
    
<button onClick={() => generoC(generosBasics)} key={generosBasics} className={`px-3 py-2 rounded-full font-semibold transition ${generoSeleccionado.includes(generosBasics) ? 'bg-white text-gray-600' : 'bg-gray-800 hover:bg-gray-400'}`}>
    {generosBasics}
</button>

)}
</div>
</div>
);
}