import '../../../styles/partner/_addTickets.css';
import {
	InputLabelField,
	SubmitData,
	schemaValidate,
} from '../../../container/partner/company/AddControl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const setMinDate = () => {
	return new Date().toISOString().slice(0, 10);
};


const AddTicket = () => {
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});
	
	const submitForm = (data) => {
		SubmitData(data);
		reset();
	}

	return (
		<div className="form">
			<h1 className="form__title">Thêm chuyến</h1>
			<form
				autoComplete="off"
				className="form-add"
				onSubmit={handleSubmit(submitForm)}
			>
				<InputLabelField
					label="tenCT"
					name="tenCT"
					control={control}
					err={errors.tenCT?.message}
				/>
				<InputLabelField
					label="email"
					name="emailCT"
					control={control}
					err={errors.emailCT?.message}
				/>
				<InputLabelField
					label="SĐT"
					name="sdtCT"
					control={control}
					err={errors.sdtCT?.message}
				/>
				<InputLabelField
					label="Địa chỉ"
					name="dia_chi_CT"
					control={control}
					err={errors.dia_chi_CT?.message}
				/>
				<button type="submit" className="form-add__btn">
					Thêm
				</button>
			</form>
		</div>
	);
};

export default AddTicket;
