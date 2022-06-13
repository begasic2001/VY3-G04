import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../middlewares/apiUser';
import { TextField } from '../InputField';
import '../../styles/user/_loginPopup.scss';

const schemaValidation = yup.object().shape({
	email: yup
		.string()
		.required('* Email không được để trống')
		.email('* Phải theo cú pháp abc@gmail.com'),
	matkhau: yup
		.string()
		.required('* Mật khẩu không được để trống')
		.min(8, '* Mật khẩu không được dưới 8 ký tự')
		.max(15, '* Không được vượt quá 15 ký tự'),
});

const Login = () => {
	const [errMess, setErrMess] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidation),
	});

	const submitForm = async (data) => {
		try {
			const res = await loginUser(data);
			const receiveRes = await res.data;
			if (receiveRes?.status) {
				console.log(`${receiveRes.msg} - ${receiveRes.status}`);
				setErrMess(receiveRes.msg);
			} else {
				sessionStorage.setItem('userInfo', JSON.stringify(receiveRes));
				window.location.reload();
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="loginPopup">
			<div className="loginPopup__box">
				<h3 className="loginPopup__title">Đăng nhập tài khoản</h3>
				<form onSubmit={handleSubmit(submitForm)} className="loginPopup-form">
					{errMess && <p className="form__errValidate">{errMess}</p>}
					<div className="loginPopup-form__item">
						<label className="loginPopup-form__label">Email</label>
						<TextField
							type="email"
							name="email"
							control={control}
							err={errors.email?.message}
							inputClass="loginPopup-form__input"
						/>
					</div>
					<div className="loginPopup-form__item">
						<label className="loginPopup-form__label">Mật khẩu</label>
						<TextField
							type="password"
							name="matkhau"
							autoComplete="on"
							control={control}
							err={errors.matkhau?.message}
							inputClass="loginPopup-form__input"
						/>
					</div>
					<button type="submit" className="loginPopup-form__btn">
						Đăng nhập
					</button>
				</form>
			</div>
			<p className="loginPopup__link">
				Bạn chưa có tài khoản? <a href="user/register">Đăng ký</a>
			</p>
		</div>
	);
};

export default Login;
