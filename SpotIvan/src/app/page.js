/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/
'use client';

// IMPORTS.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import Footer from '@/components/Footer';


// Página sin Log In -> Principal al cargar la página.
export default function Home() {
  const router = useRouter();

  // Función para la barra de búsqueda.
  const [search,setSearch] = useState('');

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  // Función para el inicio de sesión -> boton de inicio de sesión -> nos manda a la pagina de inicio de sesión de Spotify.
  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  const handleGenerarSinLogin = () => {
    alert('Para crear y compartir listas, inicia sesión'); 
   };

  // FRONT
  return (
    <div>
      {/*Navb*/}
      <nav className="fixed top-0 w-full bg-black text-white z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
          
          {/*Logo spoty*/}
          <img src="https://img.icons8.com/ios11/512/FFFFFF/spotify.png" alt="Spotify-logo" width={40} height={40} />

          {/* Barra de busqueda de canciones*/}
          <div className="hidden md:flex items-center gap-3 flex-1 justify-center">    

            {/*Boton de volver al home -> sacado de la pagina oficial de spoty*/}
            <div className="bg-gray-600 rounded-full p-3 w-12 h-12 flex items-center justify-center hover:bg-gray-500 transition transform hover:scale-110 cursor-pointer">
              <button className="w-10 h-10 hover:opacity-80 transition cursor-pointer" aria-label="Home">
                <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732z"></path>
                </svg>
              </button>
            </div>

            {/* Search Bar */}
            <div className="bg-gray-600 rounded-full px-4 py-2 flex items-center gap-2 w-80">
              <svg data-encore-id="icon" role="img" aria-hidden="true" className="w-5 h-5 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path>
              </svg>

              {/*Lógica de la función search -> va a guardar el texto del usuario */} 
              <input 
                className="bg-gray-600 border-none text-white placeholder-gray-400 focus:outline-none flex-1 w-full" 
                type="text" 
                placeholder='¿Qué quieres reproducir?'
                value={search} 
                onChange={(i) => setSearch(i.target.value)}
              />
            </div>
          </div>

          {/* Boton de iniciar sesion en spoty*/}
          <button className="ml-auto px-6 py-2 bg-gray-100 hover:bg-gray-100 text-black font-bold rounded-full transition transform hover:scale-110 cursor-pointer" onClick={handleLogin} >Iniciar sesión
          </button>
        </div>
      </nav>

      {/*Contenido de la pagina principal -> "Hero section"*/}
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 flex gap-7">
      
        {/* SECCION DE LA IZQUIERDA - TARGETA DE CREACIÓN DE PLAYLISTS*/}
        <div className="w-80 bg-gray-900 rounded-2xl border border-gray-800 p-6 min-h-[600px] sticky top-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Tu biblioteca</h2>
            <div className="flex items-center bg-gray-500 px-2 py-0.3 rounded-full">
              <button className="text-gray-300 hover:text-white text-2xl">+</button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-500 rounded-lg p-4">
              <h3 className="text-white font-bold mb-2">¡Crea tu primera playlist!</h3>
              <button 
                onClick={handleGenerarSinLogin}
                className="w-full bg-white text-black font-bold py-2 rounded-full hover:bg-gray-300 transition">
                Generar Playlist
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-bold mb-2">Encuentra podcasts que quieras seguir</h3>
              <p className="text-gray-400 text-sm">Te avisaremos cuando salgan nuevos episodios</p>
            </div>
          </div>
          <button className="w-full mt-6 border border-gray-400 text-gray-400 hover:text-white hover:border-white font-bold py-2 rounded-full transition flex items-center justify-center gap-2">
            Español de España
          </button>
        </div>

        {/* TARJETA DEL MEDIO - PRINCIPAL (SIN WIDGETS)*/}
        <div className="flex-1">
          <div className="max-w-full mx-auto bg-linear-to-b from-gray-800 to-black rounded-2xl border border-gray-900 p-6">
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-white mb-4">SpotIvan</h2>
              <p className="text-gray-500 mb-8">Inicia sesión para poder crear playlists</p>
              
              <button
                onClick={handleLogin}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-110">
                Iniciar Sesión con Spotify
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}