// Utility to generate and download a clean, high-resolution (2x) editorial PNG for Shrilakshmi's memes

export async function exportMemeCardAsPng({
  id,
  title,
  subtitle,
  panel1Title,
  panel1Text,
  panel2Title,
  panel2Text,
  punchline,
  caption,
  annotation,
}) {
  try {
    if (document.fonts) {
      await document.fonts.ready;
    }

    const width = 1000;
    const height = 1120;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Helper: draw rect
    const drawRect = (x, y, w, h, fill, stroke) => {
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.closePath();
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    // Helper: wrap text
    const wrapText = (text, x, y, maxWidth, lineHeight, font, fill) => {
      ctx.font = font;
      ctx.fillStyle = fill;
      const words = (text || '').split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line.trim(), x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, currentY);
      return currentY + lineHeight;
    };

    // 1. Base Warm Paper Background
    ctx.fillStyle = '#F5F1E8';
    ctx.fillRect(0, 0, width, height);

    // 2. Editorial Outer Border Card
    drawRect(50, 50, width - 100, height - 100, '#F5F1E8', '#DAD5C9');
    drawRect(60, 60, width - 120, height - 120, null, '#E5E0D5');

    // 3. Top Restrained Editorial Masthead
    ctx.font = '600 12px monospace';
    ctx.fillStyle = '#77766D';
    ctx.textAlign = 'left';
    ctx.fillText('A SMALL INTERNET EXPERIMENT · TWO VERY SPECIFIC OBSERVATIONS', 90, 105);

    ctx.textAlign = 'right';
    ctx.fillText('MADE FOR SHRILAKSHMI · 2026', width - 90, 105);

    // Divider line
    ctx.beginPath();
    ctx.moveTo(90, 125);
    ctx.lineTo(width - 90, 125);
    ctx.strokeStyle = '#DAD5C9';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. Large Editorial Headline
    ctx.textAlign = 'left';
    ctx.font = 'normal 44px "Instrument Serif", "DM Serif Display", Georgia, serif';
    ctx.fillStyle = '#22231F';
    ctx.fillText(title, 90, 195);

    // Subtitle
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillStyle = '#77766D';
    ctx.fillText(subtitle || 'Purely coincidental. Probably.', 90, 235);

    // 5. Side-by-side comparison panels
    const panelY = 275;
    const panelWidth = 385;
    const panelHeight = 220;

    // Panel 1
    drawRect(90, panelY, panelWidth, panelHeight, '#FFFFFF', '#DAD5C9');
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#777D5A';
    ctx.fillText((panel1Title || '2025').toUpperCase(), 115, panelY + 38);

    wrapText(panel1Text, 115, panelY + 80, panelWidth - 50, 26, 'normal 18px "Inter", sans-serif', '#22231F');

    // Panel 2
    drawRect(width - 90 - panelWidth, panelY, panelWidth, panelHeight, '#FFFFFF', '#DAD5C9');
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#777D5A';
    ctx.fillText((panel2Title || '2026').toUpperCase(), width - 90 - panelWidth + 25, panelY + 38);

    wrapText(panel2Text, width - 90 - panelWidth + 25, panelY + 80, panelWidth - 50, 26, 'normal 18px "Inter", sans-serif', '#22231F');

    // 6. Punchline Box (Editorial chartreuse/olive accent)
    const punchY = 540;
    drawRect(90, punchY, width - 180, 280, '#FAF8F3', '#DAD5C9');

    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = '#777D5A';
    ctx.fillText('VERIFIED HYPOTHESIS', 120, punchY + 45);

    // Big italic serif quote
    wrapText(punchline, 120, punchY + 110, width - 240, 48, 'italic 34px "Instrument Serif", "DM Serif Display", Georgia, serif', '#22231F');

    // Annotation
    if (annotation) {
      ctx.font = '600 12px monospace';
      ctx.fillStyle = '#777D5A';
      ctx.fillText(`[ ${annotation} ]`, 120, punchY + 235);
    }

    // 7. Supporting Caption & Footer
    ctx.textAlign = 'left';
    ctx.font = '14px "Inter", sans-serif';
    ctx.fillStyle = '#77766D';
    ctx.fillText(caption || '', 90, height - 130);

    // Bottom colophon
    ctx.beginPath();
    ctx.moveTo(90, height - 100);
    ctx.lineTo(width - 90, height - 100);
    ctx.strokeStyle = '#DAD5C9';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = '11px monospace';
    ctx.fillStyle = '#77766D';
    ctx.fillText('EDITORIAL OBSERVATION · CONFIDENTIAL FRIENDSHIP ARCHIVE', 90, height - 75);

    ctx.textAlign = 'right';
    ctx.fillText('— Sandeep · 2026', width - 90, height - 75);

    // Download trigger
    const link = document.createElement('a');
    link.download = `shrilakshmi-${id}-observation.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Failed to export meme PNG:', err);
  }
}
