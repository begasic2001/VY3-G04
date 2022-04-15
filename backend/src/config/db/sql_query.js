const querysCompany = {
    getAllCompany: "SELECT * FROM cong_ty",
    getCompanyWithId: "SELECT * FROM cong_ty WHERE ma_cong_ty = @ma_cong_ty",
    createCompany: "INSERT INTO cong_ty (tenCT,emailCT,sdtCT,dia_chi_CT) VALUES(@tenCT, @emailCT, @sdtCT, @dia_chi_CT)",
    updateCompany: "UPDATE cong_ty SET tenCT = @tenCT, emailCT = @emailCT, sdtCT = @sdtCT, dia_chi_CT = @dia_chi_CT WHERE ma_cong_ty = @ma_cong_ty",
    deleteCompany: "DELETE FROM cong_ty WHERE ma_cong_ty = @ma_cong_ty",
}

const querysCar = {
    getAllCar: "SELECT * FROM xe",
    getCarById: "SELECT * FROM xe WHERE ma_xe = @ma_xe",
    createCar: "INSERT INTO xe ( ma_xe,ma_loai,ma_cong_ty,so_xe,hang_xe,so_ghe) VALUES (@ma_xe, @ma_loai, @ma_cong_ty, @so_xe, @hang_xe, @so_ghe)",
    updateCar: "UPDATE xe SET  ma_loai = @ma_loai, ma_cong_ty = @ma_cong_ty, so_xe = @so_xe WHERE , hang_xe=@hang_xe , so_ghe=@so_ghe WHERE ma_xe= @ma_xe",
    deleteCar: "DELETE FROM xe WHERE ma_xe = @ma_xe",
}

const querysDriver = {
    getAllDriver: "SELECT * FROM tai_xe",
    getDriverById: "SELECT * FROM tai_xe WHERE ma_tai_xe = @ma_tai_xe",
    createDriver: "INSERT INTO tai_xe (ma_cong_ty,tenTX,ngay_sinh,sdtTX,dia_chi_TX) VALUES (@ma_cong_ty, @tenTX, @ngay_sinh, @sdtTX, @sdtTX)",
    updateDriver: "UPDATE Driver SET ma_cong_ty = @ma_cong_ty, tenTX = @tenTX, sdtTX = @sdtTX, dia_chi_TX = @dia_chi_TX WHERE ma_tai_xe = @ma_tai_xe",
    deleteDriver: "DELETE FROM Driver WHERE ma_tai_xe = @ma_tai_xe",
}

const querysTypeCar = {
    getAllType: "SELECT * FROM loai_phuong_tien ORDER BY ma_loai ASC",
    createType: "INSERT INTO loai_phuong_tien (ten_loai) VALUES (@ten_loai)",
    deleteType: "DELETE FROM loai_phuong_tien WHERE ma_loai = @ma_loai",
}

module.exports =  {
    querysCompany: querysCompany,
    querysCar: querysCar,
    querysDriver: querysDriver,
    querysTypeCar: querysTypeCar,
}