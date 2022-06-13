import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { uploadCompany } from '../../../middlewares/apiCompany';
import { TextField } from '../../../components/InputField';
import { schemaValidate } from './validate';
import '../../../styles/partner/_handleForm.scss';

const AddOneCompany = ({ toggleAdd }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const submitData = (data) => {
		uploadCompany(data);
		window.location.reload();
	};

	return (
		<div className="handle-form__layer" onClick={() => toggleAdd()}>
			<form
				className="handle-form"
				onClick={(e) => e.stopPropagation()}
				onSubmit={handleSubmit(submitData)}
			>
				<h2 className="handle-form__title">Thêm công ty</h2>
				<div className="handle-form__item">
					<label className="handle-form__label">Tên công ty</label>
					<TextField
						name="tenCT"
						control={control}
						err={errors.tenCT?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Email</label>
					<TextField
						type="email"
						name="emailCT"
						control={control}
						err={errors.emailCT?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Số điện thoại</label>
					<TextField
						name="sdtCT"
						control={control}
						err={errors.sdtCT?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Địa chỉ</label>
					<TextField
						name="dia_chi_CT"
						control={control}
						err={errors.dia_chi_CT?.message}
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

export default AddOneCompany;
