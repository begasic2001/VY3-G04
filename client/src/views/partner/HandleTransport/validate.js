import * as yup from 'yup';

export const schemaValidate = yup.object().shape({
	ma_xe: yup.string().required('* Không được bỏ trống'),
	so_xe: yup.string().required('* Không được bỏ trống'),
	hang_xe: yup.string().required('* Không được bỏ trống'),
	so_ghe: yup
		.number()
		.required('* Không được bỏ trống')
		.typeError('Chỉ được nhập số'),
});
