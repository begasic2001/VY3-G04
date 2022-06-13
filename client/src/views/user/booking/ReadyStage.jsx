import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../../../styles/user/_readyStage.scss';

const schemaValidate = yup.object({
	so_luong: yup
		.number()
		.typeError('Vui lòng nhập số')
		.min(1, 'Không được bé hơn 1'),
});

function ReadyStage({ toggleform, data }) {
	const [amountPass, setAmountPass] = useState(1);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schemaValidate),
	});

	const closeForm = () => {
		reset();
		toggleform();
	};
	const submitData = ({ so_luong }) => {
		const sessionSReady = {
			so_luong,
			ma_chuyen_di: data.ma_chuyen_di,
			ngay_bat_dau: data.ngay_bat_dau,
			gio_bat_dau: data.gio_bat_dau.slice(0, 5),
			noi_di: data.noi_di,
			noi_den: data.noi_den,
			ten_loai: data.ten_loai,
			model: data.ma_xe[0],
			gia: data.don_gia,
		};
		sessionStorage.setItem('ticketInfo', JSON.stringify(sessionSReady));
		window.location.assign('/stage/contact');
	};

	return (
		<div className="ready" onClick={() => closeForm()}>
			<div className="ready__content" onClick={(e) => e.stopPropagation()}>
				<div className="ready-trip">
					<h2 className="ready_from">Từ {data.noi_di}</h2>
					<p className="ready-trip__model">{data.so_xe}</p>
					<p className="ready-trip__comp">{data.tenCT}</p>
					<p className="ready-trip__des">
						{data.noi_di} &rarr; {data.noi_den}
					</p>
				</div>
				<form className="ready-form" onSubmit={handleSubmit(submitData)}>
					<div className="ready-form__item">
						<label className="ready-form__label">Hành khách</label>
						<input
							type="number"
							{...register('so_luong')}
							min="1"
							value={amountPass}
							onChange={(e) => setAmountPass(e.target.value)}
							className="ready-form__input"
						/>
						<p className="form__errValidate">{errors.so_luong?.message}</p>
					</div>
					<div className="ready-form__confirm">
						<div className="ready-form__summary">
							<p className="ready-form__amount">
								Tổng tiền cho {amountPass} người
							</p>
							<h2 className="ready-form__price">
								{(amountPass * data.don_gia).toLocaleString()}đ
							</h2>
							<p className="ready-form__desc">
								Giá cuối cùng đã bao gồm thuế, xế, phí cầu đường, đậu xe và thuế
							</p>
						</div>
						<button type="submit" className="ready-form__submit">
							Đặt ngay
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ReadyStage;
