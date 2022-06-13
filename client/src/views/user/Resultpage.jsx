import moment from 'moment';
import { useState, useEffect } from 'react';
import { AiFillCar } from 'react-icons/ai';
import { FaBus, FaTrain } from 'react-icons/fa';
import { getSearchResult } from '../../middlewares/apiUser';
import ItemTicket from '../../components/user/Result_Item';
import SearchForm from '../../components/user/SearchForm';
import { LoadingIcon, EmptyData } from '../../components/Status';
import '../../styles/user/_resultpage.scss';

const initialData = {
	loading: true,
	data: [],
	err: null,
};

const Resultpage = () => {
	const [apiData, setApiData] = useState(initialData);
	const [openSearch, setOpenSearch] = useState(false);
	const [toggleTab, setToggleTab] = useState(1);

	const handleClick = (number) => setToggleTab(number);
	const handleOpenSearch = () => setOpenSearch(!openSearch);

	useEffect(() => {
		const defaultSearch = {
			noi_di: '',
			noi_den: '',
			ngay_bat_dau: moment().format('yyyy-MM-DD'),
			gio_bat_dau: moment().format('HH:mm'),
		};
		const sessionPSearch =
			JSON.parse(sessionStorage.getItem('searchTrip')) || defaultSearch;

		const getTrips = async () => {
			try {
				const res = await getSearchResult(sessionPSearch);
				await setApiData({
					...apiData,
					loading: false,
					data: res.data.result,
				});
				await setToggleTab(res.data.result[0]?.ma_loai[0]);
			} catch (e) {
				setApiData({
					...apiData,
					loading: false,
					err: e.message,
				});
			}
		};

		getTrips();
	}, []);

	if (apiData.loading) return <LoadingIcon />;
	if (apiData.err || apiData.data.length === 0)
		return (
			<>
				<section className="result">
					<div className="result__searched">
						<div className="result__flex">
							<div className="result__info"></div>
							<button
								className="result__btn"
								onClick={() => handleOpenSearch()}
							>
								Thay đổi tìm kiếm
							</button>
						</div>
						{openSearch && <SearchForm resultform />}
					</div>
				</section>
				<EmptyData />
			</>
		);
	return (
		<section className="result">
			<div className="result__searched">
				<div className="result__flex">
					<div className="result__info">
						<h2 className="result__from">Từ {apiData.data[0]?.noi_di}</h2>
						<div className="result__box">
							<span className="result__datetime">
								{moment(apiData.data[0]?.ngay_bat_dau).format('DD/MM/yyyy')}
							</span>
							<span className="result__datetime">
								{apiData.data[0]?.gio_bat_dau.slice(0, 5)}
							</span>
						</div>
					</div>
					<button
						className="result__btn"
						onClick={() => setOpenSearch(!openSearch)}
					>
						Thay đổi tìm kiếm
					</button>
				</div>
				{openSearch && <SearchForm resultform />}
			</div>
			<div className="result__tab">
				<span
					className={`result__option ${
						toggleTab === 1 ? 'result__option--active' : ''
					}`}
					onClick={() => handleClick(1)}
				>
					<AiFillCar />
					Xe ô tô
				</span>
				<span
					className={`result__option ${
						toggleTab === 2 ? 'result__option--active' : ''
					}`}
					onClick={() => handleClick(2)}
				>
					<FaBus />
					Buýt trung chuyển
				</span>
				<span
					className={`result__option ${
						toggleTab === 3 ? 'result__option--active' : ''
					}`}
					onClick={() => handleClick(3)}
				>
					<FaTrain />
					Tàu ra sân bay
				</span>
			</div>

			<div className="result-tickets">
				{apiData.data.map((item) => {
					if (toggleTab === item?.ma_loai[0])
						return (
							<ItemTicket
								key={item.ma_xe}
								model={item.ma_xe[0]}
								company={item.tenCT}
								amountPass={item.so_ghe}
								amountSuit={item.hanh_ly}
								price={item.don_gia}
								image={item.hinh_anh}
								allData={item}
							/>
						);
				})}
			</div>
		</section>
	);
};
export default Resultpage;
