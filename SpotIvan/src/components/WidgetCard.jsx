/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/

import React, { useState } from 'react';

export default function WidgetCard({ title, icon, color, children, defaultOpen = false, image }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const colorClasses = {
    green: 'from-green-600 to-green-800',
    blue: 'from-blue-600 to-blue-800',
    yellow: 'from-yellow-600 to-yellow-800',
    purple: 'from-purple-600 to-purple-800',
    'gray-900': 'from-gray-800 to-gray-900',
    'red-700': 'from-red-600 to-red-800',
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`bg-linear-to-br ${colorClasses[color] || colorClasses.green} rounded-xl cursor-pointer transition-all duration-300 transform hover:shadow-xl text-white ${
        isOpen ? 'col-span-1 md:col-span-2' : 'min-h-64'
      }`}
    >
      {/* Vista colapsada - Solo muestra título e icono o imagen */}
      {!isOpen ? (
        <div className="h-64 flex flex-col items-center justify-center p-6 hover:scale-105 transition transform">
          {image ? (
            <div className="relative w-32 h-32 mb-3">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover rounded-lg"
                style={{ 
                  transform: 'rotate(8deg)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
                }}
              />
            </div>
          ) : (
            <div className="text-6xl mb-3">{icon}</div>
          )}
          <h3 className="text-2xl font-bold text-center">{title}</h3>
          <p className="text-xs mt-3 opacity-70">Haz clic para expandir</p>
        </div>
      ) : (
        // Vista expandida - Muestra el widget completo
        <div className="p-6 w-full" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-opacity-30 border-white">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{icon}</div>
              <h3 className="text-3xl font-bold">{title}</h3>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-3xl hover:opacity-70 transition font-light"
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto max-h-96">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
