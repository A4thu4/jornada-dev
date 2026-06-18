import {
  Code, Database, Globe, Lock, Layers, Trophy, Monitor, Zap, Component,
  Palette, Gauge, GitBranch, Cloud, Calculator, BarChart2, Brain, Network,
  MessageSquare, Bot, Eye, Terminal, Box, Activity, Gamepad2, Layout,
  Music, Shield, Search, Bug, CheckCircle, ClipboardList, Table, Radio,
  Clock, Link, Coins, Users, Cpu, FileCode, Star,
} from 'lucide-react';
import type { Module } from '../data/tracks';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Code, Database, Globe, Lock, Layers, Trophy, Monitor, Zap, Component,
  Palette, Gauge, GitBranch, Cloud, Calculator, BarChart2, Brain, Network,
  MessageSquare, Bot, Eye, Terminal, Box, Activity, Gamepad2, Layout,
  Music, Shield, Search, Bug, CheckCircle, ClipboardList, Table, Radio,
  Clock, Link, Coins, Users, Cpu, FileCode,
};

interface ModuleCardProps {
  module: Module;
  index: number;
  accentColor: string;
  accentGlow: string;
  isFeatured?: boolean;
}

export function ModuleCard({ module, index, accentColor, accentGlow, isFeatured }: ModuleCardProps) {
  const Icon = iconMap[module.icon] ?? Code;
  const isAvailable = module.status === 'disponível' || module.status === 'em-progresso' || module.status === 'concluído';
  const isLocked = module.status === 'bloqueado';

  return (
    <div className="flex gap-4 items-stretch">
      {/* Timeline connector */}
      <div className="flex flex-col items-center" style={{ minWidth: '40px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: `2px solid ${isAvailable ? accentColor : 'rgba(255,255,255,0.15)'}`,
            background: isAvailable ? `radial-gradient(circle, ${accentGlow}, transparent)` : 'rgba(13,21,38,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: isAvailable && isFeatured ? `0 0 16px ${accentGlow}` : 'none',
          }}
        >
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', color: isAvailable ? accentColor : '#4B5563' }}>
            {index + 1}
          </span>
        </div>
        {index < 5 && (
          <div style={{ width: '2px', flex: 1, background: `linear-gradient(to bottom, ${accentColor}40, transparent)`, minHeight: '20px' }} />
        )}
      </div>

      {/* Card */}
      <div
        style={{
          background: isFeatured
            ? `linear-gradient(135deg, rgba(13,21,38,0.98), rgba(20,32,60,0.95))`
            : 'rgba(13,21,38,0.6)',
          border: isFeatured
            ? `1px solid ${accentColor}60`
            : '1px solid rgba(255,255,255,0.07)',
          boxShadow: isFeatured ? `0 0 30px ${accentGlow}, inset 0 0 20px ${accentGlow}30` : 'none',
          opacity: isLocked ? 0.5 : 1,
          marginBottom: '12px',
        }}
        className="flex-1 rounded-xl p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div
              style={{
                background: `rgba(${isAvailable ? accentColor : '#9CA3AF'}22, 0.15)`,
                border: `1px solid ${isAvailable ? accentColor + '40' : 'rgba(255,255,255,0.1)'}`,
                padding: '8px',
                borderRadius: '8px',
                flexShrink: 0,
              }}
            >
              <Icon size={18} color={isAvailable ? accentColor : '#6B7280'} />
            </div>
            <div className="flex-1">
              <h4
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '13px',
                  color: isAvailable ? '#F1F5F9' : '#6B7280',
                  marginBottom: '4px',
                }}
              >
                {module.title}
              </h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px' }} className="text-gray-500 leading-snug">
                {module.description}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px' }} className="text-gray-600">
                  {module.lessonCount} aulas
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} color={i < module.rating ? accentColor : '#374151'} fill={i < module.rating ? accentColor : 'transparent'} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {isLocked ? (
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px' }} className="text-gray-600 uppercase tracking-wider">
                Bloqueado
              </span>
            ) : (
              <button
                style={{
                  background: isFeatured
                    ? `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`
                    : `rgba(${accentColor}, 0.1)`,
                  backgroundColor: isFeatured ? accentColor : 'transparent',
                  border: `1px solid ${accentColor}80`,
                  color: isFeatured ? '#000' : accentColor,
                  fontFamily: "'Cinzel', serif",
                  fontSize: '10px',
                  letterSpacing: '0.05em',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                className="uppercase hover:opacity-80 transition-opacity"
              >
                {isFeatured ? '▶ Iniciar' : '▶ Começar'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
