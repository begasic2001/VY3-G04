import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	PointElement,
} from 'chart.js';
import { getMonthRevenues } from '../../middlewares/apiStatistical';
import { LoadingIcon, EmptyData } from '../../components/Status';
import '../../styles/partner/_statistical.scss';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const initialApiData = {
	loading: true,
	data: {},
	err: null,
};

const options = {
	responsive: true,
	plugins: {
		title: {
			display: true,
			text: 'Bảng thống kê doanh thu',
		},
	},
};
const bgcLabel = ['rgba(255, 97, 131, 0.5)', 'rgba(53, 162, 235, 0.5)'];

const Statistical = () => {
	const [apiData, setApiData] = useState(initialApiData);
	const [chart, setChart] = useState(1);

	const sessionPAdmin = JSON.parse(sessionStorage.getItem('adminInfo')) || {};

	const data = {
		labels: Object.keys(apiData.data?.result || {}),
		datasets: [
			{
				label: 'Tháng',
				data: Object.values(apiData.data?.result || {}),
				backgroundColor: 'rgba(204, 204, 204, 0.5)',
			},
		],
	};

	const toggleChart = (num) => {
		setChart(num);
	};

	useEffect(() => {
		const getRevenues = () => {
			try {
				getMonthRevenues()
					.then((res) => res.data)
					.then((receiveData) =>
						setApiData({
							...apiData,
							loading: false,
							data: receiveData,
						})
					)
					.catch((e) =>
						setApiData({
							...apiData,
							err: e,
						})
					);
			} catch (e) {
				console.log(e);
				setApiData({
					...apiData,
					err: e,
				});
			}
		};

		getRevenues();
	}, []);

	if (!sessionPAdmin.login) return window.location.assign('/partner');
	if (apiData.loading) return <LoadingIcon />;
	if (apiData.err) {
		console.log(apiData.err);
		return <EmptyData />;
	}
	return (
		<div className="statistical">
			<div className="statistical-summary">
				<Link to="/partner/trip" className="statistical-summary__item">
					<p className="statistical-summary__title">Số chuyến phát hành</p>
					<p className="statistical-summary__result statistical-summary__result--green">
						{apiData.data.totalTrip || '0 (có lỗi)'}
					</p>
				</Link>
				<Link to="/partner/bill" className="statistical-summary__item">
					<p className="statistical-summary__title">Số đơn đặt</p>
					<p className="statistical-summary__result statistical-summary__result--blue">
						{apiData.data.totalBill || '0 (có lỗi)'}
					</p>
				</Link>
				<Link to="/partner/customer" className="statistical-summary__item">
					<p className="statistical-summary__title">Số khách hàng</p>
					<p className="statistical-summary__result statistical-summary__result--orange">
						{apiData.data.totalUser || '0 (có lỗi)'}
					</p>
				</Link>
				<div className="statistical-summary__item">
					<p className="statistical-summary__title">Tổng doanh thu</p>
					<p className="statistical-summary__result statistical-summary__result--orange">
						{apiData.data.totalAllBill.toLocaleString()}đ
					</p>
				</div>
			</div>
			<div className="statistical-chart">
				{chart === 1 && <Line options={options} data={data} />}
				{chart === 2 && <Bar options={options} data={data} />}
				<div className="statistical-chart__btns">
					<button
						type="button"
						onClick={() => toggleChart(2)}
						className="statistical-chart__btn"
					>
						Biểu đồ cột
					</button>
					<button
						type="button"
						onClick={() => toggleChart(1)}
						className="statistical-chart__btn"
					>
						Biểu đồ đường
					</button>
				</div>
			</div>
		</div>
	);
};

export default Statistical;
