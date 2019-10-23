import { useState, useEffect } from "react";
import { ApplicationMode } from "./constant/other";
import { Action } from "./constant/action";
import { ApplicationState } from "./context";

const useStore = (): ApplicationState => {
	const [applicationMode, setApplicationMode] = useState<ApplicationMode>('Title');
	const setApplicationMode2 = (mode: ApplicationMode) => {
		setApplicationMode(mode);
		window.localStorage.setItem('ApplicationMode', mode);
	}

	// 初期化
	useEffect(() => {
		const mode = window.localStorage.getItem('ApplicationMode');
		if (mode !== null) {
			setApplicationMode(mode as ApplicationMode);
		}
	}, []);

	// dispatch
	const dispatch = (action: Action) => {
		switch (action.type) {
			case 'TitleToGame':
				setApplicationMode2('Game');
				break;
			case 'TitleToSimulation':
				setApplicationMode2('Simulation');
				break;
			case 'BackToTitle':
				setApplicationMode2('Title');
				break;
			default:
				break;
		}
	};

	return {
		applicationMode,
		dispatch
	};
};

export default useStore;
