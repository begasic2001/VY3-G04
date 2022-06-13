import SuccessIcon from '../../../assets/icons/happy-face.png';
import '../../../styles/user/_confirmStage.scss';

const ConfirmStage = () => {
	return (
		<div className="confirm">
			<img src={SuccessIcon} alt="success icon" className="confirm__img" />
			<h2 className="confirm__txt">
				Chúc mừng! đơn hàng của bạn đã được xác nhận
			</h2>
			<h3 className="confirm__desc">
				Bạn có thể vào <a href="/user/bill">Đơn đặt của tôi</a> để xem hóa đơn
			</h3>
		</div>
	);
};

export default ConfirmStage;
