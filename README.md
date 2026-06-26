# JornadaDev — RPG Learning Platform

A gamified RPG-themed course platform called **JornadaDev** inspired by [Jornada Dev Herói](https://jornadadevheroi.com/). Learners pick a character (learning track) and see a sequential list of course modules for that path. UI in **Portuguese**.

---

## Pages / Views

Multipage app with view-switching (URL routing needed):

1. **`CharacterSelectPage`** — hero group banner, character carousel (15 tracks), "Caminho Sagrado" special paths
2. **`LearningPathPages`** — selected track's module list, stat bar, character art, back navigation

---

## Learning Tracks (20 Characters)

Each character gets a unique fantasy/sci-fi mixed archetype and color accent:

| Track            | Character Name           | Archetype             | Accent Color         |
|------------------|--------------------------|-----------------------|:---------------------|
| Back End         | Guardião do Servidor     | Cavaleiro Sombrio     | #2196f3 (Blue)       |
| Front End        | Arquiteto Visual         | Mago da Luz           | #18833c (Dark Green) |
| Full Stack       | Lenda Completa           | Herói Lendário        | #FDC333 (Gold)       |
| Cloud            | Viajante das Nuvens      | Druida do Caos        | #22D3EE (Cyan)       |
| Data Science     | Oráculo dos Dados        | Vidente               | #EE82EE (Violet)     |
| IA               | Louco Artificial         | Golem Arcano          | #4ADE80 (Green)      |
| Mobile           | Viking dos Apps          | Andarilho             | #813B10 (Brown)      |
| GameDev          | Criador de Mundos        | Demiurgo              | #F87171 (Red)        |
| 3D Modeling      | Escultor de Realidades   | Artífice Dimensional  | #500101 (Dark Red)   |
| Hacking          | Sombra Digital           | Assassino Cibernético | #8B5CF6 (Purple)     |
| CyberSec         | Sombra Digital           | Assassino Cibernético | #c542f6 (lilac)      |
| UI/UX            | Escultor de Experiências | Artesão Élfico        | #E91E63 (Pink)       |
| QA               | Caçador de Bugs          | Detetive              | #FACC15 (Yellow)     |
| Data Engineering | Construtor de Pipelines  | Ferreiro de Dados     | #B45309 (Bronze)     |
| Embedded Systems | Espírito do Hardware     | Mecânico Arcano       | #94A3B8 (Steel)      |
| Automations      | Maestro das Máquinas     | Conjurador de Scripts | #2DD4BF (Teal)       |
| Blockchain       | Guardião do Ledger       | Monge Criptográfico   | #F97316 (Amber)      |
| Essentials       | Arcanjo dos Códigos      | Arcanjo               | #00FF98 (Dark Green) |
| Advanced         | Demônio dos Códigos      | Demonio               | #D92639 (Dark Red)   |
| Matématica       | Louco Matemático         | Sábio dos Números     | #1497b1 (Dark Cyan)  |

Each track gets 6–8 placeholder modules (with generic titles like "Fundamentos", "Intermediário", "Avançado", etc.) that the user can replace later.

---

## Project Structure

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

- All 15 tracks appear in the carousel, selectable
- Clicking a character navigates to their learning path
- Module cards show placeholder content with correct status styling
- The back button returns to character select
- Dark theme with colored accents renders correctly
- Responsive on desktop and mobile

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.
