import { useState } from 'react';
import { type Character, tracks } from './data/tracks';
import { CharacterSelectPage } from './components/CharacterSelectPage';
import { LearningPathPage } from './components/LearningPathPage';

type Page = 'select' | 'path';

export default function App() {
	const [page, setPage] = useState<Page>('select');
	const [selected, setSelected] = useState<Character>(tracks[0]);

	const handleStart = () => setPage('path');
	const handleBack = () => setPage('select');
	const handleSelect = (c: Character) => setSelected(c);
	const handleStartSpecial = (c: Character) => {
		setSelected(c);
		setPage('path');
	};

	return (
		<div className="size-full" style={{background: '#060B1A'}}>
			{page === 'select' ? (
				<CharacterSelectPage
					selected={selected}
					onSelect={handleSelect}
					onStart={handleStart}
					onStartSpecial={handleStartSpecial}
				/>
			) : (
				<LearningPathPage
					character={selected}
					onBack={handleBack}
				/>
			)}
		</div>
	);
}
