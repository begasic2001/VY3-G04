import voucher from '../../../assets/images/airplane.jpg';
import '../../../styles/shared/_banner.css';

const BannerItem = () => {
	return (
		<div className="banner__item">
			<img src={voucher} alt="khuyến mãi" className="banner__img" />
		</div>
	);
};

//Layout main
const BannerUser = () => {
	return (
		<section className="banner">
			<div className="banner__box">
				<BannerItem />
				<BannerItem />
				<BannerItem />
				<BannerItem />
			</div>
		</section>
	);
};

export default BannerUser;
