/**
 * ===============================================================================
 * SHRILAKSHMI'S WEBSITE — SINGLE SOURCE OF TRUTH CONTENT CONFIGURATION
 * ===============================================================================
 * 
 * Welcome! This single file controls ALL the text, messages, memes, photos, 
 * games, and settings across the entire website.
 * 
 * You NEVER need to touch React components, CSS, or animation code.
 * Just edit the text below, save this file, and the website will automatically 
 * update with Vite's instant hot-reload!
 * 
 * -------------------------------------------------------------------------------
 * QUICK INSTRUCTIONS:
 * -------------------------------------------------------------------------------
 * 1. Change text: Edit any string inside quotes like "your text here".
 * 2. Add Memes: Add a new object inside the `memes: [...]` array.
 * 3. Add Photos: Put your photo in `public/photos/your-image.jpg` and add an 
 *    entry in the `photos: [...]` array below with src: "/photos/your-image.jpg".
 * 4. Hide/Show Sections: Change `true` to `false` in the `sections` object.
 * ===============================================================================
 */

export const shrilakshmiContent = {
  // ---------------------------------------------------------------------------
  // 1. PROFILE & SENDER DETAILS
  // ---------------------------------------------------------------------------
  profile: {
    name: "Shrilakshmi",
    nickname: "Shri",
    authorName: "Sandyy",
    authorFullName: "Sandeep",
    authorTransliteration: "nanna hesaru sandeep · made with care for Shrilakshmi",
    signature: "— Sandyy",
    year: "2026",
    showSignature: true,
  },

  // ---------------------------------------------------------------------------
  // 2. SECTION VISIBILITY CONTROLS
  // ---------------------------------------------------------------------------
  // Set any section to false to cleanly hide it from the website & navigation!
  sections: {
    garden: true,          // The Little Garden Terrarium 🌱
    games: true,           // The Retro Pastel Arcade 🕹️
    memes: true,           // The Shrilakshmi Lore (Diwali/Dasara & MBA) 🗂️
    photos: true,          // Photo Gallery & Moments 📷
    littleThings: true,    // Flippable Memory Polaroids 💌
    personalMessage: true, // The Starlight Heart Letter 🫶
    secretMessage: true,   // The Hidden Vault / Easter Egg 🗝️
  },

  // ---------------------------------------------------------------------------
  // 3. INTRODUCTION & LANDING SCREEN (LandingHero)
  // ---------------------------------------------------------------------------
  introduction: {
    badge: "FOR YOU · NINAGAGI",
    greeting: "hey, Shrilakshmi",
    salutation: "en samachara? hegiddeeya? :)",
    subtitle: "I made you a tiny corner of the internet · ninagagi ondu koli.",
    handwrittenNote: {
      line1: "yenu tumba yochne madbeda...",
      line2: "sumne explore maadu. :)",
      caption: "(don't question it, just click around)",
    },
    previewChips: [
      { id: "garden", label: "🪴 Terrarium · chiguru" },
      { id: "games", label: "🕹️ 5 Mini-Games · aata" },
      { id: "memes", label: "🪔 Devi & MBA Lore" },
      { id: "photos", label: "📷 Photos · snapshots" },
      { id: "chai", label: "☕ Bisi Bisi Chai" },
    ],
    buttonText: "ENTER · banni",
    audioHint: "headphones recommended · made with care for Shrilakshmi",
    bloomingWelcome: "banni Shrilakshmi, welcome to your corner... 🌷",
  },

  // ---------------------------------------------------------------------------
  // 4. COZY DESK SANCTUARY (CozyDeskScene)
  // ---------------------------------------------------------------------------
  desk: {
    headerTag: "SHRILAKSHMI’S COZY DESK SANCTUARY · 2026",
    title: "A Little Corner Made For You",
    kannadaTitle: "ninna koli",
    subtitle: "Click objects on the desk to explore different worlds. Yella click maadi nodu! :)",
    
    // Interactive Cat Companion
    cat: {
      name: "Mochi the Cat",
      status: "Nidde madthidana · napping on MBA notes",
      buttonText: "MUTTU 🐾 PET ME",
      purrText: "maja!",
    },

    // Steaming Chai Trinket
    chai: {
      name: "Bisibisi Chai",
      status: "Swalpa tea kudi & chill maadu ☕",
      buttonText: "SWALPA KUDI",
    },

    // Station Portal Tiles on the Desk
    stations: {
      garden: {
        title: "The Little Garden · Chiguru",
        tag: "LIVING WINDOWSILL",
        desc: "Nurture living seeds & companion flowers. Swalpa neeru haaki gida bele maadu!",
        stationLabel: "STATION #01",
      },
      games: {
        title: "The Pastel Arcade · Aata Aadu",
        tag: "RETRO CONSOLE · 5 AATAGALU 🕹️",
        desc: "Algorithm quiz, Memory Hunt, joke test & Star Catcher. Aata aadi gelodu mukya!",
        stationLabel: "STATION #02",
      },
      memes: {
        title: "The Shrilakshmi Lore · Devi na neenu?",
        tag: "GUPCHUP FILE 🗂️",
        desc: "1. Diwali vs Dasara birthday coincidence.\n2. November 2026 MBA era corporate buzzword dial & PNG export.",
        stationLabel: "STATION #03",
      },
      photos: {
        title: "Photo Gallery · Moments",
        tag: "PHOTOS 📷",
        desc: "A cozy collection of polaroid captures and memories.",
        stationLabel: "STATION #04",
      },
      littleThings: {
        title: "Little Things · Sanna Nenapugalu",
        tag: "NENAPUGALU 💌",
        desc: "Flippable 3D memory snapshots with washi tape & handwritten debriefs.",
        stationLabel: "STATION #05",
      },
      personalMessage: {
        title: "Starlight Letter · Ondu Chikka Kagadha",
        tag: "KAGADHA ✉️",
        desc: "Quiet thoughts, genuine appreciation & Sandyy's signature.",
        stationLabel: "STATION #06",
      },
    },
  },

  // ---------------------------------------------------------------------------
  // 5. STEAMING CHAI TEASING QUOTES (ChaiMugModal)
  // ---------------------------------------------------------------------------
  // Add as many funny/warm quotes as you want!
  chaiQuotes: [
    {
      quote: "“Bisi bisi chai kudi Shrilakshmi... swalpa tension bittu rest maadu.”",
      sub: "Hot chai status: 100%. Relax your mind.",
      tag: "BISIBISI CHAI TIME",
      mood: "☕",
    },
    {
      quote: "“Shrilakshmi: ‘Nanage ivattu tumba kelsa ide.’ Also Shrilakshmi: reels nododu 45 minutes straight.”",
      sub: "Classic pro-level procrastination.",
      tag: "FULL FOCUS MODE 👀",
      mood: "👀",
    },
    {
      quote: "“Festival committee yella varsha: ‘Bega nodro, Shrilakshmi birthday yavag ide? Aa dinave dodda festival haaki!’”",
      sub: "Diwali 2025, Dasara 2026. Calendar doesn't lie.",
      tag: "DEVI CONSPIRACY 🪔",
      mood: "🪔",
    },
    {
      quote: "“Nanna hesaru Sandyy... and I spent hours making sure this website makes you smile. Boring anali antha alla! 😂”",
      sub: "Directly from the developer's heart.",
      tag: "DEV NOTE · SANDYY",
      mood: "💻",
    },
    {
      quote: "“November alli MBA start aada mele full English jargon maathadtiya... adikke iga swalpa chill maadu.”",
      sub: "Brace for corporate frameworks and synergies.",
      tag: "MBA ERA FORECAST",
      mood: "📈",
    },
    {
      quote: "“Swalpa nagode mukya kano. Life tumba serious aagi thagobeda. Tea sip maadu!”",
      sub: "Taking a tea break is an officially approved life strategy.",
      tag: "QUIET WISDOM 🌷",
      mood: "🌷",
    },
    {
      quote: "“Neenu tumba chaotic aagiddru, thumba genuine and dependable friend. I appreciate you!”",
      sub: "Warm and chaotic, exactly how friendship should be.",
      tag: "GENUINE APPRECIATION",
      mood: "✨",
    },
  ],

  // ---------------------------------------------------------------------------
  // 6. LO-FI CASSETTE PLAYER (CassettePlayerWidget)
  // ---------------------------------------------------------------------------
  music: {
    header: "COZY LO-FI CASSETTE",
    side: "SIDE A",
    tracks: [
      { id: 1, title: "01. Morning Kalimba Glow", vibe: "Warm & Serene" },
      { id: 2, title: "02. Dussehra Festival Echoes", vibe: "Slightly Chaotic" },
      { id: 3, title: "03. MBA Case Study Lo-Fi", vibe: "Strategic Thinking" },
      { id: 4, title: "04. Midnight Debriefs", vibe: "Quiet Starlight" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. MEMES & DOSSIER (AboutShrilakshmiSection)
  // ---------------------------------------------------------------------------
  // You can edit any punchline, caption, panel, or add new meme cards to this array!
  memes: [
    {
      id: "festival-devi",
      enabled: true,
      badge: "OBSERVATION 01 · 2025 vs 2026",
      washiTag: "CALENDAR ODDITY",
      title: "The Festival Coincidence",
      subtitle: "A brief audit of Shrilakshmi's recent birthday scheduling.",
      panel1: {
        title: "2025 — Diwali 🪔",
        season: "OCTOBER / NOVEMBER",
        text: "Birthday plans, featuring an entire national festival.",
      },
      panel2: {
        title: "2026 — Dasara 🏹",
        season: "OCTOBER",
        text: "Same birthday. Completely different festival.",
      },
      stampButtonText: "Tap to stamp the investigation 🔍",
      stampWatermark: "VERIFIED DEVI",
      punchline: "“At this point, I'm starting to suspect you're Devi. 😂”",
      kannadaPunchline: "“Yella varsha nin birthday ge dodda festival declare aagthade... neenu nijvaglu Devi na?”",
      caption: "The festival calendar seems unusually invested in your birthday.",
      image: "/photos/festival.jpg",
      imageAlt: "Festival coincidence meme",
    },
    {
      id: "mba-era",
      enabled: true,
      badge: "OBSERVATION 02 · NOVEMBER 2026",
      washiTag: "MBA ERA FORECAST",
      title: "The MBA Era",
      subtitle: "Expectation vs. Reality: November 2026 Edition.",
      panel1: {
        title: "BEFORE MBA",
        season: "CHILL MODE",
        text: "“Nodeeva bidi, heg aagatto haage... let's see how things go.”",
      },
      panel2: {
        title: "MBA ERA — LOADING...",
        season: "STARTING NOV 2026",
        text: "“Let’s look at the bigger picture and optimize synergies.”",
      },
      stampButtonText: "Tap to stamp the corporate forecast 💼",
      stampWatermark: "SYNERGIZED",
      punchline: "“One MBA admission away from turning every casual conversation into a case study.”",
      kannadaPunchline: "“Ondhe ondhu MBA admission ge, normal maathugalannu case study tara maadtare!”",
      caption: "MBA starts in November. Corporate vocabulary starts whenever she feels like it.",
      image: "/photos/mba.jpg",
      imageAlt: "MBA era meme",
    },
  ],

  // ---------------------------------------------------------------------------
  // 8. PHOTO GALLERY (PhotosSection & Memories)
  // ---------------------------------------------------------------------------
  // Place your photo files into `public/photos/` and add/edit them below!
  // If an image file isn't uploaded yet, a cute pastel fallback card will show.
  photos: [
    {
      id: "photo-1",
      enabled: true,
      src: "/photos/shri-1.jpg",
      title: "Golden Hour Glow",
      caption: "A quiet, pretty moment.",
      kannadaCaption: "Ondu sundara kshana.",
      alt: "Shrilakshmi golden hour photo",
      section: "gallery",
    },
    {
      id: "photo-2",
      enabled: true,
      src: "/photos/shri-2.jpg",
      title: "Peak Chaos",
      caption: "Mid-laugh before something broke.",
      kannadaCaption: "Full comedy time.",
      alt: "Shrilakshmi laughing photo",
      section: "gallery",
    },
    {
      id: "photo-3",
      enabled: true,
      src: "/photos/shri-3.jpg",
      title: "Festival Vibes",
      caption: "Celebrating Devi's special calendar day.",
      kannadaCaption: "Habba time photo.",
      alt: "Shrilakshmi festival photo",
      section: "gallery",
    },
    {
      id: "photo-4",
      enabled: true,
      src: "/photos/shri-4.jpg",
      title: "The MBA Scholar",
      caption: "Preparing to analyze every conversation.",
      kannadaCaption: "MBA study mode.",
      alt: "Shrilakshmi MBA photo",
      section: "gallery",
    },
  ],
  photoSettings: {
    title: "The Polaroid Gallery · Photos",
    subtitle: "Real captures, genuine moments, zero curated pretension.",
    showCaptions: true,
  },

  // ---------------------------------------------------------------------------
  // 9. FLIPPABLE POLAROID PINBOARD (LittleThingsSection)
  // ---------------------------------------------------------------------------
  // Add, reorder, or edit these memory cards!
  polaroids: [
    {
      id: 1,
      title: "Random conversations · Maathugalu.",
      frontTag: "11:47 PM SAMBASHANE",
      backNote: "Raathri 11:47 ra conversations... life, nonsense, deep thoughts. Yavudakko logic iralla, aadre tumba comfort iratte.",
      emoji: "💬",
      color: "bg-purple-50 text-purple-900 border-purple-200",
      tilt: -2.5,
    },
    {
      id: 2,
      title: "Dumb jokes · Bekillada comedy.",
      frontTag: "ZERO LOGIC · MAJA",
      backNote: "Jokes ge logic iralla, aadre 10 minutes non-stop nagodu guarantee. Swalpa control madkoloke aagalla!",
      emoji: "😂",
      color: "bg-amber-50 text-amber-900 border-amber-200",
      tilt: 2.8,
    },
    {
      id: 3,
      title: "Small moments · Sanna kshanagalu.",
      frontTag: "UNSCRIPTED · CHAI & CHILL",
      backNote: "Just sharing food, silent aagi koothukollodu, yenu pedda plan ilde comfortable aagiro sanna kshanagalu.",
      emoji: "☕",
      color: "bg-emerald-50 text-emerald-900 border-emerald-200",
      tilt: -1.8,
    },
    {
      id: 4,
      title: "Inside jokes · Namma vocabulary.",
      frontTag: "PERMANENT JOKES",
      backNote: "Yaradro ondu word thappaagi helidre saaku, adhu namma daily vocabulary alli permanently enter aagbidatte.",
      emoji: "👀",
      color: "bg-rose-50 text-rose-900 border-rose-200",
      tilt: 3.2,
    },
    {
      id: 5,
      title: "Things you forgot · Marthu hoytha?",
      frontTag: "QUIET KINDNESS",
      backNote: "Life chaotic aagiddaga 'hegidya?' antha kelodu, random meme kalisi nagisodu... you probably forgot, but I remember.",
      emoji: "🌷",
      color: "bg-sky-50 text-sky-900 border-sky-200",
      tilt: -2.0,
    },
  ],
  littleThingsHeader: {
    badge: "💌 MEMORY PINBOARD · FLIP MAADI NODU",
    title: "Little things",
    kannadaTitle: "sanna vishayagalu",
    subtitle: "Things you probably don't even realize matter · namboke kashta aadru idhe mukya.",
    shuffleButtonText: "Shuffle Polaroids · adal-badal maadu",
  },

  // ---------------------------------------------------------------------------
  // 10. THE LITTLE GARDEN TERRARIUM (GardenSection)
  // ---------------------------------------------------------------------------
  garden: {
    badge: "🌱 BOTANICAL SANCTUARY",
    title: "The Little Garden",
    kannadaTitle: "chiguru",
    subtitle: "A quiet space that grows with care.",
    waterButtonText: "Water Garden · Neeru haaku 💧",
    soilTip: "💡 Tap soil to plant flowers · mannu mele click maadi flower haaku",
    stageMessages: [
      { text: "Some things start small · Sanna beejadinda shuru.", sub: "Give it a little water · Swalpa neeru haaki nodu." },
      { text: "Small effort · Chikka prayathna.", sub: "Look at that, a little green leaf appeared · chiguru bandide!" },
      { text: "Little things matter · Sanna vishayagale mukya.", sub: "Buds are forming, almost ready · moggu aagthide." },
      { text: "Look what happened · Hoovu aagide!", sub: "It is blooming · sundaravagi aralthide." },
      { text: "You made this · Neene idhanna belesidhe!", sub: "Funny how small care turns into something beautiful · chikka care, tumba beauty." },
    ],
  },

  // ---------------------------------------------------------------------------
  // 11. MINI-GAMES ARCADE (ArcadeSection & games)
  // ---------------------------------------------------------------------------
  games: {
    header: {
      badge: "🕹️ PASTEL ARCADE CONSOLE · AATA AADONA",
      subtitleText: "okay, enough emotional stuff · saaku bidi emotional maathu.",
      mainTitle: "Let's play · banni aata aadona! 😂",
      description: "Click any mini-game cartridge to slot it into the console · cartridge choose maadi aata shuru maadu!",
    },

    // Game 1: The Algorithm Questions & Feedback
    algorithm: {
      title: "The Shrilakshmi Algorithm",
      questions: [
        {
          id: 1,
          question: "What is Shrilakshmi most likely doing at 11:47 PM?",
          options: [
            { text: "Sleeping peacefully like a responsible human", feedback: "The algorithm disagrees. 😂 Highly doubtful." },
            { text: "Studying intensely with 14 highlighters", feedback: "Admirable ambition, questionable execution." },
            { text: "Scrolling into the digital abyss", feedback: "suspiciously accurate 👀" },
            { text: "Something completely unpredictable", feedback: "Ah yes, peak chaos protocol initiated." },
          ],
        },
        {
          id: 2,
          question: "Shrilakshmi's default strategy for handling high-pressure situations:",
          options: [
            { text: "Making a meticulous color-coded 12-step plan", feedback: "Step 1: Panic. Step 2: Ace it anyway." },
            { text: "Sending 18 rapid voice notes to process reality", feedback: "Audio essays are an art form honestly. 🎙️" },
            { text: "Eating snacks and pretending everything is fine", feedback: "Elite survival instinct detected." },
            { text: "Staring into the distance listening to background music", feedback: "Main character energy: 100%." },
          ],
        },
        {
          id: 3,
          question: "If given 1 hour of zero responsibilities, you would immediately:",
          options: [
            { text: "Start an ambitious craft/project you will never finish", feedback: "The graveyard of half-done hobbies expands." },
            { text: "Take a nap that ruins your sleep schedule for 3 days", feedback: "A 20-minute nap turned into a time machine." },
            { text: "Re-analyze a random conversation from 2022", feedback: "Overthinking is a cardio workout for you. 🧠" },
            { text: "Look at funny memes and giggle silently", feedback: "Quality self-care right there." },
          ],
        },
        {
          id: 4,
          question: "Shrilakshmi's response time to text messages:",
          options: [
            { text: "0.003 seconds with 14 exclamation marks", feedback: "Speed demon mode activated." },
            { text: "4 business days later: 'omg sorry just saw this!!'", feedback: "Time is a social construct anyway." },
            { text: "Replies in mind, forgets to actually send it", feedback: "Telepathic messaging protocol in full effect." },
            { text: "Seen at 2 PM, comprehensive reply at 2 AM", feedback: "Night owl diplomacy." },
          ],
        },
        {
          id: 5,
          question: "What is your secret superpower?",
          options: [
            { text: "Finding the one absurd detail everyone else missed", feedback: "Sherlock Holmes is taking notes." },
            { text: "Being extraordinarily kind when people least expect it", feedback: "100% true. Don't deny it. 🌷" },
            { text: "Possessing unmatched chaotic resilience", feedback: "Indestructible energy." },
            { text: "Remembering oddly specific trivia nobody asked for", feedback: "Walking encyclopedia of random knowledge." },
          ],
        },
      ],
    },

    // Game 2: Make Her Laugh Jokes & Roasts
    makeHerLaugh: {
      title: "Make Her Laugh",
      challengePrompt: "Go ahead... try to break my poker face. 😐",
      jokes: {
        joke: [
          "I told my suitcase there will be no vacation this year. Now I'm dealing with emotional baggage.",
          "Why do we tell actors to 'break a leg'? Because every play has a cast.",
          "Parallel lines have so much in common. It's a shame they'll never meet.",
          "My doctor told me I was addicted to Twitter. I said: 'Can you prescribe more followers?'",
        ],
        roast: [
          "You have two moods: 'I need to fix my entire life right this second' and 'Whatever, it is what it is' 3 minutes later.",
          "Your brain has 47 browser tabs open, 5 of them are frozen, and ambient music is playing from an unknown tab.",
          "You will overthink a 3-word text for 45 minutes, then reply with 'k'.",
          "You're the type of person who looks for their phone while holding it with the flashlight turned on.",
        ],
        random: [
          "A snail once bought a sports car and painted a giant 'S' on it so everyone would say: 'Look at that S-car-go!'",
          "Did you know sea otters hold hands while they sleep so they don't float away? That has nothing to do with this, but it's cute.",
          "If tomatoes are a fruit, then ketchup is technically a smoothie. Think about that.",
          "Statistically, 9 out of 10 people enjoy statistics. The 10th person was busy making tea.",
        ],
        stupid: [
          "What do you call a fake noodle? An impasta.",
          "Why did the invisible man turn down the job offer? He just couldn't see himself doing it.",
          "What did the left eye say to the right eye? Between you and me, something smells.",
          "Why did the scarecrow win an award? Because he was outstanding in his field.",
        ],
      },
    },

    // Game 3: Compliment Catch Falling Items
    complimentCatch: {
      title: "Compliment Catch",
      compliments: [
        { text: "✨ genuinely kind", type: "good" },
        { text: "🌷 deeply appreciated", type: "good" },
        { text: "⭐ fun to be around", type: "good" },
        { text: "💫 makes moments better", type: "good" },
        { text: "🌱 doing alright", type: "good" },
        { text: "🌸 actually thoughtful", type: "good" },
        { text: "💎 irreplaceable friend", type: "good" },
      ],
      roasts: [
        { text: "💀 professional overthinker", type: "bad" },
        { text: "🤡 certified menace", type: "bad" },
        { text: "😂 slightly chaotic", type: "bad" },
        { text: "🫠 questionable decisions", type: "bad" },
        { text: "👀 3 AM spiral", type: "bad" },
      ],
    },

    // Game 4: Memory Hunt Items
    memoryHunt: {
      title: "Memory Hunt",
      items: [
        { id: "flower", label: "Flower", emoji: "🌸", x: 24, y: 38, message: "You found it! The plant was feeling shy." },
        { id: "cup", label: "Cup", emoji: "☕", x: 62, y: 68, message: "Okay detective. 👀 Coffee was getting cold anyway." },
        { id: "star", label: "Star", emoji: "⭐", x: 82, y: 22, message: "How did you notice that? Shining bright in the corner." },
        { id: "headphones", label: "Headphones", emoji: "🎧", x: 44, y: 62, message: "Tune in! Playing good vibes only." },
        { id: "envelope", label: "Envelope", emoji: "💌", x: 35, y: 78, message: "A little note tucked away. Sneaky!" },
        { id: "butterfly", label: "Butterfly", emoji: "🦋", x: 15, y: 18, message: "Fluttered right into your view!" },
      ],
    },

    // Game 5: Star Catcher
    starCatcher: {
      title: "Star Catcher",
      targetStars: 8,
      constellationMessage: "You connected the stars into 'S' for Shrilakshmi!",
    },
  },

  // ---------------------------------------------------------------------------
  // 12. PERSONAL MESSAGE & HEART LETTER (HeartSection)
  // ---------------------------------------------------------------------------
  personalMessage: {
    title: "The Starlight Letter",
    lines: [
      { text: "Anyway... adhu irli bidi.", isHandwriting: true },
      { text: "I didn't make this because I had something dramatic to say. Yenu dodda dramatic speech kodoke idhanna madilla." },
      { text: "I just wanted to make something for you. Ninagagi ondu chikka corner madbeku ansthu.", isBold: true },
      { text: "You don't have to do anything with that. Neenu yenu react madlebeku anno aagathya illa.", isLight: true },
      { text: "I just hope you know that you're appreciated. Neenu tumba important person nanna life alli anno thilikolre saaku." },
    ],
    finalPeak: {
      title: "I'm glad you're here.",
      kannadaSubtitle: "neenu irorhe khushi. :)",
    },
  },

  // ---------------------------------------------------------------------------
  // 13. FOOTER & FINAL SCREEN (FinalScreen)
  // ---------------------------------------------------------------------------
  footer: {
    title: "That's all",
    kannadaTitle: "ashte kano!",
    paragraphs: [
      "I could've made this a giant emotional speech... dodda speech kodabahudithu.",
      "But honestly · nijavaglu helbekandre,",
      "I just wanted to make something for you. Ninagagi ondu koli madbeku ansthu.",
    ],
    signature: "— Sandyy",
    authorTransliteration: "nanna hesaru sandeep · made with care for Shrilakshmi",
    psStickyNote: {
      line1: "P.S. Ond sala aadru smile madlebeku anno condition ide! 😂",
      line2: "(You were expected to smile at least once while visiting this website).",
    },
    backToDeskButtonText: "Back to Cozy Desk · manege banni 🏠",
    copyrightText: "Handcrafted with React & care for Shrilakshmi · 2026",
  },

  // ---------------------------------------------------------------------------
  // 14. SECRET VAULT MESSAGE (SecretModal)
  // ---------------------------------------------------------------------------
  secretMessage: {
    badge: "SECRET LEVEL UNLOCKED · GUPCHUP ROOM",
    title: "You actually found it · Nijvaglu kandhidya!",
    step1: "I wasn't going to put this here... Illi idhanna bidalla antha ankondidde.",
    step2: "curiosity levels check madthidini...",
    step3: "Aadre neenu prathi ondu check madbekalva! 😂",
    step4: "Thanks for taking the time to explore this little corner. Tumba thanks kano! 🌷",
    closeButtonText: "Close & Keep Exploring · innu nodu ✨",
  },

  // ---------------------------------------------------------------------------
  // 15. BADGES & DISCOVERIES (BadgesModal)
  // ---------------------------------------------------------------------------
  badges: {
    title: "Shrilakshmi's Discoveries",
    kannadaTitle: "sadhanegalu",
    subtitleText: "moments discovered · Yella kandhidya nodu!",
    closeButtonText: "Close · Saaku ✨",
    list: [
      { id: "garden", title: "Green Thumb · Gida Belasida Khushi", desc: "Grew the terrarium to full magnificent bloom", icon: "🌷" },
      { id: "arcade_algo", title: "Neural Analysis · 11:47 PM Research", desc: "Discovered what Shrilakshmi is doing at 11:47 PM", icon: "🧠" },
      { id: "arcade_memory", title: "Master Detective · Yella Hudukidhe", desc: "Spotted all hidden objects in the cozy room", icon: "🔍" },
      { id: "arcade_laugh", title: "Comedy Legend · Nagisidhe", desc: "Broke the stoic avatar poker face with jokes", icon: "😂" },
      { id: "arcade_compliments", title: "Compliment Magnet · Positive Vibe", desc: "Collected positive truths and dodged chaotic roasts", icon: "🌸" },
      { id: "arcade_stars", title: "Stargazer · Nakshatra Connect", desc: "Connected the stars to form the S constellation", icon: "⭐" },
      { id: "memes", title: "Two Realities · Devi & MBA Lore", desc: "Discovered the festival coincidence & MBA case study lore", icon: "🪔" },
      { id: "secret", title: "Curiosity Master · Gupchup Explorer", desc: "Found the hidden secret level", icon: "🎁" },
    ],
  },
};
