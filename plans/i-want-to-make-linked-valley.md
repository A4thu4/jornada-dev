# Plan: JornadaDev — RPG Learning Platform

## Context

Build a gamified RPG-themed course platform called **JornadaDev** inspired by "Jornada Dev Herói". Learners pick a character (learning track) and see a sequential list of course modules for that path. The user will fill in real module content later — we use placeholder modules now. UI in **Portuguese**.

---

## Pages / Views

Multi-page app with view-switching (URL routing needed):

1. **`CharacterSelectPage`** — hero group banner, character carousel (15 tracks), "Caminho Sagrado" special paths
2. **`LearningPathPage`** — selected track's module list, stats bar, character art, back navigation

---

## Learning Tracks (15 Characters)

Each character gets a unique fantasy/sci-fi mixed archetype and color accent:

| Track | Character Name | Archetype | Accent Color |
| --- | --- | --- | --- |
| Back End | Guardião do Servidor | Cavaleiro Sombrio | Blue |
| Front End | Arquiteto Visual | Mago da Luz | Purple |
| Full Stack | Lenda Completa | Herói Lendário | Gold |
| Cloud | Viajante das Nuvens | Druida Nômade | Cyan |
| Data Science | Oráculo dos Dados | Vidente | Violet |
| IA | Mente Artificial | Golem Arcano | Green |
| DevOps | Engenheiro do Caos | Alquimista | Orange |
| GameDev | Criador de Mundos | Demiurgo | Red |
| Hacking & CyberSec | Sombra Digital | Assassino Cibernético | Dark Green |
| UI/UX | Escultor de Experiências | Artesão Élfico | Pink |
| QA | Caçador de Bugs | Detetive | Yellow |
| Data Engineering | Construtor de Pipelines | Ferreiro de Dados | Bronze |
| Embedded Systems | Espírito do Hardware | Mecânico Arcano | Steel |
| Automations | Maestro das Máquinas | Conjurador de Scripts | Teal |
| Blockchain | Guardião do Ledger | Monge Criptográfico | Amber |

Each track gets 6–8 placeholder modules (with generic titles like "Fundamentos", "Intermediário", "Avançado" etc.) that the user can replace later.

---

## Component Structure

```cmd
src/app/
  App.tsx                        ← root: currentPage + selectedCharacter state
  components/
    CharacterSelectPage.tsx      ← full character selection view
    LearningPathPage.tsx         ← course modules for selected character
    CharacterCard.tsx            ← card in carousel (name, archetype, icon, accent)
    ModuleCard.tsx               ← individual module row (icon, title, status, rating)
    StatsBar.tsx                 ← XP/stats row under character header
    SpecialPathCard.tsx          ← "Caminho Sagrado" premium track cards
    HeroBanner.tsx               ← top illustration placeholder + title
```

---

## Data

```ts
type Character = {
  id: string
  name: string           // "Back End"
  title: string          // "Guardião do Servidor"
  archetype: string      // "Cavaleiro Sombrio"
  accent: string         // Tailwind color class or hex
  icon: string           // lucide-react icon name
  stats: { fogo: number; espada: number; escudo: number; xp: number }
  modules: Module[]
}

type Module = {
  id: string
  title: string
  description: string
  icon: string
  rating: number
  lessonCount: number
  status: 'bloqueado' | 'disponível' | 'em-progresso' | 'concluído'
}
```

Placeholder modules per track (6 each): Fundamentos → Intermediário → Avançado → Projeto Prático → Especialização → Desafio Final.

---

## Design

- **Background**: `#060B1A` deep navy-black
- **Cards**: `#0D1526` with border `rgba(255,255,255,0.08)`
- **Active/highlighted module**: blue glow (`box-shadow: 0 0 20px #00BFFF`)
- **Typography**: `Cinzel` (Google Font) for headings, `Inter` for body — both via `src/styles/fonts.css`
- **Icons**: `lucide-react` throughout
- **Character images**: Unsplash fantasy/tech warrior images via `mcp__plugin_make_unsplash__search_photos` + `ImageWithFallback`
- **No @make-kits** (not installed) — use existing `src/app/components/ui/` components (Button, Card, Badge, etc.) + custom styled components
- **Special Paths**: 2 cards — "Avançado" and a second (e.g. "O Louco da IA") — shown below character carousel

---

## Implementation Order

1. Write data file `src/app/data/tracks.ts` with all 15 characters + placeholder modules
2. Build `HeroBanner` with group art (Unsplash) + platform title
3. Build `CharacterCard` and carousel in `CharacterSelectPage`
4. Build `SpecialPathCard` for Caminho Sagrado section
5. Build `ModuleCard` and `StatsBar` for `LearningPathPage`
6. Wire state in `App.tsx` — page switching + selected character
7. Apply dark theme, glow effects, Cinzel font

---

## Verification

- All 15 tracks appear in carousel, selectable
- Clicking a character navigates to their learning path
- Module cards show placeholder content with correct status styling
- Back button returns to character select
- Dark theme with colored accents renders correctly
- Responsive on desktop and mobile
