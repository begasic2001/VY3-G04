import axios from 'axios';
const host = process.env.REACT_APP_HOST || 'localhost'
const getAllTransport = () => {
	return axios.get(`http://${host}:9000/api/car/getallcar`);
};

const uploadTransport = (data) => {
	return axios({
		method: 'post',
		url: `http://${host}:9000/api/car/createCar`,
		headers: { 'content-Type': 'application/json' },
		data: data,
	});
};

const editTransport = (id, data) => {
	return axios({
		method: 'put',
		url: `http://${host}:9000/api/car/updateCar/${id}`,
		headers: { 'content-Type': 'application/json' },
		data,
	});
};

const deleteTransport = (id) => {
	return axios({
		method: 'delete',
		url: `http://${host}:9000/api/car/deleteCar/${id}`,
		headers: { 'content-Type': 'application/json' },
	});
};

export { getAllTransport, uploadTransport, editTransport, deleteTransport };
