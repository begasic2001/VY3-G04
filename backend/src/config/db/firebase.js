
const admin = require("firebase-admin");

const serviceAccount = require("./firebase-key.json");

const BUCKET ="airport-tranfer.appspot.com" 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket : BUCKET,
});

const bucket = admin.storage().bucket();


const uploadImage = (req,res,next) =>{
  if(!req.file) 
  return next();
  const hinh_anh = req.file;
  const ten_hinh = Date.now() + "." + hinh_anh.originalname.split(".").pop()
  const file = bucket.file(ten_hinh)
  const stream = file.createWriteStream({
    metadata:{
      contentType : hinh_anh.mimetype,
    }
  })

  stream.on("error",(e)=>{
    console.error(e)
  })
  stream.on("finish",async () =>{
    await file.makePublic();
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${ten_hinh}`;
  
    next();
  
  })
  stream.end(hinh_anh.buffer);
}
module.exports = uploadImage