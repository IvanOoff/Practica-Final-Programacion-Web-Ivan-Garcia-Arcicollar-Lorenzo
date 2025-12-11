/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/

// IMPORTS.
import { getAccessToken } from './auth';

export async function generatePlaylist(preferences) {
  const { artists, genres, decades, popularity, mood } = preferences;
  const token = getAccessToken();
  let allTracks = [];

    // 1. Obtener top tracks de artistas seleccionados
    for (const artist of artists) {
        const tracks = await fetch(
          `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        const data = await tracks.json();
        if (data.tracks) { 
          allTracks.push(...data.tracks);
        }
    }

    // 2. Buscar por géneros
    for (const genre of genres) {
        const results = await fetch(
          `https://api.spotify.com/v1/search?type=track&q=${(genre)}&limit=20`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        const data = await results.json();
        if (data.tracks && data.tracks.items) {
          allTracks.push(...data.tracks.items);
        }
    }

    // 3. Si no hay artistas ni géneros, hacemos una búsqueda genérica -> añadimos 20 canciones random.
    
    // Comprobamos que está vacia la lista.
    if (allTracks.length === 0) {
        const results = await fetch(
          `https://api.spotify.com/v1/search?type=track&q=*&limit=50`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        const data = await results.json();
        if (data.tracks && data.tracks.items) {
          allTracks.push(...data.tracks.items);
        }
        
        // Buscamos canciones populares -> api.
          const backupResults = await fetch(
            `https://api.spotify.com/v1/search?type=track&q=is:popular&limit=50`,
            {
              headers: { 'Authorization': `Bearer ${token}` }
            }
          );
          const backupData = await backupResults.json();
          if (backupData.tracks && backupData.tracks.items) {
            allTracks.push(...backupData.tracks.items);
          }
    }

    
    // 4. Filtrar por década -> en cadena.
    if (decades && decades.length > 0) {
      allTracks = allTracks.filter(track => {
        const releaseDate = track.album.release_date;
        const year = new Date(releaseDate).getFullYear();
        return decades.some(decade => {
          const decadeStart = parseInt(decade);
          return year >= decadeStart && year < decadeStart + 10;
        });
      });
    }

    // Filtrar por popularidad
    if (popularity) {
      const [min, max] = popularity;
      allTracks = allTracks.filter(
        track => track.popularity >= min && track.popularity <= max
      );
    }

    // Filtrar por mood
    if (mood && mood !== '') {
      allTracks = allTracks.filter(track => {
        const trackPopularity = track.popularity || 50;
        
        switch (mood) {
          case 'alegre':
            return trackPopularity > 40;
          case 'triste':
            return trackPopularity < 70;
          case 'entrenamiento':
            return trackPopularity > 50;
          case 'relax':
            return trackPopularity < 80;
          default:
            return true;
        }
      });
    }

    // 5. Si después de filtrar quedan muy pocas canciones, expandir búsqueda
    if (allTracks.length < 15 && genres.length > 0) {
      try {
        const results = await fetch(
          `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(genres[0])}&limit=50`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        const data = await results.json();
        if (data.tracks && data.tracks.items) {
          allTracks.push(...data.tracks.items);
        }
      } catch (error) {
        console.error('Error en búsqueda de expansión:', error);
      }
    }

    // 6. Eliminar duplicados y limitar a 30 canciones
    const uniqueTracks = Array.from(
      new Map(allTracks.map(track => [track.id, track])).values()
    ).slice(0, 30);

    return uniqueTracks;
}