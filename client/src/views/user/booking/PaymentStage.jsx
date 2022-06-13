import moment from 'moment';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PayPalButton } from 'react-paypal-button-v2';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdDoNotDisturbOn } from 'react-icons/md';
import Paypal from '../../../assets/icons/paypal.png';
import Stripe from '../../../assets/icons/stripe.png';
import VisaIcon from '../../../assets/icons/visa.png';
import { getVoucher, checkVoucher } from '../../../middlewares/apiVoucher';
import { uploadPassInfo2 } from '../../../middlewares/apiUser';
import '../../../styles/user/_paymentStage.scss';

const initialApiVoucher = {
	loading: true,
	data: [],
	err: null,
	apply: false,
	open: false,
	check: false,
	discount: 0,
	title: '',
};

const PaymentStage = () => {
	const sessionPTicket = JSON.parse(sessionStorage.getItem('ticketInfo')) || {};
	const sessionPPass = JSON.parse(sessionStorage.getItem('passInfo')) || {};
	const sessionPBill = JSON.parse(sessionStorage.getItem('bill')) || {};
	console.log('~ sessionPBill', sessionPBill.trang_thai_dat);

	const [apiVoucher, setApiVoucher] = useState(initialApiVoucher);
	const [availableVoucher, setAvailableVoucher] = useState('');

	const { model, so_luong, gia, noi_di, noi_den, ten_loai } = sessionPTicket;
	const { ma_hoa_don, ten_khach_di, gioitinh, ma_khach_di } = sessionPPass;
	const { tong_tien, tong_tien_cuoi } = sessionPBill;
	const bookingDateDisplay = moment().format('DD/MM/yyyy');
	const sumPrice = so_luong * gia;
	const discountPrice = sumPrice - apiVoucher?.discount;
	const sessionSBill = {
		ma_hoa_don,
		noi_di,
		ngay_dat_ve: bookingDateDisplay,
		tong_tien: sumPrice,
		tong_tien_cuoi: discountPrice,
		trang_thai_dat: 'pending',
	};

	sessionStorage.setItem('bill', JSON.stringify(sessionSBill));

	const { register } = useForm();

	const toggleVoucher = () => {
		setApiVoucher({
			...apiVoucher,
			open: !apiVoucher.open,
			check: false,
			apply: false,
			discount: 0,
			title: '',
		});
		!apiVoucher.open && setAvailableVoucher('');
	};
	const onChangeVoucher = (event) => {
		let keyValue = event.target.value;
		let codeVoucher = keyValue.slice(0, keyValue.indexOf('-'));

		try {
			const checkApiVoucher = () => {
				let messageCheck = '';
				checkVoucher(tong_tien, codeVoucher)
					.then((res) => res.data)
					.then((receiveData) => {
						messageCheck = receiveData?.message;
						messageCheck === 'Đủ điền kiện !' &&
							setAvailableVoucher('payment-form__subVoucher--available');
						setApiVoucher({
							...apiVoucher,
							check: messageCheck === 'Đủ điền kiện !' ? true : false,
							discount: receiveData?.data.amount,
							title: keyValue.slice(keyValue.indexOf('-')),
						});
					})
					.catch((e) => {
						messageCheck = e?.response.data.message;
						messageCheck === 'Không đủ điều kiện' && setAvailableVoucher('');
						setApiVoucher({
							...apiVoucher,
							check: messageCheck === 'Đủ điền kiện !' ? true : false,
						});
					});
			};
			checkApiVoucher();
		} catch (e) {
			console.log(e);
		}
	};
	const applyVoucher = () => {
		setApiVoucher({
			...apiVoucher,
			apply: true,
		});
	};
	const submitData = () => {
		const sessionSSubBill = {
			...sessionPBill,
			trang_thai_dat: 'success',
		};
		console.log('~ sessionSBill', sessionSSubBill);

		sessionStorage.setItem('bill', JSON.stringify(sessionSSubBill));

		const uploadData = {
			ma_hoa_don,
			ma_khach_di,
			ma_chuyen_di: sessionPTicket.ma_chuyen_di,
			email: JSON.parse(sessionStorage.getItem('userInfo')).email,
			ngay_dat_ve: moment().format('yyyy-MM-DD'),
			ngay_bat_dau: sessionPTicket.ngay_bat_dau,
			trang_thai_dat: 'success',
			so_luong,
			tong_tien: tong_tien_cuoi,
		};

		uploadPassInfo2(
			ma_khach_di,
			sessionPTicket.ma_chuyen_di,
			uploadData,
			JSON.parse(sessionStorage.getItem('userInfo')).accessToken
		);
		window.location.assign('/stage/confirm');
	};

	useEffect(() => {
		const getApiVouchers = async () => {
			try {
				const res = await getVoucher();
				const receiveData = await res.data?.data.vouchers;
				setApiVoucher({
					...apiVoucher,
					loading: false,
					data: receiveData,
				});
			} catch (e) {
				console.log(e);
				setApiVoucher({
					...apiVoucher,
					loading: false,
					err: e,
				});
			}
		};
		getApiVouchers();
	}, []);

	return (
		<div className="payment">
			<h2 className="payment__title">Thanh toán</h2>
			<div className="payment__layout">
				<div className="payment-card">
					<div className="payment-card__logo">
						<span>travelokaPay</span>
					</div>
					<div className="payment-card__bill">
						<div className="payment-card__title payment-card__padding">
							<h3>Thẻ thanh toán</h3>
							<div>
								<img src={VisaIcon} alt="visa" />
								<img src={Paypal} alt="visa" />
								<img src={Stripe} alt="visa" />
							</div>
						</div>

						<div className="payment-form__separate payment-form__separate--voucher payment-card__padding">
							<input
								type="checkbox"
								{...register('voucher')}
								id="voucher"
								className="payment-form__checkVoucher payment-form__checkVoucher--input"
								hidden
							/>
							<label
								htmlFor="voucher"
								onClick={() => toggleVoucher()}
								className="payment-form__checkVoucher payment-form__checkVoucher--label"
							>
								Nhập mã giảm giá
							</label>
							{apiVoucher.open &&
								(apiVoucher.check ? (
									<AiFillCheckCircle className="payment-form__checkValid payment-form__checkValid--pass" />
								) : (
									<MdDoNotDisturbOn className="payment-form__checkValid payment-form__checkValid--failed" />
								))}
							{apiVoucher.loading && 'loading...'}
							{apiVoucher.open && (
								<div className="payment-card__padding">
									<select
										{...register('voucher')}
										className="payment-form__input payment-form__input--select"
										onChange={(e) => onChangeVoucher(e)}
									>
										<option value=""></option>
										{apiVoucher.data.map((voucher, index) => (
											<option
												key={voucher.voucherCode}
												value={`${voucher.voucherCode}-${voucher.title}`}
											>
												{index + 1}. {voucher.description}
											</option>
										))}
									</select>
									<button
										type="button"
										onClick={() => apiVoucher.check && applyVoucher()}
										className={`payment-form__subVoucher ${availableVoucher}`}
									>
										Áp dụng
									</button>
								</div>
							)}
						</div>
						<div className="payment-form__separate payment-form__separate--bill">
							<h3 className="payment-form__titlePrice">Chi tiết giá</h3>
							<table className="payment-form__table">
								<tbody>
									<tr>
										<td className="payment-form__itemBill">
											{model} x {so_luong}
										</td>
										<td className="payment-form__itemBill">
											{gia.toLocaleString()}đ
										</td>
									</tr>
									{apiVoucher.check && apiVoucher.apply && (
										<tr>
											<td className="payment-form__itemBill">
												{apiVoucher.title}
											</td>

											<td className="payment-form__itemBill">
												{apiVoucher.discount?.toLocaleString()}đ
											</td>
										</tr>
									)}
									<tr>
										<td className="payment-form__itemBill payment-form__itemBill--summary ">
											Tổng tiền
										</td>
										<td className="payment-form__itemBill payment-form__itemBill--summary">
											{apiVoucher.discount !== 0 && apiVoucher.apply
												? discountPrice.toLocaleString()
												: sumPrice.toLocaleString()}
											đ
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="payment-form__submit">
							<PayPalButton
								options={{
									clientId:
										'ARhBuYh6wfUOy2EqKQoowly9q3sFLJvFBvfWLOUwuH7P5gcVlzMejSUa_U8UCC0nPMT8wU7xDn3qufrc',
									currency: 'USD',
								}}
								amount="0.01"
								onSuccess={() => {
									alert('Transaction completed by ' + ten_khach_di);
									submitData();
								}}
							/>
						</div>
					</div>
				</div>
				<div className="payment-trip">
					<div className="payment-trip__code payment-trip__padding">
						<h3>Mã đặt chỗ</h3>
						<p className="payment-trip__numberId">{ma_hoa_don}</p>
					</div>
					<div className="payment-trip__info payment-trip__padding">
						<div className="payment-trip__separate">
							<h3>Chuyến đi của bạn</h3>
							<p>
								Từ {noi_di} đến {noi_den}
							</p>
							<p>{ten_loai}</p>
							<p>{bookingDateDisplay}</p>
							<p>Lịch trình linh hoạt</p>
						</div>
						<div className="payment-trip__separate ">
							<h3>Hành khách</h3>
							<p>
								{gioitinh === 'nam' ? 'Ông' : 'Bà'} {ten_khach_di}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentStage;
