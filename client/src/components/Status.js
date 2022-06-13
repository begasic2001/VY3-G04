import ReactLoading from 'react-loading';
import EmptyIcon from '../assets/icons/cancel.png';
import '../styles/_status.scss';

const LoadingIcon = () => {
	return (
		<div className="loadingIcon">
			<span className="loadingIcon__txt">Loading ...</span>
			<ReactLoading className="loadingIcon__icn" />
		</div>
	);
};

const EmptyData = (props) => {
	return (
		<div className={`emptyIcon ${props.admin && 'emptyIcon--admin'}`}>
			<img src={EmptyIcon} alt="empty icon" className="emptyIcon__img" />
			<p className="emptyIcon__txt">Không có dữ liệu</p>
		</div>
	);
};

export { LoadingIcon, EmptyData };
