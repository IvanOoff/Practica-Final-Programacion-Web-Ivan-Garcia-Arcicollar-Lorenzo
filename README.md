# Spotify Taste Mixer

Aplicación web que genera playlists personalizadas de Spotify basándose en las preferencias musicales del usuario.

## Características

- Autenticación OAuth 2.0 con Spotify
- 5 Widgets de Preferencias:
  - Géneros musicales
  - Décadas/Años
  - Popularidad
  - Mood (Alegre, Triste, Entrenamiento, Relax)
  - Artistas favoritos
- Generación de Playlists combinando filtros
- Gestión de Playlist (eliminar, favoritos, refrescar, añadir)
- Página de Favoritos con localStorage
- Diseño Responsive

## Cómo Empezar

### Requisitos
- Node.js 18+
- Cuenta de Spotify Developer

### Instalación

1. Ir al directorio del proyecto
```bash
cd npx
npm install
```

2. Configurar variables de entorno en .env.local
```bash
SPOTIFY_CLIENT_ID=tu_id
SPOTIFY_CLIENT_SECRET=tu_secret
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=tu_id
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback
```

3. Ejecutar
```bash
npm run dev
```

Abre http://localhost:3000

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.js              # Página de login
│   ├── dashboard/page.js    # Panel principal con widgets
│   ├── favorites/page.js    # Página de canciones favoritas
│   ├── auth/callback/page.js # Callback de OAuth
│   └── api/                 # Routes del servidor
├── components/
│   ├── widgets/             # Componentes de widgets
│   ├── Navbar.jsx
│   └── Footer.jsx
└── lib/
    ├── spotify.js           # Funciones API Spotify
    └── auth.js              # Funciones de autenticación
```

## Funcionamiento

1. Login con OAuth 2.0 de Spotify
2. Seleccionar preferencias en los widgets
3. Generar playlist según los filtros seleccionados
4. Gestionar la playlist (eliminar, favoritear, refrescar, añadir)
5. Ver todas las canciones favoritas en la sección de favoritos

## Tecnologías

- Next.js 14
- React 18
- Tailwind CSS
- Spotify Web API
- OAuth 2.0

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
