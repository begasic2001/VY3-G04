import { Routes, Route } from 'react-router-dom';
import { HeaderUser } from '../components/Header';
import Homepage from '../views/user/Homepage';
import Resultpage from '../views/user/Resultpage';
import Login from '../views/user/Loginpage';
import Registration from '../views/user/Registerpage';
import OwnBill from '../views/user/MyBill';
import ContactStage from '../views/user/booking/InfoStage';
import PaymentStage from '../views/user/booking/PaymentStage';
import ConfirmStage from '../views/user/booking/ConfirmStage';

const UserRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<HeaderUser havebanner />}>
				<Route path="" element={<Homepage />} />
				<Route path="result" element={<Resultpage />} />
				<Route path="user/*">
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Registration />} />
					<Route path="bill" element={<OwnBill />} />
				</Route>
			</Route>
			<Route path="/stage" element={<HeaderUser />}>
				<Route path="contact" element={<ContactStage />} />
				<Route path="payment" element={<PaymentStage />} />
				<Route path="confirm" element={<ConfirmStage />} />
			</Route>
		</Routes>
	);
};

export default UserRoute;
