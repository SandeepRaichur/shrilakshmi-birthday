// Utility to generate and download a clean, high-resolution (2x) PNG for Shrilakshmi's memes

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

    // Helper: draw rounded rect
    const drawRoundedRect = (x, y, w, h, r, fill, stroke) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    // Helper: wrap text
    const wrapText = (text, x, y, maxWidth, lineHeight, font, fill) => {
      ctx.font = font;
      ctx.fillStyle = fill;
      const words = text.split(' ');
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

    // 1. Base cream background
    ctx.fillStyle = '#FAF7F0';
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle outer border card
    drawRoundedRect(40, 40, width - 80, height - 80, 36, '#FFFFFF', '#E9D5FF');

    // 2b. Cute Washi Tape at Top of Card
    drawRoundedRect(width / 2 - 80, 24, 160, 32, 4, 'rgba(254, 240, 138, 0.9)', 'rgba(245, 158, 11, 0.3)');
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = '#92400E';
    ctx.textAlign = 'center';
    ctx.fillText('FIELD NOTE · ARCHIVED', width / 2, 44);

    // 3. Top Tag
    drawRoundedRect(80, 80, 260, 38, 19, '#F3E8FF', '#DDD6FE');
    ctx.font = '700 13px "Outfit", Nunito, sans-serif';
    ctx.fillStyle = '#6B21A8';
    ctx.textAlign = 'center';
    ctx.fillText('A LITTLE ABOUT SHRILAKSHMI', 210, 104);

    // Title & Subtitle in Fraunces serif
    ctx.textAlign = 'left';
    ctx.font = 'bold 36px "Fraunces", "Outfit", serif';
    ctx.fillStyle = '#1F2937';
    ctx.fillText(title, 80, 165);

    ctx.font = '400 17px "Plus Jakarta Sans", Nunito, sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText(subtitle, 80, 198);

    // Horizontal divider
    ctx.strokeStyle = '#F3F4F6';
    ctx.beginPath();
    ctx.moveTo(80, 225);
    ctx.lineTo(width - 80, 225);
    ctx.stroke();

    // 4. Panel 1 Box
    drawRoundedRect(80, 255, width - 160, 150, 24, '#FDFBF7', '#E5E7EB');
    // Pill inside Panel 1
    ctx.font = 'bold 15px "Outfit", Nunito, sans-serif';
    const pill1Width = Math.max(190, ctx.measureText(panel1Title).width + 36);
    drawRoundedRect(110, 280, pill1Width, 32, 16, '#FEF3C7', '#FDE68A');
    ctx.fillStyle = '#92400E';
    ctx.fillText(panel1Title, 128, 302);

    ctx.font = 'italic 20px "Caveat", "Patrick Hand", Nunito, sans-serif';
    ctx.fillStyle = '#374151';
    wrapText(panel1Text, 110, 355, width - 220, 28, 'italic 21px Nunito, sans-serif', '#374151');

    // 5. Panel 2 Box
    drawRoundedRect(80, 435, width - 160, 150, 24, '#FDFBF7', '#E5E7EB');
    // Pill inside Panel 2
    ctx.font = 'bold 15px "Outfit", Nunito, sans-serif';
    const pill2Width = Math.max(190, ctx.measureText(panel2Title).width + 36);
    drawRoundedRect(110, 460, pill2Width, 32, 16, '#EDE9FE', '#DDD6FE');
    ctx.fillStyle = '#5B21B6';
    ctx.fillText(panel2Title, 128, 482);

    ctx.font = 'italic 20px "Caveat", "Patrick Hand", Nunito, sans-serif';
    ctx.fillStyle = '#374151';
    wrapText(panel2Text, 110, 535, width - 220, 28, 'italic 21px Nunito, sans-serif', '#374151');

    // 6. Punchline Revealed Box
    drawRoundedRect(80, 620, width - 160, 240, 24, '#FAF5FF', '#D8B4FE');

    ctx.font = '600 13px "Outfit", Nunito, sans-serif';
    ctx.fillStyle = '#7E22CE';
    ctx.fillText('THE REVEAL', 110, 660);

    // Punchline text in Fraunces serif
    wrapText(
      punchline,
      110,
      715,
      width - 220,
      40,
      'bold 28px "Fraunces", "Outfit", serif',
      '#1E1B4B'
    );

    // Caption
    wrapText(
      caption,
      110,
      810,
      width - 220,
      28,
      'italic 18px Nunito, sans-serif',
      '#6B7280'
    );

    // 7. Footer
    ctx.strokeStyle = '#F3F4F6';
    ctx.beginPath();
    ctx.moveTo(80, 990);
    ctx.lineTo(width - 80, 990);
    ctx.stroke();

    ctx.font = 'bold 20px "Patrick Hand", "Caveat", cursive';
    ctx.fillStyle = '#581C87';
    ctx.fillText('— Sandyy', 80, 1035);

    ctx.font = '500 14px Nunito, sans-serif';
    ctx.fillStyle = '#9CA3AF';
    ctx.textAlign = 'right';
    ctx.fillText('for Shrilakshmi · 2026', width - 80, 1035);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `shrilakshmi-${id}-meme.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  } catch (err) {
    console.error('Failed to export meme as PNG:', err);
  }
}
