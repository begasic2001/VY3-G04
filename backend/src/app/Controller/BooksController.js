<<<<<<< HEAD

// const Booking = require('../Model/Booking')
// const { mulBookingToOject }= require('../../ultils/mongooes')
// const { BookingToOject }= require('../../ultils/mongooes')
const upload = require('./UploadController')
const {conn, sql} = require('../../config/db/sql')
class BooksController{
    async index(req,res,next){
        // mongo
        // await Booking.find({})
        // .then(bookings => {     
        //     res.render('partners/home',{
        //         // res.json(bookings)
        //         bookings: mulBookingToOject(bookings)
        //     })
        // })
        // .catch(next)
        // res.render('partners/home')

        //mssql
        const pool =  await conn
        const sqlString = "SELECT * FROM chuyen_di "
        return await pool.request().query(sqlString,function(err,data){
        //    res.render('partners/home',{result:data.recordset})
        res.send({result:data.recordset})
        })
           
         

    }
    async show(req,res,next){
        // Booking.findOne({slug:req.params.slug})
        // .then(bookings => {
        //    //res.json(bookings)
        //    res.render('partners/detail',{
        //        bookings: BookingToOject(bookings)
        //    })
        // })
        // .catch(next)
        // res.send("Detail booking" + req.params.slug)
        // res.render('partners/detail')
        const id = req.params.id;
        const pool =  await conn
        const sqlString = "SELECT * FROM chuyen_di WHERE ma_chuyen_di =@varid "
        return await pool.request()
        .input('varid',sql.Int,id)
        .query(sqlString,function(err,data){
            if(data.recordset.length >0){
                res.json({ressult:data.recordset[0]})
            }else{
                res.json({result:null})
            }
           
        })
    }
    //[GET] booking/create
    create(req,res,next){

        res.render('partners/create')
    }

    //[POST] booking/store
    async store(req,res,next){
    //mssql
    // const resRoundTrip = khu_hoi => req.body.khu_hoi ==="on" ? 1 : 0 resRoundTrip(req.body.khu_hoi)
    const pool =  await conn
    const sqlString = "INSERT INTO chuyen_di(noi_di,noi_den,ngay_bat_dau,ngay_ket_thuc,ngay_ve,gio_bat_dau,gio_ket_thuc,khu_hoi,so_luong,hanh_ly,don_gia,hinh_anh,loai_phuong_tien) VALUES (@noi_di,@noi_den,@ngay_bat_dau,@ngay_ket_thuc,@ngay_ve,@gio_bat_dau,@gio_ket_thuc,@khu_hoi,@so_luong,@hanh_ly,@don_gia,@hinh_anh,@loai_phuong_tien)"
    return await pool.request()
    .input('noi_di',sql.NVarChar,req.body.noi_di)
    .input('noi_den',sql.NVarChar,req.body.noi_den)
    .input('ngay_bat_dau',sql.Date,req.body.ngay_bat_dau)
    .input('ngay_ket_thuc',sql.Date,req.body.ngay_ket_thuc)
    .input('ngay_ve',sql.Date,req.body.ngay_ve)
    .input('gio_bat_dau',sql.Time,req.body.gio_bat_dau)
    .input('gio_ket_thuc',sql.Time,req.body.gio_ket_thuc)
    .input('khu_hoi',sql.Bit,req.body.khu_hoi)
    .input('so_luong',sql.Int,req.body.so_luong)
    .input('hanh_ly',sql.Int,req.body.hanh_ly)
    .input('don_gia',sql.Int,req.body.don_gia)
    .input('hinh_anh',sql.NVarChar,req.body.hinh_anh)
    .input('loai_phuong_tien',sql.NVarChar,req.body.loai_phuong_tien)
    .query(sqlString,function(err,data){
            res.json({ressult:data})
    })
        

    // mongo    
    //     const file = req.file
    //     // console.log(file)
    //     // res.json("Upload thành công")
    //     const formData =req.body
    // const resRoundTrip = roundtrip => formData.roundtrip ==="on"
    // ? true : false
       

// điểm bắt đầu bằng điểm kết thúc
// const rt_pickup_location = roundtrip => roundtrip
//     ? formData.dropoff_location
//     : "";
// // điểm kết thúc bằng điểm bắt đầu
// const rt_dropoff_location = roundtrip => roundtrip
//     ? formData.pickup_location
//     : "";
  
        // const booking = new Booking({
        //     trip_details:{
        //         pickup_location: formData.pickup_location,
        //         dropoff_location: formData.dropoff_location,
        //         pickup_date: formData.pickup_date,
        //         pickup_time: formData.pickup_time,
        //         flight_number: formData.flight_number,
        //         passengers_count: formData.passengers_count,
        //         suitcases_count: formData.suitcases_count,
        //         roundtrip: resRoundTrip(formData.roundtrip),
        //         rt_pickup_location: rt_pickup_location(formData.roundtrip),
        //         rt_dropoff_location: rt_dropoff_location(formData.roundtrip),
        //         rt_pickup_date: formData.rt_pickup_date,
        //         rt_pickup_time: formData.rt_pickup_time,
        //         rt_flight_number: formData.rt_flight_number,
        //         rt_return_date:formData.rt_return_date,
        //         image: file.filename
        //     },
        //     vehicle:{
        //         selected_vehicle: formData.selected_vehicle,
        //         price: formData.price,
        //     },
        //     options:{
        //         baby_seats: formData.baby_seats,
        //     },
        //     comments: formData.comments,
        //     send_communications: formData.send_communications, 
        // });
      
        // booking.save()
        // res.redirect('/booking')
    }
    // [GET] booking/:id/edit
    edit(req,res,next){
        Booking.findById(req.params.id)
        .then(bookings => res.render('partners/edit',{
            bookings: BookingToOject(bookings)
        }))
        .catch(next)
        // res.render('partners/edit')
    }
    // [PUT] booking/:id/
    async update(req,res,next){
        //mssql
        const id = req.params.id
        const pool =  await conn
        const sqlString = "UPDATE chuyen_di SET noi_di=@noi_di ,noi_den=@noi_den,ngay_bat_dau=@ngay_bat_dau,ngay_ket_thuc=@ngay_ket_thuc,ngay_ve=@ngay_ve,gio_bat_dau=@gio_bat_dau,gio_ket_thuc=@gio_ket_thuc,so_luong=@so_luong,hanh_ly=@hanh_ly,don_gia=@don_gia,hinh_anh=@hinh_anh,loai_phuong_tien=@loai_phuong_tien WHERE ma_chuyen_di=@ma_chuyen_di"
        return await pool.request()
        .input('noi_di',sql.NVarChar,req.body.noi_di)
        .input('noi_den',sql.NVarChar,req.body.noi_den)
        .input('ngay_bat_dau',sql.Date,req.body.ngay_bat_dau)
        .input('ngay_ket_thuc',sql.Date,req.body.ngay_ket_thuc)
        .input('ngay_ve',sql.Date,req.body.ngay_ve)
        .input('gio_bat_dau',sql.Time,req.body.gio_bat_dau)
        .input('gio_ket_thuc',sql.Time,req.body.gio_ket_thuc)
        .input('so_luong',sql.Int,req.body.so_luong)
        .input('hanh_ly',sql.Int,req.body.hanh_ly)
        .input('don_gia',sql.Int,req.body.don_gia)
        .input('hinh_anh',sql.NVarChar,req.body.hinh_anh)
        .input('loai_phuong_tien',sql.NVarChar,req.body.loai_phuong_tien)
        .input('ma_chuyen_di',sql.Int,id)
        .query(sqlString,function(err,data){
            console.log(err)
                res.json({ressult:data})
        })

        // const formData =req.body
        // const file = req.file
        // const resRoundTrip = roundtrip => formData.roundtrip ==="on"
        // ? true : false

       

// điểm bắt đầu bằng điểm kết thúc
// const rt_pickup_location = roundtrip => roundtrip
//     ? formData.dropoff_location
//     : "";
// // điểm kết thúc bằng điểm bắt đầu
// const rt_dropoff_location = roundtrip => roundtrip
//     ? formData.pickup_location
//     : "";

        // const updates ={
        //     trip_details:{
        //         pickup_location: formData.pickup_location,
        //         dropoff_location: formData.dropoff_location,
        //         pickup_date: formData.pickup_date,
        //         pickup_time: formData.pickup_time,
        //         flight_number: formData.flight_number,
        //         passengers_count: formData.passengers_count,
        //         suitcases_count: formData.suitcases_count,
        //         roundtrip: resRoundTrip(formData.roundtrip),
        //         rt_pickup_location: rt_pickup_location(formData.roundtrip),
        //         rt_dropoff_location: rt_dropoff_location(formData.roundtrip),
        //         rt_pickup_date: formData.rt_pickup_date,
        //         rt_pickup_time: formData.rt_pickup_time,
        //         rt_flight_number: formData.rt_flight_number,
        //         rt_return_date:formData.rt_return_date,
                
        //     },
        //     vehicle:{
        //         selected_vehicle: formData.selected_vehicle,
        //         price: formData.price,
        //     },
        //     options:{
        //         baby_seats: formData.baby_seats,
        //     },
        //     comments: formData.comments,
        //     send_communications: formData.send_communications,
        //     agree_to_terms: formData.agree_to_terms,
        // }

        // if(file){
        //     const image = file.filename
        //     updates.trip_details.image = image
        // }

        // Booking.findOneAndUpdate({_id:req.params.id},{
        //    $set:updates
        
        // },{
        //     new:true
        // })
        //     .then(() => res.redirect('/booking'))
        //     .catch(next)



    }
     // [DELETE] booking/:id/
    async delete(req,res,next){
        // Booking.deleteOne({_id:req.params.id})
        //     .then(() => res.redirect('back'))
        //     .catch(next)
        const id = req.params.id
        const pool =  await conn
        const sqlString = "DELETE FROM chuyen_di WHERE ma_chuyen_di =@varid "
        return await pool.request()
        .input('varid',sql.Int,id)
        .query(sqlString,function(err,data){
            if(!err){
                res.json({ressult:"Xóa Thành Công"})
            }else{
                res.json({result:"Xóa Thất Bại"})
            }
           
        })

    
    }
}
module.exports = new BooksController()
=======
const upload = require('./UploadController');
const { conn, sql } = require('../../config/db/sql');
class BooksController {
	//[GET] api/getAllTrip
	async getAllTrip(req, res, next) {
	
		//mssql
		const pool = await conn;
		const sqlString = 'SELECT * FROM chuyen_di c,loai_phuong_tien l WHERE c.ma_loai = l.ma_loai  ';
		return await pool.request().query(sqlString, function (err, data) {
			res.json({result: data.recordset });
		});
	}
	//[GET] api/getTrip/:id
	async show(req, res, next) {
		const id = req.params.id;
		const pool = await conn;
		const sqlString = 'SELECT * FROM chuyen_di WHERE ma_chuyen_di =@varid ';
		
		return await pool
			.request()
			.input('varid', sql.Int, id)
			.query(sqlString, function (err, data) {
				if (data.recordset.length > 0) {
					res.json({ result: data.recordset[0] });
				} else {
					res.json({ result: null });
				}
			});
	}
	//[GET] booking/create
	// create(req, res, next) {
	// 	res.render('partners/create');
	// }

	//[POST] api/createTrip
	async createTrip(req, res, next) {
		//mssql
		// const resRoundTrip = khu_hoi => req.body.khu_hoi ==="on" ? 1 : 0 resRoundTrip(req.body.khu_hoi)
		const pool = await conn;
		const sqlString =
			'INSERT INTO chuyen_di(noi_di,noi_den,ngay_bat_dau,ngay_ket_thuc,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,don_gia,hinh_anh,ma_loai) VALUES (@noi_di,@noi_den,@ngay_bat_dau,@ngay_ket_thuc,@gio_bat_dau,@gio_ket_thuc,@so_luong,@hanh_ly,@don_gia,@hinh_anh,@ma_loai)';
		return await pool
			.request()
			.input('noi_di', sql.NVarChar, req.body.noi_di)
			.input('noi_den', sql.NVarChar, req.body.noi_den)
			.input('ngay_bat_dau', sql.Date, req.body.ngay_bat_dau)
			.input('ngay_ket_thuc', sql.Date, req.body.ngay_ket_thuc)
			.input('gio_bat_dau', sql.Time, req.body.gio_bat_dau)
			.input('gio_ket_thuc', sql.Time, req.body.gio_ket_thuc)
			.input('so_luong', sql.Int, req.body.so_luong)
			.input('hanh_ly', sql.Int, req.body.hanh_ly)
			.input('don_gia', sql.Int, req.body.don_gia)
			.input('hinh_anh', sql.NVarChar, req.body.hinh_anh)
			.input('ma_loai', sql.Int, req.body.ma_loai)
			.query(sqlString, function (err, data) {
				res.json({result:data.recordset})
				// res.redirect('http://localhost:3000/admin');
			});
		// điểm bắt đầu bằng điểm kết thúc
		// const rt_pickup_location = roundtrip => roundtrip
		//     ? formData.dropoff_location
		//     : "";
		// // điểm kết thúc bằng điểm bắt đầu
		// const rt_dropoff_location = roundtrip => roundtrip
		//     ? formData.pickup_location
		//     : "";

	}
	// [GET] api/editTrip/:id
	async editTrip(req, res, next) {
        const id = req.params.id;
		const pool = await conn;
		const sqlString = 'SELECT * FROM chuyen_di WHERE ma_chuyen_di =@varid ';
		return await pool
			.request()
			.input('varid', sql.Int, id)
			.query(sqlString, function (err, data) {
				if (data.recordset.length > 0) {
					res.json({ result: data.recordset[0] });
				} else {
					res.json({ result: null });
				}
			});
	}
	// [PUT] api/updateTrip/:id
	async updateTrip(req, res, next) {
		//mssql
		const id = req.params.id;
		const pool = await conn;
		const sqlString =
			'UPDATE chuyen_di SET noi_di=@noi_di ,noi_den=@noi_den,ngay_bat_dau=@ngay_bat_dau,ngay_ket_thuc=@ngay_ket_thuc,gio_bat_dau=@gio_bat_dau,gio_ket_thuc=@gio_ket_thuc,so_luong=@so_luong,hanh_ly=@hanh_ly,don_gia=@don_gia,hinh_anh=@hinh_anh,ma_loai=@ma_loai WHERE ma_chuyen_di=@ma_chuyen_di';
		return await pool
			.request()
			.input('noi_di', sql.NVarChar, req.body.noi_di)
			.input('noi_den', sql.NVarChar, req.body.noi_den)
			.input('ngay_bat_dau', sql.Date, req.body.ngay_bat_dau)
			.input('ngay_ket_thuc', sql.Date, req.body.ngay_ket_thuc)
			.input('gio_bat_dau', sql.Time, req.body.gio_bat_dau)
			.input('gio_ket_thuc', sql.Time, req.body.gio_ket_thuc)
			.input('so_luong', sql.Int, req.body.so_luong)
			.input('hanh_ly', sql.Int, req.body.hanh_ly)
			.input('don_gia', sql.Int, req.body.don_gia)
			// .input('hinh_anh', sql.NVarChar, req.file.filename)
			// .input('hinh_anh', sql.NVarChar, req.body.hinh_anh)
			.input('ma_loai', sql.Int, req.body.ma_loai)
			.input('ma_chuyen_di', sql.Int, id)
			.query(sqlString, function (err, data) {
				res.json({result:data.recordset})
				// res.redirect('http://localhost:3000/admin');
			});
	}
	// [DELETE] api/deleteTrip/:id
	async deleteTrip(req, res, next) {
		const id = req.params.id;
		const pool = await conn;
		const sqlString = 'DELETE FROM chuyen_di WHERE ma_chuyen_di =@varid ';
		return await pool
			.request()
			.input('varid', sql.Int, id)
			.query(sqlString, function (err, data) {
				if (!err) {
					res.json({ result: 'Xóa Thành Công' });
				} else {
					res.json({ result: 'Xóa Thất Bại' });
				}
			});
	}
}
module.exports = new BooksController();
>>>>>>> a06811a (Upload V2)
