import * as yup from 'yup';

export const schemaValidate = yup.object().shape({
	tenTX: yup.string().required('* Không được bỏ trống'),
	sdtTX: yup
		.string()
		.required('* Không được bỏ trống')
		.matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, '* Chỉ được nhập số'),
	dia_chi_TX: yup.string().required('* Không được bỏ trống'),
});
