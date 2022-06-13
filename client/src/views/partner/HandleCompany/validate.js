import * as yup from 'yup';

export const schemaValidate = yup.object().shape({
	tenCT: yup.string().required('* Tên công ty không được bỏ trống'),
	emailCT: yup
		.string()
		.required('* Email không được để trống')
		.email('Phải theo cú pháp abc@gmail.com'),
	sdtCT: yup
		.string()
		.required('* Không được bỏ trống')
		.matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, '* Chỉ được nhập số'),
	dia_chi_CT: yup.string().required('* Địa chỉ không được để trống'),
});
