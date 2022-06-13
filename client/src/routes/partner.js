import { Routes, Route } from 'react-router-dom';
import { HeaderPartner } from '../components/Header';
import Login from '../views/partner/Login';
import ManageDrivers from '../views/partner/HandleDriver/ShowDriver';
import ManageCompanies from '../views/partner/HandleCompany/ShowCompany';
import ManageTransports from '../views/partner/HandleTransport/ShowTransport';
import ManageTrips from '../views/partner/HandleTrip/ShowTrip';
import Statistical from '../views/partner/Statistical';
import Customer from '../views/partner/Customer';
import ManageBill from '../views/partner/ManageBill';

const PartnerRoute = () => {
	return (
		<Routes>
			<Route path="" element={<HeaderPartner />}>
				<Route path="" element={<Login />} />
				<Route path="driver" element={<ManageDrivers />} />
				<Route path="company" element={<ManageCompanies />} />
				<Route path="transport" element={<ManageTransports />} />
				<Route path="trip" element={<ManageTrips />} />
				<Route path="statistical" element={<Statistical />} />
				<Route path="customer" element={<Customer />} />
				<Route path="bill" element={<ManageBill />} />
			</Route>
		</Routes>
	);
};

export default PartnerRoute;
