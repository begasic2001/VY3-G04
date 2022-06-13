import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../middlewares/apiUser';
import { TextField } from '../../components/InputField';
import '../../styles/user/_logForm.scss';

const schemaValidate = yup.object({
	email: yup
		.string()
		.required('* Không được bỏ trống')
		.email('* Phải theo cú pháp abc@gmail.com'),
	matkhau: yup
		.string()
		.required('* Không được bỏ trống')
		.min(8, 'Tối thiếu 8 ký tự')
		.max(15, 'Tối đa 15 ký tự'),
});

const Login = () => {
	const [errMess, setErrMess] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const submitData = async (data) => {
		try {
			const res = await loginUser(data);
			const receiveRes = await res.data;
			if (receiveRes?.status) {
				console.log(`${receiveRes.msg} - ${receiveRes.status}`);
				setErrMess(receiveRes.msg);
			} else {
				sessionStorage.setItem('userInfo', JSON.stringify(receiveRes));
				window.location.assign('/stage/contact');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="user">
			<div className="user-tab">
				<span className="user-tab__item user-tab__item--active">Đăng nhập</span>
			</div>
			<div className="user-form">
				<form
					className="user-form--registration"
					onSubmit={handleSubmit(submitData)}
				>
					{errMess && <p className="form__errValidate">{errMess}</p>}
					<div className="user-form__item">
						<label className="user-form__label">Email</label>
						<TextField
							type="email"
							name="email"
							control={control}
							err={errors.email?.message}
							inputClass="user-form__input"
						/>
					</div>
					<div className="user-form__item">
						<label className="user-form__label">Mật khẩu</label>
						<TextField
							type="password"
							name="matkhau"
							autoComplete="on"
							control={control}
							err={errors.matkhau?.message}
							inputClass="user-form__input"
						/>
					</div>
					<button type="submit" className="user-form__submit">
						Đăng nhập
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
