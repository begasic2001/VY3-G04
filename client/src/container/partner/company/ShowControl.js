import DeleteTicket from './DeleteControl';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShowTicketsControl = () => {
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:9000/api/company/getallCompany')
			.then((res) => setTickets(res.data))
			.catch((err) => console.log(err));
	}, []);

	return tickets.map((item, index) => (
		<tr key={index}>
			<td>{index + 1}</td>
			<td>{item.tenCT}</td>
			<td>{item.emailCT}</td>
			<td>{item.sdtCT}</td>
			<td>{item.dia_chi_CT}</td>
			<td>
				<Link
					to={`/partner/edit/${item.ma_cong_ty}`}
					state={{ id: item.ma_cong_ty }}
					className={`tickets__btn tickets__btn--edit`}
				>
					Sửa
				</Link>
			</td>
			<td>
				<button
					className="tickets__btn tickets__btn--del"
					onClick={() => DeleteTicket(item.ma_cong_ty)}
				>
					Xóa
				</button>
			</td>
		</tr>
	));
};

export default ShowTicketsControl;
