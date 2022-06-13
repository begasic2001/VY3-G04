import { FaBars } from 'react-icons/fa';
import '../styles/_header.scss';

const ItemTop = (props) => {
	const { icon, type, ...rest } = props;

	const goToHomepage = () => window.location.assign(props.homelink);

	return (
		<div {...rest} className="header__item">
			{type === 'logo' && (
				<>
					<FaBars className="header-top__icn" />
					<img
						src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/30bf6c528078ba28d34bc3e37d124bdb.svg"
						alt="logo"
						onClick={() => goToHomepage()}
						className="header-top__label"
					/>
				</>
			)}
			{type === 'actionLink' && (
				<>
					<span className="header-top__label header-top__label--register">
						{props.label}
					</span>
				</>
			)}
			{type === 'other' && (
				<>
					<props.icon className="header-top__icn" />
					<span className="header-top__label">{props.label}</span>
				</>
			)}
			{type === 'login' && (
				<span className="header-top__label">{props.label}</span>
			)}
		</div>
	);
};

const ItemBotPartner = (props) => {
	return (
		<>
			<span className="header-bot__label">{props.label}</span>
			{props.icon && <props.icon className="header-bot__icn" />}
		</>
	);
};

export { ItemTop, ItemBotPartner };
