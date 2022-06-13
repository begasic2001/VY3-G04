import axios from 'axios';
const host = process.env.REACT_APP_HOST || 'localhost'
const getBill = () => {
	return axios.get(`http://${host}:9000/api/revenue/infoBill`);
};

const getCustomer = () => {
	return axios.get(`http://${host}:9000/api/revenue/customer`);
};

//TRASH API!!!!!!!!!!!!!!!!!!!
const getAllBill = () => {
	return axios.get(`http://${host}:9000/api/revenue/detailCusBook`);
};

const getMonthRevenues = () => {
	return axios.get(`http://${host}:9000/api/revenue/chart`);
};

export { getBill, getCustomer, getAllBill, getMonthRevenues };
