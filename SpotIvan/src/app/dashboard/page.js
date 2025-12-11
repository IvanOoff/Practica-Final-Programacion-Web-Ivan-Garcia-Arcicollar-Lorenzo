/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/
'use client';

// IMPORTS
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getAccessToken, logout } from '@/lib/auth';

// PARA GENERAR PLAYLISTS.
import { generatePlaylist } from '@/lib/spotify';

// WIDGETS.
import GenreWidget from '@/components/widgets/GenreWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';
import MoodWidget from '@/components/widgets/MoodWidget';
import ArtistWidget from '@/components/widgets/ArtistWidget';
import WidgetCard from '@/components/WidgetCard';
import Footer from '@/components/Footer';

export default function Dashboard() {
    // ESTADOS DE LA PAGINA.
    const r = useRouter();
    const [user, setUser] = useState(null);

    // Par apoder escribir.
    const [search, setSearch] = useState('');
    const [tokenDeAcceso, setTokenDeAcceso] = useState(null);
    const [resultadosArtistas, setresultadosArtistas] = useState([]);
    const busquedaRef = useRef(null);

    // ESTADOS DE LOS WIDGETS QUE CONTIENE EL DASHBOARD.
    const [generosDeMusica, setGenerosDeMusica] = useState([]);
    const [decadas, setDecadas] = useState([]);
    const [popularidadSeleccionada, setPopularidadSeleccionada] = useState([0, 100]);
    const [artistasSeleccionados, setArtistasSeleccionados] = useState([]);
    const [moodSeleccionado, setMoodSeleccionado] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);

    // KEY para favoritos en localStorage.
    const KEY = "favorite_tracks";

    // Estado para favoritos con inicialización desde localStorage.
    const [favoritos, setFavoritos] = useState(() => {
      try {
        const pagina = localStorage.getItem(KEY);
        return pagina ? JSON.parse(pagina) : [];
      } catch {
        return [];
      }
    });

// Si no esta login -> le mandamos a la pagina "/" <- principal.
  useEffect(() => {
    if (!isAuthenticated()) {
      r.push('/');
      return;
    }

    // Cargamos el perfil.
    const perfilDelUsuario = localStorage.getItem('user_profile');
    
    // Si coincide -> lo seteamos en la pagina.
    if (perfilDelUsuario) {
      setUser(JSON.parse(perfilDelUsuario));
    }

    const tokenUsu = getAccessToken();
    setTokenDeAcceso(tokenUsu);
  }, [r]);

  // Cuando los favoritos cambien, actualizamos el localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favoritos));
    } catch {}
  }, [favoritos]);

  // EFECT PARA BUSCAR ARTISTAS EN TIEMPO REAL.
  useEffect(() => {
    if (!search || search.trim() === '') {
      setresultadosArtistas([]);
      return;
    }
    const usuarioBusqueda = search.trim();

    if (busquedaRef.current) {
      try {
        busquedaRef.current.abort();
      } catch { }
    }

    const controller = new AbortController();
    busquedaRef.current = controller;

    const buscar = async () => {
      try {
        const token = localStorage.getItem('spotify_token');
        const response = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(usuarioBusqueda)}&limit=10`,
          {
            headers: { 'Authorization': `Bearer ${token}` },
            signal: controller.signal
          }
        );
        const data = await response.json();
        setresultadosArtistas(data.artists.items || []);
      } catch {
        setresultadosArtistas([]);
      }
    };

    buscar();
  }, [search]);

  // Función para obtener los top 5 tracks de un artista.
  const cancionesCantantes = async(artistId,artistName) => {
    
    // Primero, obtenemis los datos del artista para mostrarlo en el widget.
    try {
      const token = localStorage.getItem('spotify_token');
      
      // Obtenemos los datos del artista del token.
      const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const artistData = await artistResponse.json();
      
      // Guardamos el artista en el widget
      setArtistaSeleccionado(artistData);

      setSearch('');
      setresultadosArtistas([]);
    } catch {
    }
  }

  // Función para agregar tracks desde el ArtistWidget (modal)
  const handleAddTracks = (tracks) => {
    setPlaylist([...playlist, ...tracks]);
  };

  // Función para refrescar playlist (generar nuevamente con mismas preferencias)
  const refrescarPlaylist = async() => {
    if(generosDeMusica.length <= 0 && decadas.length <= 0 && artistasSeleccionados.length <= 0) {
        alert("INTRODUCE UN GÉNERO, DÉCADA O ARTISTAS PORFAVOR");
        return;
    }

    try {
      const preferenciasUsuario = { 
        genres: generosDeMusica, 
        decades: decadas,
        popularity: popularidadSeleccionada, 
        artists: artistasSeleccionados, 
        mood: moodSeleccionado
      };

      const resultados = await generatePlaylist(preferenciasUsuario);
      setPlaylist(resultados);
      alert('Playlist refrescada ✓');
    } catch (error) {
      console.error('Error:', error);
      alert('ERROR AL REFRESCAR LA PLAYLIST');
    }
  }

  // Función para añadir más canciones a la playlist existente
  const aniadirMasAlmohadas = async() => {
    if(generosDeMusica.length <= 0 && decadas.length <= 0 && artistasSeleccionados.length <= 0) {
        alert("INTRODUCE UN GÉNERO, DÉCADA O ARTISTAS PORFAVOR");
        return;
    }

    try {
      const preferenciasUsuario = { 
        genres: generosDeMusica, 
        decades: decadas,
        popularity: popularidadSeleccionada, 
        artists: artistasSeleccionados, 
        mood: moodSeleccionado
      };

      const resultados = await generatePlaylist(preferenciasUsuario);
      setPlaylist([...playlist, ...resultados]);
      alert('Se añadieron más canciones ✓');
    } catch (error) {
      console.error('Error:', error);
      alert('ERROR AL AÑADIR CANCIONES');
    }
  }

  // Comprobamos que introduce datos.
  const generaPlayLists = async() => {
    if(generosDeMusica.length <= 0 && decadas.length <= 0 && artistasSeleccionados.length <= 0) {
        alert("INTRODUCE UN GÉNEROS, DÉCADA O ARTISTAS PORFAVOR");
        return;
    }

    try {
      const preferenciasUsuario = { 
        genres: generosDeMusica, 
        decades: decadas,
        popularity: popularidadSeleccionada, 
        artists: artistasSeleccionados, 
        mood: moodSeleccionado
      };

      const resultados = await generatePlaylist(preferenciasUsuario);
      setPlaylist(resultados);
    } catch (error) {
      console.error('Error:', error);
      alert('ERROR AL GENERAR LA PLAYLIST');
    }
  }

  // Función para guardar la playlist a Spotify
  const guardarPlaylistEnSpotify = async () => {
    if (!playlist || playlist.length === 0) {
      alert('No hay canciones en la playlist');
      return;
    }

    try {
      const token = localStorage.getItem('spotify_token');
      
      // Creamos la playlist.
      const playlistResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Mi Playlist Generada',
          description: 'Playlist generada con Spotify Taste Mixer',
          public: true
        })
      });

      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;

      // Agregamos las canciones a la playlist ->
      const trackUris = playlist.map(track => track.uri);
      
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method:'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uris: trackUris
          })
        }
      );
      alert(`¡PLAYLIST AGREGADA EN SPOTIFY!`);
      
    } catch {}
  };

  // Para controlar cuando de desloguea -> le mandamos a la pagina principal.
  const handleLogout = () => {
    logout();
    r.push('/');
  };

  // Comprobamos si esta en favoritos.
  function esFavorito(id) {
    return favoritos.some((f) => f.id === id);
  }

  // Toggle favorito
  function toggleFavorito(track) {
    if (!track || !track.id) 
    {
      return;
    }

    setFavoritos((prev) => {
      const exists = prev.some((f) => f.id === track.id);
      if (exists) return prev.filter((f) => f.id !== track.id);

      const compacto = {
        id: track.id,
        name: track.name ?? '',
        uri: track.uri ?? '',
        album: {
          images: track.album?.images ?? []
        },
        artists: track.artists ?? [],
        duration_ms: track.duration_ms ?? 0
      };
      return [...prev, compacto];
    });
  }

return (
    <div>

      {/*Navb*/}
      <nav className="fixed top-0 w-full bg-black text-white z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
          

          {/*Logo spoty*/}
          <img src="https://img.icons8.com/ios11/512/FFFFFF/spotify.png" alt="Spotify-logo" width={40} height={40} />

          {/* Barra de busqueda de canciones*/}
          <div className="flex flex-col md:flex-row items-center gap-3 flex-1 justify-center">    

            {/*Boton de volver al home -> sacado de la pagina oficial de spoty*/}
            <div className="hidden md:flex bg-gray-600 rounded-full p-3 w-12 h-12 items-center justify-center hover:bg-gray-500 transition transform hover:scale-110 cursor-pointer">
              <button className="w-10 h-10 hover:opacity-80 transition cursor-pointer" onClick={() => {window.location.reload();}}>
                <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor">
                  <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732z"></path>
                </svg>
              </button>
            </div>

            {/* Search Bar */}
            <div className="bg-gray-600 rounded-full px-3 sm:px-4 py-2 flex items-center gap-2 w-full sm:w-96 md:w-80 relative">
              <svg data-encore-id="icon" role="img" aria-hidden="true" className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path>
              </svg>

              {/*Lógica de la función search -> va a guardar el texto del usuario */} 
              <input 
                className="bg-gray-600 border-none text-white placeholder-gray-400 focus:outline-none flex-1 w-full text-sm sm:text-base"
                type="text" 
                placeholder='¿Qué quieres reproducir?'
                value={search} 
                onChange={(i) => setSearch(i.target.value)}
              />

              {/* Dropdown de los artistas filtrados*/}
              {search && resultadosArtistas.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg max-h-96 overflow-y-auto z-50">
                  {resultadosArtistas.map(artist => (
                    <div
                      key={artist.id}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-700 cursor-pointer transition border-b border-gray-700 last:border-b-0"
                      onClick={() => cancionesCantantes(artist.id, artist.name)}>

                      {artist.images && artist.images[0] && (<img src={artist.images[0].url} alt={artist.name} className="w-8 sm:w-10 h-8 sm:h-10 rounded-full" />
                      )}  
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-white font-semibold">{artist.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* PERFIL DEL USUARIO */}
          <div className="flex items-center gap-4">
            {user && (
              <div className= "flex items-center bg-gray-500 px-2 py-2 rounded-full">
                {user.images[0] && ( <img className="w-8 h-8 rounded-full" src={user.images[0].url}/>
                )}
              </div>
            )}

            <a
              href="/favorites"
              className="transform hover:scale-110 transition">
              <img src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84b153a935fb9526d6c37bedfd" alt="Favoritas" className="w-12 h-12 rounded-full border-3 border-black hover:border-white transition"/>
            </a>

        {/*Si pulsa el LogOut -> llamará a la funcion y volverá a la pargina de logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transform hover:scale-110 transition"> Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/*Contenido de la pagina principal -> "Hero section"*/}
        <div className="pt-20 pb-20 px-2 sm:px-4 flex flex-col lg:flex-row gap-4 lg:gap-7">
      
      {/* SECCION DE LA IZQUIERDA - TARGETA DE CREACIÓN DE PLAYLISTS*/}
      <div className="w-full lg:w-80 bg-gray-900 rounded-2xl border border-gray-800 p-4 sm:p-6 lg:min-h-[600px] lg:sticky lg:top-20">
      <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-white">Tu biblioteca</h2>
      <div className= "flex items-center bg-gray-500 px-2 py-0.3 rounded-full">
      <button className="text-gray-300 hover:text-white text-2xl">+</button>
      </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-500 rounded-lg p-4">
        <h3 className="text-white font-bold mb-2 text-sm sm:text-base">¡Crea tu primera playlist!</h3>
        <button 
          onClick={generaPlayLists}
          className="w-full bg-white text-black font-bold py-2 rounded-full hover:bg-gray-300 transition text-sm sm:text-base">
          Generar Playlist
        </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-bold mb-2 text-sm sm:text-base">Encuentra podcasts que quieras seguir</h3>
        <p className="text-gray-400 text-xs sm:text-sm">Te avisaremos cuando salgan nuevos episodios</p>
        </div>
      </div>
      <button className="w-full mt-6 border border-gray-400 text-gray-400 hover:text-white hover:border-white font-bold py-2 rounded-full transition flex items-center justify-center gap-2 text-sm sm:text-base">
      Español de España
      </button>
      </div>

  {/* TARJETA DEL MEDIO - PRINCIPAL CON TODOS LOS WIDGETS */}
  <div className="flex-1 w-full">
    <div className="max-w-full mx-auto bg-linear-to-b from-gray-800 to-black rounded-2xl border border-gray-900 p-2 sm:p-4">

      {/* GRID DE WIDGETS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">

        {/* GENEROS */}
        <WidgetCard title="Géneros" color="gray-900" image = "https://i.scdn.co/image/ab67fb8200005cafef78c123c1bf7d58c6708e89" >
          <GenreWidget
            generoSeleccionado={generosDeMusica}
            generoC={(genre) => {
              if (generosDeMusica.includes(genre)) {
                setGenerosDeMusica(generosDeMusica.filter(gen => gen !== genre));
              } else {
                setGenerosDeMusica([...generosDeMusica, genre]);
              }
            }}
          />
        </WidgetCard>

        {/* DÉCADAS */}
        <WidgetCard title="Décadas" color="blue" image ="https://i.scdn.co/image/ab67fb8200005cafb374a69b5409cdc2b5036bfc">
          <DecadeWidget
            decadaSeleccionadaUsuario={decadas}
            cambioDeDecadaC={(decada) => {
              if(decadas.includes(decada)){
                setDecadas(decadas.filter(d => d !== decada));
              }
              else{
                setDecadas([...decadas, decada]);
              }
            }}
          />
        </WidgetCard>

        {/* POPULARIDAD */}
        <WidgetCard title="Popularidad" color="yellow" image="https://charts-images.scdn.co/assets_generated/locale_es/regional/weekly/region_es_default.jpg">
          <PopularityWidget
            rangoDePopularidadElegido={popularidadSeleccionada}
            popularidadC={(popularity) => {
              setPopularidadSeleccionada(popularity);
            }}
          />
        </WidgetCard>

        {/* MOOD */}
        <WidgetCard title="Mood" color="purple" image = "https://i.scdn.co/image/ab67fb8200005cafe542e9b59b1d2ae04b46b91c">
          <MoodWidget
            estadoElegido={moodSeleccionado}
            estadoC={(mood) => {
              setMoodSeleccionado(mood);
            }}
          />
        </WidgetCard>

        {/* ARTISTAS */}
        <WidgetCard title={`Top 10 ${artistaSeleccionado?.name || ''}`} color="red-700" image="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb">
          <ArtistWidget
            artistaSeleccionado={artistaSeleccionado}
            aniadirCancionesC={handleAddTracks}
          />
        </WidgetCard>
      </div>

      {/* BOTÓN PARA GENERAR PLAYLIST */}
      <div className="mt-6 flex gap-4">
      </div>

      {/* PLAYLISTS */}
      {playlist.length > 0 && (
        <div className="mt-6 sm:mt-8 bg-gray-900 rounded-2xl border border-gray-800 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-lg sm:text-2xl font-bold text-white">Tu Playlist con {playlist.length} canciones</h2>
           
            {/* BOTON PARA GENERAR NUEVAS CANCIONES */}
           
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => refrescarPlaylist()}
                className="flex-1 sm:flex-none bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition text-sm sm:text-base">
                Refrescar
              </button>
              <button
                onClick={() => aniadirMasAlmohadas()}
                className="flex-1 sm:flex-none bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition text-sm sm:text-base"
              >
              Añadir
              </button>
              <button
                onClick={() => guardarPlaylistEnSpotify()}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition text-sm sm:text-base"
              >
              Guardar a Spotify
              </button>
            </div>
          </div>

          {/* Lista de canciones */}
          <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
            {playlist.map((track, index) => (
              <div
                key={`${track.id}-${index}`}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
              >
                <span className="text-white font-bold text-sm sm:text-base">{index + 1}</span>
                
                {track.album.images[0] && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded"
                  />
                )}

                <div className="flex-1 min-w-0 grow">
                  <p className="text-white font-semibold truncate text-sm sm:text-base">{track.name}</p>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">
                    {track.artists[0].name}
                  </p>
                </div>
                
                {/*Duracion del track */}
                <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                  {Math.floor(track.duration_ms / 60000)}:
                  {String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
                </span>

                {/* Botones para quitar las canciones de la lista */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorito(track)}
                    className="text-xl hover:opacity-70 transition"
                    title={esFavorito(track.id) ? "Quitar de favoritos" : "Añadir a favoritos"}>
                    {esFavorito(track.id) ? "⭐" : "☆"}
                  </button>
                  <button
                    onClick={() => setPlaylist(playlist.filter(track => track.id !== playlist[index].id))}
                    className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-3"
                    title="Eliminar canción de la lista">✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  
  </div>
    <Footer />
    </div>
  );
}

