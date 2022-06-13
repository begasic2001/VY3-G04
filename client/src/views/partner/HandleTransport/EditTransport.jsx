import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { storage } from '../../../middlewares/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { editTransport } from '../../../middlewares/apiTransport';
import { TextField } from '../../../components/InputField';
import { schemaValidate } from './validate';
import '../../../styles/partner/_handleForm.scss';

const EditOneTransport = ({ toggleEdit, setToggleEdit, data }) => {
	const [progress, setProgress] = useState(0);

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const { cong_ty, loai_phuong_tien, tai_xe } = data;

	const submitData = (data) => {
		const rawImage = data?.hinh_anh[0];
		if (rawImage) uploadImage(rawImage, data);
		else {
			editTransport(data.ma_xe, data);
			window.location.reload();
		}
	};
	const closeEditForm = () => {
		reset();
		setToggleEdit();
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

					editTransport(uploadData.ma_xe, finalData);
					window.location.reload();
				});
			}
		);
	};

	return (
		<div className="handle-form__layer" onClick={closeEditForm}>
			<form
				className="handle-form"
				onSubmit={handleSubmit(submitData)}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="handle-form__title">Sửa phương tiện</h2>
				<TextField
					hidden
					name="partner_id"
					defaultValue="admin1"
					control={control}
				/>
				<div className="handle-form__item">
					<label className="handle-form__label">Mã phương tiện</label>
					<TextField
						name="ma_xe"
						defaultValue={toggleEdit.ma_xe}
						control={control}
						err={errors.ma_xe?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Loại phương tiện</label>
					<select
						{...register('ma_loai')}
						defaultValue={toggleEdit.ma_loai}
						className="handle-form__input"
					>
						{loai_phuong_tien.map((item) => (
							<option key={item.ma_loai} value={item.ma_loai}>
								{item.ten_loai}
							</option>
						))}
					</select>
					<p className="form__errValidate">{errors.ma_loai?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Tên tài xế</label>
					<select
						{...register('ma_tai_xe')}
						defaultValue={toggleEdit.ma_tai_xe}
						className="handle-form__input"
					>
						{tai_xe.map((item, index) => (
							<option key={index} value={item.ma_tai_xe}>
								{item.tenTX}
							</option>
						))}
					</select>
					<p className="form__errValidate">{errors.ma_tai_xe?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Tên công ty</label>
					<select
						{...register('ma_cong_ty')}
						defaultValue={toggleEdit.ma_cong_ty}
						className="handle-form__input"
					>
						{cong_ty.map((item, index) => (
							<option key={index} value={item.ma_cong_ty}>
								{item.tenCT}
							</option>
						))}
					</select>
					<p className="form__errValidate">{errors.ma_cong_ty?.message}</p>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Số hiệu xe</label>
					<TextField
						name="so_xe"
						defaultValue={toggleEdit.so_xe}
						control={control}
						err={errors.so_xe?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Hãng xe</label>
					<TextField
						name="hang_xe"
						defaultValue={toggleEdit.hang_xe}
						control={control}
						err={errors.hang_xe?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Sức chứa</label>
					<TextField
						type="number"
						name="so_ghe"
						defaultValue={toggleEdit.so_ghe}
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
					Sửa
				</button>
			</form>
		</div>
	);
};

export default EditOneTransport;
