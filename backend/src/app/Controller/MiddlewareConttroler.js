const jwt = require("jsonwebtoken");
<<<<<<< HEAD

=======
const accessKey = "process.env.JWT_ACCESS_KEY"
>>>>>>> a06811a (Upload V2)
const middlewareController = {

    verifyToken:(req, res, next)=>{
        // xác thực token người đăng nhập
        const token = req.headers.token;
        if (token) {
          const accessToken = token.split(" ")[1];
<<<<<<< HEAD
          jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
=======
          jwt.verify(accessToken, accessKey, (err, user) => {
>>>>>>> a06811a (Upload V2)
            if (err) {
              res.status(403).json("Token không tồn tại!");
            }
            req.user = user;
            next();
          });
        } else {
          res.status(401).json("Bạn chưa được xác thực");
        }
      },
<<<<<<< HEAD
    verifyTokenAndAdminAuth : (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user._id === req.params.id || req.user.admin) {
                next();
            } else {
                res.status(403).json("Bạn không xóa được!");
            }
        });
    }
=======
    // verifyTokenAndAdminAuth : (req, res, next) => {
    //     middlewareController.verifyToken(req, res, () => {
    //         if (req.khach_dat.ma_khach_dat === req.params.id || req.isPartner.admin) {
    //             next();
    //         } else {
    //             res.status(403).json("Bạn không xóa được!");
    //         }
    //     });
    // }
>>>>>>> a06811a (Upload V2)
}
module.exports = middlewareController
 