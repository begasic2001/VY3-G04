import * as yup from 'yup';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCheck } from 'react-icons/ai';
import { uploadPassInfo } from '../../../middlewares/apiUser';
import { TextField } from '../../../components/InputField';
import '../../../styles/user/_contactStage.scss';

const schemaValidate = yup.object().shape({
	dienthoaiKH: yup
		.string()
		.required('Số điện thoại không được bỏ trống')
		.matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Chỉ được gồm những con số')
		.min(10, 'Phải 10 số')
		.max(10, 'Không được vượt quá 10 số'),
	CMND: yup
		.string()
		.required('* Không được bỏ trống')
		.min(12, 'Phải 12 số')
		.max(12, 'Không được quá 12 số'),
	ten_khach_di: yup.string().required('Họ tên không được bỏ trống'),
	gioitinh: yup.string().required('* Không được bỏ trống'),
	diachiKH: yup.string().required('* Không được bỏ trống'),
});

const ContactStage = () => {
	const [errMess, setErrMess] = useState('');

	const sessionPUser = JSON.parse(sessionStorage.getItem('userInfo')) || {};
	const sessionPReady = JSON.parse(sessionStorage.getItem('ticketInfo')) || {};

	const { accessToken } = sessionPUser;
	const { ma_chuyen_di } = sessionPReady;

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const submitData = async (data) => {
		const uploadData = await {
			...data,
			ma_chuyen_bay: 'VY3-G04',
		};

		try {
			const res = await uploadPassInfo(ma_chuyen_di, uploadData, accessToken);
			const receiveRes = await res.data;

			if (receiveRes?.msg) setErrMess(receiveRes.msg);
			else {
				const sessionSPass = {
					...receiveRes.result,
					ma_hoa_don: receiveRes.ma_hoa_don,
				};
				sessionStorage.setItem('passInfo', JSON.stringify(sessionSPass));
				window.location.assign('/stage/payment');
			}
		} catch (e) {
			console.log(e);
		}
	};

	if (!accessToken) return window.location.assign('/user/login');
	return (
		<div className="contact">
			<div className="contact-sidebar">
				<div className="contact-sidebar__box contact-sidebar__box--disabled">
					<span className="contact-sidebar__step">
						<AiOutlineCheck />
					</span>
					<span className="contact-sidebar__desc">Chọn số lượng vé</span>
				</div>
				<div className="contact-sidebar__box">
					<span className="contact-sidebar__step">2</span>
					<span className="contact-sidebar__desc contact-sidebar__desc--active">
						Thông tin khách hàng
					</span>
				</div>
				<div className="contact-sidebar__box contact-sidebar__box--disabled">
					<span className="contact-sidebar__step">3</span>
					<span className="contact-sidebar__desc">Thanh toán vé</span>
				</div>
			</div>

			<div className="contact-input">
				<form
					className="contact-form"
					onClick={(e) => e.stopPropagation()}
					onSubmit={handleSubmit(submitData)}
				>
					<h2 className="contact-form__title">Thông tin hành khách</h2>
					<div className="contact-form__box">
						<div className="contact-form__item">
							<label className="contact-form__label">Xưng hô</label>
							<select {...register('gioitinh')} className="contact-form__input">
								<option value="nam">Ông</option>
								<option value="nu">Bà</option>
							</select>
							<p className="form__errValidate">{errors.gioitinh?.message}</p>
						</div>
						<div className="contact-form__item">
							<label className="contact-form__label">Họ tên khách hàng</label>
							<TextField
								name="ten_khach_di"
								control={control}
								err={errors.ten_khach_di?.message}
								inputClass="contact-form__input"
							/>
						</div>
						<div className="contact-form__item">
							<label className="contact-form__label">Ngày sinh</label>
							<TextField
								type="date"
								name="ngaysinh"
								defaultValue={moment().format('yyyy-MM-DD')}
								control={control}
								err={errors.ngaysinh?.message}
								inputClass="contact-form__input"
							/>
						</div>
						<div className="contact-form__item">
							<label className="contact-form__label">Số điện thoại</label>
							<TextField
								name="dienthoaiKH"
								control={control}
								err={errors.dienthoaiKH?.message}
								inputClass="contact-form__input"
							/>
						</div>
						<div className="contact-form__item">
							<label className="contact-form__label">Địa chỉ</label>
							<TextField
								name="diachiKH"
								control={control}
								err={errors.diachiKH?.message}
								inputClass="contact-form__input"
							/>
						</div>
						<div className="contact-form__item">
							<label className="contact-form__label">CMND</label>
							<TextField
								name="CMND"
								control={control}
								err={errors.CMND?.message}
								inputClass="contact-form__input"
							/>
						</div>
						{errMess && <p className="form__errValidate">{errMess}</p>}
					</div>
					<button type="submit" className="contact-form__submit">
						Tiếp
					</button>
				</form>
			</div>
		</div>
	);
};

export default ContactStage;
