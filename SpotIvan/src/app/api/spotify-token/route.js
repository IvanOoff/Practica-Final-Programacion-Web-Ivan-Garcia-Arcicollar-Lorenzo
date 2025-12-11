/*
  - PRACTICA FINAL SPOTIFY TASTE MIXER
  - Iván García-Arcicollar Lorenzo
  - INSV/3ºC

*/

export async function POST(request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return new Response( 
        JSON.stringify({ error: 'No code provided' }),
        { status: 400 }
      );
    }
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Spotify token error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to get token from Spotify' }),
        { status: response.status }
      );
    }

    const data = await response.json();
    const { access_token, refresh_token, expires_in } = data;

    return new Response(
      JSON.stringify({
        access_token,
        refresh_token,
        expires_in,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in token exchange:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
