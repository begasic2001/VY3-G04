import axios from 'axios';
const host = process.env.REACT_APP_HOST || 'localhost'
const getAllCompanies = () => {
	return axios.get(`http://${host}:9000/api/company/getallCompany`);
};
//https://localhost:9000
const uploadCompany = (data) => {
	return axios({
		method: 'post',
		url: `http://${host}:9000/api/company/createCompany`,
		headers: { 'content-Type': 'application/json' },
		data: data,
	});
};

const editCompany = (id, data) => {
	return axios({
		method: 'put',
		url: `http://${host}:9000/api/company/updateCompany/${id}`,
		headers: { 'content-Type': 'application/json' },
		data,
	});
};

const deleteCompany = (id) => {
	return axios({
		method: 'delete',
		url: `http://${host}:9000/api/company/deleteCompany/${id}`,
		headers: { 'content-Type': 'application/json' },
	});
};

export { getAllCompanies, uploadCompany, editCompany, deleteCompany };
