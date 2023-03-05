import { useState } from 'react';
import dataList from './services/api';
import styles from './assets/css/App.module.css';
import check from './assets/img/check.svg';
import search from './assets/img/search.svg';
import arrow from './assets/img/arrow.svg';

function App() {
	const [data, setData] = useState(dataList);
	const [selected, setSelected] = useState([]);
	const [visible, setVisible] = useState(false);

	const onInputChange = (e) => {
		const character = e.target.value;
		const searchLowerCase = character.toLowerCase();
		if (searchLowerCase !== '') {
			const result = dataList.filter((item) => item.description.toLowerCase().includes(searchLowerCase));
			setData(result);
		} else {
			setData(dataList);
		}
	};

	const handleChange = (id) => {
		const idNumber = Number(id);
		const itemIsAlreadySelected = selected.find((item) => item.id === idNumber);

		if (itemIsAlreadySelected) {
			const notSelectedItems = selected.filter((item) => item.id !== idNumber);
			setSelected(notSelectedItems);
		} else {
			const newSelectedItem = data.find((item) => item.id === idNumber);
			setSelected([...selected, newSelectedItem]);
		}
	};

	const handleArrowClick = () => {
		setVisible(!visible);
	};

	const noItemSelected = selected.length === 0;
	const moreOneItemSelected = selected.length > 1;
	
	return (
		<div className="App">
			<div className={styles.container}>
				{noItemSelected ? (
					<button className={styles.container__btn} onClick={handleArrowClick}>
						Select your options
						<img
							src={arrow}
							className={visible ? `${styles.isActiveArrow}` : `${styles.container__arrow}`}
							alt="arrow"
						/>
					</button>
				) : moreOneItemSelected ? (
					<section>
						<button className={styles.container__btn} onClick={handleArrowClick}>
							{selected[0].description}{' '}
							<div className={styles.container__number}>
								& {selected.length - 1 + ' MORE'}
								<img
									src={arrow}
									className={visible ? `${styles.isActiveArrow}` : `${styles.container__arrow}`}
									alt="arrow"
								/>
							</div>
						</button>
					</section>
				) : (
					<div>
						{selected.map((item) => (
							<button className={styles.container__btn} onClick={handleArrowClick}>
								<div key={item.id}>{item.description}</div>
								<img
									src={arrow}
									className={visible ? `${styles.isActiveArrow}` : `${styles.container__arrow}`}
									alt="arrow"
								/>
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
							<img src={search} alt="search" />
						</div>
						<div className={styles.list}>
							{data.map((item) => (
								<div key={item.id} className={styles.list__description}>
									<label className={selected.some((check) => check.id === item.id) && `${styles.isActive}`}>
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
											<div className={styles.list__check}>
												<img src={check} alt="check" />
											</div>
										) : (
											''
										)}
									</label>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
