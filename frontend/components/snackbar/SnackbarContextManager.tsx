import React, {useRef, useState} from 'react';
import {ISnackbar, ISnackbarProps} from "./snackbar-types";
import Snackbar from "./Snackbar";
import { SnackbarContext } from './snackbar-context';

const generateId = () => `snackbar-${Math.floor(Math.random() * (1000))}`;

const SnackbarManager: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const [snackbars, setSnackbars] = useState<ISnackbarProps[]>([]);
	const snackBarRef = useRef(snackbars);
	snackBarRef.current = snackbars;

	const removeSnackbar = (deleteId: string) => {
		if(snackBarRef.current.length === 0) return;
		setSnackbars(snackBarRef.current.filter(({ id })=>id != deleteId));
	};

	const addSnackBar = ({ text, timeout = 1000 }: ISnackbar) => {
		const generatedId = generateId();
		setSnackbars(([...snackBarRef.current, { id: generatedId, text, timeout }]));
	};

	return (
		<SnackbarContext.Provider value={{ addSnackBar, removeSnackbar }}>
			<>
				{children}
				{
					Object.entries(snackbars).map(([, { text, id }])=>(
						<Snackbar key={id} id={id} text={text} />
					))
				}
			</>
		</SnackbarContext.Provider>
	);
};

export default SnackbarManager;