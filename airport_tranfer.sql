use master
CREATE database airport_tranfer
Go

Drop database airport_tranfer
use airport_tranfer


CREATE TABLE isPartner (
  admin_id nvarchar(200) NOT NULL,
   ten nvarchar(200) DEFAULT NULL,
  pass nvarchar(200) DEFAULT NULL
 
);

INSERT INTO isPartner (admin_id, ten ,pass) VALUES
('admin1',  'admin1', 'admin1');

drop table isPartner

CREATE TABLE chuyen_di (
  ma_chuyen_di int Identity,
  noi_di nvarchar(200) ,
  noi_den nvarchar(200) ,
  ngay_bat_dau date ,
  ngay_ket_thuc date ,
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

/*DELIMITER $$
CREATE TRIGGER update_ticket_after_payment AFTER INSERT ON hoa_don FOR EACH ROW UPDATE ve
     SET trang_thai_dat=CONFIRMED, ma_hoa_don= NEW.ma_hoa_don
   WHERE code_ve = NEW.code_ve
$$
DELIMITER ;
*/
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