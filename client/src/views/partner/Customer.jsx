import moment from 'moment';
import { useState, useEffect } from 'react';
import { getCustomer } from '../../middlewares/apiStatistical';
import { LoadingIcon, EmptyData } from '../../components/Status';
import '../../styles/partner/_manageTable.scss';

const initialApiData = {
	loading: true,
	data: [],
	err: null,
};
const arrTableHead = [
	'Tên khách hàng',
	'Email',
	'Giới tính',
	'Địa chỉ',
	'Điện thoại',
	'Ngày sinh',
];

const Customer = () => {
	const [apiData, setApiData] = useState(initialApiData);

	const sessionPAdmin = JSON.parse(sessionStorage.getItem('adminInfo')) || {};

	useEffect(() => {
		const getCustomers = () => {
			try {
				getCustomer()
					.then((res) => res.data?.result)
					.then((receiveData) =>
						setApiData({
							...apiData,
							loading: false,
							data: receiveData,
						})
					)
					.catch((e) => {
						console.log(e);
						setApiData({
							...apiData,
							err: e,
						});
					});
			} catch (e) {
				console.log(e);
				setApiData({
					...apiData,
					err: e,
				});
			}
		};

		getCustomers();
	}, []);

	console.log(apiData.data);

	if (!sessionPAdmin.login) return window.location.assign('/partner');
	if (apiData.loading) return <LoadingIcon />;
	if (apiData.err) {
		console.log(apiData.err);
		return <EmptyData />;
	}
	return (
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
						apiData.data.map((customer, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td className="manage__col--6">{customer.tenKH}</td>
								<td className="manage__col--6">{customer.email}</td>
								<td className="manage__col--6">{customer.gioitinh}</td>
								<td className="manage__col--6">{customer.diaChiKH}</td>
								<td className="manage__col--6">{customer.dienthoaiKH}</td>
								<td className="manage__col--6">
									{moment(customer.ngaysinh).format('DD/MM/yyyy')}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Customer;
