/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/

// IMPORTS
import React from 'react';

export default function PopularityWidget({ rangoDePopularidadElegido, popularidadC }) {
  const [min, max] = rangoDePopularidadElegido;

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= max) {
      popularidadC([newMin, max]);
    }
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= min) {
      popularidadC([min, newMax]);
    }
  };
  
  return (
    <div className="text-white">
      
      <div className="space-y-4">
        {/* Categorías predefinidas */}
        <div className="space-y-2 mt-4">
          <p className="text-xs font-semibold uppercase">Presets:</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              popularidadC([80, 100]);
            }}
            className="w-full bg-yellow-700 bg-opacity-70 hover:bg-yellow-600 hover:bg-opacity-100 transition px-3 py-2 rounded text-sm font-semibold">Mainstream
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              popularidadC([50, 80]);
            }}
            className="w-full bg-yellow-700 bg-opacity-70 hover:bg-yellow-600 hover:bg-opacity-100 transition px-3 py-2 rounded text-sm font-semibold">
            Medianamente popular
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              popularidadC([0, 50]);
            }}
            className="w-full bg-yellow-700 bg-opacity-70 hover:bg-yellow-600 hover:bg-opacity-100 transition px-3 py-2 rounded text-sm font-semibold">
            Underground
          </button>
        </div>
      </div>
    </div>
  );
}
