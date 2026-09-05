// Draws a static, synthetic waveform — a small sum of sinusoids plus mild
// decay, meant to look like a real acoustic signal snapshot rather than
// random noise or a generic sound-wave icon.

(function () {
  const canvas = document.getElementById("wave");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 900;
  const cssHeight = 140;

  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  ctx.scale(dpr, dpr);

  const midY = cssHeight / 2;
  const points = 400;

  function sample(x) {
    // x in [0, 1]
    const t = x * 8 * Math.PI;
    let v =
      0.5 * Math.sin(t) +
      0.25 * Math.sin(t * 2.7 + 0.4) +
      0.15 * Math.sin(t * 5.3 + 1.1) +
      0.08 * Math.sin(t * 11.0 + 2.0);
    // gentle envelope so it doesn't look perfectly periodic
    const env = 0.6 + 0.4 * Math.sin(x * Math.PI);
    return v * env;
  }

  ctx.strokeStyle = "#7fa39f";
  ctx.lineWidth = 1.5;
  ctx.beginPath();

  for (let i = 0; i <= points; i++) {
    const x = i / points;
    const px = x * cssWidth;
    const py = midY - sample(x) * (midY - 14);
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();

  // faint center line
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, midY);
  ctx.lineTo(cssWidth, midY);
  ctx.stroke();
})();
