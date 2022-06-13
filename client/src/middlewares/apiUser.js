import axios from 'axios';
const host = process.env.REACT_APP_HOST || 'localhost'

const getSearchResult = (data) => {
	return axios.get(
		`http://${host}:9000/api/user/getAllBooking?noi_di=${data.noi_di}&noi_den=${data.noi_den}&ngay_bat_dau=${data.ngay_bat_dau}&gio_bat_dau=${data.gio_bat_dau}`
	);
};

const registerUser = (data) => {
	return axios({
		method: 'post',
		url: `http://${host}:9000/api/user/dangky`,
		headers: { 'content-Type': 'application/json' },
		data,
	});
};

const loginUser = (data) => {
	return axios({
		method: 'post',
		url: `http://${host}:9000/api/user/dangnhap`,
		headers: { 'content-Type': 'application/json' },
		data,
	});
};

const logoutUser = (token) => {
	return axios({
		method: 'post',
		url: `http://${host}:9000/api/user/dangxuat`,
		headers: {
			'content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
};

const uploadPassInfo = (id, data, token) => {
	return axios({
		method: 'post',
		url: `http://${host}:9000/api/user/bookingOrder/${id}`,
		headers: {
			'content-Type': 'application/json',
			token: `Bearer ${token}`,
		},
		data,
	});
};

const uploadPassInfo2 = (idPass, idTrip, data, token) => {
	return axios({
		method: 'post',
		url: `http://${host}:9000/api/user/bookingOrder2/${idPass}/${idTrip}`,
		headers: {
			'content-Type': 'application/json',
			token: `Bearer ${token}`,
		},
		data,
	});
};

const showHistory = (token) => {
	return axios({
		method: 'get',
		url: `http://${host}:9000/api/user/history`,
		headers: {
			'content-Type': 'application/json',
			token: `Bearer ${token}`,
		},
	});
};

export {
	getSearchResult,
	registerUser,
	loginUser,
	logoutUser,
	uploadPassInfo,
	uploadPassInfo2,
	showHistory,
};
