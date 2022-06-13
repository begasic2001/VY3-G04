import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { uploadDriver } from '../../../middlewares/apiDriver';
import { TextField } from '../../../components/InputField';
import { schemaValidate } from './validate';
import '../../../styles/partner/_handleForm.scss';

const AddOneDriver = ({ toggleAdd }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const submitData = (data) => {
		uploadDriver(data);
		window.location.reload();
	};

	return (
		<div className="handle-form__layer" onClick={() => toggleAdd()}>
			<form
				className="handle-form"
				onSubmit={handleSubmit(submitData)}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="handle-form__title">Thêm tài xế</h2>
				<div className="handle-form__item">
					<label className="handle-form__label">Tên tài xế</label>
					<TextField
						name="tenTX"
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
						defaultValue={moment().format('yyyy-MM-DD')}
						control={control}
						err={errors.ngay_sinh?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Số điện thoại</label>
					<TextField
						name="sdtTX"
						control={control}
						err={errors.sdtTX?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Địa chỉ</label>
					<TextField
						name="dia_chi_TX"
						control={control}
						err={errors.dia_chi_TX?.message}
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

export default AddOneDriver;
