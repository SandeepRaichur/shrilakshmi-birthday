===============================================================================
SHRILAKSHMI'S PHOTO FOLDER (public/photos/)
===============================================================================

Place your image files here (e.g. .jpg, .png, .webp).

NAMING CONVENTION:
You can name them whatever you like:
- shri-1.jpg
- shri-2.jpg
- shri-3.jpg
...
- shri-16.jpg

HOW THE HIGHLIGHTS WORK:
1. The 1st photo in `src/data/shrilakshmi.js` (e.g. shri-1.jpg) is the OPENING HIGHLIGHT:
   - "WHERE IT ALL BEGAN · MODALA NENAPU"
   - Displayed as a large, featured spotlight card at the top of the gallery.

2. The LAST photo in `src/data/shrilakshmi.js` (e.g. shri-16.jpg) is the FINALE HIGHLIGHT:
   - "TO BE CONTINUED · INNU MUNDE..."
   - Displayed as a large, featured spotlight card at the bottom of the gallery.

3. All photos in between appear in the interactive Polaroid Grid with Category Filters
   (Favorites, Candids, Festivals, Chaos) and a Full-Screen Lightbox!

HOW TO REFERENCE IN `src/data/shrilakshmi.js`:
Use local paths starting with `/photos/`:
  src: "/photos/shri-1.jpg"

If an image is not yet uploaded, a graceful pastel card will display automatically
so the page never looks broken.
