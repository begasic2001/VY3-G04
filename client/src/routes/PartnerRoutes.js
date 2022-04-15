import { Routes, Route } from 'react-router-dom';
import AddPage from '../screen/partner/AddPage';
import EditPage from '../screen/partner/EditPage';
import HomePage from '../screen/partner/HomePage';

const MainRoute = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />}></Route>
			<Route path="/add" element={<AddPage />}></Route>
			<Route path='/edit/:id' element={<EditPage />}></Route>
		</Routes>
	);
};

export default MainRoute;
