import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/InputField';
import { registerUser } from '../../middlewares/apiUser';
import '../../styles/user/_logForm.scss';
import { useState } from 'react';

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
	rematkhau: yup
		.string()
		.required('* Không được bỏ trống')
		.oneOf([yup.ref('matkhau'), null], '* Hai mật khẩu phải khớp nhau'),
	tenKH: yup
		.string()
		.required('* Không được bỏ trống')
		.min(5, '* Không được chỉ viết mỗi tên'),
	diachiKH: yup.string().required('* Không được bỏ trống'),
	CMND: yup
		.string()
		.required('* Không được bỏ trống')
		.min(12, 'Chỉ được 12 số')
		.max(12, 'Chỉ được 12 số'),
	dienthoaiKH: yup
		.string()
		.required('* Không được bỏ trống')
		.matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, '* Chỉ được nhập số'),
});

const Registration = () => {
	const [warningMess, setWarningMess] = useState('');

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const submitData = async (data) => {
		if (data.matkhau === data.rematkhau) {
			delete data.rematkhau;
			registerUser(data).then((res) => {
				if (typeof res.data !== 'object') setWarningMess(res.data);
				else {
					sessionStorage.clear();
					window.location.assign('/');
				}
			});
		}
	};

	return (
		<div className="user">
			<div className="user-tab">
				<span className="user-tab__item user-tab__item--active">Đăng ký</span>
			</div>
			<div className="user-form">
				<form
					className="user-form--registration"
					onSubmit={handleSubmit(submitData)}
				>
					<div className="user-form__title">Thông tin đăng nhập</div>
					<div className="user-form__item">
						<label className="user-form__label">Email</label>
						<TextField
							type="email"
							name="email"
							control={control}
							err={errors.email?.message}
							inputClass="user-form__input"
						/>
						<p className="form__errValidate">
							{warningMess.includes('Email') ? warningMess : ''}
						</p>
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
					<div className="user-form__item">
						<label className="user-form__label">Nhập lại mật khẩu</label>
						<TextField
							type="password"
							name="rematkhau"
							autoComplete="on"
							control={control}
							err={errors.rematkhau?.message}
							inputClass="user-form__input"
						/>
					</div>
					<div className="user-form__title user-form__title--second">
						Thông tin cá nhân
					</div>
					<div className="user-form__item">
						<label className="user-form__label">Họ và tên</label>
						<TextField
							name="tenKH"
							control={control}
							err={errors.tenKH?.message}
							inputClass="user-form__input"
						/>
					</div>
					<div className="user-form__box">
						<div className="user-form__item user-form__item--3">
							<label className="user-form__label">Giới tính</label>
							<select
								{...register('gioitinh')}
								defaultValue="nam"
								className="user-form__input"
							>
								<option value="nam">Nam</option>
								<option value="nu">Nữ</option>
							</select>
						</div>
						<div className="user-form__item user-form__item--6">
							<label className="user-form__label">Ngày sinh</label>
							<TextField
								type="date"
								name="ngaysinh"
								defaultValue={moment().format('yyyy-MM-DD')}
								control={control}
								inputClass="user-form__input"
							/>
						</div>
					</div>
					<div className="user-form__item">
						<label className="user-form__label">Địa chỉ</label>
						<TextField
							name="diachiKH"
							control={control}
							err={errors.diachiKH?.message}
							inputClass="user-form__input"
						/>
					</div>
					<div className="user-form__item">
						<label className="user-form__label">Điện thoại</label>
						<TextField
							name="dienthoaiKH"
							control={control}
							err={errors.dienthoaiKH?.message}
							inputClass="user-form__input"
						/>
					</div>
					<div className="user-form__item">
						<label className="user-form__label">CMND</label>
						<TextField
							name="CMND"
							control={control}
							err={errors.CMND?.message}
							inputClass="user-form__input"
						/>
						<p className="form__errValidate">
							{warningMess.includes('CMND') ? warningMess : ''}
						</p>
					</div>
					<button type="submit" className="user-form__submit">
						Đăng ký
					</button>
				</form>
			</div>
		</div>
	);
};

export default Registration;
