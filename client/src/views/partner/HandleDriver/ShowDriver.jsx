import { useState, useEffect } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import moment from 'moment';
import { getAllDrivers, deleteDriver } from '../../../middlewares/apiDriver';
import { LoadingIcon, EmptyData } from '../../../components/Status';
import AddOneDriver from './AddDriver';
import EditOneDriver from './EditDriver';
import '../../../styles/partner/_manageTable.scss';

const initialApiData = {
	loading: true,
	data: [],
	err: null,
};
const initialEdit = {
	status: false,
	data: {},
};
const arrTableHead = [
	'Mã tài xế',
	'Tên tài xế',
	'Ngày sinh',
	'Số điện thoại',
	'Địa chỉ',
];

const ManageDrivers = () => {
	const [apiData, setApiData] = useState(initialApiData);
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
	const deleteOneDriver = (id) => {
		deleteDriver(id);
		window.location.reload();
	};

	useEffect(() => {
		const getDriverData = async () => {
			try {
				const res = await getAllDrivers();
				await setApiData({
					...apiData,
					loading: false,
					data: res.data.result,
				});
			} catch (e) {
				setApiData({
					...apiData,
					loading: false,
					err: e.message,
				});
			}
		};
		getDriverData();
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
						{apiData.data.length === 0 ? (
							<tr>
								<td>
									<EmptyData admin />
								</td>
							</tr>
						) : (
							apiData.data.map((item, index) => (
								<tr key={item.ma_tai_xe}>
									<td>{index + 1}</td>
									<td className="manage__col--5">{item.ma_tai_xe}</td>
									<td className="manage__col--5">{item.tenTX}</td>
									<td className="manage__col--5">
										{moment(item.ngay_sinh).format('DD/MM/yyyy')}
									</td>
									<td className="manage__col--5">{item.sdtTX}</td>
									<td className="manage__col--5">{item.dia_chi_TX}</td>
									<td>
										<button
											className="manage__btn"
											onClick={() => toggleEdit(item)}
										>
											<MdModeEditOutline className="manage__btn--edit" />
										</button>
									</td>
									<td>
										<button
											className="manage__btn"
											onClick={() => deleteOneDriver(item.ma_tai_xe)}
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
			{openAdd && <AddOneDriver toggleAdd={toggleAdd} />}
			{openEdit.status && (
				<EditOneDriver toggleEdit={openEdit.data} setToggleEdit={toggleEdit} />
			)}
		</>
	);
};

export default ManageDrivers;
