import styles from '../assets/css/App.module.css';
function ImgComponent({ src, active }) {
	return (
		<div>
			<img src={src} className={active ? `${styles.isActiveArrow}` : `${styles.container__arrow}`} alt="arrow" />{' '}
		</div>
	);
}
export default ImgComponent;
