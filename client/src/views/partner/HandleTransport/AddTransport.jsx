import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { storage } from '../../../middlewares/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { uploadTransport } from '../../../middlewares/apiTransport';
import { TextField } from '../../../components/InputField';
import { schemaValidate } from './validate';
import '../../../styles/partner/_handleForm.scss';

const AddOneTransport = ({ toggleAdd, data }) => {
	const [progress, setProgress] = useState(0);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const { cong_ty, loai_phuong_tien, tai_xe } = data;

	const submitData = (data) => {
		const rawImage = data?.hinh_anh[0];
		if(rawImage)
		uploadImage(rawImage, data);
		else {
			uploadTransport(data);
			window.location.reload();
		}
	};
	const uploadImage = (file, uploadData) => {
		if (!file) return;
		const storageRef = ref(storage, `/files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(prog);
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					const hinh_anh = url;
					delete uploadData.hinh_anh;
					const finalData = {
						...uploadData,
						hinh_anh,
					};

					uploadTransport(finalData);
					window.location.reload();
				});
			}
		);
	};

	return (
		<div className="handle-form__layer" onClick={toggleAdd}>
			<form
				className="handle-form"
				onSubmit={handleSubmit(submitData)}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="handle-form__title">Thêm phương tiện</h2>
				<TextField
					hidden
					name="partner_id"
					defaultValue="admin1"
					control={control}
				/>
				<div className="handle-form__item">
					<label className="handle-form__label">Mã xe</label>
					<TextField
						name="ma_xe"
						control={control}
						err={errors.ma_xe?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Loại phương tiện</label>
					<select {...register('ma_loai')} className="handle-form__input">
						{loai_phuong_tien.map((type) => (
							<option key={type.ma_loai} value={type.ma_loai}>
								{type.ten_loai}
							</option>
						))}
					</select>
					<p className="form__errValidate">{errors.ma_loai?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Tên tài xế</label>
					<select {...register('ma_tai_xe')} className="handle-form__input">
						{tai_xe.map((driver) => (
							<option key={driver.ma_tai_xe} value={driver.ma_tai_xe}>
								{driver.tenTX}
							</option>
						))}
					</select>
					<p className="form__errValidate">{errors.ma_tai_xe?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Tên công ty</label>
					<select {...register('ma_cong_ty')} className="handle-form__input">
						{cong_ty.map((company) => {
							return (
								<option key={company.ma_cong_ty} value={company.ma_cong_ty}>
									{company.tenCT}
								</option>
							);
						})}
					</select>
					<p className="form__errValidate">{errors.ma_cong_ty?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Số xe</label>
					<TextField
						name="so_xe"
						control={control}
						err={errors.so_xe?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Hãng xe</label>
					<TextField
						name="hang_xe"
						control={control}
						err={errors.hang_xe?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Số ghế</label>
					<TextField
						type="number"
						name="so_ghe"
						control={control}
						err={errors.so_ghe?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">
						Hình ảnh{'   '}
						{progress !== 0 ? (
							<span style={{ fontWeight: 'bold' }}>{progress}%</span>
						) : (
							''
						)}
					</label>
					<input
						type="file"
						{...register('hinh_anh')}
						className="handle-form__input"
					/>
				</div>
				<button type="submit" className="handle-form__submit">
					Thêm
				</button>
			</form>
		</div>
	);
};

export default AddOneTransport;
