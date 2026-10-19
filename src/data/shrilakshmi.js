/**
 * ===============================================================================
 * SHRILAKSHMI'S ARCHIVE & STORY — SINGLE SOURCE OF TRUTH CONTENT CONFIGURATION
 * ===============================================================================
 * 
 * Simple English, friendly tone, easy to read and edit.
 * Controls all text, story chapters, photo collections, and the letter.
 * ===============================================================================
 */

export const shrilakshmiContent = {
  // ---------------------------------------------------------------------------
  // 1. PROFILE & SIGNATURE
  // ---------------------------------------------------------------------------
  profile: {
    name: "Shrilakshmi",
    nickname: "Shri",
    authorName: "Sandeep",
    authorFullName: "Sandeep",
    authorTransliteration: "nanna hesaru sandeep · made with care for Shrilakshmi",
    signature: "— Sandeep",
    year: "2026",
    edition: "FOR SHRILAKSHMI · 2026",
  },

  // ---------------------------------------------------------------------------
  // 2. SECTION VISIBILITY CONTROLS
  // ---------------------------------------------------------------------------
  sections: {
    hero: true,        // Hero with greeting & 1.jpeg photo
    story: true,       // 10 real story chapters
    gallery: true,     // Photo gallery (3 collections)
    letter: true,      // Simple 63-word letter
    colophon: true,    // Footer & sign-off
  },

  // ---------------------------------------------------------------------------
  // 3. INTRODUCTION / HERO (SIMPLE ENGLISH)
  // ---------------------------------------------------------------------------
  introduction: {
    mastheadLeft: "A LITTLE WEBSITE FOR YOU",
    mastheadRight: "MADE FOR SHRILAKSHMI · 2026",
    headlineLine1: "hey,",
    headlineLine2: "shrilakshmi.",
    salutation: "en samachara? hegiddeeya? :)",
    tagline: "No big reason for this website, just made it for fun.",
    supportingText: "Our story, some photos from college, and a small letter.",
    scrollCue: "SEE OUR STORY ↓",
    heroPhoto: "/photos/1.jpeg",
  },

  // ---------------------------------------------------------------------------
  // 4. OUR FRIENDSHIP STORY (10 Chapters in Simple English)
  // ---------------------------------------------------------------------------
  story: {
    badge: "OUR STORY",
    title: "our friendship story.",
    subtitle: "From not talking in 2nd PUC to long study calls on WhatsApp and your Goa lemon story.",
    chapters: [
      {
        id: "chapter-01",
        chapterNumber: "01",
        tag: "2ND PUC DAYS",
        headline: "Two people who never talked.",
        caption: "Same college. Same class. We never spoke a single word.",
        paragraphs: [
          "In 2nd PUC, we were in the exact same college. We saw each other every day in the hallway, but we never said a single word.",
          "It's funny how you can see someone every day without knowing they'll become such a good friend later.",
        ],
      },
      {
        id: "chapter-02",
        chapterNumber: "02",
        tag: "GARBA FEST",
        headline: "One birthday wish at Garba.",
        caption: "A small wish that started our whole friendship.",
        paragraphs: [
          "Then BCA started, and we were in the same college again.",
          "During the college Garba night, it was her birthday, so I just wished her happy birthday.",
          "That was it. That one simple birthday wish started our whole friendship.",
        ],
        ticketData: {
          event: "COLLEGE GARBA NIGHT",
          trigger: "ONE BIRTHDAY WISH",
          result: "FRIENDSHIP STARTED",
        },
      },
      {
        id: "chapter-03",
        chapterNumber: "03",
        tag: "INSTAGRAM REELS",
        headline: "Sending random reels all day.",
        caption: "Our usual way of talking.",
        paragraphs: [
          "Soon, our chats were mostly random funny reels and memes.",
          "We would send videos with zero context at 11:30 PM and just laugh about college and exams.",
        ],
      },
      {
        id: "chapter-04",
        chapterNumber: "04",
        tag: "FIRST GIFT",
        headline: "The Doraemon keychain.",
        caption: "A small gift that means a lot.",
        paragraphs: [
          "One day she gave me a Doraemon keychain.",
          "It was the first gift anyone ever gave me in my life, so I still keep it safely.",
          "It's a small thing, but means a lot to me.",
        ],
        itemCode: "ITEM NO. 001 — DORAEMON KEYCHAIN",
        artifactNote: "Still kept safely. My first ever gift.",
      },
      {
        id: "chapter-05",
        chapterNumber: "05",
        tag: "STUDY CALLS",
        headline: "Our very serious study calls 😂",
        caption: "Two students. Phone calls for hours. One syllabus fighting for its life.",
        paragraphs: [
          "During BCA, we studied from our own homes over phone calls. We made a separate WhatsApp group for every single subject, and asked ChatGPT everything.",
          "Honestly, we talked and laughed more than we studied.",
        ],
      },
      {
        id: "chapter-06",
        chapterNumber: "06",
        tag: "A REAL NOTE",
        headline: "The best part of BCA.",
        caption: "Not the exams, but the good conversations.",
        paragraphs: [
          "The best part of BCA wasn't the exams or grades.",
          "It was our long phone calls, teasing each other, and laughing after tired days.",
          "You also helped me a lot during some tough days in 2nd semester, and I really appreciate that.",
        ],
      },
      {
        id: "chapter-07",
        chapterNumber: "07",
        tag: "THE NICKNAME",
        headline: "The 'pinkyyy' nickname.",
        caption: "Where did it go?",
        paragraphs: [
          "In earlier semesters, she always used to call me 'pinkyyy'.",
          "Then one day she just stopped using it without any explanation.",
          "Still waiting for the reason why 😂.",
        ],
        caseStats: {
          alias: "PINKYYY",
          currentStatus: "STOPPED CALLING ME THIS",
          pressReleaseNote: "Stopped calling me this without any explanation 😂",
        },
      },
      {
        id: "chapter-08",
        chapterNumber: "08",
        tag: "FINAL YEAR",
        headline: "When study calls reduced.",
        caption: "Busy schedules, but same friendship.",
        paragraphs: [
          "In final year, classes changed and we got busy with exams and projects.",
          "We didn't study together as much, but whenever we caught up, it felt just like the old days.",
        ],
      },
      {
        id: "chapter-09",
        chapterNumber: "09",
        tag: "WHAT'S NEXT",
        headline: "Cognizant vs MBA.",
        caption: "A funny plot twist.",
        paragraphs: [
          "We both got selected for Cognizant, so I thought we'd meet in the office.",
          "Then came the plot twist: she's starting her MBA in November 2026.",
          "Wish you all the best for business school!",
        ],
        prediction: {
          title: "MY GUESS",
          desc: "Meeting at the Cognizant office.",
        },
        actual: {
          title: "REALITY",
          desc: "MBA era unlocked in November 2026.",
        },
      },
      {
        id: "chapter-10",
        chapterNumber: "10",
        tag: "GOA TRIP",
        headline: "The famous Goa lemon story 💀",
        caption: "The funniest travel story.",
        paragraphs: [
          "She told me about her Goa trip and taking a lemon to ward off drishti.",
          "We laughed so much when she was telling me about it.",
          "The beaches were nice, but the lemon was doing serious security work!",
        ],
        kannadaQuote: "Drushti agbardu antha lemon inda drushti togondidd Goa dag.",
        analysis: "Lemon security operations: 100% verified 😂",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. PHOTO GALLERY (SIMPLE ENGLISH)
  // ---------------------------------------------------------------------------
  gallery: {
    enabled: true,
    title: "SHRILAKSHMI'S PHOTOS",
    subtitle: "Some good memories and photos from college days.",
    curatedTag: "PHOTO GALLERY · 2024–2026",
    collections: [
      {
        id: "childhood",
        collectionNumber: "PART 01",
        title: "Childhood Photos",
        subtitle: "Old photos from before college.",
        label: "LITTLE SHRILAKSHMI",
        images: [
          { id: "photo-20", number: 20, src: "/photos/20.jpg", alt: "Shrilakshmi childhood 20", caption: "Childhood photo 20" },
          { id: "photo-21", number: 21, src: "/photos/21.jpg", alt: "Shrilakshmi childhood 21", caption: "Childhood photo 21" },
          { id: "photo-22", number: 22, src: "/photos/22.jpg", alt: "Shrilakshmi childhood 22", caption: "Childhood photo 22" },
          { id: "photo-23", number: 23, src: "/photos/23.jpg", alt: "Shrilakshmi childhood 23", caption: "Childhood photo 23" },
        ],
      },
      {
        id: "individual",
        collectionNumber: "PART 02",
        title: "Shrilakshmi's Photos",
        subtitle: "College days and outings.",
        label: "SHRILAKSHMI",
        images: [
          { id: "photo-5", number: 5, src: "/photos/5.jpeg", alt: "Shrilakshmi 05", caption: "Shrilakshmi · 05" },
          { id: "photo-6", number: 6, src: "/photos/6.jpeg", alt: "Shrilakshmi 06", caption: "Shrilakshmi · 06" },
          { id: "photo-7", number: 7, src: "/photos/7.jpeg", alt: "Shrilakshmi 07", caption: "Shrilakshmi · 07" },
          { id: "photo-9", number: 9, src: "/photos/9.jpeg", alt: "Shrilakshmi 09", caption: "Shrilakshmi · 09" },
          { id: "photo-10", number: 10, src: "/photos/10.jpeg", alt: "Shrilakshmi 10", caption: "Shrilakshmi · 10" },
          { id: "photo-11", number: 11, src: "/photos/11.jpeg", alt: "Shrilakshmi 11", caption: "Shrilakshmi · 11" },
          { id: "photo-12", number: 12, src: "/photos/12.jpeg", alt: "Shrilakshmi 12", caption: "Shrilakshmi · 12", objectPosition: "center top" },
          { id: "photo-13", number: 13, src: "/photos/13.jpeg", alt: "Shrilakshmi 13", caption: "Shrilakshmi · 13", objectPosition: "center top" },
          { id: "photo-14", number: 14, src: "/photos/14.jpeg", alt: "Shrilakshmi 14", caption: "Shrilakshmi · 14", objectPosition: "center top" },
          { id: "photo-15", number: 15, src: "/photos/15.jpeg", alt: "Shrilakshmi 15", caption: "Shrilakshmi · 15", objectPosition: "center top" },
          { id: "photo-16", number: 16, src: "/photos/16.jpeg", alt: "Shrilakshmi 16", caption: "Shrilakshmi · 16" },
          { id: "photo-17", number: 17, src: "/photos/17.jpeg", alt: "Shrilakshmi 17", caption: "Shrilakshmi · 17" },
          { id: "photo-18", number: 18, src: "/photos/18.jpg", alt: "Shrilakshmi 18", caption: "Shrilakshmi · 18" },
          { id: "photo-19", number: 19, src: "/photos/19.jpg", alt: "Shrilakshmi 19", caption: "Shrilakshmi · 19" },
          { id: "photo-25", number: 25, src: "/photos/25.jpeg", alt: "Shrilakshmi 25", caption: "Shrilakshmi · 25" },
          { id: "photo-26", number: 26, src: "/photos/26.jpeg", alt: "Shrilakshmi 26", caption: "Shrilakshmi · 26" },
        ],
      },
      {
        id: "together",
        collectionNumber: "PART 03",
        title: "Photos of Both of Us",
        subtitle: "Two friends who survived BCA together.",
        label: "TOGETHER",
        images: [
          {
            id: "photo-27",
            number: 27,
            src: "/photos/27.jpg",
            alt: "Shrilakshmi and Sandeep · 27",
            caption: "Two friends who survived the syllabus.",
          },
          {
            id: "photo-28",
            number: 28,
            src: "/photos/28.jpeg",
            alt: "Shrilakshmi and Sandeep · 28",
            caption: "From not talking in 2nd PUC to this.",
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. THE LETTER (Exact 63 Words in Simple English)
  // ---------------------------------------------------------------------------
  letter: {
    badge: "A SMALL LETTER",
    heading: "just a quiet letter.",
    subheading: "some things are better written down.",
    // Exactly 63 words in simple, direct, friendly English:
    body: "Some of my favourite BCA memories are our long phone calls when we were supposedly studying. We talked for hours, teased each other, asked ChatGPT everything, and made college days really fun. You also helped me a lot during some tough days in second semester. I'm really glad we went from not talking at all to becoming such good friends. Thanks for everything.",
    wordCount: 63,
    signature: "— Sandeep",
    postscript: "P.S. The Doraemon keychain is still safe.",
    kannadaTransliteration: "nanna hesaru sandeep · made with care for Shrilakshmi",
  },

  // ---------------------------------------------------------------------------
  // 7. COLOPHON & FOOTER
  // ---------------------------------------------------------------------------
  colophon: {
    title: "That's all.",
    credit: "Made by Sandeep for Shrilakshmi · 2026",
    backToTop: "BACK TO TOP ↑",
  },
};
