const { conn, sql } = require('../../config/db/sql');
const {
	querysCar,
	querysCompany,
	querysTypeCar,
	querysDriver,
} = require('../../config/db/sql_query');
class CarsController {
	index = async (req, res) => {
		res.render('car');
	};

	getAllCar = async (req, res) => {
		try {
			let pool = await conn;
			let sqlString1 = querysCar.getAllCar;
			let sqlString2 = querysCompany.getAllCompany;
			let sqlString3 = querysTypeCar.getAllType;
			let sqlString4 = querysDriver.getAllDriver;
			return await pool.request().query(sqlString1, async (err, data) => {
				if (!err) {
					let car = data.recordset;
					return await pool.request().query(sqlString2, async (err2, data2) => {
						if (!err2) {
							let company = data2.recordset;

							return await pool
								.request()
								.query(sqlString3, async (err3, data3) => {
									if (!err3) {
										let typeCar = data3.recordset;
										return await pool
											.request()
											.query(sqlString4, async (err4, data4) => {
												let driver = data4.recordset;
												res.json({
													xe: car,
													cong_ty: company,
													loai_phuong_tien: typeCar,
													tai_xe: driver,
												});
											});
									}
								});
						}
					});
					// res.render('car', {data:data.recordset})
					// res.json({ result: data.recordset });
				} else {
					res.json({ message: 'Không load danh sách xe', error: err.message });
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	show = async (req, res) => {
		try {
			let id = req.params.id;
			let pool = await conn;
			let sqlString1 = querysCar.getCarById;
			let sqlString2 = querysCompany.getAllCompany;
			let sqlString3 = querysTypeCar.getAllType;
			let sqlString4 = querysDriver.getAllDriver;
			return await pool
				.request()
				.input('ma_xe', sql.NVarChar, id)
				.query(sqlString1, async (err, data) => {
					if (!err) {
						let car = data.recordset;
						return await pool
							.request()
							.query(sqlString2, async (err2, data2) => {
								if (!err2) {
									let company = data2.recordset;

									return await pool
										.request()
										.query(sqlString3, async (err3, data3) => {
											if (!err3) {
												let typeCar = data3.recordset;
												return await pool
													.request()
													.query(sqlString4, async (err4, data4) => {
														let driver = data4.recordset;
														res.json({
															xe: car,
															cong_ty: company,
															loai_phuong_tien: typeCar,
															tai_xe: driver,
														});
													});
											}
										});
								}
							});
					} else {
						res.json({ message: 'Không tồn tại', error: err.message });
					}
				});
		} catch (err) {
			console.log(err);
		}
	};

	createCar = async (req, res) => {
		try {
			// return console.log(req.file.firebaseUrl);
			let pool = await conn;
			let sqlString = querysCar.createCar;
			return await pool
				.request()
				.input('ma_xe', sql.NVarChar, req.body.ma_xe)
				.input('ma_loai', sql.Int, req.body.ma_loai)
				.input('ma_cong_ty', sql.Int, req.body.ma_cong_ty)
				.input('ma_tai_xe', sql.Int, req.body.ma_tai_xe)
				.input('partner_id', sql.NVarChar, req.body.partner_id)
				.input('so_xe', sql.NVarChar, req.body.so_xe)
				.input('hang_xe', sql.NVarChar, req.body.hang_xe)
				.input('so_ghe', sql.NVarChar, req.body.so_ghe)
				.input('hinh_anh', sql.NVarChar, req.body.hinh_anh)
				.query(sqlString, (err, data) => {
					if (!err) {
						res.json({ message: 'Thêm thông tin thành công', data: data });
					} else {
						res.json({
							message: 'Thêm thông tin thất bại',
							error: err.message,
						});
					}
				});
		} catch (err) {
			console.log(err);
		}
	};

	updateCar = async (req, res) => {
		try {
			const firebaseURL = req.file ? req.file : '';
			let id = req.params.id;
			let pool = await conn;
			let sqlString = querysCar.updateCar;
			return await pool
				.request()
				.input('ma_xe', sql.NVarChar, id)
				.input('ma_loai', sql.Int, req.body.ma_loai)
				.input('ma_cong_ty', sql.Int, req.body.ma_cong_ty)
				.input('ma_tai_xe', sql.Int, req.body.ma_tai_xe)
				.input('partner_id', sql.NVarChar, req.body.partner_id)
				.input('so_xe', sql.NVarChar, req.body.so_xe)
				.input('hang_xe', sql.NVarChar, req.body.hang_xe)
				.input('so_ghe', sql.NVarChar, req.body.so_ghe)
				.input('hinh_anh', sql.NVarChar, req.body.hinh_anh)
				.query(sqlString, (err, data) => {
					if (!err) {
						res.json({
							message: 'Cập nhật thông tin thành công',
							result: data,
						});
					} else {
						res.json({
							message: 'Cập nhật thông tin thất bại',
							error: err.message,
						});
					}
				});
		} catch (err) {
			console.log(err);
		}
	};

	deleteCar = async (req, res) => {
		try {
			let id = req.params.id;
			let pool = await conn;
			let sqlString = querysCar.deleteCar;
			return await pool
				.request()
				.input('ma_xe', sql.NVarChar, id)
				.query(sqlString, (err, data) => {
					if (!err) {
						res.json({ message: 'Xoá thông tin thành công', data: data });
					} else {
						res.json({ message: 'Xoá thông tin thất bại' });
					}
				});
		} catch (err) {
			console.log(err);
		}
	};
}

module.exports = new CarsController();
