import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SOLAR_SYSTEM_PLANETS } from '../data/subjects';

interface CosmicBackgroundProps {
  onSelectPlanet?: (planetId: string) => void;
  interactive?: boolean;
}

interface Star {
  x: number;
  y: number;
  z: number; // depth
  size: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  fadeSpeed: number;
  color: string;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  onSelectPlanet,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [orbitsVisible, setOrbitsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  // Mouse coordinates for parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 40;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 40;

      // Check planet hover
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found: string | null = null;
      for (const p of planetPositionsRef.current) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        if (Math.sqrt(dx * dx + dy * dy) <= p.size + 10) {
          found = p.id;
          break;
        }
      }
      setHoveredPlanet(found);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (const p of planetPositionsRef.current) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        if (Math.sqrt(dx * dx + dy * dy) <= p.size + 14) {
          if (onSelectPlanet) {
            onSelectPlanet(p.id);
          }
          break;
        }
      }
    };
    canvas.addEventListener('click', handleClick);

    // Initialize 280 twinkling stars across 3 depth tiers
    const stars: Star[] = [];
    const starColors = ['#ffffff', '#bae6fd', '#e0e7ff', '#fef08a', '#c084fc'];
    for (let i = 0; i < 280; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Dynamic meteors (shooting stars)
    const meteors: Meteor[] = [];
    let lastMeteorTime = Date.now();

    // Planet state tracker
    const planetAngles: Record<string, number> = {};
    SOLAR_SYSTEM_PLANETS.forEach((p, idx) => {
      planetAngles[p.id] = (idx * (Math.PI / 4)) % (Math.PI * 2);
    });

    const planetPositionsRef = {
      current: [] as Array<{ id: string; x: number; y: number; size: number; name: string }>,
    };

    let moonAngle = 0;

    const render = () => {
      // Smooth parallax easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep space gradient fallback
      const bgGradient = ctx.createRadialGradient(
        width * 0.8 + mouseRef.current.x * 0.5,
        height * 0.25 + mouseRef.current.y * 0.5,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGradient.addColorStop(0, 'rgba(23, 20, 64, 0.4)');
      bgGradient.addColorStop(0.4, 'rgba(10, 16, 42, 0.6)');
      bgGradient.addColorStop(1, 'rgba(4, 7, 19, 0.85)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw starry depth layers
      for (const star of stars) {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        const parallaxX = star.x + (mouseRef.current.x / star.z);
        const parallaxY = star.y + (mouseRef.current.y / star.z);

        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.shadowBlur = star.size > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // Spawn Meteors
      const now = Date.now();
      if (now - lastMeteorTime > 3200 && Math.random() < 0.7) {
        meteors.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 90 + 70,
          speed: Math.random() * 8 + 12,
          angle: (Math.PI / 4) + (Math.random() * 0.3 - 0.15),
          alpha: 1,
          fadeSpeed: Math.random() * 0.015 + 0.02,
          color: Math.random() > 0.3 ? '#38bdf8' : '#a855f7',
        });
        lastMeteorTime = now;
      }

      // Draw Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= m.fadeSpeed;

        if (m.alpha <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const mGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        mGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        mGrad.addColorStop(0.8, m.color);
        mGrad.addColorStop(1, '#ffffff');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 2.2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = m.color;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Solar System Center: anchored at upper right on desktop, center on mobile
      const isMobile = width < 768;
      const sunCenterX = isMobile
        ? width * 0.5 + mouseRef.current.x * 0.3
        : width * 0.82 + mouseRef.current.x * 0.3;
      const sunCenterY = isMobile
        ? height * 0.35 + mouseRef.current.y * 0.3
        : height * 0.38 + mouseRef.current.y * 0.3;

      // Scale factor based on screen size
      const systemScale = isMobile ? Math.min(width, height) / 950 : Math.min(width, height) / 1050;

      // Draw radiant pulsating Sun
      const sunPulse = Math.sin(Date.now() * 0.002) * 4;
      const sunBaseSize = 34 * systemScale + sunPulse;

      // Sun Outer Corona
      const corona = ctx.createRadialGradient(
        sunCenterX,
        sunCenterY,
        sunBaseSize * 0.5,
        sunCenterX,
        sunCenterY,
        sunBaseSize * 3.8
      );
      corona.addColorStop(0, 'rgba(251, 191, 36, 0.7)');
      corona.addColorStop(0.3, 'rgba(245, 158, 11, 0.35)');
      corona.addColorStop(0.7, 'rgba(234, 88, 12, 0.12)');
      corona.addColorStop(1, 'rgba(234, 88, 12, 0)');

      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, sunBaseSize * 3.8, 0, Math.PI * 2);
      ctx.fillStyle = corona;
      ctx.fill();

      // Sun Core
      const sunCore = ctx.createRadialGradient(
        sunCenterX - sunBaseSize * 0.2,
        sunCenterY - sunBaseSize * 0.2,
        0,
        sunCenterX,
        sunCenterY,
        sunBaseSize
      );
      sunCore.addColorStop(0, '#ffffff');
      sunCore.addColorStop(0.3, '#fef08a');
      sunCore.addColorStop(0.7, '#f59e0b');
      sunCore.addColorStop(1, '#ea580c');

      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, sunBaseSize, 0, Math.PI * 2);
      ctx.fillStyle = sunCore;
      ctx.shadowBlur = 35;
      ctx.shadowColor = '#f59e0b';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Clear planet positions buffer
      const currentPlanetPositions: Array<{ id: string; x: number; y: number; size: number; name: string }> = [
        { id: 'sun', x: sunCenterX, y: sunCenterY, size: sunBaseSize, name: 'Sun (Quyosh)' },
      ];

      // Draw Orbit Lines & Planets
      const planetsToDraw = SOLAR_SYSTEM_PLANETS.filter((p) => p.id !== 'sun');

      planetsToDraw.forEach((planet) => {
        // Slow planetary movement
        if (!isPaused) {
          planetAngles[planet.id] += planet.speed * 0.25 * speedMultiplier;
        }

        const angle = planetAngles[planet.id];
        // Elliptical orbit radii
        const radiusX = planet.orbitRadius * 1.55 * systemScale;
        const radiusY = planet.orbitRadius * 0.78 * systemScale; // Tilted perspective

        // Draw delicate glowing elliptical orbit
        if (orbitsVisible) {
          ctx.beginPath();
          ctx.ellipse(sunCenterX, sunCenterY, radiusX, radiusY, -0.15, 0, Math.PI * 2);
          ctx.strokeStyle =
            hoveredPlanet === planet.id ? 'rgba(56, 189, 248, 0.45)' : 'rgba(56, 189, 248, 0.12)';
          ctx.lineWidth = hoveredPlanet === planet.id ? 1.5 : 0.8;
          ctx.setLineDash([3, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Calculate planet position
        const rot = -0.15;
        const rawX = Math.cos(angle) * radiusX;
        const rawY = Math.sin(angle) * radiusY;
        const px = sunCenterX + (rawX * Math.cos(rot) - rawY * Math.sin(rot));
        const py = sunCenterY + (rawX * Math.sin(rot) + rawY * Math.cos(rot));
        const planetSize = Math.max(3.5, planet.size * 0.75 * systemScale);

        currentPlanetPositions.push({
          id: planet.id,
          x: px,
          y: py,
          size: planetSize,
          name: planet.nameUz,
        });

        // Draw Saturn's ring back half
        if (planet.hasRings) {
          ctx.beginPath();
          ctx.ellipse(px, py, planetSize * 2.4, planetSize * 0.75, -0.3, Math.PI, Math.PI * 2);
          ctx.strokeStyle = 'rgba(234, 179, 8, 0.45)';
          ctx.lineWidth = planetSize * 0.6;
          ctx.stroke();
        }

        // Draw Planet Body with radial 3D lighting from Sun
        const planetGrad = ctx.createRadialGradient(
          px - planetSize * 0.35,
          py - planetSize * 0.35,
          planetSize * 0.1,
          px,
          py,
          planetSize
        );
        planetGrad.addColorStop(0, '#ffffff');
        planetGrad.addColorStop(0.3, planet.color);
        planetGrad.addColorStop(1, '#020617');

        ctx.beginPath();
        ctx.arc(px, py, planetSize, 0, Math.PI * 2);
        ctx.fillStyle = planetGrad;
        if (hoveredPlanet === planet.id) {
          ctx.shadowBlur = 18;
          ctx.shadowColor = planet.color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Saturn's ring front half
        if (planet.hasRings) {
          ctx.beginPath();
          ctx.ellipse(px, py, planetSize * 2.4, planetSize * 0.75, -0.3, 0, Math.PI);
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.75)';
          ctx.lineWidth = planetSize * 0.55;
          ctx.stroke();
        }

        // Draw Earth's Moon
        if (planet.id === 'earth') {
          if (!isPaused) moonAngle += 0.05 * speedMultiplier;
          const moonDist = planetSize * 2.2;
          const mx = px + Math.cos(moonAngle) * moonDist;
          const my = py + Math.sin(moonAngle) * (moonDist * 0.55);

          ctx.beginPath();
          ctx.arc(mx, my, planetSize * 0.28, 0, Math.PI * 2);
          ctx.fillStyle = '#e2e8f0';
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#94a3b8';
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Highlight ring on hover
        if (hoveredPlanet === planet.id) {
          ctx.beginPath();
          ctx.arc(px, py, planetSize + 7, 0, Math.PI * 2);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.8;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#38bdf8';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      planetPositionsRef.current = currentPlanetPositions;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [orbitsVisible, isPaused, speedMultiplier, hoveredPlanet, onSelectPlanet]);

  const activePlanetInfo = SOLAR_SYSTEM_PLANETS.find((p) => p.id === hoveredPlanet);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Visual inspiration background image layer with blend mode */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-45 mix-blend-screen pointer-events-none filter brightness-90 contrast-110"
        style={{
          backgroundImage: `url('/src/assets/images/cosmic_solar_system_bg_1791176318281.jpg')`,
        }}
      />

      {/* Dark cosmic scrims to guarantee AA legibility across all sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050713]/85 via-[#080d24]/75 to-[#050713]/95 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.12),transparent_70%)] pointer-events-none" />

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto cursor-crosshair"
      />

      {/* Hover Planet Tooltip */}
      {activePlanetInfo && (
        <div className="absolute top-24 right-6 pointer-events-auto max-w-xs p-3.5 glass-panel rounded-xl border border-cyan-400/40 text-xs shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 mb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: activePlanetInfo.color }}
              />
              <span className="font-display font-bold text-slate-100 text-sm">
                {activePlanetInfo.nameUz}
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">
              {activePlanetInfo.distanceFromSun}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px] mb-2">
            {activePlanetInfo.factsUz}
          </p>
          <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-mono">
            <span>Diametr: {activePlanetInfo.diameter}</span>
            <span className="text-cyan-300 underline cursor-pointer hover:text-cyan-100">
              Batafsil maʼlumot ↗
            </span>
          </div>
        </div>
      )}

      {/* Mini Cosmic Control Bar in Bottom Right */}
      <div className="absolute bottom-5 right-5 pointer-events-auto flex items-center gap-2 px-3 py-1.5 glass-panel rounded-full border border-cyan-500/20 text-xs text-slate-300 shadow-xl backdrop-blur-md">
        <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 pr-2 border-r border-slate-700/60">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          ORRERY
        </span>

        <button
          onClick={() => setOrbitsVisible(!orbitsVisible)}
          className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
            orbitsVisible ? 'text-cyan-300 bg-cyan-950/60' : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Orbita chiziqlarini koʻrsatish/yashirish"
        >
          {orbitsVisible ? 'Orbitalar: On' : 'Orbitalar: Off'}
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-2 py-1 rounded text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
          title="Harakatni toʻxtatish yoki davom ettirish"
        >
          {isPaused ? '▶ Davom' : '⏸ Pauza'}
        </button>

        <button
          onClick={() => setSpeedMultiplier((prev) => (prev >= 3 ? 1 : prev + 1))}
          className="px-2 py-1 rounded text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors"
          title="Tezlikni oshirish"
        >
          {speedMultiplier}x
        </button>
      </div>
    </div>
  );
};
