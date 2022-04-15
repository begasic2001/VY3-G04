import { Routes, Route } from 'react-router-dom';
import RoutePartner from './PartnerRoutes';
import RouteUser from './UserRoutes';

const MainRoute = () => {
	return (
		<Routes>
			<Route path="/*" element={<RouteUser />}></Route>
			<Route path="/partner/*" element={<RoutePartner />}></Route>
		</Routes>
	);
};

export default MainRoute;
