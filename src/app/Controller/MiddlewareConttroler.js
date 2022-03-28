const jwt = require("jsonwebtoken");

const middlewareController = {

    verifyToken:(req, res, next)=>{
        // xác thực token người đăng nhập
        const token = req.headers.token;
        if (token) {
          const accessToken = token.split(" ")[1];
          jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
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
    verifyTokenAndAdminAuth : (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user._id === req.params.id|| req.user.admin) {
                next();
            } else {
                res.status(403).json("Bạn không xóa được!");
            }
        });
    }
}
module.exports = middlewareController
 