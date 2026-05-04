
// SoftwareVault — Product Data
// cover: SVG string rendered as the product's visual identity

const PRODUCTS = [
  // ── GAMES ─────────────────────────────────────────────────────────────────
  {
    id: 'elden-ring', category: 'games', subcategory: 'RPG',
    name: 'Elden Ring', publisher: 'FromSoftware',
    badge: null, rating: 4.9, reviews: 18420,
    editions: [
      { name: 'Standard', price: 59.99, originalPrice: null, features: ['Base Game', 'Windows 10/11', 'Steam Key'] },
      { name: 'Deluxe', price: 79.99, originalPrice: null, features: ['Base Game', 'Digital Artbook', 'Soundtrack', 'Steam Key'] },
    ],
    tags: ['Open World', 'Action RPG', 'Soulslike'],
    platform: ['Windows'], releaseYear: 2022,
    description: 'A vast open world action RPG forged by Hidetaka Miyazaki and George R.R. Martin.',
    color: '#7c5cdb',
    coverBg: 'linear-gradient(160deg, #1a1030 0%, #2d1a5c 50%, #0d0820 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="55" r="38" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.6"/>
      <circle cx="100" cy="55" r="28" fill="none" stroke="#c9a84c" stroke-width="0.8" opacity="0.4"/>
      <polygon points="100,22 108,48 135,48 114,64 122,90 100,74 78,90 86,64 65,48 92,48" fill="#c9a84c" opacity="0.85"/>
      <text x="100" y="118" text-anchor="middle" font-family="serif" font-size="11" fill="#c9a84c" opacity="0.7" font-weight="bold" letter-spacing="3">ELDEN RING</text>
    </svg>`,
  },
  {
    id: 'god-of-war', category: 'games', subcategory: 'Action',
    name: 'God of War', publisher: 'Santa Monica Studio',
    badge: 'Bestseller', rating: 4.8, reviews: 12300,
    editions: [
      { name: 'Standard', price: 49.99, originalPrice: 59.99, features: ['Base Game', 'Windows 10/11', 'Steam Key'] },
    ],
    tags: ['Action', 'Adventure', 'Story-Rich'],
    platform: ['Windows'], releaseYear: 2022,
    description: 'Kratos and his son Atreus journey through the Norse realms.',
    color: '#b34a2a',
    coverBg: 'linear-gradient(160deg, #1a0800 0%, #3d1200 50%, #0d0400 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="60" r="42" fill="#c0392b" opacity="0.15"/>
      <path d="M100 18 L115 50 L150 55 L125 80 L132 115 L100 98 L68 115 L75 80 L50 55 L85 50 Z" fill="none" stroke="#e05530" stroke-width="2" opacity="0.5"/>
      <path d="M85 35 Q100 20 115 35 L120 70 Q100 85 80 70 Z" fill="#c0392b" opacity="0.7"/>
      <circle cx="100" cy="52" r="10" fill="#e05530" opacity="0.9"/>
      <text x="100" y="120" text-anchor="middle" font-family="serif" font-size="10" fill="#e05530" opacity="0.8" letter-spacing="2" font-weight="bold">GOD OF WAR</text>
    </svg>`,
  },
  {
    id: 'witcher-4', category: 'games', subcategory: 'RPG',
    name: 'The Witcher 4', publisher: 'CD Projekt Red',
    badge: 'New', rating: 4.7, reviews: 3210,
    editions: [
      { name: 'Standard', price: 49.99, originalPrice: null, features: ['Base Game', 'Steam Key'] },
      { name: 'Premium', price: 74.99, originalPrice: null, features: ['Base Game', 'Season Pass', 'Artbook', 'Soundtrack'] },
    ],
    tags: ['RPG', 'Open World', 'Fantasy'],
    platform: ['Windows'], releaseYear: 2025,
    description: 'The next chapter in the acclaimed Witcher saga.',
    color: '#2a6b4a',
    coverBg: 'linear-gradient(160deg, #0a1a10 0%, #1a3d20 50%, #050d08 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 15 L105 55 L145 50 L115 75 L128 115 L100 90 L72 115 L85 75 L55 50 L95 55 Z" fill="none" stroke="#4a9e6a" stroke-width="1.5" opacity="0.6"/>
      <path d="M100 28 Q115 50 100 105 Q85 50 100 28Z" fill="#3d8a5a" opacity="0.5"/>
      <path d="M70 55 Q100 45 130 55 Q115 80 100 90 Q85 80 70 55Z" fill="#2a6b4a" opacity="0.6"/>
      <circle cx="100" cy="60" r="6" fill="#6abf85" opacity="0.9"/>
      <text x="100" y="125" text-anchor="middle" font-family="serif" font-size="9" fill="#4a9e6a" opacity="0.7" letter-spacing="2">THE WITCHER 4</text>
    </svg>`,
  },
  {
    id: 'cyberpunk-dlc', category: 'games', subcategory: 'RPG',
    name: 'Cyberpunk 2077', publisher: 'CD Projekt Red',
    badge: 'Deal', rating: 4.6, reviews: 9800,
    editions: [
      { name: 'DLC Only', price: 24.99, originalPrice: 34.99, features: ['Phantom Liberty DLC', 'Requires base game'] },
      { name: 'Game + DLC', price: 39.99, originalPrice: 59.99, features: ['Full Game', 'Phantom Liberty DLC', 'Steam Key'] },
    ],
    tags: ['RPG', 'Open World', 'Sci-Fi'],
    platform: ['Windows'], releaseYear: 2023,
    description: 'Phantom Liberty — a new spy-thriller adventure for Cyberpunk 2077.',
    color: '#c9a227',
    coverBg: 'linear-gradient(160deg, #0d0d00 0%, #1f1a00 50%, #0a0800 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="20" x2="170" y2="20" stroke="#fcee09" stroke-width="1" opacity="0.3"/>
      <line x1="30" y1="120" x2="170" y2="120" stroke="#fcee09" stroke-width="1" opacity="0.3"/>
      <polygon points="100,18 160,50 160,90 100,122 40,90 40,50" fill="none" stroke="#fcee09" stroke-width="1.5" opacity="0.4"/>
      <text x="100" y="58" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#fcee09" font-weight="900" opacity="0.95">2077</text>
      <text x="100" y="76" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#fcee09" opacity="0.6" letter-spacing="3">CYBERPUNK</text>
      <text x="100" y="94" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#fcee09" opacity="0.4" letter-spacing="2">PHANTOM LIBERTY</text>
    </svg>`,
  },
  {
    id: 'diablo-iv', category: 'games', subcategory: 'Action RPG',
    name: 'Diablo IV', publisher: 'Blizzard Entertainment',
    badge: 'Deal', rating: 4.5, reviews: 14200,
    editions: [
      { name: 'Standard', price: 39.99, originalPrice: 69.99, features: ['Base Game', 'Battle.net Key', 'Windows'] },
      { name: 'Gold Edition', price: 59.99, originalPrice: 99.99, features: ['Base Game', 'Season Pass', 'Cosmetics Pack'] },
    ],
    tags: ['Action RPG', 'Dark Fantasy', 'Multiplayer'],
    platform: ['Windows'], releaseYear: 2023,
    description: 'The legendary dark fantasy ARPG returns — fight the forces of Hell in Sanctuary.',
    color: '#8b1a1a',
    coverBg: 'linear-gradient(160deg, #0d0000 0%, #2a0505 50%, #080000 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 20 L170 80 L100 130 L30 80 Z" fill="none" stroke="#c0392b" stroke-width="1.5" opacity="0.5"/>
      <path d="M100 30 L160 80 L100 120 L40 80 Z" fill="#8b1a1a" opacity="0.3"/>
      <path d="M85 45 L100 25 L115 45 L125 75 L100 95 L75 75 Z" fill="#c0392b" opacity="0.6"/>
      <circle cx="100" cy="68" r="12" fill="#e74c3c" opacity="0.4"/>
      <text x="100" y="118" text-anchor="middle" font-family="serif" font-size="12" fill="#e74c3c" opacity="0.8" letter-spacing="4" font-weight="bold">DIABLO IV</text>
    </svg>`,
  },
  {
    id: 'red-dead-2', category: 'games', subcategory: 'Adventure',
    name: 'Red Dead Redemption 2', publisher: 'Rockstar Games',
    badge: 'Bestseller', rating: 4.9, reviews: 31200,
    editions: [
      { name: 'Standard', price: 29.99, originalPrice: 59.99, features: ['Base Game', 'Rockstar Key', 'Online Mode'] },
      { name: 'Ultimate', price: 44.99, originalPrice: 79.99, features: ['Base Game', 'Online Bonuses', 'Story Mode Extras'] },
    ],
    tags: ['Open World', 'Western', 'Story-Rich'],
    platform: ['Windows'], releaseYear: 2019,
    description: 'Epic tale of life in America\'s unforgiving heartland. An outlaw\'s final journey.',
    color: '#8b5e3c',
    coverBg: 'linear-gradient(160deg, #1a0d00 0%, #3d2008 50%, #0d0600 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="90" width="160" height="3" fill="#c9813a" opacity="0.4"/>
      <path d="M20 90 Q100 40 180 90" fill="none" stroke="#c9813a" stroke-width="1" opacity="0.3"/>
      <circle cx="100" cy="45" r="25" fill="none" stroke="#c9813a" stroke-width="1.5" opacity="0.5"/>
      <path d="M80 45 L90 35 L100 50 L110 35 L120 45 L110 60 L100 65 L90 60 Z" fill="#c9813a" opacity="0.7"/>
      <text x="100" y="110" text-anchor="middle" font-family="serif" font-size="8" fill="#c9813a" opacity="0.7" letter-spacing="1">RED DEAD REDEMPTION 2</text>
      <text x="100" y="122" text-anchor="middle" font-family="serif" font-size="7" fill="#c9813a" opacity="0.4" letter-spacing="2">ROCKSTAR GAMES</text>
    </svg>`,
  },

  // ── SOFTWARE (only Office, Design, Notes, Creativity — NO games) ──────────
  {
    id: 'office-2024', category: 'software', subcategory: 'Office',
    name: 'Microsoft Office 2024', publisher: 'Microsoft',
    badge: 'Popular', rating: 4.7, reviews: 28400,
    editions: [
      { name: 'Home & Student', price: 99.00, originalPrice: 149.00, features: ['Word', 'Excel', 'PowerPoint', '1 PC', 'Lifetime'] },
      { name: 'Professional', price: 199.00, originalPrice: 349.00, features: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'Access', 'Lifetime'] },
    ],
    tags: ['Productivity', 'Office Suite', 'Microsoft'],
    platform: ['Windows', 'macOS'], releaseYear: 2024,
    description: 'Lifetime license for the full Microsoft Office suite — Word, Excel, PowerPoint and more.',
    color: '#d83b01',
    coverBg: 'linear-gradient(160deg, #1a0800 0%, #2d1200 50%, #0d0500 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="28" width="38" height="38" rx="4" fill="#d83b01" opacity="0.9"/>
      <rect x="107" y="28" width="38" height="38" rx="4" fill="#107c41" opacity="0.9"/>
      <rect x="55" y="74" width="38" height="38" rx="4" fill="#0078d4" opacity="0.9"/>
      <rect x="107" y="74" width="38" height="38" rx="4" fill="#ca3870" opacity="0.9"/>
      <text x="74" y="52" text-anchor="middle" font-family="sans-serif" font-size="18" fill="white" font-weight="bold">W</text>
      <text x="126" y="52" text-anchor="middle" font-family="sans-serif" font-size="18" fill="white" font-weight="bold">X</text>
      <text x="74" y="98" text-anchor="middle" font-family="sans-serif" font-size="18" fill="white" font-weight="bold">P</text>
      <text x="126" y="98" text-anchor="middle" font-family="sans-serif" font-size="14" fill="white" font-weight="bold">OL</text>
    </svg>`,
  },
  {
    id: 'microsoft-365', category: 'software', subcategory: 'Office',
    name: 'Microsoft 365', publisher: 'Microsoft',
    badge: null, rating: 4.6, reviews: 41000,
    editions: [
      { name: 'Personal/yr', price: 69.99, originalPrice: null, features: ['1 User', '1 TB OneDrive', 'All Office Apps', 'Web & Mobile'] },
      { name: 'Family/yr', price: 99.99, originalPrice: null, features: ['Up to 6 Users', '6 TB OneDrive', 'All Office Apps', 'Premium Support'] },
    ],
    tags: ['Office Suite', 'Cloud', 'Subscription'],
    platform: ['Windows', 'macOS', 'Web', 'iOS', 'Android'], releaseYear: 2024,
    description: 'Always up-to-date Office apps with 1 TB cloud storage — for personal or family use.',
    color: '#0078d4',
    coverBg: 'linear-gradient(160deg, #001a33 0%, #003d7a 50%, #000d1a 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="30" width="80" height="80" rx="8" fill="#0078d4" opacity="0.2" stroke="#0078d4" stroke-width="1.5"/>
      <path d="M75 70 L85 55 L100 75 L112 62 L125 70" fill="none" stroke="#0078d4" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="100" cy="50" r="14" fill="#0078d4" opacity="0.8"/>
      <text x="100" y="55" text-anchor="middle" font-family="sans-serif" font-size="14" fill="white" font-weight="bold">365</text>
      <text x="100" y="125" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#0078d4" opacity="0.7" letter-spacing="2">MICROSOFT 365</text>
    </svg>`,
  },
  {
    id: 'adobe-cc', category: 'software', subcategory: 'Creative',
    name: 'Adobe Creative Cloud', publisher: 'Adobe',
    badge: 'Popular', rating: 4.5, reviews: 22100,
    editions: [
      { name: 'Photography', price: 9.99, originalPrice: null, features: ['Lightroom', 'Photoshop', '20 GB Cloud'] },
      { name: 'All Apps', price: 54.99, originalPrice: 69.99, features: ['All 20+ Apps', '100 GB Cloud', 'Adobe Fonts'] },
    ],
    tags: ['Creative', 'Design', 'Photo & Video'],
    platform: ['Windows', 'macOS'], releaseYear: 2024,
    description: 'The complete suite of creative tools — Photoshop, Illustrator, Premiere Pro and more.',
    color: '#e03a3e',
    coverBg: 'linear-gradient(160deg, #1a0000 0%, #3d0000 50%, #0d0000 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="45" y="25" width="110" height="90" rx="6" fill="#e03a3e" opacity="0.15" stroke="#e03a3e" stroke-width="1.5"/>
      <text x="100" y="72" text-anchor="middle" font-family="sans-serif" font-size="36" fill="#e03a3e" font-weight="900" opacity="0.9">Ai</text>
      <text x="62" y="95" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e03a3e" font-weight="700" opacity="0.5">Ps</text>
      <text x="100" y="95" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e03a3e" font-weight="700" opacity="0.5">Pr</text>
      <text x="138" y="95" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e03a3e" font-weight="700" opacity="0.5">Id</text>
      <text x="100" y="122" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#e03a3e" opacity="0.5" letter-spacing="2">CREATIVE CLOUD</text>
    </svg>`,
  },
  {
    id: 'affinity-suite', category: 'software', subcategory: 'Creative',
    name: 'Affinity V2 Suite', publisher: 'Serif',
    badge: null, rating: 4.8, reviews: 8900,
    editions: [
      { name: 'Universal License', price: 164.99, originalPrice: null, features: ['Designer', 'Photo', 'Publisher', 'Mac + Win + iPad', 'Lifetime'] },
    ],
    tags: ['Design', 'Photo Editing', 'Publishing'],
    platform: ['Windows', 'macOS', 'iPadOS'], releaseYear: 2023,
    description: 'Professional-grade design, photo, and publishing apps — one-time purchase, no subscription.',
    color: '#1d6fa4',
    coverBg: 'linear-gradient(160deg, #001220 0%, #002d44 50%, #000810 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,22 134,75 66,75" fill="#1d6fa4" opacity="0.7"/>
      <polygon points="68,78 100,25 52,110" fill="#4ec9b0" opacity="0.5"/>
      <polygon points="132,78 148,110 84,110" fill="#e07b39" opacity="0.5"/>
      <text x="100" y="122" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#4ec9b0" opacity="0.7" letter-spacing="2">AFFINITY V2 SUITE</text>
    </svg>`,
  },
  {
    id: 'notion', category: 'software', subcategory: 'Notes & Productivity',
    name: 'Notion — Team Plan', publisher: 'Notion Labs',
    badge: 'New', rating: 4.6, reviews: 14200,
    editions: [
      { name: 'Plus/mo', price: 8.00, originalPrice: null, features: ['Unlimited Pages', 'Unlimited Guests', 'Simple Automation'] },
      { name: 'Business/mo', price: 15.00, originalPrice: null, features: ['Everything in Plus', 'SAML SSO', 'Advanced Analytics', 'AI Add-on'] },
    ],
    tags: ['Notes', 'Productivity', 'Collaboration'],
    platform: ['Windows', 'macOS', 'Web', 'iOS', 'Android'], releaseYear: 2024,
    description: 'The all-in-one connected workspace — docs, databases, wikis and AI, all in one place.',
    color: '#1a1a1a',
    coverBg: 'linear-gradient(160deg, #111111 0%, #2a2a2a 50%, #080808 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="25" width="90" height="90" rx="10" fill="white" opacity="0.08" stroke="white" stroke-width="1.5"/>
      <path d="M75 45 L75 95 L80 95 L110 58 L110 95 L125 95 L125 45 L120 45 L90 82 L90 45 Z" fill="white" opacity="0.8"/>
      <text x="100" y="128" text-anchor="middle" font-family="sans-serif" font-size="8" fill="white" opacity="0.4" letter-spacing="3">NOTION</text>
    </svg>`,
  },
  {
    id: 'davinci-resolve', category: 'software', subcategory: 'Creative',
    name: 'DaVinci Resolve Studio 19', publisher: 'Blackmagic Design',
    badge: 'New', rating: 4.8, reviews: 5500,
    editions: [
      { name: 'Studio License', price: 295.00, originalPrice: null, features: ['Color Grading', 'Fusion VFX', 'Fairlight Audio', 'Lifetime'] },
    ],
    tags: ['Video Editing', 'Color Grading', 'Professional'],
    platform: ['Windows', 'macOS', 'Linux'], releaseYear: 2024,
    description: 'Professional video editing, color grading, VFX, and audio post-production in one app.',
    color: '#c0392b',
    coverBg: 'linear-gradient(160deg, #1a0000 0%, #2d0505 50%, #0d0000 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="65" r="42" fill="none" stroke="#c0392b" stroke-width="1.5" opacity="0.6"/>
      <circle cx="100" cy="65" r="30" fill="#c0392b" opacity="0.15"/>
      <circle cx="100" cy="65" r="18" fill="#c0392b" opacity="0.5"/>
      <circle cx="100" cy="65" r="6" fill="white" opacity="0.8"/>
      <line x1="100" y1="23" x2="100" y2="35" stroke="#c0392b" stroke-width="2" opacity="0.6"/>
      <line x1="100" y1="95" x2="100" y2="107" stroke="#c0392b" stroke-width="2" opacity="0.6"/>
      <line x1="58" y1="65" x2="70" y2="65" stroke="#c0392b" stroke-width="2" opacity="0.6"/>
      <line x1="130" y1="65" x2="142" y2="65" stroke="#c0392b" stroke-width="2" opacity="0.6"/>
      <text x="100" y="125" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#c0392b" opacity="0.6" letter-spacing="1">DAVINCI RESOLVE 19</text>
    </svg>`,
  },
  {
    id: 'figma-pro', category: 'software', subcategory: 'Creative',
    name: 'Figma Professional', publisher: 'Figma Inc.',
    badge: null, rating: 4.9, reviews: 19800,
    editions: [
      { name: 'Professional/mo', price: 12.00, originalPrice: null, features: ['Unlimited Projects', 'Unlimited Editors', 'Dev Mode', 'Analytics'] },
      { name: 'Organization/mo', price: 45.00, originalPrice: null, features: ['Everything in Pro', 'SSO', 'Advanced Controls', 'Priority Support'] },
    ],
    tags: ['UI Design', 'Prototyping', 'Collaboration'],
    platform: ['Web', 'macOS', 'Windows'], releaseYear: 2024,
    description: 'The collaborative design tool for UI/UX teams — design, prototype, and hand off in one place.',
    color: '#a259ff',
    coverBg: 'linear-gradient(160deg, #100020 0%, #220044 50%, #080010 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="20" width="40" height="40" rx="20" fill="#f24e1e" opacity="0.85"/>
      <rect x="80" y="60" width="40" height="40" rx="4" fill="#ff7262" opacity="0.85"/>
      <rect x="120" y="20" width="40" height="40" rx="4" fill="#a259ff" opacity="0.85"/>
      <rect x="120" y="60" width="40" height="40" rx="20" fill="#1abcfe" opacity="0.85"/>
      <circle cx="140" cy="80" r="20" fill="#0acf83" opacity="0.3"/>
      <text x="100" y="125" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#a259ff" opacity="0.7" letter-spacing="3">FIGMA PRO</text>
    </svg>`,
  },
  {
    id: 'obsidian', category: 'software', subcategory: 'Notes & Productivity',
    name: 'Obsidian Catalyst', publisher: 'Obsidian.md',
    badge: null, rating: 4.8, reviews: 6700,
    editions: [
      { name: 'Catalyst', price: 25.00, originalPrice: null, features: ['Early Access', 'Insider Builds', 'Discord Badge', 'Lifetime'] },
      { name: 'Sync + Publish', price: 16.00, originalPrice: null, features: ['Obsidian Sync', 'Obsidian Publish', 'Version History'] },
    ],
    tags: ['Notes', 'Knowledge Base', 'Markdown'],
    platform: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], releaseYear: 2024,
    description: 'A powerful knowledge base on top of a local folder of Markdown files.',
    color: '#7c3aed',
    coverBg: 'linear-gradient(160deg, #0d0020 0%, #1e0050 50%, #060010 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,20 148,50 148,90 100,120 52,90 52,50" fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.5"/>
      <polygon points="100,35 135,58 135,82 100,105 65,82 65,58" fill="#7c3aed" opacity="0.2"/>
      <polygon points="100,50 120,65 120,75 100,90 80,75 80,65" fill="#a78bfa" opacity="0.6"/>
      <circle cx="100" cy="70" r="8" fill="#c4b5fd" opacity="0.8"/>
      <text x="100" y="130" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#a78bfa" opacity="0.6" letter-spacing="2">OBSIDIAN</text>
    </svg>`,
  },

  // ── DEALS ─────────────────────────────────────────────────────────────────
  {
    id: 'windows-11-pro', category: 'deals', subcategory: 'OS',
    name: 'Windows 11 Pro', publisher: 'Microsoft',
    badge: 'Deal', rating: 4.6, reviews: 31000,
    editions: [
      { name: 'OEM Key', price: 12.50, originalPrice: 34.99, features: ['Full Windows 11 Pro', 'OEM License', 'Digital Delivery'] },
    ],
    tags: ['Operating System', 'Microsoft'],
    platform: ['Windows'], releaseYear: 2021,
    description: 'Genuine Windows 11 Pro key — digital delivery within minutes.',
    color: '#0078d4',
    coverBg: 'linear-gradient(160deg, #001a33 0%, #003d7a 50%, #000d1a 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="52" y="30" width="44" height="44" rx="3" fill="#0078d4" opacity="0.9"/>
      <rect x="104" y="30" width="44" height="44" rx="3" fill="#0078d4" opacity="0.7"/>
      <rect x="52" y="82" width="44" height="44" rx="3" fill="#0078d4" opacity="0.7"/>
      <rect x="104" y="82" width="44" height="44" rx="3" fill="#0078d4" opacity="0.5"/>
      <text x="100" y="135" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#0078d4" opacity="0.5" letter-spacing="2">WINDOWS 11 PRO</text>
    </svg>`,
  },
  {
    id: 'kaspersky-total', category: 'deals', subcategory: 'Security',
    name: 'Kaspersky Total Security', publisher: 'Kaspersky',
    badge: 'Deal', rating: 4.5, reviews: 9200,
    editions: [
      { name: '1 Device/yr', price: 19.99, originalPrice: 44.99, features: ['Antivirus', 'VPN', 'Password Manager', '1 Device'] },
      { name: '5 Devices/yr', price: 34.99, originalPrice: 79.99, features: ['Antivirus', 'VPN', 'Password Manager', '5 Devices'] },
    ],
    tags: ['Security', 'Antivirus', 'VPN'],
    platform: ['Windows', 'macOS', 'Android', 'iOS'], releaseYear: 2024,
    description: 'Total protection for all your devices — antivirus, VPN, password manager.',
    color: '#00a650',
    coverBg: 'linear-gradient(160deg, #001a0a 0%, #004020 50%, #000d05 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 20 L150 45 L150 85 C150 110 125 125 100 130 C75 125 50 110 50 85 L50 45 Z" fill="#00a650" opacity="0.15" stroke="#00a650" stroke-width="1.5"/>
      <path d="M100 35 L138 55 L138 87 C138 107 120 118 100 122 C80 118 62 107 62 87 L62 55 Z" fill="#00a650" opacity="0.2"/>
      <path d="M82 78 L93 90 L118 62" stroke="#00a650" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <text x="100" y="135" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#00a650" opacity="0.5" letter-spacing="1">KASPERSKY TOTAL</text>
    </svg>`,
  },
  {
    id: 'office-deal', category: 'deals', subcategory: 'Office',
    name: 'Microsoft Office 2021', publisher: 'Microsoft',
    badge: 'Deal', rating: 4.5, reviews: 19800,
    editions: [
      { name: 'Home & Student', price: 49.99, originalPrice: 149.00, features: ['Word', 'Excel', 'PowerPoint', '1 PC', 'Lifetime'] },
    ],
    tags: ['Office Suite', 'Microsoft', 'Lifetime'],
    platform: ['Windows'], releaseYear: 2021,
    description: 'Lifetime license for Microsoft Office 2021 — great value for home users.',
    color: '#d83b01',
    coverBg: 'linear-gradient(160deg, #1a0800 0%, #2d1200 50%, #0d0500 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="35" width="34" height="34" rx="3" fill="#d83b01" opacity="0.9"/>
      <rect x="106" y="35" width="34" height="34" rx="3" fill="#107c41" opacity="0.9"/>
      <rect x="60" y="76" width="34" height="34" rx="3" fill="#0078d4" opacity="0.9"/>
      <rect x="106" y="76" width="34" height="34" rx="3" fill="#ca3870" opacity="0.9"/>
      <text x="77" y="57" text-anchor="middle" font-family="sans-serif" font-size="16" fill="white" font-weight="bold">W</text>
      <text x="123" y="57" text-anchor="middle" font-family="sans-serif" font-size="16" fill="white" font-weight="bold">X</text>
      <text x="77" y="97" text-anchor="middle" font-family="sans-serif" font-size="16" fill="white" font-weight="bold">P</text>
      <text x="123" y="97" text-anchor="middle" font-family="sans-serif" font-size="12" fill="white" font-weight="bold">OL</text>
      <text x="100" y="126" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#d83b01" opacity="0.5" letter-spacing="2">OFFICE 2021</text>
    </svg>`,
  },
  {
    id: 'nordvpn', category: 'deals', subcategory: 'Security',
    name: 'NordVPN', publisher: 'Nord Security',
    badge: 'Deal', rating: 4.6, reviews: 42000,
    editions: [
      { name: '1 Year', price: 47.88, originalPrice: 119.88, features: ['6 Devices', '5400+ Servers', '60 Countries', 'No Logs'] },
      { name: '2 Years', price: 83.76, originalPrice: 239.76, features: ['6 Devices', '5400+ Servers', 'Threat Protection', 'Best Value'] },
    ],
    tags: ['VPN', 'Security', 'Privacy'],
    platform: ['Windows', 'macOS', 'iOS', 'Android'], releaseYear: 2024,
    description: 'Fast, secure VPN with 5400+ servers in 60 countries — protect your privacy online.',
    color: '#4687ff',
    coverBg: 'linear-gradient(160deg, #000d33 0%, #001a66 50%, #00051a 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 18 C100 18 60 35 60 65 C60 95 80 115 100 122 C120 115 140 95 140 65 C140 35 100 18 100 18Z" fill="#4687ff" opacity="0.2" stroke="#4687ff" stroke-width="1.5"/>
      <path d="M100 35 C100 35 72 48 72 68 C72 90 86 105 100 110 C114 105 128 90 128 68 C128 48 100 35 100 35Z" fill="#4687ff" opacity="0.3"/>
      <text x="100" y="76" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white" font-weight="bold" opacity="0.9">VPN</text>
      <text x="100" y="128" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#4687ff" opacity="0.7" letter-spacing="3">NORDVPN</text>
    </svg>`,
  },

  // ── NEW RELEASES ──────────────────────────────────────────────────────────
  {
    id: 'ghost-of-tsushima', category: 'new', subcategory: 'Action',
    name: 'Ghost of Tsushima DC', publisher: 'Sucker Punch',
    badge: 'New', rating: 4.9, reviews: 7800,
    editions: [
      { name: "Director's Cut", price: 59.99, originalPrice: null, features: ['Full Game', 'Iki Island DLC', 'Legends Online Mode'] },
    ],
    tags: ['Action', 'Open World', 'Samurai'],
    platform: ['Windows'], releaseYear: 2024,
    description: "The definitive samurai open-world experience, now on PC.",
    color: '#4a7c6a',
    coverBg: 'linear-gradient(160deg, #050f0a 0%, #0d2018 50%, #020806 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 18 L100 105" stroke="#4a7c6a" stroke-width="2.5" opacity="0.7"/>
      <path d="M100 18 L110 45 L140 55 L115 72 L122 102 L100 88 L78 102 L85 72 L60 55 L90 45 Z" fill="none" stroke="#6abf85" stroke-width="1.2" opacity="0.5"/>
      <path d="M80 32 Q100 25 120 32" fill="none" stroke="#4a7c6a" stroke-width="3" opacity="0.8" stroke-linecap="round"/>
      <ellipse cx="100" cy="108" rx="25" ry="5" fill="#4a7c6a" opacity="0.3"/>
      <text x="100" y="128" text-anchor="middle" font-family="serif" font-size="8" fill="#6abf85" opacity="0.6" letter-spacing="1">GHOST OF TSUSHIMA</text>
    </svg>`,
  },
  {
    id: 'notion-ai', category: 'new', subcategory: 'Notes & Productivity',
    name: 'Notion AI — Team Plan', publisher: 'Notion Labs',
    badge: 'New', rating: 4.6, reviews: 4200,
    editions: [
      { name: 'Per Seat/mo', price: 16.00, originalPrice: null, features: ['Unlimited Pages', 'AI Assistant', 'Collaboration', 'Analytics'] },
    ],
    tags: ['Productivity', 'AI', 'Collaboration'],
    platform: ['Windows', 'macOS', 'Web'], releaseYear: 2024,
    description: 'The all-in-one workspace with built-in AI for teams.',
    color: '#1a1a1a',
    coverBg: 'linear-gradient(160deg, #111111 0%, #2a2a2a 50%, #080808 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="25" width="90" height="90" rx="10" fill="white" opacity="0.06" stroke="white" stroke-width="1.2"/>
      <path d="M75 45 L75 95 L80 95 L110 58 L110 95 L125 95 L125 45 L120 45 L90 82 L90 45 Z" fill="white" opacity="0.7"/>
      <circle cx="140" cy="35" r="12" fill="#1a1a1a" stroke="white" stroke-width="1"/>
      <text x="140" y="39" text-anchor="middle" font-family="sans-serif" font-size="9" fill="white" opacity="0.9">AI</text>
      <text x="100" y="128" text-anchor="middle" font-family="sans-serif" font-size="7" fill="white" opacity="0.3" letter-spacing="3">NOTION AI</text>
    </svg>`,
  },
  {
    id: 'eset-nod32', category: 'new', subcategory: 'Security',
    name: 'ESET NOD32 Antivirus 2024', publisher: 'ESET',
    badge: 'New', rating: 4.6, reviews: 6100,
    editions: [
      { name: '1 Device/yr', price: 19.99, originalPrice: null, features: ['Antivirus', 'Anti-Phishing', 'Exploit Blocker'] },
    ],
    tags: ['Security', 'Antivirus'],
    platform: ['Windows', 'macOS'], releaseYear: 2024,
    description: 'Award-winning antivirus with minimal system footprint.',
    color: '#00a32a',
    coverBg: 'linear-gradient(160deg, #001a0a 0%, #003d1a 50%, #000d05 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="65" r="44" fill="none" stroke="#00a32a" stroke-width="1.5" opacity="0.4"/>
      <circle cx="100" cy="65" r="32" fill="#00a32a" opacity="0.12"/>
      <path d="M80 65 L93 78 L122 50" stroke="#00a32a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <text x="100" y="122" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#00a32a" opacity="0.6" letter-spacing="2">ESET NOD32</text>
    </svg>`,
  },
  {
    id: 'clip-studio', category: 'new', subcategory: 'Creative',
    name: 'Clip Studio Paint EX', publisher: 'Celsys',
    badge: 'New', rating: 4.8, reviews: 11400,
    editions: [
      { name: 'Annual', price: 24.99, originalPrice: null, features: ['All Features', 'Animation', 'Multi-page', 'Cloud Sync'] },
      { name: 'Lifetime', price: 219.00, originalPrice: null, features: ['All Features', 'Animation', 'Multi-page', 'Free Updates'] },
    ],
    tags: ['Illustration', 'Comics', 'Animation'],
    platform: ['Windows', 'macOS', 'iPad', 'Android'], releaseYear: 2024,
    description: 'The leading digital art software for comics, manga, illustration and animation.',
    color: '#e8434a',
    coverBg: 'linear-gradient(160deg, #1a0203 0%, #3d0506 50%, #0d0102 100%)',
    coverSvg: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="25" width="90" height="90" rx="8" fill="#e8434a" opacity="0.15" stroke="#e8434a" stroke-width="1.2"/>
      <path d="M80 85 Q90 40 100 55 Q110 70 120 30" fill="none" stroke="#e8434a" stroke-width="2.5" opacity="0.8" stroke-linecap="round"/>
      <circle cx="82" cy="84" r="4" fill="#e8434a" opacity="0.7"/>
      <path d="M70 90 L130 90" stroke="#e8434a" stroke-width="1" opacity="0.3"/>
      <text x="100" y="126" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#e8434a" opacity="0.6" letter-spacing="1">CLIP STUDIO PAINT</text>
    </svg>`,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'games', label: 'Games' },
  { id: 'software', label: 'Software' },
  { id: 'deals', label: 'Deals' },
];

// Export for use in other scripts
Object.assign(window, { PRODUCTS, CATEGORIES });
