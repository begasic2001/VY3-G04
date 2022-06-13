import * as yup from 'yup';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fromDes, toDes } from '../../utils/getDes';
import { TextField } from '../InputField';
import '../../styles/user/_homepage.scss';

const schemaValidation = yup.object().shape({
	noi_di: yup.string().required('* Nơi đi không được để trống'),
	noi_den: yup.string().required('* Nơi đến không được để trống'),
});

const SearchForm = (props) => {
	const sessionPSearch = JSON.parse(sessionStorage.getItem('searchTrip'));

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidation),
	});

	const submitForm = (data) => {
		sessionStorage.setItem('searchTrip', JSON.stringify(data));
		window.location.assign('/result');
	};

	return (
		<section className={`search ${props.resultform ? 'search--result' : ''}`}>
			<form className="search-form" onSubmit={handleSubmit(submitForm)}>
				<div className="search-form__box">
					<div className="search-form__item">
						<label className="search-form__label">Nơi đi</label>
						<TextField
							name="noi_di"
							control={control}
							err={errors.noi_di?.message}
							defaultValue={sessionPSearch?.noi_di}
							inputClass="search-form__input"
							list="noi_di"
						/>
						<datalist id="noi_di">
							{fromDes.map((item) => (
								<option key={item.code} value={item.name} />
							))}
						</datalist>
					</div>
					<div className="search-form__item">
						<label className="search-form__label">Nơi đến</label>
						<TextField
							name="noi_den"
							control={control}
							err={errors.noi_den?.message}
							defaultValue={sessionPSearch?.noi_den}
							inputClass="search-form__input"
							list="noi_den"
						/>
						<datalist id="noi_den">
							{toDes.map((item) => (
								<option key={item.code} value={item.name} />
							))}
						</datalist>
					</div>
					<div className="search-form__item">
						<label className="search-form__label">Ngày đón</label>
						<TextField
							type="date"
							name="ngay_bat_dau"
							defaultValue={
								sessionPSearch?.ngay_bat_dau || moment().format('yyyy-MM-DD')
							}
							min={moment().format('yyyy-MM-DD')}
							control={control}
							inputClass="search-form__input"
						/>
					</div>
					<div className="search-form__item">
						<label className="search-form__label">Giờ đón</label>
						<TextField
							type="time"
							name="gio_bat_dau"
							defaultValue={
								sessionPSearch?.gio_bat_dau || moment().format('HH:mm')
							}
							control={control}
							inputClass="search-form__input"
						/>
					</div>
				</div>
				<button type="submit" className="search-form__btn">
					Tìm chuyến
				</button>
			</form>
		</section>
	);
};

export default SearchForm;
