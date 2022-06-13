import * as yup from 'yup';

export const schemaValidate = yup.object().shape({
	noi_di: yup.string().required('* Nơi đi không được để trống'),
	noi_trung_gian: yup.string(),
	noi_den: yup
		.string()
		.required('* Không được bỏ trống')
		.notOneOf(
			[yup.ref('noi_trung_gian'), null],
			'* Hai nơi không được trùng nhau'
		),
	so_luong: yup
		.number()
		.typeError('Phải nhập số')
		.required('* Số lượng vé không được để trống')
		.min(1, 'Không được nhỏ hơn 1'),
	hanh_ly: yup
		.number()
		.typeError('Phải nhập số')
		.required('* Hành lý không được để trống')
		.min(1, 'Không được nhỏ hơn 1'),
	don_gia: yup
		.number()
		.typeError('Phải nhập số')
		.required('* Đơn giá không được để trống')
		.min(10000, 'Không được nhỏ hơn 10.000đ'),
});
