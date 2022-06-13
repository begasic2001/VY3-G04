import moment from 'moment';
import { useState, useEffect } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { getAllTrips, deleteTrip } from '../../../middlewares/apiTrip';
import { getAllTransport } from '../../../middlewares/apiTransport';
import AddOneTrip from './AddTrip';
import EditOneTrip from './EditTrip';
import { LoadingIcon, EmptyData } from '../../../components/Status';
import '../../../styles/partner/_manageTable.scss';

const initialApiDataTrip = {
	loading: true,
	data: [],
	err: null,
};
const initialApiDataCar = {
	loading: true,
	data: {},
};
const initialEdit = {
	status: false,
	data: {},
};
const arrTableHead = [
	'Mã chuyến đi',
	'Mã xe',
	'Nơi đi',
	'Nơi trung gian',
	'Nơi đến',
	'Ngày bắt đầu',
	'Ngày kết thúc',
	'Giờ bắt đầu',
	'Giờ kết thúc',
	'Hành lý',
	'Đơn giá',
];

const ManageTrips = () => {
	const [apiDataTrip, setApiDataTrip] = useState(initialApiDataTrip);
	const [apiDataCar, setApiDataCar] = useState(initialApiDataCar);
	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(initialEdit);

	const sessionPAdmin = JSON.parse(sessionStorage.getItem('adminInfo')) || {};

	const toggleAdd = () => {
		setOpenAdd(!openAdd);
	};
	const toggleEdit = (data) => {
		setOpenEdit({
			status: !openEdit.status,
			data,
		});
	};
	const deleteOneTrip = (id) => {
		deleteTrip(id);
		window.location.reload();
	};

	useEffect(() => {
		const getTripData = async () => {
			try {
				const resTrip = await getAllTrips();
				await setApiDataTrip({
					...apiDataTrip,
					loading: false,
					data: resTrip.data.result,
				});
				const resCar = await getAllTransport();
				await setApiDataCar({
					...apiDataCar,
					loading: false,
					data: resCar.data.xe,
				});
			} catch (e) {
				setApiDataTrip({
					...apiDataTrip,
					loading: false,
					err: e.message,
				});
			}
		};
		getTripData();
	}, []);

	if (!sessionPAdmin.login) return window.location.assign('/partner');
	if (apiDataTrip.loading && apiDataCar.loading) return <LoadingIcon />;
	if (apiDataTrip.err) {
		console.log(apiDataTrip.err);
		return <EmptyData />;
	}
	return (
		<>
			<div className="manage">
				<button className="manage__create" onClick={() => toggleAdd()}>
					Thêm
				</button>
				<table className="manage__table">
					<thead className="manage__head">
						<tr>
							<th>STT</th>
							{arrTableHead.map((head, index) => (
								<th key={index}>{head}</th>
							))}
							<th colSpan="2">Chức năng</th>
						</tr>
					</thead>
					<tbody className="manage__body">
						{apiDataTrip.data.length === 0 &&
						apiDataTrip.data.some((item) => item.isBought !== 'success') ? (
							<tr>
								<td>
									<EmptyData admin />
								</td>
							</tr>
						) : (
							apiDataTrip.data.map((trip, index) => {
								if (trip.isBought !== 'success')
									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td className="manage__col--11">{trip.ma_chuyen_di}</td>
											<td className="manage__col--11">{trip.ma_xe}</td>
											<td className="manage__col--11">{trip.noi_di}</td>
											<td className="manage__col--11">{trip.noi_trung_gian}</td>
											<td className="manage__col--11">{trip.noi_den}</td>
											<td className="manage__col--11">
												{moment(trip.ngay_bat_dau).format('DD/MM/yyyy')}
											</td>
											<td className="manage__col--11">
												{moment(trip.ngay_ket_thuc).format('DD/MM/yyyy')}
											</td>
											<td className="manage__col--11">
												{trip.gio_bat_dau.slice(0, 5)}
											</td>
											<td className="manage__col--11">
												{trip.gio_ket_thuc.slice(0, 5)}
											</td>
											<td className="manage__col--11">{trip.hanh_ly}</td>
											<td className="manage__col--11">
												{trip.don_gia.toLocaleString()}
											</td>
											<td>
												<button
													className="manage__btn"
													onClick={() => toggleEdit(trip)}
												>
													<MdModeEditOutline className="manage__btn--edit" />
												</button>
											</td>
											<td>
												<button
													className="manage__btn"
													onClick={() => deleteOneTrip(trip.ma_chuyen_di)}
												>
													<MdDelete className="manage__btn--delete" />
												</button>
											</td>
										</tr>
									);
							})
						)}
					</tbody>
				</table>
			</div>
			<div className="manage">
				<h2 className="manage__textCenter">Các chuyến đã được đặt</h2>
				<table className="manage__table manage__table--booked">
					<thead className="manage__head">
						<tr>
							<th>STT</th>
							{arrTableHead.map((head, index) => (
								<th key={index}>{head}</th>
							))}
						</tr>
					</thead>
					<tbody className="manage__body">
						{apiDataTrip.data.length === 0 &&
						apiDataTrip.data.some((item) => item.isBought === 'success') ? (
							<tr>
								<td>
									<EmptyData admin />
								</td>
							</tr>
						) : (
							apiDataTrip.data.map((trip, index) => {
								if (trip.isBought === 'success')
									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td className="manage__col--11">{trip.ma_chuyen_di}</td>
											<td className="manage__col--11">{trip.ma_xe}</td>
											<td className="manage__col--11">{trip.noi_di}</td>
											<td className="manage__col--11">{trip.noi_trung_gian}</td>
											<td className="manage__col--11">{trip.noi_den}</td>
											<td className="manage__col--11">
												{moment(trip.ngay_bat_dau).format('DD/MM/yyyy')}
											</td>
											<td className="manage__col--11">
												{moment(trip.ngay_ket_thuc).format('DD/MM/yyyy')}
											</td>
											<td className="manage__col--11">
												{trip.gio_bat_dau.slice(0, 5)}
											</td>
											<td className="manage__col--11">
												{trip.gio_ket_thuc.slice(0, 5)}
											</td>
											<td className="manage__col--11">{trip.hanh_ly}</td>
											<td className="manage__col--11">
												{trip.don_gia.toLocaleString()}
											</td>
										</tr>
									);
							})
						)}
					</tbody>
				</table>
			</div>
			{openAdd && (
				<AddOneTrip toggleAdd={toggleAdd} codeCars={apiDataCar.data} />
			)}
			{openEdit.status && (
				<EditOneTrip
					toggleEdit={openEdit.data}
					setToggleEdit={toggleEdit}
					codeCars={apiDataCar.data}
				/>
			)}
		</>
	);
};

export default ManageTrips;
