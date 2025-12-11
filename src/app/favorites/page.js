/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/

// PÁGINA DONDE ESTARÁN LAS CANCIOENS FAVORITAS QUE AÑADA EL USUARIO.
'use client';

// IMPORTS.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '@/lib/auth';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Favorites() {
  const r = useRouter();
  const [user, setUser] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  // KEY para favoritos en localStorage.
  const KEY = "favorite_tracks";

  useEffect(() => {
    if (!isAuthenticated()) {
      r.push('/');
      return;
    }

    // Cargamos el perfil
    const perfilDelUsuario = localStorage.getItem('user_profile');
    if (perfilDelUsuario) {
      setUser(JSON.parse(perfilDelUsuario));
    }

    // Cargar favoritos desde localStorage
    try {
      const pagina = localStorage.getItem(KEY);
      setFavoritos(pagina ? JSON.parse(pagina) : []);
    } catch {
      setFavoritos([]);
    }
  }, [r]);

  const handleLogout = () => {
    logout();
    r.push('/');
  };

  // Toggle favorito
  function toggleFavorito(track) {
    if (!track || !track.id) {
      return;
    }

    setFavoritos((prev) => {
      const exists = prev.some((f) => f.id === track.id);
      if (exists) 
        {
          const l =  prev.filter((f) => f.id !== track.id);
          return l;
        }
        
      return prev;
    });

    localStorage.setItem(KEY, JSON.stringify(
      favoritos.filter(f => f.id !== track.id)
    ));
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black text-white z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">

        {/*LOGO DE SPOTIFY */}
            <img src="https://img.icons8.com/ios11/512/FFFFFF/spotify.png" alt="Spotify-logo" width={40} height={40} />
            <h1 className="text-xl font-bold hidden sm:block"> Canciones que te gustan</h1>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition">← Volver
            </Link>
            {user && (
              <div className="flex items-center bg-gray-500 px-2 py-2 rounded-full">
                {user.images[0] && <img className="w-8 h-8 rounded-full" src={user.images[0].url} alt="User"/>}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transform hover:scale-110 transition">
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* CANCIONES */}
      <div className="pt-20 pb-20">

        {/*Para centrar la pagina*/}
        <div className="max-w-4xl mx-auto">

        {/* */}
          {favoritos.length === 0 ? (
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12 text-center">
              <p className="text-gray-400 text-lg mb-4">No has añadido canciones favoritas aún</p>
            </div>
            
          ) : (
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Tus Canciones Favoritas</h2>
            

              <div className="space-y-3">
                {favoritos.map((track, index) => (
                  <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition" key={`${track.id}-${index}`}>
                    
                    {/*A medida que van incrementando -> +1*/}
                    <span className="text-white font-bold">{index + 1}</span>

                    {track.album.images[0] && (
                      <img className="w-12 h-12 rounded" src={track.album.images[0].url} alt={track.name}/>)}

                      <div className="flex-1">
                      <p className="text-white font-semibold truncate">{track.name}</p>
                      <p className="text-gray-200"> {track.artists[0].name || ''}
                      </p>
                    </div>

                    {/* Duración de las canciones*/}
                    <span className="text-white">
                      {Math.floor((track.duration_ms || 0) / 60000)}:
                      {String(Math.floor(((track.duration_ms || 0) % 60000)/1000))}
                    </span>

                    {/* Botón para quitar de favoritos -> */}
                    <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-3" onClick={() => toggleFavorito(track)}>✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
