import { useEffect, useState } from 'react';
import type React from 'react';
import {
	ArrowLeft, Award, ExternalLink, Github, Instagram,
	Server, Monitor, Layers, Cloud, BarChart2, Brain, GitBranch, ShieldAlert, ShieldBan,
	Gamepad2, Shield, Palette, Bug, Database, Cpu, Bot, Link, Box, Code,
	Sparkles, Sigma, Flame,
} from 'lucide-react';
import type { Character, Module } from '../data/tracks';
import { StatsBar } from './StatsBar';
import { ModuleCard } from './ModuleCard';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
	Server, Monitor, Layers, Cloud, BarChart2, Brain, GitBranch, ShieldAlert, ShieldBan,
	Gamepad2, Shield, Palette, Bug, Database, Cpu, Bot, Link, Box, Code,
	Sparkles, Sigma, Flame,
};

// Persistência do progresso da trilha entre sessões
const progressKey = (characterId: string) => `jornada-dev:progress:${characterId}`;

const applyStoredProgress = (character: Character): Module[] => {
	try {
		const raw = localStorage.getItem(progressKey(character.id));
		if (!raw) return character.modules;
		const saved = JSON.parse(raw) as Record<string, Module['status']>;
		return character.modules.map((m) => (saved[m.id] ? { ...m, status: saved[m.id] } : m));
	} catch {
		return character.modules;
	}
};

interface LearningPathPageProps {
	character: Character;
	onBack: () => void;
}

export function LearningPathPage({ character, onBack }: LearningPathPageProps) {
	const Icon = iconMap[character.icon] ?? Server;
	const [modules, setModules] = useState(() => applyStoredProgress(character));

	useEffect(() => {
		setModules(applyStoredProgress(character));
	}, [character]);

	useEffect(() => {
		try {
			const map = Object.fromEntries(modules.map((m) => [m.id, m.status]));
			localStorage.setItem(progressKey(character.id), JSON.stringify(map));
		} catch {
			// storage indisponível (modo privado etc.) — progresso segue apenas em memória
		}
	}, [modules, character.id]);

	const featuredModuleIndex = modules.findIndex((module) => module.status === 'disponível' || module.status === 'em-progresso');

	// Stats reais da trilha, derivadas do andamento dos módulos
	const totalModules = modules.length;
	const completedCount = modules.filter((m) => m.status === 'concluído').length;
	const trackDone = completedCount === totalModules;
	const derivedStats = {
		nivel: Math.min(5, 1 + Math.floor(completedCount / 3)),
		missoes: completedCount,
		progresso: Math.round((completedCount / totalModules) * 5),
		xp: completedCount * 250,
	};

	const handleCompleteModule = (moduleId: string) => {
		setModules((currentModules) => {
			const currentIndex = currentModules.findIndex((module) => module.id === moduleId);
			if (currentIndex === -1) {
				return currentModules;
			}

			return currentModules.map((module, index) => {
				if (index === currentIndex) {
					return { ...module, status: 'concluído' };
				}

				if (index === currentIndex + 1 && module.status === 'bloqueado') {
					return { ...module, status: 'disponível' };
				}

				return module;
			});
		});
	};

	const handleUndoModule = (moduleId: string) => {
		setModules((currentModules) => {
			const currentIndex = currentModules.findIndex((module) => module.id === moduleId);
			if (currentIndex === -1) {
				return currentModules;
			}

			return currentModules.map((module, index) => {
				if (index === currentIndex) {
					return { ...module, status: 'disponível' };
				}

				// Re-bloqueia o próximo módulo se ele ainda não foi iniciado/concluído
				if (index === currentIndex + 1 && module.status === 'disponível') {
					return { ...module, status: 'bloqueado' };
				}

				return module;
			});
		});
	};

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
						style={{color: character.accentColor}}
						className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
					>
						<ArrowLeft size={16}/>
						<span style={{fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.1em'}}>
                      Selecionar Trilha
                    </span>
					</button>
					<span style={{color: 'rgba(255,255,255,0.2)'}}>/</span>
					<span style={{fontFamily: "'Cinzel', serif", fontSize: '12px', color: '#475569'}}>
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
						<Icon size={44} color={character.accentColor}/>
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
							<span style={{color: character.accentColor}}>{character.title}</span>
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
						<p style={{fontSize: '14px', color: '#64748B', marginTop: '6px'}}>
							{character.archetype}
						</p>
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => window.open('https://instagram.com/arthur.mamedes', '_blank')}
							style={{
								border: `1px solid rgba(233,54,250,0.15)`,
								color: '#e936fa',
								fontFamily: "'Cinzel', serif",
								fontSize: '11px',
								letterSpacing: '0.1em',
								padding: '8px 16px',
								borderRadius: '8px',
								cursor: 'pointer',
								background: 'rgba(190,54,130,0.15)',
							}}
							className="uppercase hover:opacity-70 transition-opacity inline-flex items-center justify-center gap-2 whitespace-nowrap"
						>
							<Instagram size={14}/> @arthur.mamedes
						</button>

						<button
							onClick={() => window.open('https://github.com/A4thu4', '_blank')}
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
							<Github size={14}/> Github
						</button>
					</div>
				</div>

				{/* Stats */}
				<StatsBar stats={derivedStats} missoesMax={totalModules} accentColor={character.accentColor}/>

				{/* Módulos header */}
				<div className="flex items-center gap-3">
					<div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)'}}/>
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
					<div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)'}}/>
				</div>

				{/* Module list */}
				<div className="flex flex-col">
					{modules.map((module, i) => (
						<ModuleCard
							key={module.id}
							module={module}
							index={i}
							accentColor={character.accentColor}
							accentGlow={character.accentGlow}
							isFeatured={i === featuredModuleIndex}
							isLast={i === modules.length - 1}
							onComplete={handleCompleteModule}
							onUndo={handleUndoModule}
						/>
					))}
				</div>

				{/* Certificações da trilha */}
				{character.certificates && character.certificates.length > 0 && (
					<>
						<div className="flex items-center gap-3">
							<div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)'}}/>
							<p
								style={{
									fontFamily: "'Cinzel', serif",
									fontSize: '11px',
									letterSpacing: '0.3em',
									color: '#475569',
								}}
								className="uppercase"
							>
								✦ Certificações ✦
							</p>
							<div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)'}}/>
						</div>

						<div className="flex flex-col gap-3">
							{character.certificates.map((cert) => (
								<div
									key={cert.title}
									style={{
										background: trackDone
											? `linear-gradient(135deg, rgba(13,21,38,0.98), rgba(20,32,60,0.95))`
											: 'rgba(13,21,38,0.6)',
										border: trackDone
											? `1px solid ${character.accentColor}60`
											: '1px solid rgba(255,255,255,0.07)',
										boxShadow: trackDone ? `0 0 24px ${character.accentGlow}` : 'none',
										opacity: trackDone ? 1 : 0.75,
									}}
									className="rounded-xl p-4 flex items-center gap-3"
								>
									<div
										style={{
											background: `rgba(${character.accentColor}22, 0.15)`,
											border: `1px solid ${character.accentColor}40`,
											padding: '10px',
											borderRadius: '10px',
											flexShrink: 0,
										}}
									>
										<Award size={20} color={character.accentColor}/>
									</div>
									<div className="flex-1 min-w-0">
										<h4
											style={{
												fontFamily: "'Cinzel', serif",
												fontSize: '13px',
												color: '#F1F5F9',
												marginBottom: '2px',
											}}
										>
											{cert.title}
										</h4>
										<p style={{fontFamily: "'Inter', sans-serif", fontSize: '11px'}} className="text-gray-500">
											{cert.issuer}
										</p>
									</div>
									{cert.link && (
										<button
											onClick={() => window.open(cert.link, '_blank', 'noopener,noreferrer')}
											style={{
												background: `${character.accentColor}12`,
												border: `1px solid ${character.accentColor}80`,
												color: character.accentColor,
												fontFamily: "'Cinzel', serif",
												fontSize: '10px',
												letterSpacing: '0.05em',
												padding: '6px 14px',
												borderRadius: '6px',
												cursor: 'pointer',
												whiteSpace: 'nowrap',
												display: 'inline-flex',
												alignItems: 'center',
												gap: '5px',
												flexShrink: 0,
											}}
											className="uppercase hover:opacity-80 transition-opacity"
										>
											<ExternalLink size={12}/> Ver Certificação
										</button>
									)}
								</div>
							))}
						</div>

						{!trackDone && (
							<p style={{fontSize: '12px', color: '#475569', textAlign: 'center', marginTop: '-12px'}}>
								🏆 Conclua todos os módulos da trilha para forjar suas certificações.
							</p>
						)}
					</>
				)}

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
					<p style={{fontSize: '12px', color: '#475569'}}>
						🔒 Os próximos módulos são desbloqueados conforme você avança na jornada.
					</p>
				</div>
			</div>

			{/* Footer */}
			<div className="text-center py-8 border-t" style={{borderColor: 'rgba(255,255,255,0.05)'}}>
				<p style={{fontFamily: "'Cinzel', serif", fontSize: '11px', color: '#1E293B', letterSpacing: '0.2em'}}>
					JORNADA DEV © 2026 · FORJE SEU DESTINO
				</p>
			</div>
		</div>
	);
}
