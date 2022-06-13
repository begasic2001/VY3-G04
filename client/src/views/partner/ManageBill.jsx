import moment from 'moment';
import { useState, useEffect } from 'react';
import { getAllBill } from '../../middlewares/apiStatistical';
import { LoadingIcon, EmptyData } from '../../components/Status';
import '../../styles/partner/_manageTable.scss';
import '../../styles/user/_bill.scss';

const initialApiData = {
	loading: true,
	data: [],
	err: null,
};
const initialDetailBill = {
	status: false,
	data: {},
};
const arrTableHead = [
	'Mã hóa đơn',
	'Tên khách đi',
	'Ngày đặt vé',
	'Số lượng vé',
	'Tổng tiền',
	'Trạng thái đặt',
	'Phương thức thanh toán',
];

const ManageBill = () => {
	const sessionPAdmin = JSON.parse(sessionStorage.getItem('adminInfo')) || {};

	const [apiData, setApiData] = useState(initialApiData);
	const [openForm, setOpenForm] = useState(initialDetailBill);

	const toggleForm = (data) =>
		setOpenForm({
			status: !openForm.status,
			data,
		});

	useEffect(() => {
		const getApiBill = () => {
			try {
				getAllBill()
					.then((res) => res.data?.result)
					.then((receiveData) =>
						setApiData({
							...apiData,
							loading: false,
							data: receiveData,
						})
					)
					.catch((e) => {
						console.log('~ e API', e);
						setApiData({
							...apiData,
							err: e,
						});
					});
			} catch (e) {
				console.log('~ e TRY', e);
				setApiData({
					...apiData,
					err: e,
				});
			}
		};
		getApiBill();
	}, []);

	if (!sessionPAdmin.login) return window.location.assign('/partner');
	if (apiData.loading) return <LoadingIcon />;
	if (apiData.err) {
		console.log(apiData.err);
		return <EmptyData />;
	}
	return (
		<>
			<div className="manage">
				<table className="manage__table">
					<thead className="manage__head">
						<tr>
							<th>STT</th>
							{arrTableHead.map((head, index) => (
								<th key={index}>{head}</th>
							))}
						</tr>
					</thead>
					<tbody className="manage__body">
						{apiData.data.length === 0 ? (
							<tr>
								<td>
									<EmptyData admin />
								</td>
							</tr>
						) : (
							apiData.data.map((bill, index) => (
								<tr key={bill.ma_hoa_don}>
									<td>{index + 1}</td>
									<td
										className="manage__col--7"
										onClick={() => toggleForm(bill)}
									>
										<p className="manage__click">{bill.ma_hoa_don}</p>
									</td>
									<td className="manage__col--7">{bill.ten_khach_di}</td>
									<td className="manage__col--7">
										{moment(bill.ngay_dat_ve).format('DD/MM/yyyy')}
									</td>
									<td className="manage__col--7">{bill.so_luong}</td>
									<td className="manage__col--7">{bill.tong_tien}</td>
									<td className="manage__col--7">{bill.trang_thai_dat}</td>
									<td className="manage__col--7">Paypal</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			{openForm.status && (
				<ModelBill infoBill={openForm.data} setToggleOpen={toggleForm} />
			)}
		</>
	);
};

const ModelBill = ({ infoBill, setToggleOpen }) => {
	return (
		<div className="model" onClick={() => setToggleOpen()}>
			<div className="model__box" onClick={(e) => e.stopPropagation()}>
				<div className="model__content">
					<div className="model__logo">
						<img
							src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/30bf6c528078ba28d34bc3e37d124bdb.svg"
							alt="logo"
							className="model__img"
						/>
					</div>
					<h2 className="model__title">Chi tiết hóa đơn</h2>
					<div className="model__info">
						<div className="model__group">
							<p className="model__field">
								Mã hóa đơn:
								<span className="model__value">{infoBill.ma_hoa_don}</span>
							</p>
							<p className="model__field">
								Ngày lập hóa đơn:
								<span className="model__value">
									{moment(infoBill.ngay_dat_ve).format('DD/MM/yyyy')}
								</span>
							</p>
						</div>
						<p className="model__field">
							Điện thoại liên lạc:
							<span className="model__value">{infoBill.dienthoaiKH}</span>
						</p>
						<p className="model__field">
							Số lượng:
							<span className="model__value">{infoBill.so_luong}</span>
						</p>
						<p className="model__field">
							Phương thức thanh toán:
							<span className="model__value">Paypal</span>
						</p>
						<p className="model__field">
							Tổng tiền:
							<span className="model__value">
								{infoBill.tong_tien.toLocaleString()}
							</span>
						</p>
					</div>
					<p className="model__tableCap">Thông tin khách đặt:</p>
					<table className="model__table">
						<thead>
							<tr>
								<th>Họ tên</th>
								<th>CMND</th>
								<th>Giới tính</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{infoBill?.tenKH}</td>
								<td>{infoBill?.CMND[1]}</td>
								<td>{infoBill?.gioitinh[1] === 'nu' ? 'Nữ' : 'Nam'}</td>
							</tr>
						</tbody>
					</table>
					<p className="model__tableCap">Thông tin khách đi:</p>
					<table className="model__table">
						<thead>
							<tr>
								<th>Họ tên</th>
								<th>Email</th>
								<th>CMND</th>
								<th>Ngày sinh</th>
								<th>Giới tính</th>
								<th>Địa chỉ</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{infoBill.ten_khach_di}</td>
								<td>{infoBill.email}</td>
								<td>{infoBill.CMND[0]}</td>
								<td>{infoBill.ngaysinh}</td>
								<td>{infoBill.gioitinh[0] === 'nu' ? 'Nữ' : 'Nam'}</td>
								<td>{infoBill.diaChiKH[0]}</td>
							</tr>
						</tbody>
					</table>
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
								<td>{infoBill.noi_di}</td>
								<td>{infoBill.noi_den}</td>
								<td>{moment(infoBill.ngay_bat_dau).format('DD/MM/yyyy')}</td>
								<td>{infoBill.gio_bat_dau.slice(0, 5)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ManageBill;
