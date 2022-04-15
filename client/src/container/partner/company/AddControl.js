import { useController } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';

const schemaValidate = yup.object({
	tenCT: yup.string().required('Tên công ty không được để trống'),
	emailCT: yup.string().required('Mail không được để trống'),
	sdtCT: yup.number().typeError('Nhập sđt vào').required('Sđt không được để trống'),
	dia_chi_CT: yup.string().required('Địa chỉ không được để trống')
});

const SubmitData = (data) => {
	axios({
		method: 'post',
		url: ' http://localhost:9000/api/company/createCompany',
		headers: { 'content-Type': 'application/json' },
		data: data,
	})
};

const InputLabelField = ({
	label,
	control,
	name,
	err,
	isSelectInput,
	...props
}) => {
	const { field } = useController({
		control,
		name,
		defaultValue: '',
	});

	if (!isSelectInput)
		return (
			<div className="form-add__item">
				<label className="form-add__label">{label}</label>
				<input {...field} {...props} className="form-add__input" />
				{err && <p className="form-add__error">{err}</p>}
			</div>
		);
	else
		return (
			<div className="form-add__item">
				<label className="form-add__label">{label}</label>
				<select {...field} {...props} className="form-add__input">
					<option value="Car">Xe hơi</option>
					<option value="Bus">Xe buýt</option>
					<option value="Train">Tàu hỏa</option>
				</select>
				{err && <p className="form-add__error">{err}</p>}
			</div>
		);
};

export { InputLabelField, SubmitData, schemaValidate };
