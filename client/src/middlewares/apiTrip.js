import axios from 'axios';
const host = process.env.REACT_APP_HOST || 'localhost'

const getAllTrips = () => {
	return axios.get(`http://${host}:9000/api/trip/getAllTrip`);
};

const uploadTrip = (data) => {
	return axios({
		method: 'post',
		url: `http://${host}:9000/api/trip/createTrip`,
		headers: { 'content-Type': 'application/json' },
		data,
	});
};

const edtiTrip = (id, data) => {
	return axios({
		method: 'put',
		url: `http://${host}:9000/api/trip/updateTrip/${id}`,
		headers: { 'content-Type': 'application/json' },
		data,
	});
};

const deleteTrip = (id) => {
	return axios({
		method: 'delete',
		url: `http://${host}:9000/api/trip/deleteTrip/${id}`,
		headers: { 'content-Type': 'application/json' },
	});
};

export { getAllTrips, uploadTrip, edtiTrip, deleteTrip };
