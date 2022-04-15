import { Routes, Route } from 'react-router-dom';
import HomePageUser from '../screen/user/HomePage';
import ResultPageUser from '../screen/user/Result';

const MainRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePageUser />}></Route>
			<Route path="/result" element={<ResultPageUser />}></Route>
		</Routes>
	);
};

export default MainRoute;
