import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { editCompany } from '../../../middlewares/apiCompany';
import { TextField } from '../../../components/InputField';
import { schemaValidate } from './validate';
import '../../../styles/partner/_handleForm.scss';

const EditOneCompany = ({ toggleEdit, setToggleEdit }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const submitData = (data) => {
		editCompany(data.ma_cong_ty, data);
		window.location.reload();
	};
	const closeEditForm = () => {
		reset();
		setToggleEdit();
	};

	return (
		<div className="handle-form__layer" onClick={closeEditForm}>
			<form
				className="handle-form"
				onSubmit={handleSubmit(submitData)}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="handle-form__title">Sửa công ty</h2>
				<div className="handle-form__item">
					<TextField
						hidden
						name="ma_cong_ty"
						defaultValue={toggleEdit.ma_cong_ty}
						control={control}
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Tên công ty</label>
					<TextField
						name="tenCT"
						defaultValue={toggleEdit.tenCT}
						control={control}
						err={errors.tenCT?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<div className="handle-form__label">Email</div>
					<TextField
						type="email"
						name="emailCT"
						defaultValue={toggleEdit.emailCT}
						control={control}
						err={errors.emailCT?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Số điện thoại</label>
					<TextField
						name="sdtCT"
						defaultValue={toggleEdit.sdtCT}
						control={control}
						err={errors.sdtCT?.message}
						inputClass="handle-form__input"
					/>
				</div>
				<div className="handle-form__item">
					<label className="handle-form__label">Địa chỉ</label>
					<TextField
						name="dia_chi_CT"
						defaultValue={toggleEdit.dia_chi_CT}
						control={control}
						err={errors.dia_chi_CT?.message}
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

export default EditOneCompany;
