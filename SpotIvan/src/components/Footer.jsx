/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/


// FOOTER DE LA APP.
export default function Footer() {
  return (

    <footer className="bg-black border-t border-gray-800 text-gray-400 mt-20">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LOGO Y DESCRIPCIÓN */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="https://img.icons8.com/ios11/512/FFFFFF/spotify.png" alt="Spotify-logo" width={32} height={32} />
              <h3 className="text-white font-bold text-lg">SpotIvan</h3>
            </div>
          </div>

          {/*ENLACES Y REDES SOCIALES */}
          <div>
            <h3 className="text-white font-bold mb-4">Enlaces</h3>
            <ul className="space-y-1">
            
            {/*LISTA CON LOS ENLACES */}
              <li>
                <a href="https://github.com" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-white transition">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/*INFORMACIÓN */}
          <div>
            <h4 className="text-white font-bold mb-4">Sobre mí</h4>
            <ul className="space-y-2 text-sm">
              <li>Autor: Iván García-Arcicollar Lorenzo</li>
              <li>Proyecto Final Spotify / Programación Web I Cliente</li>
              <li>INSV / 3ºC</li>
            </ul>
          </div>
        </div>

        {/* Línea divisora y copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>Realizado usando - Next.js, React y Spotify Web API</p>
          <p className="mt-2">© 2025 SpotIvan</p>
        </div>
      </div>
    </footer>
  );
}
