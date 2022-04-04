const multer = require('multer')

const storage = multer.diskStorage({

    destination:function(req,file,callback){
      callback(null,'./src/public/images')
    },
    filename:function(req,file,callback){
      callback(null,Date.now()+file.originalname)
    }
  })
  
  const upload = multer({
    storage:storage,
    limits:{
      fileSize:1024*1024*3
    }
  })

  module.exports= upload