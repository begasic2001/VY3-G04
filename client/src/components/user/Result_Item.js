import { AiFillCheckCircle } from 'react-icons/ai';
import { FaUserAlt, FaSuitcase } from 'react-icons/fa';
import { useState } from 'react';
import ReadyStage from '../../views/user/booking/ReadyStage';

const ItemTickets = ({ allData, ...props }) => {
	const [openForm, setOpenForm] = useState(false);

	const toggleForm = () => setOpenForm(!openForm);

	return (
		<>
			<div className="result-tickets__item">
				<div className="result-tickets__left">
					<img
						src={props.image}
						alt="hình phương tiện"
						className="result-tickets__img"
					/>
				</div>
				<div className="result-tickets__right">
					<div className="result-tickets__info">
						<h3 className="result-tickets__model">{props.model}</h3>
						<p className="result-ticke ts__company">{props.company}</p>
						<div className="result__box">
							<div className="result-tickets__cap">
								<FaUserAlt />
								<span>{props.amountPass} hành khách</span>
							</div>
							<div className="result-tickets__cap">
								<FaSuitcase />
								<span>{props.amountSuit} hành lý</span>
							</div>
						</div>
					</div>
					<div className="result-tickets__price">
						<h3 className="result-tickets__money">
							{props.price.toLocaleString()}đ/ xe
						</h3>
						<p className="result-tickets__include">
							<AiFillCheckCircle />
							<span>Bao gồm phí,...</span>
						</p>
						<button
							className="result-tickets__select"
							onClick={() => toggleForm()}
						>
							Chọn
						</button>
					</div>
				</div>
			</div>
			{openForm && <ReadyStage toggleform={toggleForm} data={allData} />}
		</>
	);
};

export default ItemTickets;
