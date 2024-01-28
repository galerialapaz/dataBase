const {jwtVerify} = require("../cryptJwt/cryptJwt");

function verifyLog(req,res,next) {
  /** 
  const token = req.headers["x-access-token"];
  if(!token) { return res.send({msg:"fail"}) }
  jwtVerify(token).then((rs)=>{
    if(rs.id==undefined){ return res.send({msg:"fail"}) }else{ return next() }
  })
  */
  return next()
}


module.exports = { 
  verifyLog,

}