import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/InputField';
import '../../styles/partner/_login.scss';
import { useState } from 'react';

const schemaValidate = yup.object({
	account: yup.string().required('* Không được bỏ trống'),
	matkhau: yup.string().required('* Không được bỏ trống'),
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

	const submitData = (data) => {
		if (data.account !== 'admin1' && data.matkhau !== 'admin1')
			setErrMess('Sai tài khoản hoặc mật khẩu');
		else {
			const sessionSAdmin = {
				...data,
				login: true,
			};
			sessionStorage.setItem('adminInfo', JSON.stringify(sessionSAdmin));
			window.location.assign('partner/statistical');
		}
	};

	return (
		<div className="partner">
			<div className="partner-form">
				<h2 className="partner__title">Đăng nhập</h2>
				{errMess && <p className="form__errValidate">{errMess}</p>}
				<form
					className="partner-form--registration"
					onSubmit={handleSubmit(submitData)}
				>
					<div className="partner-form__item">
						<label className="partner-form__label">Tài khoản</label>
						<TextField
							name="account"
							control={control}
							err={errors.email?.message}
							inputClass="partner-form__input"
						/>
					</div>
					<div className="partner-form__item">
						<label className="partner-form__label">Mật khẩu</label>
						<TextField
							type="password"
							name="matkhau"
							autoComplete="on"
							control={control}
							err={errors.matkhau?.message}
							inputClass="partner-form__input"
						/>
					</div>
					<button type="submit" className="partner-form__submit">
						Đăng nhập
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
