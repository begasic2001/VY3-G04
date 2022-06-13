import moment from 'moment';
import { useState, useEffect } from 'react';
import { RiBillLine, RiCheckboxCircleFill } from 'react-icons/ri';
import { GiCityCar } from 'react-icons/gi';
import NoBillIcon from '../../assets/icons/cancel.png';
import { showHistory } from '../../middlewares/apiUser';
import LoginPopup from '../../components/user/LoginPopup';
import '../../styles/user/_bill.scss';
import '../../styles/user/_confirmStage.scss';

const sessionPBill = JSON.parse(sessionStorage.getItem('bill')) || {};
const sessionPUser = JSON.parse(sessionStorage.getItem('userInfo'));

const { ma_hoa_don, noi_di, tong_tien, trang_thai_dat } = sessionPBill;

const initialApiData = {
	loading: false,
	data: [],
	err: null,
};
const initalBill = {
	status: false,
	data: {},
};

const OwnBill = () => {
	const [nav, setNav] = useState(trang_thai_dat === 'success' ? 2 : 1);
	const [openLogin, setOpenLogin] = useState(false);

	const toggleOpenLogin = () => setOpenLogin(!openLogin);

	if (!sessionPUser?.accessToken) {
		return (
			<>
				<div className="confirm confirm--extentsion">
					<img src={NoBillIcon} alt="success icon" className="confirm__img" />
					<h2 className="confirm__txt">Bạn chưa đăng nhập tài khoản</h2>
					<h3 className="confirm__desc">
						Vui lòng chuyến đến trang{' '}
						<span className="confirm__event" onClick={() => toggleOpenLogin()}>
							Đăng nhập
						</span>{' '}
						để sử dụng chức năng
					</h3>
				</div>
				{openLogin && <LoginPopup />}
			</>
		);
	}
	return (
		<div className="bill">
			<div className="bill-sidebar">
				<div
					className={`bill-sidebar__item ${
						nav === 1 ? 'bill-sidebar__item--active' : ''
					}`}
					onClick={() => setNav(1)}
				>
					<RiBillLine />
					<span className="bill-sidebar__txt">Giao dịch tiến hành</span>
				</div>
				<div
					className={`bill-sidebar__item ${
						nav === 2 ? 'bill-sidebar__item--active' : ''
					}`}
					onClick={() => setNav(2)}
				>
					<RiCheckboxCircleFill />
					<span className="bill-sidebar__txt">Giao dịch thành công</span>
				</div>
			</div>
			<div className="bill-content">
				{nav === 1 && <NoBill />}
				{nav === 2 && <HaveBill />}
			</div>
		</div>
	);
};

const NoBill = () => {
	if (trang_thai_dat === 'pending')
		return (
			<div className="bill-content__item bill-content__item--yes">
				<div className="bill-content__summary">
					<div className="bill-content__code">
						Mã đặt chỗ{' '}
						<h3 className="bill-content__numberCode">{ma_hoa_don}</h3>
					</div>
					<h3 className="bill-content__price">
						{tong_tien.toLocaleString()} VND
					</h3>
				</div>
				<div className="bill-content__trip">
					<GiCityCar />
					<span className="bill-content__fromDes">Từ {noi_di}</span>
				</div>
				<div className="bill-content__direct">
					<span className="bill-content__wait">
						Đang đợi chọn phương thức thanh toán
					</span>
					<a
						href="/stage/payment"
						className="bill-content__link"
						onClick={() => sessionStorage.removeItem('billStatus')}
					>
						Tiếp tục
					</a>
				</div>
			</div>
		);
	return (
		<div className="bill-content__item bill-content__item--no">
			<div className="bill-content__image">
				<img src={NoBillIcon} alt="No bill" className="bill-content__img" />
			</div>
			<div className="bill-content__announce">
				<h4 className="bill-content__title">
					Không có giao dịch đang tiến hành
				</h4>
				<p className="bill-content__txt">
					Bạn không có giao dịch đang tiến hành nào từ phiên giao dịch trước.
					Những giao dịch chưa hoàn thành sẽ được lưu tại đây.
				</p>
			</div>
		</div>
	);
};

const HaveBill = () => {
	const sessionPUser = JSON.parse(sessionStorage.getItem('userInfo'));

	const [openBill, setOpenBill] = useState(false);
	const [apiData, setApiData] = useState(initialApiData);
	console.log('~ apiData', apiData);

	const toggleOpenBill = (data) =>
		setOpenBill({
			status: !openBill.status,
			data,
		});

	useEffect(() => {
		const getHistory = () => {
			try {
				showHistory(sessionPUser.accessToken)
					.then((res) => res.data.result)
					.then((receiveData) =>
						setApiData({
							...apiData,
							loading: false,
							data: receiveData,
						})
					)
					.catch((e) =>
						setApiData({
							...apiData,
							loading: false,
							err: e,
						})
					);
			} catch (e) {
				setApiData({
					...apiData,
					err: e,
				});
			}
		};

		getHistory();
	}, []);

	if (
		apiData?.data[0]?.trang_thai_dat === 'success' &&
		apiData.data.length !== 0
	)
		return (
			<>
				{apiData.data.map((item) => (
					<div
						key={item.ma_hoa_don}
						className="bill-content__item bill-content__item--yes"
					>
						<div className="bill-content__summary">
							<div className="bill-content__code">
								Mã đặt chỗ
								<h3 className="bill-content__numberCode">{item.ma_hoa_don}</h3>
							</div>
							<h3 className="bill-content__price">
								{item.tong_tien.toLocaleString()}VND
							</h3>
						</div>
						<div className="bill-content__trip">
							<GiCityCar />
							<span className="bill-content__fromDes">Từ {item.noi_di}</span>
						</div>
						<div className="bill-content__direct">
							<span className="bill-content__wait bill-content__wait--success">
								Thanh toán thành công
							</span>
							<div
								className="bill-content__link"
								onClick={() => toggleOpenBill(item)}
							>
								Xem tất cả
							</div>
						</div>
					</div>
				))}
				{openBill.status && (
					<ModelBill dataBill={openBill.data} setOpenBill={toggleOpenBill} />
				)}
			</>
		);
	return (
		<div className="bill-content__item bill-content__item--no">
			<div className="bill-content__image">
				<img src={NoBillIcon} alt="No bill" className="bill-content__img" />
			</div>
			<div className="bill-content__announce">
				<h4 className="bill-content__title">
					Không có giao dịch đang tiến hành
				</h4>
				<p className="bill-content__txt">
					Bạn không có giao dịch đang tiến hành nào từ phiên giao dịch trước.
					Những giao dịch chưa hoàn thành sẽ được lưu tại đây.
				</p>
			</div>
		</div>
	);
};

const ModelBill = ({ dataBill, setOpenBill }) => {
	return (
		<div className="model" onClick={() => setOpenBill()}>
			<div className="model__box" onClick={(e) => e.stopPropagation()}>
				<div className="model__content">
					<div className="model__logo">
						<img
							src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/30bf6c528078ba28d34bc3e37d124bdb.svg"
							alt="logo"
							className="model__img"
						/>
					</div>
					<h2 className="model__title">Hoá đơn thanh toán</h2>
					<div className="model__info">
						<div className="model__group">
							<p className="model__field">
								Mã hóa đơn:
								<span className="model__value">{dataBill.ma_hoa_don}</span>
							</p>
							<p className="model__field">
								Ngày lập hóa đơn:
								<span className="model__value">{dataBill.ngay_dat_ve}</span>
							</p>
						</div>
						<p className="model__field">
							Tên khách đi đại diện:
							<span className="model__value">{dataBill.ten_khach_di}</span>
						</p>
						<p className="model__field">
							Điện thoại:
							<span className="model__value">{dataBill.dienthoaiKH}</span>
						</p>
						<p className="model__field">
							Số lượng:
							<span className="model__value">{dataBill.so_luong}</span>
						</p>
						<p className="model__field">
							Phương thức thanh toán:
							<span className="model__value">Paypal</span>
						</p>
						<p className="model__field">
							Tổng tiền:
							<span className="model__value">
								{dataBill.tong_tien.toLocaleString()}đ
							</span>
						</p>
					</div>
					<p className="model__tableCap">Thông tin chuyến đi:</p>
					<table className="model__table">
						<thead>
							<tr>
								<th>Điểm bắt đầu</th>
								<th>Nơi đến</th>
								<th>Ngày khởi hành</th>
								<th>Thời gian</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{dataBill.noi_di}</td>
								<td>{dataBill.noi_den}</td>
								<td>{moment(dataBill.ngay_bat_dau).format('DD/MM/yyyy')}</td>
								<td>{dataBill.gio_bat_dau.slice(0, 5)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default OwnBill;
