import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { RiBillFill } from 'react-icons/ri';
import { logoutUser } from '../middlewares/apiUser';
import LoginForm from './user/LoginPopup';
import { ItemTop, ItemBotPartner } from './Header_Item';
import '../styles/_header.scss';

const HeaderUser = ({ havebanner }) => {
	const [activeLogin, setActiveLogin] = useState(false);

	const sessionPUser = JSON.parse(sessionStorage.getItem('userInfo')) || {};

	const { accessToken, tenKH } = sessionPUser;

	const openLoginForm = () => setActiveLogin(!activeLogin);
	const linkRegisterPage = () => window.location.assign('/user/register');
	const logoutAccUser = () => {
		logoutUser(accessToken);
		sessionStorage.clear();
		window.location.assign('/');
	};
	const linkMyBillPage = () => window.location.assign('/user/bill');

	return (
		<>
			<header className="header">
				<div className="header-top">
					<div className="header__content header__content--top">
						<ItemTop type={'logo'} homelink="/" />
						<div className="header-top__box">
							<ItemTop
								type={'other'}
								icon={RiBillFill}
								label={'Đơn đặt của tôi'}
								onClick={() => linkMyBillPage()}
							/>
							{accessToken ? (
								<>
									<div style={{ margin: '0 1.5rem' }}>
										<ItemTop type={'login'} label={`Xin chào, ${tenKH}`} />
									</div>
									<ItemTop
										type={'actionLink'}
										label={'Đăng xuất'}
										onClick={() => logoutAccUser()}
									/>
								</>
							) : (
								<>
									<div style={{ margin: '0 1.5rem' }}>
										<ItemTop
											type={'other'}
											icon={FaUserCircle}
											label={'Đăng nhập'}
											onClick={() => openLoginForm()}
										/>
										{activeLogin && <LoginForm />}
									</div>
									<ItemTop
										type={'actionLink'}
										label={'Đăng ký'}
										onClick={() => linkRegisterPage()}
									/>
								</>
							)}
						</div>
					</div>
				</div>
				<div className="header-bot"></div>
			</header>
			{havebanner && <div className="slider"></div>}
			<Outlet />
		</>
	);
};

const HeaderPartner = () => {
	const sessionPAdmin = JSON.parse(sessionStorage.getItem('adminInfo')) || {};

	const logoutAccPartner = () => {
		sessionStorage.removeItem('adminInfo');
		window.location.assign('/partner');
	};

	return (
		<>
			<header className="header">
				<div className="header-top">
					<div className="header__content header__content--top">
						<ItemTop type={'logo'} homelink="/partner" />
						{sessionPAdmin.login && (
							<div className="header-top__box">
								<ItemTop
									type={'actionLink'}
									label={'Đăng xuất'}
									onClick={() => logoutAccPartner()}
								/>
							</div>
						)}
					</div>
				</div>
				<div className="header-bot">
					<div className="header__content">
						<div className="header__item">
							<Link to="/partner/trip" className="header-bot__link">
								<ItemBotPartner label="Chuyến đi" />
							</Link>
						</div>
						<div className="header__item">
							<Link to="/partner/customer" className="header-bot__link">
								<ItemBotPartner label="Khách hàng" />
							</Link>
						</div>
						<div className="header__item">
							<Link to="/partner/bill" className="header-bot__link">
								<ItemBotPartner label="Hóa đơn" />
							</Link>
						</div>
						<div className="header__item header__item--hasSub">
							<ItemBotPartner icon={BsFillCaretDownFill} label="Quản lý xe" />

							<ul className="header-bot__subBox">
								<li>
									<Link
										to="/partner/transport"
										className="header-bot__link header-bot__link--sub"
									>
										Xe
									</Link>
								</li>
								<li>
									<Link
										to="/partner/company"
										className="header-bot__link header-bot__link--sub"
									>
										Công ty
									</Link>
								</li>
								<li>
									<Link
										to="/partner/driver"
										className="header-bot__link header-bot__link--sub"
									>
										Tài xế
									</Link>
								</li>
							</ul>
						</div>
						<div className="header__item">
							<Link to="/partner/statistical" className="header-bot__link">
								<ItemBotPartner label="Thống kê" />
							</Link>
						</div>
					</div>
				</div>
			</header>
			<Outlet />
		</>
	);
};

export { HeaderUser, HeaderPartner };
