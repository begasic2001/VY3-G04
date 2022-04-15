use master
CREATE database airport_tranfer
Go

Drop database airport_tranfer
use airport_tranfer


<<<<<<< HEAD
CREATE TABLE isPartner (
  admin_id nvarchar(200) NOT NULL,
=======
CREATE table khach_dat(
	ma_khach_dat int IDENTITY(1,1) NOT NULL,
	tenKH nVarchar(200),
	diaChiKH nvarchar(200),
	CMND nvarchar(200) UNIQUE,
	dienthoaiKH nVarchar(200),
	taiKhoan nVarchar(200) UNIQUE,
	matkhau nVarchar(200) NOT NULL,
	gioitinh nVarchar(3),
	email nVarchar(200) UNIQUE,
); 

CREATE TABLE khach_di (
  ma_khach_di int IDENTITY(1,1) NOT NULL,
  ten_khach_di nvarchar(200) DEFAULT NULL,
  diaChiKH nvarchar(200),
	CMND nvarchar(200) UNIQUE,
	dienthoaiKH nVarchar(200),
	ngaysinh SMALLDATETIME,
	gioitinh nVarchar(3),
	email nVarchar(200) UNIQUE,
) 

CREATE TABLE isPartner (
  partner_id nvarchar(200) NOT NULL,
>>>>>>> a06811a (Upload V2)
   ten nvarchar(200) DEFAULT NULL,
  pass nvarchar(200) DEFAULT NULL
 
);

<<<<<<< HEAD
INSERT INTO isPartner (admin_id, ten ,pass) VALUES
('admin1',  'admin1', 'admin1');

drop table isPartner

CREATE TABLE chuyen_di (
  ma_chuyen_di int Identity,
=======
INSERT INTO isPartner (partner_id, ten ,pass) VALUES
('admin1',  'admin1', 'admin1');



CREATE TABLE hoa_don (
   ma_hoa_don int IDENTITY(1,1) not null ,
  ma_khach_di int ,
  ma_khach_dat int,
  ngay_dat_ve date ,
  ngay_bat_dau date,
  ma_loai int ,
  trang_thai_dat nvarchar(200) 
);
CREATE TABLE ct_hoa_don (
  ma_hoa_don int not null ,
  ma_chuyen_di int not null,
  tong_tien int ,
  phuong_thuc nvarchar(200) 
);
create table loai_phuong_tien(
	ma_loai int identity(1,1),
	ten_loai nvarchar(200)
)
create table cong_ty(
  ma_cong_ty int identity(1,1), 
  tenCT nvarchar(200), 
  emailCT nvarchar(200), 
  sdtCT int, 
  dia_chi_CT nvarchar(200)
)
create table tai_xe(
  ma_tai_xe int identity(1,1), 
  ma_cong_ty int,
  tenTX nvarchar(200), 
  ngay_sinh date, 
  sdtTX int, 
  dia_chi_TX nvarchar(200), 

)
create table xe(
  ma_xe nvarchar(200) not null, 
  ma_loai int, 
  ma_cong_ty int, 
  so_xe nvarchar(200), 
  hang_xe nvarchar(200), 
  so_ghe int
)
CREATE TABLE chuyen_di (
  ma_chuyen_di int Identity(1,1) not null,
>>>>>>> a06811a (Upload V2)
  noi_di nvarchar(200) ,
  noi_den nvarchar(200) ,
  ngay_bat_dau date ,
  ngay_ket_thuc date ,
<<<<<<< HEAD
  ngay_ve date default null,
  gio_bat_dau time ,
  gio_ket_thuc time ,
  khu_hoi bit default 0,
  so_luong int ,
  hanh_ly int ,
  don_gia int,
  hinh_anh NVARCHAR(200) ,
  loai_phuong_tien NVARCHAR(200)
);

INSERT INTO chuyen_di (noi_di,noi_den,ngay_bat_dau,ngay_ket_thuc,ngay_ve,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,hinh_anh,loai_phuong_tien) VALUES
(N'TPHCM',N'Hà Nội','2022-3-31','2022-3-31','2022-4-1','01:00:00','02:00:00',50,50,500000,'hinh1.jpg',N'xe hơi');
INSERT INTO chuyen_di (noi_di,noi_den,ngay_bat_dau,ngay_ket_thuc,ngay_ve,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,hinh_anh,loai_phuong_tien) VALUES
(N'TPHCM 2',N'Hà Nội 2','2022-3-31','2022-3-31',null,'01:00:00','02:00:00',50,50,500000,'hinh1.jpg',N'xe hơi');

select * from chuyen_di where ma_chuyen_di=2


CREATE TABLE hoa_don (
  ma_hoa_don int IDENTITY NOT NULL,
  code_ve nvarchar(200) ,
  ngay_thanh_toan date ,
  tong_tien int ,
  phuong_thuc nvarchar(200) 
);
=======
  gio_bat_dau time ,
  gio_ket_thuc time ,
  so_luong int ,
  hanh_ly int ,
  don_gia int,
  hinh_anh NVARCHAR(200) DEFAULT null ,
	ma_xe nvarchar(200) 
);

	



>>>>>>> a06811a (Upload V2)

/*DELIMITER $$
CREATE TRIGGER update_ticket_after_payment AFTER INSERT ON hoa_don FOR EACH ROW UPDATE ve
     SET trang_thai_dat=CONFIRMED, ma_hoa_don= NEW.ma_hoa_don
   WHERE code_ve = NEW.code_ve
$$
DELIMITER ;
*/
<<<<<<< HEAD
CREATE table khach_hang(
	maKH int IDENTITY NOT NULL,
	tenKH nVarchar(200),
	diaChiKH nvarchar(200),
	CMND nvarchar(200) UNIQUE,
	dienthoaiKH nVarchar(200),
	taiKhoan nVarchar(200) UNIQUE,
	matkhau nVarchar(200) NOT NULL,
	ngaysinh SMALLDATETIME,
	gioitinh Bit,
	email nVarchar(200) UNIQUE,
); 




CREATE TABLE ve (
  code_ve nvarchar(200) NOT NULL,
   ma_hoa_don int ,
  maKH int ,
  ngay_dat_ve date ,
  ma_chuyen_di int  ,
  ngay_bat_dau date,
  ngay_ve date ,
  khu_hoi bit default 0,
  loai_phuong_tien nvarchar(200) ,
  trang_thai_dat nvarchar(200) 
 
 
);

ALTER TABLE chuyen_di
  ADD PRIMARY KEY (ma_chuyen_di)
 
ALTER TABLE hoa_don
  ADD PRIMARY KEY (ma_hoa_don)
 


ALTER TABLE khach_hang
  ADD PRIMARY KEY (maKH)


ALTER TABLE ve
  ADD PRIMARY KEY (code_ve)





ALTER TABLE hoa_don
  ADD CONSTRAINT payment_details_ibfk_1 FOREIGN KEY (code_ve) REFERENCES ve(code_ve) ON UPDATE CASCADE;
  


ALTER TABLE ve
  ADD CONSTRAINT ticket_details_ibfk_2 FOREIGN KEY (maKH) REFERENCES khach_hang (maKH) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE ve
  ADD CONSTRAINT ticket_details_ibfk_3 FOREIGN KEY (ma_chuyen_di) REFERENCES chuyen_di (ma_chuyen_di) ON DELETE CASCADE ON UPDATE CASCADE
=======


ALTER TABLE isPartner
  ADD PRIMARY KEY (partner_id)


ALTER TABLE khach_dat
  ADD PRIMARY KEY (ma_khach_dat)

  
ALTER TABLE khach_di
  ADD PRIMARY KEY (ma_khach_di)

 
ALTER TABLE hoa_don
  ADD PRIMARY KEY (ma_hoa_don)

ALTER TABLE loai_phuong_tien
	 ADD PRIMARY KEY (ma_loai)

ALTER TABLE cong_ty
	 ADD PRIMARY KEY (ma_cong_ty)

ALTER TABLE xe
	 ADD PRIMARY KEY (ma_xe)

ALTER TABLE tai_xe
	 ADD PRIMARY KEY (ma_tai_xe)

ALTER TABLE chuyen_di
  ADD PRIMARY KEY (ma_chuyen_di)

  ALTER TABLE ct_hoa_don
  ADD PRIMARY KEY (ma_hoa_don, ma_chuyen_di)
 

ALTER TABLE hoa_don
  ADD CONSTRAINT ticket_details_ibfk_2 FOREIGN KEY (ma_khach_dat) REFERENCES khach_dat (ma_khach_dat) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE hoa_don
  ADD CONSTRAINT ticket_details_ibfk_3 FOREIGN KEY (ma_khach_di) REFERENCES khach_di (ma_khach_di) ON DELETE CASCADE ON UPDATE CASCADE


ALTER TABLE ct_hoa_don
  ADD CONSTRAINT ticket_details_ibfk_4 FOREIGN KEY (ma_hoa_don) REFERENCES hoa_don (ma_hoa_don) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE ct_hoa_don
  ADD CONSTRAINT ticket_details_ibfk_5 FOREIGN KEY (ma_chuyen_di) REFERENCES chuyen_di (ma_chuyen_di) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE tai_xe
  ADD CONSTRAINT tai_xe_cong_ty_fk FOREIGN KEY (ma_cong_ty) REFERENCES cong_ty (ma_cong_ty) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE xe
  ADD CONSTRAINT xe_loai_phuong_tien_fk FOREIGN KEY (ma_loai) REFERENCES loai_phuong_tien (ma_loai) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE xe
  ADD CONSTRAINT xe_cong_ty_fk FOREIGN KEY (ma_cong_ty) REFERENCES cong_ty (ma_cong_ty) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE chuyen_di
  ADD CONSTRAINT ticket_details_ibfk_6 FOREIGN KEY (ma_xe) REFERENCES xe (ma_xe) ON DELETE CASCADE ON UPDATE CASCADE

-- INSERT into loai_phuong_tien (ten_loai) values
-- ('ô tô')
-- INSERT into loai_phuong_tien (ten_loai) values
-- ('xe buýt')
-- INSERT into loai_phuong_tien (ten_loai) values
-- ('tàu hỏa')

-- INSERT INTO chuyen_di (noi_di,noi_den,ngay_bat_dau,ngay_ket_thuc,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,hinh_anh,ma_loai) VALUES
-- (N'TPHCM',N'Hà Nội','2022-4-10','2022-4-10','10:00:00','11:00:00',50,50,500000,'hinh1.jpg',1);
-- INSERT INTO chuyen_di (noi_di,noi_den,ngay_bat_dau,ngay_ket_thuc,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,hinh_anh,ma_loai) VALUES
-- (N'TPHCM ',N'Hà Nội ','2022-4-11','2022-4-11','11:00:00','12:00:00',50,50,500000,'hinh1.jpg',2);
-- INSERT INTO chuyen_di (noi_di,noi_den,ngay_bat_dau,ngay_ket_thuc,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,hinh_anh,ma_loai) VALUES
-- (N'TPHCM ',N'Đà Lạt ','2022-4-12','2022-4-12','11:00:00','12:00:00',50,50,500000,'hinh1.jpg',3);
-- INSERT INTO chuyen_di (noi_di,noi_den,ngay_bat_dau,ngay_ket_thuc,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,hinh_anh,ma_loai) VALUES
-- (N'Cà Mau',N'Hải Phòng','2022-4-12','2022-4-12','11:00:00','12:00:00',50,50,500000,'hinh1.jpg',3);

-- select * from khach_dat
>>>>>>> a06811a (Upload V2)
