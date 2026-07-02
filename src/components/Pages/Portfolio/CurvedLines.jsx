import { useEffect, useRef } from "react";

export default function CurvedLinesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    const NUM = 22;
    const lines = [];

    function randBetween(a, b) { return a + Math.random() * (b - a); }

    function makeLine() {
      const W = canvas.width, H = canvas.height;
      const startEdge = Math.floor(Math.random() * 4);
      let sx, sy;
      if (startEdge === 0)      { sx = randBetween(0, W); sy = -10; }
      else if (startEdge === 1) { sx = W + 10; sy = randBetween(0, H); }
      else if (startEdge === 2) { sx = randBetween(0, W); sy = H + 10; }
      else                      { sx = -10; sy = randBetween(0, H); }

      const angle = Math.random() * Math.PI * 2;
      const speed = randBetween(0.18, 0.55);
      const curvature = randBetween(0.003, 0.018) * (Math.random() < 0.5 ? 1 : -1);
      const opacity = randBetween(0.12, 0.45);
      const width = randBetween(0.6, 1.8);
      const r = Math.floor(randBetween(80, 160));
      const g = Math.floor(randBetween(100, 200));
      const b = Math.floor(randBetween(180, 255));
      const color = `rgba(${r},${g},${b},`;

      const points = [];
      let cx = sx, cy = sy, ang = angle;
      for (let i = 0; i <= 80; i++) {
        points.push([cx, cy]);
        ang += curvature;
        cx += Math.cos(ang) * speed * 3;
        cy += Math.sin(ang) * speed * 3;
      }

      return { points, progress: 0, speed, opacity, width, color, alive: true };
    }

    for (let i = 0; i < NUM; i++) {
      const l = makeLine();
      l.progress = Math.floor(Math.random() * l.points.length);
      lines.push(l);
    }

    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const line of lines) {
        if (!line.alive) continue;
        line.progress += line.speed * 0.6;
        const head = Math.floor(line.progress);
        const tail = Math.max(0, head - 70);
        if (head >= line.points.length) { line.alive = false; continue; }

        ctx.beginPath();
        for (let i = tail; i <= Math.min(head, line.points.length - 1); i++) {
          const t = (i - tail) / (head - tail + 1);
          const alpha = line.opacity * Math.sin(t * Math.PI);
          ctx.strokeStyle = line.color + alpha + ")";
          ctx.lineWidth = line.width;
          ctx.lineCap = "round";
          if (i === tail) ctx.moveTo(line.points[i][0], line.points[i][1]);
          else ctx.lineTo(line.points[i][0], line.points[i][1]);
        }
        ctx.stroke();
      }

      const dead = lines.filter(l => !l.alive).length;
      for (let i = 0; i < dead; i++) {
        const idx = lines.findIndex(l => !l.alive);
        lines[idx] = makeLine();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}