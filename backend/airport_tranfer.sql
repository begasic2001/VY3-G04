/*use master
Drop database airport_tranfer
CREATE database airport_tranfer
Go

use airport_tranfer
*/

CREATE table khach_dat(
	email nVarchar(200) Not null,
	tenKH nVarchar(200),
	diaChiKH nvarchar(200),
	ngaysinh nvarchar(10),
	CMND nvarchar(200) UNIQUE,
	dienthoaiKH nVarchar(200),
	matkhau nVarchar(200) NOT NULL,
	gioitinh nVarchar(10),
	point int
); 

CREATE TABLE khach_di (
  ma_khach_di int IDENTITY(1,1) NOT NULL,
  ten_khach_di nvarchar(200) ,
  ma_chuyen_bay nvarchar(200),
  diaChiKH nvarchar(200),
	CMND nvarchar(200),
	dienthoaiKH nVarchar(200),
	ngaysinh nvarchar(10),
	gioitinh nVarchar(10),
) 

CREATE TABLE isPartner (
  partner_id nvarchar(200) NOT NULL,
   ten nvarchar(200) DEFAULT NULL,
  pass nvarchar(200) DEFAULT NULL
 
);





CREATE TABLE hoa_don (
  ma_hoa_don int not null ,
  ma_khach_di int ,
  email nvarchar(200),
  ma_chuyen_di int ,
  ngay_dat_ve nvarchar(200) ,
  ngay_bat_dau nvarchar(200),
  so_luong int,
  tong_tien int ,
  phuong_thuc nvarchar(200),
  trang_thai_dat nvarchar(200) 
);
/*
CREATE TABLE ct_hoa_don (
  ma_hoa_don int not null ,
  ma_chuyen_di int not null,
  tong_tien int ,
  phuong_thuc nvarchar(200) 
);
*/
create table loai_phuong_tien(
	ma_loai int identity(1,1),
	ten_loai nvarchar(200)
)
create table cong_ty(
  ma_cong_ty int identity(1,1), 
  tenCT nvarchar(200), 
  emailCT nvarchar(200), 
  sdtCT nvarchar(200), 
  dia_chi_CT nvarchar(200)
)
create table tai_xe(
  ma_tai_xe int identity(1,1), 
  tenTX nvarchar(200), 
  ngay_sinh nvarchar(200), 
  sdtTX nvarchar(200), 
  dia_chi_TX nvarchar(200), 

)
create table xe(
  ma_xe nvarchar(200) not null, 
  ma_loai int, 
  ma_tai_xe int,
  ma_cong_ty int, 
  partner_id nvarchar(200)  ,
  so_xe nvarchar(200), 
  hang_xe nvarchar(200),
  hinh_anh nvarchar(250),
  so_ghe nvarchar(200),
  --don_gia nvarchar(200)
)
CREATE TABLE chuyen_di (
  ma_chuyen_di int Identity(1,1) not null,
  ma_xe nvarchar(200), 
  noi_di nvarchar(200) ,
  noi_trung_gian nvarchar(200),
  noi_den nvarchar(200) ,
  ngay_bat_dau nvarchar(200) ,
  ngay_ket_thuc nvarchar(200) ,
  gio_bat_dau nvarchar(200) ,
  gio_ket_thuc nvarchar(200) ,
  so_luong int ,
  hanh_ly int ,
  don_gia int,
  isBought nvarchar(200),
  --hinh_anh NVARCHAR(200) DEFAULT null ,
);

	




/*DELIMITER $$
CREATE TRIGGER update_ticket_after_payment AFTER INSERT ON hoa_don FOR EACH ROW UPDATE ve
     SET trang_thai_dat=CONFIRMED, ma_hoa_don= NEW.ma_hoa_don
   WHERE code_ve = NEW.code_ve
$$
DELIMITER ;
*/


ALTER TABLE isPartner
  ADD PRIMARY KEY (partner_id)


ALTER TABLE khach_dat
  ADD PRIMARY KEY (email)

  
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


ALTER TABLE hoa_don
  ADD CONSTRAINT ticket_details_ibfk_2 FOREIGN KEY (email) REFERENCES khach_dat (email) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE hoa_don
  ADD CONSTRAINT ticket_details_ibfk_3 FOREIGN KEY (ma_khach_di) REFERENCES khach_di (ma_khach_di) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE hoa_don
  ADD CONSTRAINT ticket_details_ibfk_4 FOREIGN KEY (ma_chuyen_di) REFERENCES chuyen_di (ma_chuyen_di) ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE xe
  ADD CONSTRAINT xe_loai_phuong_tien_fk FOREIGN KEY (ma_loai) REFERENCES loai_phuong_tien (ma_loai) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE xe
  ADD CONSTRAINT xe_cong_ty_fk FOREIGN KEY (ma_cong_ty) REFERENCES cong_ty (ma_cong_ty) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE xe
  ADD CONSTRAINT xe_tai_xe_fk FOREIGN KEY (ma_tai_xe) REFERENCES tai_xe (ma_tai_xe) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE xe
  ADD CONSTRAINT xe_partner_fk FOREIGN KEY (partner_id) REFERENCES isPartner(partner_id)  ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE chuyen_di
  ADD CONSTRAINT ticket_details_ibfk_6 FOREIGN KEY (ma_xe) REFERENCES xe (ma_xe) ON DELETE CASCADE ON UPDATE CASCADE

 INSERT into loai_phuong_tien (ten_loai) values
 (N'ô tô')
 INSERT into loai_phuong_tien (ten_loai) values
 (N'xe buýt')
INSERT into loai_phuong_tien (ten_loai) values
(N'tàu hỏa')
INSERT INTO isPartner (partner_id, ten ,pass) VALUES
('admin1',  'admin1', 'admin1');
INSERT INTO cong_ty ( tenCT , emailCT , sdtCT, dia_chi_CT ) VALUES ('CONXXE 3','CONXXE21234@gmail.com','012345','1232345');

INSERT INTO tai_xe (tenTX,ngay_sinh,sdtTX,dia_chi_TX) VALUES ('Hưng Hà','1/5/2022','0704543252','451/33/18/2');
INSERT INTO xe(ma_xe,ma_loai,ma_cong_ty,ma_tai_xe,so_xe,hang_xe,so_ghe) VALUES ('OT01',1,1,1,'59L2726','mes',7)
 INSERT INTO chuyen_di (noi_di,noi_den,noi_trung_gian,ngay_bat_dau,ngay_ket_thuc,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,ma_xe) VALUES
 (N'TPHCM',N'Hà Nội','','2022-04-10','2022-04-10','10:00:00','11:00:00',5,5,500000,'OT01');

  INSERT INTO chuyen_di (noi_di,noi_den,noi_trung_gian,ngay_bat_dau,ngay_ket_thuc,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,ma_xe) VALUES
 (N'TPHCM',N'Hà Nội','','2022-04-11','2022-04-11','10:00:00','11:00:00',5,5,500000,'OT01');

   INSERT INTO chuyen_di (noi_di,noi_den,noi_trung_gian,ngay_bat_dau,ngay_ket_thuc,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,ma_xe) VALUES
 (N'TPHCM',N'Hà Nội','','2022-05-11','2022-05-11','10:00:00','11:00:00',5,5,500000,'OT01');
alter table xe add hinh_anh nvarchar(200)
select * from khach_dat
select * from chuyen_di
select * from khach_di
delete  from khach_di
delete  from chuyen_di
select * from hoa_don
SELECT ma_cong_ty From cong_ty
SELECT * FROM chuyen_di 
WHERE c.ma_xe = x.ma_xe 
AND noi_di = N'Vạn hạnh mall'
AND noi_den = N'Sân bay tân sơn nhất'
And ngay_bat_dau = '2022-04-19'
SELECT COUNT(*) as totalUser FROM khach_dat
select * from xe
SELECT ngay_bat_dau ,SUM(don_gia) AS totalMonth FROM chuyen_di WHERE MONTH(ngay_bat_dau) = 4 Group by ngay_bat_dau

SELECT ma_chuyen_di , ngay_bat_dau , SUM(don_gia) FROM chuyen_di GROUP BY ma_chuyen_di , ngay_bat_dau

select k.tenKH ,k.email, d.ten_khach_di , d.dienthoaiKH , h.ngay_dat_ve , h.so_luong, h.tong_tien , h.ma_hoa_don , c.noi_di , c.noi_den , c.ngay_bat_dau ,c.gio_bat_dau
        from khach_dat k , khach_di d , hoa_don h , chuyen_di c 
        where k.email=h.email 
        and d.ma_khach_di=h.ma_khach_di 
        and h.ma_chuyen_di = c.ma_chuyen_di 
		and k.email='minhthanhluongmin@gmail.com'

select h.ma_hoa_don , h.ngay_dat_ve , h.so_luong , h.tong_tien , h.trang_thai_dat , d.ten_khach_di , d.dienthoaiKH , d.diaChiKH ,d.CMND,d.ngaysinh,d.gioitinh,k.tenKH , k.diaChiKH , k.CMND,k.gioitinh,c.noi_di,c.noi_den,c.ngay_bat_dau,c.gio_bat_dau  
    from khach_dat k , khach_di d , hoa_don h , chuyen_di c 
    where k.email=h.email and d.ma_khach_di=h.ma_khach_di and h.ma_chuyen_di = c.ma_chuyen_di 