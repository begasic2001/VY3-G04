import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { uploadTrip } from '../../../middlewares/apiTrip';
import { TextField } from '../../../components/InputField';
import { schemaValidate } from './validate';
import { fromDes, toDes } from '../../../utils/getDes';
import '../../../styles/partner/_handleForm.scss';

const AddOneTrip = ({ toggleAdd, codeCars }) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const submitData = (data) => {
		uploadTrip(data);
		window.location.reload();
	};

	return (
		<div className="handle-form__layer" onClick={() => toggleAdd()}>
			<form
				className="handle-form"
				onClick={(e) => e.stopPropagation()}
				onSubmit={handleSubmit(submitData)}
			>
				<h2 className="handle-form__title">Thêm chuyến đi</h2>
				<TextField
					type="number"
					name="so_luong"
					control={control}
					defaultValue={'500'}
					err={errors.so_luong?.message}
					inputClass="handle-form__input"
					hidden
				/>
				<div className="handle-form__item">
					<label className="handle-form__label">Mã xe</label>
					<select {...register('ma_xe')} className="handle-form__input">
						{codeCars.map((item) => (
							<option key={item.ma_xe} value={item.ma_xe}>
								{item.ma_xe}
							</option>
						))}
					</select>
					<p className="form__errValidate">{errors.ma_xe?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Nơi đi</label>
					<select {...register('noi_di')} className="handle-form__input">
						{fromDes.map((item) => (
							<option key={item.code} value={item.name}>
								{item.name} - {item.region}
							</option>
						))}
					</select>
					<p className="form__errValidate">{errors.noi_di?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Nơi trung gian</label>
					<select
						{...register('noi_trung_gian')}
						className="handle-form__input"
					>
						<option value=""></option>
						{toDes.map((item) => (
							<option key={item.code} value={item.name}>
								{item.name}
							</option>
						))}
					</select>
					<p className="form__errValidate">{errors.noi_trung_gian?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Nơi đến</label>
					<select {...register('noi_den')} className="handle-form__input">
						{toDes.map((item) => (
							<option key={item.code} value={item.name}>
								{item.name}
							</option>
						))}
					</select>
					<p className="form__errValidate">{errors.noi_den?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Ngày bắt đầu</label>
					<TextField
						type="date"
						name="ngay_bat_dau"
						defaultValue={moment().format('yyyy-MM-DD')}
						min={moment().format('yyyy-MM-DD')}
						control={control}
						err={errors.ngay_bat_dau?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Ngày kết thúc</label>
					<TextField
						type="date"
						name="ngay_ket_thuc"
						defaultValue={moment().format('yyyy-MM-DD')}
						min={moment().format('yyyy-MM-DD')}
						control={control}
						err={errors.ngay_ket_thuc?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Giờ bắt đầu</label>
					<TextField
						type="time"
						name="gio_bat_dau"
						defaultValue={moment().format('HH:MM')}
						control={control}
						err={errors.gio_bat_dau?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Giờ kết thúc</label>
					<TextField
						type="time"
						name="gio_ket_thuc"
						defaultValue={moment().format('HH:MM')}
						control={control}
						err={errors.gio_ket_thuc?.message}
						inputClass="handle-form__input"
					/>
				</div>

				<div className="handle-form__item">
					<label className="handle-form__label">Hành lý</label>
					<TextField
						type="number"
						name="hanh_ly"
						control={control}
						err={errors.hanh_ly?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Đơn giá</label>
					<TextField
						type="number"
						name="don_gia"
						step="500"
						control={control}
						err={errors.don_gia?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<button type="submit" className="handle-form__submit">
					Thêm
				</button>
			</form>
		</div>
	);
};

export default AddOneTrip;
