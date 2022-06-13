import { Route, Routes } from 'react-router-dom';
import UserRoute from './routes/user';
import PartnerRoute from './routes/partner';

function App() {
	return (
		<Routes>
			<Route path="*" element={<UserRoute />} />
			<Route path="/partner/*" element={<PartnerRoute />} />
		</Routes>
	);
}

export default App;
