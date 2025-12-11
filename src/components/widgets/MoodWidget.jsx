/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/
// IMPORTS
import React from 'react';

const moods = [{ id: 'triste', label: 'Triste', description: 'Música para llorar o para sentir emociones de tristeza fuertes.' },
,{ id: 'alegre', label: 'Alegre', description: 'Música alegre y optimista, para animar el cuerpo.' },
{ id: 'entrenamiento', label: 'Entrenamiento', description: 'Música para entrenar.' },
  { id: 'relax', label: 'Relajarse / Dormir', description: 'Música para dormir o estar tranquilo.' }
];


export default function MoodWidget({estadoElegido,estadoC }) {
  return (
    <div className="text-white" onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-2 gap-3">
        {moods.map(mood => (
          <button
            key={mood.id}
            onClick={(e) => {
              e.stopPropagation();
              estadoC(estadoElegido === mood.id ? null : mood.id);
            }}
            className={`p-3 rounded-lg transition font-semibold text-sm ${
              estadoElegido === mood.id
                ? 'bg-purple-400 shadow-lg scale-105'
                : 'bg-purple-700 hover:bg-purple-600'
            }`}
          >
            <div className="text-lg">{mood.label}</div>
            <div className="text-xs mt-1 opacity-80">{mood.description}</div>
          </button>
        ))}
      </div>

      {estadoElegido && (
        <div className="mt-4 bg-opacity-50 rounded-lg p-3 border border-opacity-30 border-white">
          <p className="text-sm text-center">
            Mood: <span className="font-bold capitalize">{estadoElegido}</span>
          </p>
        </div>
      )}
    </div>
  );
}
