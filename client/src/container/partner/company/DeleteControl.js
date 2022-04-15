import axios from 'axios';

const DeleteTicket = (id) => {
	axios({
		method: 'delete',
		url: `http://localhost:9000/api/company/deleteCompany/${id}`,
		headers: { 'content-Type': 'application/json' },
	});
	window.location.reload();
};

export default DeleteTicket;
