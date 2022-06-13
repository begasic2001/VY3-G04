const { conn, sql } = require('../../config/db/sql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const accessKey = 'process.env.JWT_ACCESS_KEY';
const refreshKey = 'process.env.JWT_REFRESH_KEY';
let refreshTokens = [];

class UsersController {
	index(req, res, next) {
		res.render('stripe');
	}
	async getAllBooking(req, res, next) {
		const noi_di = req.query.noi_di;
		const noi_den = req.query.noi_den;
		const ngay_bat_dau = req.query.ngay_bat_dau;
		const gio_bat_dau = req.query.gio_bat_dau;
		const pool = await conn;
		const sqlString = `SELECT * FROM chuyen_di c , xe x ,cong_ty t ,loai_phuong_tien l  WHERE noi_di =@noi_di AND noi_den=@noi_den AND ngay_bat_dau=@ngay_bat_dau AND gio_bat_dau =@gio_bat_dau AND c.ma_xe=x.ma_xe AND x.ma_loai=l.ma_loai AND x.ma_cong_ty=t.ma_cong_ty AND so_luong > 0`;
		return await pool
			.request()
			.input('noi_di', sql.NVarChar, noi_di)
			.input('noi_den', sql.NVarChar, noi_den)
			.input('ngay_bat_dau', sql.Date, ngay_bat_dau)
			.input('gio_bat_dau', sql.Time, gio_bat_dau)
			.query(sqlString, function (err, data) {
				if (data.recordset.length > 0) {
					res.json({ result: data.recordset });
				} else {
					res.json({ result: [] });
					// res.json({ result: "Không Tìm Thấy Chuyến Đi" });
				}
			});
	}

	async getBookingId(req, res, next) {
		const id = req.params.id;
		// console.log(id);
		const pool = await conn;
		const sqlString = `SELECT * FROM chuyen_di c , xe x ,cong_ty t ,loai_phuong_tien l WHERE c.ma_chuyen_di = @ma_chuyen_di AND c.ma_xe=x.ma_xe AND x.ma_loai=l.ma_loai AND x.ma_cong_ty=t.ma_cong_ty`;
		return await pool
			.request()
			.input('ma_chuyen_di', sql.Int, id)
			.query(sqlString, function (err, data) {
				if (!err) {
					res
						.status(200)
						.json({ message: 'Tìm Thành Công' + id, result: data.recordset });
				} else {
					res.status(500).json({ result: 'Tìm Thất Bại' });
				}
			});
	}
	// người dùng đặt vé
	async bookingOrder(req, res, next) {
		return new Promise(async (resolve, reject) => {
			try {
				const formData = req.body;
				const ma_hoa_don = Math.floor(100000 + Math.random() * 900000);

				const pool = await conn;
				const sqlString =
					'INSERT INTO khach_di(ten_khach_di,diachiKH,CMND,dienthoaiKH,gioitinh,ngaysinh,ma_chuyen_bay) Values (@ten_khach_di,@diachiKH,@CMND,@dienthoaiKH,@gioitinh,@ngaysinh,@ma_chuyen_bay) ';
				return await pool
					.request()
					.input('ten_khach_di', sql.NVarChar, formData.ten_khach_di)
					.input('ma_chuyen_bay', sql.NVarChar, formData.ma_chuyen_bay)
					.input('diachiKH', sql.NVarChar, formData.diachiKH)
					.input('CMND', sql.NVarChar, formData.CMND)
					.input('dienthoaiKH', sql.NVarChar, formData.dienthoaiKH)
					.input('gioitinh', sql.NVarChar, formData.gioitinh)
					.input('ngaysinh', sql.NVarChar, formData.ngaysinh)
					.query(sqlString, async function (err, data1) {
						if (err) {
							console.log(err);
						} else {
							// res.json({ result: data1 });
							const pool = await conn;
							const sqlString2 = `SELECT * FROM khach_di`;
							return await pool
								.request()
								.query(sqlString2, async function (err, data2) {
									res.json({
										result: data2.recordset.pop(),
										ma_hoa_don: ma_hoa_don,
									});
								});
						}
					});
			} catch (err) {
				console.log(err);
			}
		});
	}
	async getUserOder(req, res, next) {
		const pool = await conn;
		const sqlString2 = `SELECT * FROM khach_di`;
		return await pool.request().query(sqlString2, async function (err, data2) {
			res.json({ result: data2.recordset.pop() });
		});
	}
	async bookingOrder2(req, res, next) {
		try {
			const ma_hoa_don = req.body.ma_hoa_don;
			const ma_khach_di = req.params.idKhach;
			const ma_chuyen_di = req.params.idChuyen;
			const email = req.body.email;
			const tong_tien = req.body.tong_tien;
			// const accessToken = req.headers.token.split(" ")[1];
			// const decoded = jwt.verify(accessToken, accessKey);
			const trang_thai_dat = req.body.trang_thai_dat;
			const ngay_dat_ve = req.body.ngay_dat_ve;
			const ngay_bat_dau = req.body.ngay_bat_dau;
			const so_luong = req.body.so_luong;
			const pool = await conn;
			const sqlString2 =
				'INSERT INTO hoa_don (ma_hoa_don,ma_khach_di,ma_chuyen_di,email,ngay_dat_ve ,ngay_bat_dau,trang_thai_dat,so_luong,tong_tien) VALUES(@ma_hoa_don,@ma_khach_di, @ma_chuyen_di,@email, @ngay_dat_ve, @ngay_bat_dau,@trang_thai_dat,@so_luong,@tong_tien)';
			return await pool
				.request()
				.input('ma_hoa_don', sql.Int, ma_hoa_don)
				.input('ma_khach_di', sql.Int, ma_khach_di)
				.input('ma_chuyen_di', sql.Int, ma_chuyen_di)
				.input('email', sql.NVarChar, email)
				.input('ngay_dat_ve', sql.NVarChar, ngay_dat_ve)
				.input('ngay_bat_dau', sql.NVarChar, ngay_bat_dau)
				.input('trang_thai_dat', sql.NVarChar, trang_thai_dat)
				.input('so_luong', sql.Int, so_luong)
				.input('tong_tien', sql.Int, tong_tien)
				.query(sqlString2, async function (err2, data2) {
					if (!err2) {
						const sqlString3 = `UPDATE chuyen_di SET isBought='success' , so_luong=so_luong-@so_luong Where ma_chuyen_di=@ma_chuyen_di`;
						return await pool
							.request()
							.input('so_luong', sql.Int, so_luong)
							.input('ma_chuyen_di', sql.Int, ma_chuyen_di)
							.query(sqlString3, async function (err3, data3) {
								if (err3) {
									console.log(err3);
								} else {
									res.json({
										msg: 'Thêm hóa đơn thành công',
										result: data3,
									});
								}
							});
					} else {
						console.log(err2);
					}
				});
		} catch (err) {
			console.log(err);
		}
	}

	async updateStatus(req, res) {
		const trang_thai_dat = 'success';
		const pool = await conn;
		const sqlString = `UPDATE hoa_don SET trang_thai_dat =${trang_thai_dat} WHERE ma_hoa_don = @ma_hoa_don`;
		return await pool
			.request()
			.input('ma_hoa_don', sql.Int, req.params.ma_hoa_don)
			.query(sqlString, async function (err, data) {
				if (data) {
					res.status(200).json({ msg: 'Cập nhật thành công', result: data });
				} else {
					console.log(err);
				}
			});
	}
	async cancelBooking(req, res) {
		try {
			const sqlString =
				'SELECT count(*) from ve t WHERE code_ve=? and ngay_bat_dau>=@ngay_bat_dau';
			const sqlString2 =
				"UPDATE ve SET trang_thai_dat='CANCELED' WHERE hoa_don=@ma_hoa_don and eamil=@email";
			const sqlString3 =
				'SELECT t.ma_chuyen_bay,t.ngay_bat_dau,t.ma_khach_bay,t.loai,0.85*p.tong_tien as refund_amount from ve t,hoa_don p WHERE t.code_ve=? and t.code_ve=p.code_ve';
			const sqlString4 =
				'UPDATE chuyen_bay SET so_luong_economy=so_luong_economy+? WHERE ma_chuyen_bay=? AND ngay_bat_dau=?';
		} catch (err) {
			console.log(err);
		}
	}

	async history(req, res, next) {
		try {
			if (req.headers.token) {
				const token = req.headers.token.split(' ')[1];
				const decoded = jwt.verify(token, accessKey);
				const pool = await conn;
				const sqlString = `select h.trang_thai_dat,  k.tenKH ,k.email, d.ten_khach_di , d.dienthoaiKH , h.ngay_dat_ve , h.so_luong, h.tong_tien , h.ma_hoa_don , c.noi_di , c.noi_den , c.ngay_bat_dau ,c.gio_bat_dau
        from khach_dat k , khach_di d , hoa_don h , chuyen_di c 
        where k.email=h.email 
        and d.ma_khach_di=h.ma_khach_di 
        and h.ma_chuyen_di = c.ma_chuyen_di 
        and k.email = @email 
        `;
				return await pool
					.request()
					.input('email', sql.NVarChar, decoded.email)
					.query(sqlString, async function (err, data) {
						res.json({ result: data.recordset });
					});
			} else {
				console.log(next);
				res.json({ msg: 'Người dùng phải đăng nhập!!!' });
			}
		} catch (error) {
			console.log(error);
		}
	}

	// lấy tất cả người dùng ( chỉ test code)
	show(req, res, next) {
		User.find({})
			.then((result) => res.status(200).json(result))
			.catch(next);
	}

	// xóa người dùng

	async delete(req, res, next) {
		const id = req.params.id;
		const pool = await conn;
		const sqlString = 'DELETE FROM khach_dat WHERE email =@email ';
		return await pool
			.request()
			.input('email', sql.NVarChar, id)
			.query(sqlString, function (err, data) {
				if (!err) {
					res.json({ result: 'Xóa Thành Công' });
				} else {
					res.json({ result: 'Xóa Thất Bại' });
				}
			});
	}

	// tạo user
	async create(req, res, next) {
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(req.body.matkhau, salt);
		//    const email = req.body.email
		const tenKH = req.body.tenKH;
		const diachiKH = req.body.diachiKH;
		const CMND = req.body.CMND;
		const ngaysinh = req.body.ngaysinh;
		const dienthoaiKH = req.body.dienthoaiKH;
		const gioitinh = req.body.gioitinh;
		const email = req.body.email;
		const pool = await conn;
		const sqlString2 = `select * FROM khach_dat where CMND=@CMND`;
		return await pool
			.request()
			.input('CMND', sql.NVarChar, CMND)
			.query(sqlString2, async function (err, data2) {
				if (!data2.recordset.length > 0) {
					const sqlString3 = `select * FROM khach_dat where email=@email`;
					return await pool
						.request()
						.input('email', sql.NVarChar, email)
						.query(sqlString3, async function (err, data3) {
							if (!data3.recordset.length > 0) {
								const sqlString =
									'INSERT INTO khach_dat (tenKH,diachiKH,CMND,dienthoaiKH,matkhau,gioitinh,email,ngaysinh) Values (@tenKH,@diachiKH,@CMND,@dienthoaiKH,@matkhau,@gioitinh,@email,@ngaysinh)';
								return await pool
									.request()
									.input('tenKH', sql.NVarChar, tenKH)
									.input('diachiKH', sql.NVarChar, diachiKH)
									.input('CMND', sql.NVarChar, CMND)
									.input('dienthoaiKH', sql.NVarChar, dienthoaiKH)
									.input('ngaysinh', sql.NVarChar, ngaysinh)
									.input('matkhau', sql.NVarChar, hashed)
									.input('gioitinh', sql.NVarChar, gioitinh)
									.input('email', sql.NVarChar, email)
									.query(sqlString, function (err, data) {
										res.status(200).json({ result: data.recordset });
									});
							} else {
								console.log(err);
								res.json('Email đã tồn tại!!!!');
							}
						});
				} else {
					console.log(err);
					res.json('CMND đã tồn tại!!!!');
				}
			});
	}
	async createPartner(req, res, next) {
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(req.body.pass, salt);
		const ten = req.body.ten;
		const partner_id = Math.floor(Math.random() * 100);
		const pool = await conn;
		const sqlString =
			'INSERT INTO isPartner (partner_id,ten,pass) Values (@partner_id,@ten,@pass)';
		return await pool
			.request()
			.input('partner_id', sql.NVarChar, partner_id)
			.input('ten', sql.NVarChar, ten)
			.input('pass', sql.NVarChar, hashed)
			.query(sqlString, function (err, data) {
				res.status(200).json({ result: data.recordset });
			});
	}
	// login user
	async login(req, res, next) {
		const email = req.body.email;
		const matkhau = req.body.matkhau;
		if (email && matkhau) {
			const pool = await conn;
			const sqlString = 'SELECT * FROM khach_dat WHERE email =@email';
			return await pool
				.request()
				.input('email', sql.NVarChar, email)

				.query(sqlString, function (err, data) {
					if (err) {
						res.send({ err: err });
					}
					if (data.recordset.length > 0) {
						bcrypt.compare(
							matkhau,
							data.recordset[0].matkhau,
							function (err, result) {
								if (result) {
									// console.log(data.recordset[0].email)
									const accessToken = jwt.sign(
										{ email: data.recordset[0].email },
										accessKey,
										{ expiresIn: '4h' }
									);
									const refreshToken = jwt.sign(
										{
											email: data.recordset[0].email,
										},
										refreshKey,
										{ expiresIn: '4h' }
									);
									refreshTokens.push(refreshToken);
									res.cookie('refreshToken', refreshToken, {
										httpOnly: true,
										secure: false,
										path: '/',
									});
									const { matkhau, ...others } = data.recordset[0];
									res.status(200).json({ ...others, accessToken });
								} else {
									res.json({ status: 404, msg: 'Sai mật khẩu' });
								}
							}
						);
					} else {
						res.json({
							status: 404,
							msg: 'Email không tồn tại',
						});
					}
				});
		} else {
			res.send('Vui lòng nhập tài khoản và mật khẩu');
		}
	}
	async loginPartner(req, res) {
		const ten = req.body.ten;
		const pass = req.body.pass;
		if (ten && pass) {
			const pool = await conn;
			const sqlString = 'SELECT * FROM isPartner WHERE ten =@ten';
			return await pool
				.request()
				.input('ten', sql.NVarChar, ten)
				.query(sqlString, function (err, data) {
					if (err) {
						res.send({ err: err });
					}
					if (data.recordset.length > 0) {
						bcrypt.compare(
							pass,
							data.recordset[0].pass,
							function (err, result) {
								if (result) {
									const accessToken = jwt.sign(
										{ ten: data.recordset[0].ten },
										accessKey,
										{ expiresIn: '8h' }
									);
									const { pass, ...others } = data.recordset[0];
									res.status(200).json({ ...others, accessToken });
								} else {
									res.json({ status: 404, msg: 'Sai tài khoản/mật khẩu' });
								}
							}
						);
					}
				});
		} else {
			res.send('Vui lòng nhập tài khoản và mật khẩu');
		}
	}

	async refresh(req, res, next) {
		const refreshToken = req.cookie.refreshToken;
		if (!refreshToken) {
			return res.json('Bạn chưa xác nhận');
		}
		if (!refreshTokens.includes(refreshToken)) {
			return res.json('refresh token thất bại');
		}
		jwt.verify(refreshToken, refreshKey, (err, data) => {
			if (err) {
				console.log(err);
			}
			refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
			// tạo mới accesstoken và refresh token
			const newAccessToken = jwt.sign(
				{ email: data.recordset[0].email },
				accessKey,
				{ expiresIn: '2h' }
			);
			const newRefreshToken = jwt.sign(
				{ email: data.recordset[0].email },
				refreshKey,
				{ expiresIn: '2h' }
			);
			res.cookie('refreshToken', newRefreshToken, {
				httpOnly: true,
				secure: false,
				path: '/',
				samSite: 'strict',
			});
			res.json({ accessToken: newAccessToken });
		});
	}

	// đăng xuất tài khoản
	logout(req, res, next) {
		res.clearCookie('refreshToken');
		refreshTokens = refreshTokens.filter(
			(token) => token !== req.cookies.refreshToken
		);
		res.status(200).json('đăng xuất thành công');
	}
}
module.exports = new UsersController();
