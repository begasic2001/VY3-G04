import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { editDriver } from '../../../middlewares/apiDriver';
import { TextField } from '../../../components/InputField';
import { schemaValidate } from './validate';
import '../../../styles/partner/_handleForm.scss';

const EditOneDriver = ({ toggleEdit, setToggleEdit }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const submitData = (data) => {
		editDriver(data.ma_tai_xe, data);
		window.location.reload();
	};
	const closeEditForm = () => {
		reset();
		setToggleEdit();
	};

	return (
		<div className="handle-form__layer" onClick={() => closeEditForm()}>
			<form
				className="handle-form"
				onSubmit={handleSubmit(submitData)}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="handle-form__title">Sửa tài xế</h2>
				<TextField
					hidden
					name="ma_tai_xe"
					defaultValue={toggleEdit.ma_tai_xe}
					control={control}
				/>
				<div className="handle-form__item">
					<label className="handle-form__label">Tên tài xế</label>
					<TextField
						name="tenTX"
						defaultValue={toggleEdit.tenTX}
						control={control}
						err={errors.tenTX?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Ngày sinh</label>
					<TextField
						type="date"
						name="ngay_sinh"
						defaultValue={moment(toggleEdit.ngay_sinh).format('yyyy-MM-DD')}
						control={control}
						err={errors.ngay_sinh?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Số điện thoại</label>
					<TextField
						name="sdtTX"
						defaultValue={toggleEdit.sdtTX}
						control={control}
						err={errors.sdtTX?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Địa chỉ</label>
					<TextField
						name="dia_chi_TX"
						defaultValue={toggleEdit.dia_chi_TX}
						control={control}
						err={errors.dia_chi_TX?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<button type="submit" className="handle-form__submit">
					Sửa
				</button>
			</form>
		</div>
	);
};

export default EditOneDriver;
