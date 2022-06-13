import axios from 'axios';

const getVoucher = () => {
	return axios({
		method: 'get',
		url: `${process.env.REACT_APP_API_VOUCHER}/api/v1/user/voucher/eligible?typeVoucher=AIRPORT`,
		headers: {
			user_id: '3009',
			partner_id: 'CA93E2B2-BB04-4667-AFAB-50BCE73A0EAE',
		},
	});
};

const checkVoucher = (amount, codeVoucher) => {
	return axios({
		method: 'get',
		url: `${process.env.REACT_APP_API_VOUCHER}/api/v1/user/voucher/check-condition?amount=${amount}&code=${codeVoucher}&typeVoucher=AIRPORT`,
		headers: {
			user_id: '3009',
			partner_id: 'CA93E2B2-BB04-4667-AFAB-50BCE73A0EAE',
		},
	});
};

const applyVoucher = (amount, code, transactionId) => {
	return axios({
		method: 'post',
		url: `${process.env.REACT_APP_API_VOUCHER}/api/v1/user/voucher/pre-order`,
		headers: {
			user_id: '3009',
			partner_id: 'CA93E2B2-BB04-4667-AFAB-50BCE73A0EAE',
		},
		data: {
			code,
			typeVoucher: 'dua-don',
			transactionId,
			amount,
		},
	});
};

const updateVoucher = (orderId) => {
	return axios({
		method: 'put',
		url: `${process.env.REACT_APP_API_VOUCHER}/api/v1/user/voucher/state`,
		headers: {
			user_id: '3009',
			partner_id: '37c6e292-6404-4de3-a299-0d8ae074b118',
		},
		data: {
			typeVoucher: 'dua-don',
			orderId,
		},
	});
};

export { getVoucher, checkVoucher, applyVoucher, updateVoucher };
