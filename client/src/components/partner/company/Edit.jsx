import '../../../styles/partner/_addTickets.css';
import {
	EditInputLabelField,
	SubmitData,
	schemaValidate,
} from '../../../container/partner/company/EditControl';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const EditTicket = () => {
	const [dataId, setDataId] = useState({});
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const id = location.state?.id;

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	useEffect(() => {
		const getData = async () => {
			const data = await axios
				.get(`http://localhost:9000/api/company/getCompany/${id}`)
				.then((res) => setDataId(res.data));
			setLoading(false);
		};
		getData();
	}, []);
	return (
		<div className="form">
			<h1 className="form__title">Thêm chuyến</h1>
			<form
				autoComplete="off"
				className="form-add"
				onSubmit={handleSubmit(SubmitData)}
			>
				{loading ? (
					'loading...'
				) : (
					<>
						<EditInputLabelField
							name="ma_cong_ty"
							defaultValue={dataId.ma_cong_ty}
							hidden
							control={control}
						/>
						<EditInputLabelField
							label="Tên công ty"
							name="tenCT"
							defaultValue={dataId.tenCT}
							control={control}
							err={errors.tenCT?.message}
						/>
						<EditInputLabelField
							label="Email"
							name="emailCT"
							control={control}
							defaultValue={dataId.emailCT}
							err={errors.emailCT?.message}
						/>
						<EditInputLabelField
							label="Sđt"
							name="sdtCT"
							control={control}
							defaultValue={dataId.sdtCT}
							err={errors.sdtCT?.message}
						/>
						<EditInputLabelField
							label="Địa chỉ"
							name="dia_chi_CT"
							control={control}
							defaultValue={dataId.dia_chi_CT}
							err={errors.dia_chi_CT?.message}
						/>
					</>
				)}
				<button type="submit" className="form-add__btn">
					Thêm
				</button>
			</form>
		</div>
	);
};

export default EditTicket;
