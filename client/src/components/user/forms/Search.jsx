import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../../styles/user/_formSearch.css';
import { InputLabelField, RequestData } from '../../../container/user/form/HandleSearch';

const setMinDate = () => new Date().toISOString().slice(0, 10);

const schemaValidate = yup.object({
	fromDes: yup.string().required('*Nơi đi không được để trống'),
	toDes: yup.string().required('*Nơi đến không được để trống'),
});

const Search = () => {
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});
	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(RequestData)}
			className="form-search"
		>
			<div className="form-search__row">
				<InputLabelField
					label="Nơi đi"
					name="fromDes"
					control={control}
					err={errors.fromDes?.message}
				/>
				<InputLabelField
					label="Nơi đến"
					name="toDes"
					control={control}
					err={errors.toDes?.message}
				/>
				<InputLabelField
					label="Ngày đi"
					type="date"
					name="dateStart"
					min={setMinDate()}
					control={control}
					/>
				<InputLabelField
					label="Giờ đi"
					type="time"
					name="timeStart"
					control={control}
				/>
			</div>
			<button className="form-search__btn" type="submit">
				Tìm chuyến
			</button>
		</form>
	);
};

export default Search;
