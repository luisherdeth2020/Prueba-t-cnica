import { useState } from 'react';
import styles from './assets/css/App.module.css';

function App() {
	const dataList = [
		{
			id: 1,
			description: 'Install',
		},
		{
			id: 2,
			description: 'Session_Start',
		},
		{
			id: 3,
			description: 'Clan_war_video',
		},
		{
			id: 4,
			description: 'SesionEnd',
		},
	];
	const [data, setData] = useState(dataList);
	const [selected, setSelected] = useState([]);
	const [visible, setVisible] = useState(false);

	const onInputChange = (e) => {
		const character = e.target.value;
		const characterFirstUppercase = character.charAt(0).toUpperCase() + character.slice(1);
		if (characterFirstUppercase !== '') {
			console.log(characterFirstUppercase);
			const result = data.filter((item) => item.description.includes(characterFirstUppercase));
			setData(result);
			// setVisible(true);
		} else {
			// setLuis(true)
			setData(dataList);
			console.log(characterFirstUppercase);

			// setVisible(true);
		}
	};
	const handleChange = (id) => {
		// find, me devuelve el valor del primer elemento del array si es TRUE
		// El signo "+" antes de "id" convierte el valor de "id" en un número, en caso de que sea una cadena
		const search = selected.find((item) => item.id === +id);
		if (search) {
			// "res", filtra la lista "selected" para que me devuelva los que no coinciden con el "id".
			const res = selected.filter((item) => item.id !== +id);
			// filter, crea una nueva lista con todos los elementos que no cumplan la condición de la función callback.
			setSelected(res);
		} else {
			//No encuentra la misma "id", entonces se busca el elemento en el estado/lista "data(dataList)"
			// mediante el método "find". El resultado se almacena en una constante llamada "result".
			const result = data.find((item) => item.id === +id);
			setSelected([...selected, result]);
		}
	};

	return (
		<div className="App">
			<div className={styles.container}>
				{selected.length === 0 ? (
					<button
						className={styles.container__btn}
						onClick={() => {
							setVisible(!visible);
						}}
					>
						DESPLEGAR
					</button>
				) : selected.length > 1 ? (
					<div>
						<button
							className={styles.container__btn}
							onClick={() => {
								setVisible(!visible);
							}}
						>
							{selected[0].description} & {selected.length - 1 + ' MORE'}
						</button>
					</div>
				) : (
					<div>
						{selected.map((item) => (
							<button
								className={styles.container__btn}
								onClick={() => {
									setVisible(!visible);
								}}
							>
								<div key={item.id}>{item.description}</div>
							</button>
						))}
					</div>
				)}
				{visible && (
					<div className={styles.search__box}>
						<input
							className={styles.search__input}
							type="text"
							maxLength="13"
							autoFocus
							placeholder="Search"
							aria-label="Search"
							onChange={onInputChange}
						/>

						<div className={styles.search__button} type="submit">
							<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17 17L21 21" stroke="#EEF2F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								<path
									d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
									stroke="#EEF2F6"
									strokeWidth="2"
								/>
							</svg>
						</div>
						<div>
							<div className={styles.list}>
								{data.map((item) => (
									<div key={item.id} className={styles.list__description}>
										<div className={selected.some((check) => check.id === item.id) ? 'isActive' : ''}>
											<div>
												<input
													className={styles.list__check}
													type="checkbox"
													checked={selected.some((check) => check.id === item.id)}
													value={item.id}
													onChange={(e) => handleChange(e.target.value)}
												/>
												{item.description}
											</div>
											{selected.some((check) => check.id === item.id) ? (
												<div className={styles.list__check}>✔</div>
											) : (
												''
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
