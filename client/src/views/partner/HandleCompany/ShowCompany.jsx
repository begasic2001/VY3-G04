import { useState, useEffect } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import {
	getAllCompanies,
	deleteCompany,
} from '../../../middlewares/apiCompany';
import AddOneCompany from './AddCompany';
import EditOneCompany from './EditCompany';
import { LoadingIcon, EmptyData } from '../../../components/Status';
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
	'Mã phương tiện',
	'Tên công ty',
	'Email',
	'Số điện thoại',
	'Địa chỉ',
];

const ManageCompanies = () => {
	const [apiData, setApiData] = useState(initialApiData);
	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(initialEdit);

	const sessionPAdmin = JSON.parse(sessionStorage.getItem('adminInfo')) || {};

	const toggleOpenEdit = (data) => {
		setOpenEdit({
			status: !openEdit.status,
			data,
		});
	};
	const toggleOpenAdd = () => {
		setOpenAdd(!openAdd);
	};
	const deleteOneCompany = (id) => {
		deleteCompany(id);
		window.location.reload();
	};

	useEffect(() => {
		const getCompanyData = async () => {
			try {
				const res = await getAllCompanies();
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
		getCompanyData();
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
				<button className="manage__create" onClick={() => toggleOpenAdd()}>
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
									<td className="manage__col--5">{item.ma_cong_ty}</td>
									<td className="manage__col--5">{item.tenCT}</td>
									<td className="manage__col--5">{item.emailCT}</td>
									<td className="manage__col--5">{item.sdtCT}</td>
									<td className="manage__col--5">{item.dia_chi_CT}</td>
									<td>
										<button
											className="manage__btn"
											onClick={() => toggleOpenEdit(item)}
										>
											<MdModeEditOutline className="manage__btn--edit" />
										</button>
									</td>
									<td>
										<button
											className="manage__btn"
											onClick={() => deleteOneCompany(item.ma_cong_ty)}
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
			{openAdd && <AddOneCompany toggleAdd={toggleOpenAdd} />}
			{openEdit.status && (
				<EditOneCompany
					toggleEdit={openEdit.data}
					setToggleEdit={toggleOpenEdit}
				/>
			)}
		</>
	);
};

export default ManageCompanies;
