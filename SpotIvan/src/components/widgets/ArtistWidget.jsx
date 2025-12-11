/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/

// IMPORTS
import { useState } from 'react';

//WIDGET PARA LOS ARTISTAS
export default function ArtistWidget({ artistaSeleccionado, aniadirCancionesC }){
    const [canciones, setcanciones] = useState([]);
    const [mostrarCanciones, setMostrarCanciones] = useState(false);

    // Convertimos milisegundos a minutos::segundos ->
    const duracionCancion = (ms) => {
        const minutos = Math.floor(ms / 60000);
        const segundos = Math.floor((ms % 60000) / 1000);
        return `${minutos}:${String(segundos)}`;
    };

    const obtenerTopTracks = async () => {
        if (!artistaSeleccionado) { 
            return;
        }
        
        try {
            const token = localStorage.getItem('spotify_token');
            const response = await fetch(`https://api.spotify.com/v1/artists/${artistaSeleccionado.id}/top-tracks?market=US`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            
            const data = await response.json();

            // Mostramos el top 10 canciones.
            setcanciones(data.tracks.slice(0,10));
            setMostrarCanciones(!mostrarCanciones);
        } catch {
        }
    };

    return (
        <div>
        {artistaSeleccionado ? (
            <div className="flex flex-col items-center">

                {/*DATOS DEL ARTISTA*/}
                    {artistaSeleccionado.images[0] && (
                        <div className="relative w-48 h-48 mb-4">
                            <img 
                                src={artistaSeleccionado.images[0].url} 
                                alt={artistaSeleccionado.name} 
                                className="w-full h-full object-cover rounded-lg"
                                style={{ 
                                    transform: 'skewY(-5deg) perspective(1000px)',
                                }}
                            />
                        </div>
                    )}
                        <div> <h3 className="text-white font-bold text-lg text-center">{artistaSeleccionado.name}</h3>
                        
                        {/*Boton para ver el top 10 canciones */}
                        </div>
                        <button
                            onClick={obtenerTopTracks}
                            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg transition">TOP 10
                        </button>
                        
                        {/*Mostramos las canciones del artista seleccionado */}
                        {mostrarCanciones && (
                            <div className="mt-4 w-full">
                                
                                {/*Espacio entre canciones */}
                                <div className="space-y-2">
                                    
                                    {/*Mapeamos todos los tracks de  */}
                                    {canciones.map((track, index) => (
                                        <div key={track.id} className="bg-gray-900 p-3 rounded-lg flex items-center gap-3">
                                            <span className="text-grat-100 font-bold">{index + 1}</span>
                                            
                                            {/*Para mostrar tanto la imagen como el nombre del track/cancion */}
                                            {track.album.images[0] && (
                                                <img src={track.album.images[0].url} alt={track.name} className="w-15 h-15 rounded"/>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white">{track.name}</p>
                                                <p className="text-white">{track.artists[0].name}</p>
                                            </div>
                                            
                                            {/*Llamamos para saber lo que dura la cancion después del calculo. */}
                                            <span className="text-gray-100">
                                            {duracionCancion(track.duration_ms)}
                                            </span>
                                            
                                            {/*Botón para agregar la cancion que el usuario quiera*/}
                                            <button className="hover:opacity-70 transition" onClick={() => {
                                            aniadirCancionesC([track]);
                                            }} 
                                            title="Agregar canción a la playlist">
                                            
                                            {/*Icono cogido de la página oficial de spotify*/}
                                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" style={{width: '24px', height: '24px'}} className="text-white"><path fill="currentColor" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path><path fill="currentColor" d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75"></path></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                        )}
                    </div>
            ) : (
                // Avisamos al usuario de que tiene que buscar un artista para poder ver su TOP10.
                <div className="text-center text-gray-400">
                    <p>Selecciona un artista para ver su TOP 10 canciones</p>
                </div>
            )}
        </div>
    );
}