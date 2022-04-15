import suitcaseIcn from '../../../assets/icons/suitcase_icn.png';
import userIcn from '../../../assets/icons/user-noborder_icn.png';
import { useState, useEffect } from 'react';
const { default: axios } = require('axios');


const FetchDataResult = () => {
	const [trip, setTrip] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:9000/trip')
			.then((res) => setTrip(res.data))
			.catch((err) => console.log(err));
	}, []);

	return trip.map((item, index) => (
		<div className="result-item" key={index}>
			<div className="result-item__img">
				<img src={item.image} className="result-item__photo" />
			</div>
			<div className="result-item__content">
				<div className="result-item__info">
					<h2 className="result-item__name">{item.modelName}</h2>
					<p className="result-item__sub">{item.companyName}</p>
					<div className="result-item__box">
						<span className="result-item__require">
							<img src={userIcn} alt="hành khách" />{item.amountPass} hành khách
						</span>
						<span className="result-item__require">
							<img src={suitcaseIcn} alt="hành lý" />{item.amountSuit} hành lý
						</span>
					</div>
				</div>
				<div className="result-item__pay">
					<h2 className="result-item__price">{item.price}</h2>
					<button className="result-item__btn">Chọn</button>
				</div>
			</div>
		</div>
	));
};

export default FetchDataResult;
