const querysCompany = {
	getAllCompany: 'SELECT * FROM cong_ty',
	getCompanyWithId: 'SELECT * FROM cong_ty WHERE ma_cong_ty = @ma_cong_ty',
	createCompany:
		'INSERT INTO cong_ty (tenCT,emailCT,sdtCT,dia_chi_CT) VALUES(@tenCT, @emailCT, @sdtCT, @dia_chi_CT)',
	updateCompany:
		'UPDATE cong_ty SET tenCT = @tenCT, emailCT = @emailCT, sdtCT = @sdtCT, dia_chi_CT = @dia_chi_CT WHERE ma_cong_ty = @ma_cong_ty',
	deleteCompany: 'DELETE FROM cong_ty WHERE ma_cong_ty = @ma_cong_ty',
};
// x ,cong_ty t,loai_phuong_tien l ,tai_xe e WHERE x.ma_cong_ty=t.ma_cong_ty AND x.ma_loai=l.ma_loai AND x.ma_tai_xe=e.ma_tai_xe

// x ,cong_ty t,loai_phuong_tien l , tai_xe e And x.ma_cong_ty=t.ma_cong_ty AND x.ma_loai=l.ma_loai AND x.ma_tai_xe=e.ma_tai_xe
const querysCar = {
	getAllCar: 'SELECT * FROM xe ',
	getCarById: 'SELECT * FROM xe  WHERE ma_xe = @ma_xe ',
	createCar:
		'INSERT INTO xe (ma_xe,ma_loai,ma_tai_xe,ma_cong_ty,partner_id,so_xe,hang_xe,so_ghe, hinh_anh) VALUES (@ma_xe, @ma_loai, @ma_tai_xe,@ma_cong_ty,@partner_id, @so_xe, @hang_xe, @so_ghe, @hinh_anh)',
	updateCar:
		'UPDATE xe SET  ma_loai = @ma_loai,ma_tai_xe=@ma_tai_xe, ma_cong_ty = @ma_cong_ty,partner_id=@partner_id, so_xe = @so_xe,hang_xe=@hang_xe ,so_ghe=@so_ghe  WHERE ma_xe= @ma_xe',
	deleteCar: 'DELETE FROM xe WHERE ma_xe = @ma_xe',
};

const querysDriver = {
	getAllDriver: 'SELECT * FROM tai_xe',
	getDriverById: 'SELECT * FROM tai_xe WHERE ma_tai_xe = @ma_tai_xe',
	createDriver:
		'INSERT INTO tai_xe (tenTX,ngay_sinh,sdtTX,dia_chi_TX) VALUES(@tenTX, @ngay_sinh, @sdtTX, @dia_chi_TX)',
	updateDriver:
		'UPDATE tai_xe SET  tenTX = @tenTX,ngay_sinh=@ngay_sinh, sdtTX = @sdtTX, dia_chi_TX = @dia_chi_TX WHERE ma_tai_xe = @ma_tai_xe',
	deleteDriver: 'DELETE FROM tai_xe WHERE ma_tai_xe = @ma_tai_xe',
};

const querysTypeCar = {
	getAllType: 'SELECT * FROM loai_phuong_tien ORDER BY ma_loai ASC',
	createType: 'INSERT INTO loai_phuong_tien (ten_loai) VALUES (@ten_loai)',
	deleteType: 'DELETE FROM loai_phuong_tien WHERE ma_loai = @ma_loai',
};

module.exports = {
	querysCompany: querysCompany,
	querysCar: querysCar,
	querysDriver: querysDriver,
	querysTypeCar: querysTypeCar,
};
