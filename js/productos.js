/* =====================================================
   CATÁLOGO — aquí cambias precios, descripciones y días.
   Para agregar una app, copia una línea y cambia sus datos.
   Para ocultar una app, bórrala o ponle  oculto: true
   (precio en pesos colombianos, sin puntos)
===================================================== */

const CATEGORIAS = [
    { id: "todas",     nombre: "Todas",             emoji: "✨" },
    { id: "streaming", nombre: "Streaming",         emoji: "🎬" },
    { id: "tv",        nombre: "TV y deportes",     emoji: "📺" },
    { id: "musica",    nombre: "Música",            emoji: "🎧" },
    { id: "gaming",    nombre: "Gaming",            emoji: "🎮" },
    { id: "diseno",    nombre: "Diseño",            emoji: "🎨" },
    { id: "trabajo",   nombre: "Trabajo y estudio", emoji: "💼" },
    { id: "seguridad", nombre: "Seguridad",         emoji: "🛡️" },
    { id: "combos",    nombre: "Combos y cuentas",  emoji: "🔥" }
];

/*
  Campos:
  id        → identificador único (sin espacios)
  nombre    → nombre en la tarjeta
  sigla     → letras del icono
  cat       → categoría (ver lista de arriba)
  precio    → valor en COP
  duracion  → texto de duración
  acceso    → pantallas / dispositivos
  desc      → mini descripción
  etiqueta  → (opcional) cinta pequeña: "Promo", "Cuenta completa"
*/
const PRODUCTOS = [

    /* ---------- STREAMING (video) ---------- */
    { id: "netflix",   nombre: "Netflix",          sigla: "N",   cat: "streaming", precio: 12000, duracion: "30 días", acceso: "1 pantalla",
      desc: "Series, películas, documentales y anime. Tu perfil propio para ver cuando quieras." },
    { id: "disney-espn", nombre: "Disney+ con ESPN", sigla: "D+", cat: "streaming", precio: 14000, duracion: "30 días", acceso: "1 pantalla",
      desc: "Disney, Pixar, Marvel, Star Wars y deportes en vivo con ESPN." },
    { id: "disney",    nombre: "Disney+ sin ESPN", sigla: "D+",  cat: "streaming", precio: 10000, duracion: "30 días", acceso: "1 pantalla",
      desc: "Todo el universo Disney, Pixar, Marvel y Star Wars, sin el plan de deportes." },
    { id: "hbo",       nombre: "HBO Max",          sigla: "HBO", cat: "streaming", precio: 10000, duracion: "30 días", acceso: "1 pantalla",
      desc: "Series y películas premium de HBO, Warner y DC." },
    { id: "paramount", nombre: "Paramount+",       sigla: "P+",  cat: "streaming", precio: 10000, duracion: "30 días", acceso: "1 pantalla",
      desc: "Estrenos de cine, series originales y canales de Paramount." },
    { id: "prime",     nombre: "Prime Video",      sigla: "PV",  cat: "streaming", precio: 10000, duracion: "30 días", acceso: "1 pantalla",
      desc: "Series y películas originales de Amazon y un gran catálogo de cine." },
    { id: "crunchyroll", nombre: "Crunchyroll",    sigla: "CR",  cat: "streaming", precio: 7000,  duracion: "30 días", acceso: "1 pantalla",
      desc: "El mejor anime con estrenos y miles de episodios para maratonear." },
    { id: "vix",       nombre: "ViX",              sigla: "ViX", cat: "streaming", precio: 7000,  duracion: "30 días", acceso: "1 pantalla",
      desc: "Series, novelas, cine y contenido en español para toda la familia." },
    { id: "universal", nombre: "Universal+ (con anuncios)", sigla: "U+", cat: "streaming", precio: 8000, duracion: "30 días", acceso: "1 pantalla",
      desc: "Series, películas y realities de Universal con anuncios." },
    { id: "mubi",      nombre: "MUBI",             sigla: "M",   cat: "streaming", precio: 15000, duracion: "25 días", acceso: "1 dispositivo",
      desc: "Cine de autor e independiente, curado y renovado cada día. Cuenta completa." },
    { id: "viki",      nombre: "Rakuten Viki",     sigla: "V",   cat: "streaming", precio: 10000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Doramas coreanos, chinos y asiáticos con subtítulos en español." },

    /* ---------- TV Y DEPORTES ---------- */
    { id: "directv-espn", nombre: "DIRECTV GO + ESPN (sin Win)", sigla: "DTV", cat: "tv", precio: 30000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Canales de TV en vivo y ESPN para ver deportes. Plan sin Win." },
    { id: "directv-win", nombre: "DIRECTV GO + Win", sigla: "DTV", cat: "tv", precio: 35000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Canales de TV en vivo más Win para no perderte ningún partido." },
    { id: "win",       nombre: "Win+",             sigla: "W+",  cat: "tv", precio: 28000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Fútbol y deportes en vivo, partidos y contenido exclusivo." },
    { id: "flujotv",   nombre: "Flujo TV",         sigla: "FTV", cat: "tv", precio: 7000,  duracion: "30 días", acceso: "1 dispositivo",
      desc: "Canales de televisión en vivo desde tu celular, TV o computador." },
    { id: "iptv",      nombre: "IPTV",             sigla: "TV",  cat: "tv", precio: 8000,  duracion: "30 días", acceso: "1 dispositivo",
      desc: "Lista de canales en vivo para ver en tu Smart TV, celular o PC." },
    { id: "emby",      nombre: "Emby + Canales",   sigla: "E",   cat: "tv", precio: 11000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Tu centro multimedia con canales incluidos, en todos tus dispositivos." },
    { id: "plex",      nombre: "Plex Premium",     sigla: "PX",  cat: "tv", precio: 10000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Organiza y reproduce tus películas y series con funciones premium." },

    /* ---------- MÚSICA ---------- */
    { id: "spotify",   nombre: "Spotify Premium",  sigla: "S",   cat: "musica", precio: 10000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Música y podcasts sin anuncios, con descargas para escuchar sin internet." },
    { id: "deezer",    nombre: "Deezer",           sigla: "Dz",  cat: "musica", precio: 10000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Millones de canciones en alta calidad, sin anuncios y con modo sin conexión." },

    /* ---------- GAMING ---------- */
    { id: "gamepass",  nombre: "Game Pass Ultimate", sigla: "GP", cat: "gaming", precio: 44000, duracion: "25 días", acceso: "1 dispositivo",
      desc: "Catálogo de juegos para Xbox y PC, juego en la nube y beneficios online." },
    { id: "psplus",    nombre: "PlayStation Plus Deluxe", sigla: "PS+", cat: "gaming", precio: 95000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Juego online, catálogo de títulos de PlayStation y clásicos." },

    /* ---------- DISEÑO ---------- */
    { id: "canva",     nombre: "Canva Pro",        sigla: "C",   cat: "diseno", precio: 7000, duracion: "27 días", acceso: "1 dispositivo",
      desc: "Plantillas premium, quitar fondos, kit de marca y millones de recursos." },

    /* ---------- TRABAJO Y ESTUDIO ---------- */
    { id: "chatgpt",   nombre: "ChatGPT Plus",     sigla: "GPT", cat: "trabajo", precio: 40000, duracion: "30 días", acceso: "1 dispositivo",
      desc: "Asistente de IA avanzado para escribir, estudiar, programar y crear." },
    { id: "office",    nombre: "Microsoft Office 365", sigla: "O365", cat: "trabajo", precio: 50000, duracion: "1 año", acceso: "1 dispositivo",
      desc: "Word, Excel, PowerPoint y más, con almacenamiento en la nube." },
    { id: "duolingo",  nombre: "Duolingo",         sigla: "Du",  cat: "trabajo", precio: 10000, duracion: "25 días", acceso: "1 dispositivo",
      desc: "Aprende idiomas sin anuncios y con vidas ilimitadas." },

    /* ---------- SEGURIDAD ---------- */
    { id: "nordvpn",   nombre: "NordVPN",          sigla: "VPN", cat: "seguridad", precio: 13000, duracion: "25 días", acceso: "1 dispositivo",
      desc: "Navega seguro y privado, y accede a contenido de otros países." },
    { id: "avast",     nombre: "Avast Antivirus",  sigla: "AV",  cat: "seguridad", precio: 70000, duracion: "1 año", acceso: "1 dispositivo",
      desc: "Protección contra virus, malware y amenazas durante todo el año." },

    /* ---------- COMBOS Y CUENTAS COMPLETAS ---------- */
    { id: "netflix-promo", nombre: "Netflix Promoción", sigla: "N×2", cat: "combos", precio: 22000, duracion: "30 días", acceso: "2 pantallas", etiqueta: "Promo",
      desc: "Dos pantallas de Netflix para compartir con tu pareja o familia." },
    { id: "disney-espn-cuenta", nombre: "Disney+ con ESPN · Cuenta completa", sigla: "D+", cat: "combos", precio: 36000, duracion: "30 días", acceso: "6 pantallas", etiqueta: "Cuenta completa",
      desc: "La cuenta entera de Disney+ con ESPN para toda la familia." },
    { id: "disney-cuenta", nombre: "Disney+ sin ESPN · Cuenta completa", sigla: "D+", cat: "combos", precio: 21000, duracion: "30 días", acceso: "6 pantallas", etiqueta: "Cuenta completa",
      desc: "La cuenta entera de Disney+ sin ESPN, con 6 pantallas." },
    { id: "hbo-cuenta", nombre: "HBO Max · Cuenta completa", sigla: "HBO", cat: "combos", precio: 17000, duracion: "30 días", acceso: "6 pantallas", etiqueta: "Cuenta completa",
      desc: "Toda la cuenta de HBO Max, ideal para repartir entre varios." },
    { id: "paramount-cuenta", nombre: "Paramount+ · Cuenta completa", sigla: "P+", cat: "combos", precio: 20000, duracion: "30 días", acceso: "4 pantallas", etiqueta: "Cuenta completa",
      desc: "La cuenta completa de Paramount+ con 4 pantallas." },
    { id: "prime-cuenta", nombre: "Prime Video · Cuenta completa", sigla: "PV", cat: "combos", precio: 18000, duracion: "30 días", acceso: "6 pantallas", etiqueta: "Cuenta completa",
      desc: "Toda la cuenta de Prime Video con 6 pantallas." },
    { id: "universal-cuenta", nombre: "Universal+ · Cuenta completa (con anuncios)", sigla: "U+", cat: "combos", precio: 13000, duracion: "30 días", acceso: "5 pantallas", etiqueta: "Cuenta completa",
      desc: "La cuenta completa de Universal+ con anuncios y 5 pantallas." }
];
