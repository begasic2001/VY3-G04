import { useController } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const schemaValidate = yup.object({
	tenCT: yup.string().required(),
	emailCT: yup.string().required(),
	sdtCT: yup.number().required(),
	dia_chi_CT: yup.string().required(),
});

const SubmitData = (data) => {
	axios({
		method: 'put',
		url: `http://localhost:9000/api/company/updateCompany/${data.ma_cong_ty}`,
		headers: { 'content-Type': 'application/json' },
		data: data,
	})
		.catch(err => console.log(err));
};

const EditInputLabelField = ({
	label,
	control,
	name,
	defaultValue,
	err,
	...props
}) => {
	const { field } = useController({
		control,
		name,
		defaultValue,
	});
	return (
		<div className="form-add__item">
			<label className="form-add__label">{label}</label>
			<input {...field} {...props} className="form-add__input" />
			{err && <p className="form-add__error">{err}</p>}
		</div>
	);
};

export { EditInputLabelField, SubmitData, schemaValidate };
