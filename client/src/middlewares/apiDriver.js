import axios from 'axios';
const host = process.env.REACT_APP_HOST || 'localhost'
const getAllDrivers = () => {
	return axios.get(`http://${host}:9000/api/driver/getalldriver`);
};

const uploadDriver = (data) => {
	return axios({
		method: 'post',
		url: `http://${host}:9000/api/driver/createdriver`,
		headers: { 'content-Type': 'application/json' },
		data: data,
	});
};

const editDriver = (id, data) => {
	return axios({
		method: 'put',
		url: `http://${host}:9000/api/driver/updatedriver/${id}`,
		headers: { 'content-Type': 'application/json' },
		data,
	});
};

const deleteDriver = (id) => {
	return axios({
		method: 'delete',
		url: `http://${host}:9000/api/driver/deletedriver/${id}`,
		headers: { 'content-Type': 'application/json' },
	});
};

export { getAllDrivers, uploadDriver, editDriver, deleteDriver };
