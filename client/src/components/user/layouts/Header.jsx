import barIcn from '../../../assets/icons/bars_icn.png';
import formIcn from '../../../assets/icons/form_icn.png';
import userIcn from '../../../assets/icons/user_icn.png';
import dropdownIcn from '../../../assets/icons/dropdown_icn.png';
import '../../../styles/shared/_header.css';
import { Link } from 'react-router-dom';

const TopItem = (props) => {
	return (
		<div className="header-top__item">
			<Link to="/" className={`header-top__link`}>
				{!props.noIcon && <img src={props.icon} alt={props.altIcon} />}
				<span className={props.class}>{props.content}</span>
			</Link>
		</div>
	);
};

const BotItem = (props) => {
	return (
		<div className="header-bot__item">
			<span>{props.content}</span>
			<img src={dropdownIcn} alt="dropdown icon" />
		</div>
	);
};

const HeaderTop = () => {
	return (
		<div className="header-top">
			<TopItem
				icon={barIcn}
				alt="bar icon"
				content="VY3-G04"
				class="header-top__logo"
			></TopItem>
			<div className="header-top__box">
				<TopItem
					icon={formIcn}
					alt="form icon"
					content="Đặt chỗ của tôi"
				></TopItem>
				<TopItem icon={userIcn} alt="user icon" content="Đăng nhập"></TopItem>
				<TopItem noIcon content="Đăng ký" class="header-top__sign-up"></TopItem>
			</div>
		</div>
	);
};

const HeaderBot = () => {
	return (
		<div className="header-bot">
			<BotItem content="Vận chuyển" />
			<BotItem content="Chỗ ở" />
			<BotItem content="Hoạt động và giải trí" />
			<BotItem content="Sản phẩm bổ sung" />
		</div>
	);
};

//Layout Main
const HeaderUser = () => {
	return (
		<header className="header">
			<div className="header-top__background">
				<HeaderTop />
			</div>
			<div className="header-bot__background">
				<HeaderBot />
			</div>
		</header>
	);
};

export default HeaderUser;
