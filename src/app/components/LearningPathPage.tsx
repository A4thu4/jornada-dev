import type React from 'react';
import {
  Instagram, Github,
  Server, Monitor, Layers, Cloud, BarChart2, Brain, GitBranch,
  Gamepad2, Shield, Palette, Bug, Database, Cpu, Bot, Link, ArrowLeft,
} from 'lucide-react';
import type { Character } from '../data/tracks';
import { StatsBar } from './StatsBar';
import { ModuleCard } from './ModuleCard';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Server, Monitor, Layers, Cloud, BarChart2, Brain, GitBranch,
  Gamepad2, Shield, Palette, Bug, Database, Cpu, Bot, Link,
};

interface LearningPathPageProps {
  character: Character;
  onBack: () => void;
}

export function LearningPathPage({ character, onBack }: LearningPathPageProps) {
  const Icon = iconMap[character.icon] ?? Server;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #060B1A 0%, #080F20 60%, #060B1A 100%)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Top nav */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(6,11,26,0.9)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            style={{ color: character.accentColor }}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.1em' }}>
              Selecionar Trilha
            </span>
          </button>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', color: '#475569' }}>
            {character.name}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
        {/* Character Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          {/* Avatar */}
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${character.accentGlow}, rgba(13,21,38,0.8))`,
              border: `2px solid ${character.accentColor}60`,
              boxShadow: `0 0 40px ${character.accentGlow}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={44} color={character.accentColor} />
          </div>

          <div>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '11px',
                letterSpacing: '0.35em',
                color: '#475569',
              }}
              className="uppercase mb-1"
            >
              Trilha ·{' '}
              <span style={{ color: character.accentColor }}>{character.archetype}</span>
            </p>
            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(28px, 5vw, 48px)',
                color: '#F1F5F9',
                letterSpacing: '0.05em',
                lineHeight: '1',
              }}
            >
              {character.name.toUpperCase()}
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', marginTop: '6px' }}>
              {character.title}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              style={{
                border: `1px solid rgba(227,6,46,0.15)`,
                color: '#e3062e',
                fontFamily: "'Cinzel', serif",
                fontSize: '11px',
                letterSpacing: '0.1em',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: 'rgba(244,75,86,0.15)',
              }}
              className="uppercase hover:opacity-70 transition-opacity inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
                <Instagram size={14} /> Instagram
            </button>

            <button
              style={{
                border: `1px solid ${character.accentColor}60`,
                color: character.accentColor,
                fontFamily: "'Cinzel', serif",
                fontSize: '11px',
                letterSpacing: '0.1em',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: `${character.accentColor}15`,
              }}
              className="uppercase hover:opacity-80 transition-opacity inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
                <Github size={14} /> Github
            </button>
          </div>
        </div>

        {/* Stats */}
        <StatsBar stats={character.stats} accentColor={character.accentColor} />

        {/* Módulos header */}
        <div className="flex items-center gap-3">
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '11px',
              letterSpacing: '0.3em',
              color: '#475569',
            }}
            className="uppercase"
          >
            ✦ Módulos ✦
          </p>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Module list */}
        <div className="flex flex-col">
          {character.modules.map((module, i) => (
            <ModuleCard
              key={module.id}
              module={module}
              index={i}
              accentColor={character.accentColor}
              accentGlow={character.accentGlow}
              isFeatured={module.status === 'disponível' && i === 0}
            />
          ))}
        </div>

        {/* Locked notice */}
        <div
          style={{
            background: 'rgba(13,21,38,0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '12px', color: '#475569' }}>
            🔒 Os próximos módulos são desbloqueados conforme você avança na jornada.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', color: '#1E293B', letterSpacing: '0.2em' }}>
          JORNADA DEV © 2026 · FORJE SEU DESTINO
        </p>
      </div>
    </div>
  );
}
