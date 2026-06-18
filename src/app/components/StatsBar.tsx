import { Flame, Sword, Shield, Star } from 'lucide-react';

interface StatsBarProps {
  stats: { fogo: number; espada: number; escudo: number; xp: number };
  accentColor: string;
}

const StatDot = ({ filled, color }: { filled: boolean; color: string }) => (
  <span
    style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: filled ? color : 'rgba(255,255,255,0.15)',
      display: 'inline-block',
      marginRight: '3px',
    }}
  />
);

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  max?: number;
  accentColor: string;
}

function StatItem({ icon, label, value, max = 5, accentColor }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ color: accentColor }}>{icon}</div>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px' }} className="text-gray-500 uppercase tracking-widest">
        {label}
      </span>
      <div className="flex">
        {Array.from({ length: max }).map((_, i) => (
          <StatDot key={i} filled={i < value} color={accentColor} />
        ))}
      </div>
    </div>
  );
}

export function StatsBar({ stats, accentColor }: StatsBarProps) {
  return (
    <div
      style={{
        background: 'rgba(13,21,38,0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      className="flex items-center justify-around gap-6 px-6 py-4 rounded-xl"
    >
      <StatItem icon={<Flame size={16} />} label="Fogo" value={stats.fogo} accentColor={accentColor} />
      <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
      <StatItem icon={<Sword size={16} />} label="Espada" value={stats.espada} accentColor={accentColor} />
      <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
      <StatItem icon={<Shield size={16} />} label="Escudo" value={stats.escudo} accentColor={accentColor} />
      <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
      <div className="flex flex-col items-center gap-1">
        <Star size={16} color={accentColor} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px' }} className="text-gray-500 uppercase tracking-widest">XP</span>
        <span style={{ fontFamily: "'Cinzel', serif", color: accentColor, fontSize: '14px' }}>{stats.xp.toLocaleString('pt-BR')}</span>
      </div>
    </div>
  );
}
