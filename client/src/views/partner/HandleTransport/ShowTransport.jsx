import { useState, useEffect } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import {
	getAllTransport,
	deleteTransport,
} from '../../../middlewares/apiTransport';
import AddOneTransport from './AddTransport';
import EditOneTransport from './EditTransport';
import { LoadingIcon, EmptyData } from '../../../components/Status';
import '../../../styles/partner/_manageTable.scss';

const initialApiData = {
	loading: true,
	data: {},
	err: null,
};
const initialEdit = {
	status: false,
	data: {},
};
const arrTableHead = [
	'Mã phương tiện',
	'Số hiệu phương tiện',
	'Loại',
	'Tên tài xế',
	'Tên công ty',
	'Hãng',
	'Sức chứa',
	'Hình ảnh',
];

const ManageTransports = () => {
	const [apiData, setApiData] = useState(initialApiData);
	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(initialEdit);

	const sessionPAdmin = JSON.parse(sessionStorage.getItem('adminInfo')) || {};
	const { xe, cong_ty, loai_phuong_tien, tai_xe } = apiData.data;

	const toggleAdd = () => {
		setOpenAdd(!openAdd);
	};
	const toggleEdit = (data) => {
		setOpenEdit({
			status: !openEdit.status,
			data,
		});
	};
	const deleteOneTransport = (id) => {
		deleteTransport(id);
		window.location.reload();
	};

	useEffect(() => {
		const getTransportData = async () => {
			try {
				const res = await getAllTransport();
				await setApiData({
					...apiData,
					loading: false,
					data: res.data,
				});
			} catch (e) {
				setApiData({
					...apiData,
					loading: false,
					err: e.message,
				});
			}
		};
		getTransportData();
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
						{Object.keys(apiData.data).length === 0 ? (
							<tr>
								<td>
									<EmptyData admin />
								</td>
							</tr>
						) : (
							xe.map((car, index) => (
								<tr key={car.ma_xe}>
									<td>{index + 1}</td>
									<td className="manage__col--8">{car.ma_xe}</td>
									<td className="manage__col--8">{car.so_xe}</td>
									{loai_phuong_tien.map((type) => {
										if (car.ma_loai === type.ma_loai)
											return (
												<td key={index} className="manage__col--8">
													{type.ten_loai}
												</td>
											);
									})}
									{tai_xe.map((driver) => {
										if (car.ma_tai_xe === driver.ma_tai_xe)
											return (
												<td key={index} className="manage__col--8">
													{driver.tenTX}
												</td>
											);
									})}
									{cong_ty.map((company) => {
										if (car.ma_cong_ty === company.ma_cong_ty)
											return (
												<td key={index} className="manage__col--8">
													{company.tenCT}
												</td>
											);
									})}
									<td className="manage__col--8">{car.hang_xe}</td>
									<td className="manage__col--8">{car.so_ghe}</td>
									<td className="manage__col--8">
										<div className="manage__image">
											<img
												src={car.hinh_anh}
												alt="hinh"
												className="manage__img"
											/>
										</div>
									</td>
									<td>
										<button
											className="manage__btn"
											onClick={() => toggleEdit(car)}
										>
											<MdModeEditOutline className="manage__btn--edit" />
										</button>
									</td>
									<td>
										<button
											className="manage__btn"
											onClick={() => deleteOneTransport(car.ma_xe)}
										>
											<MdDelete className="manage__btn--delete" />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			{openAdd && <AddOneTransport toggleAdd={toggleAdd} data={apiData.data} />}
			{openEdit.status && (
				<EditOneTransport
					toggleEdit={openEdit.data}
					setToggleEdit={toggleEdit}
					data={apiData.data}
				/>
			)}
		</>
	);
};

export default ManageTransports;
