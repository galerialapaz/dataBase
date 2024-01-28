const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utilidades/config');

function passwordCript(password){
  return new Promise(function(resolve,reject){
    bcrypt.genSalt(10).then((salt)=>{
      bcrypt.hash(password, salt).then((paswCript)=>{
        resolve(paswCript)
      })
    })
  })
}
function bcryptCompare(password,paswCript){
  return new Promise(function(resolve,reject){
    bcrypt.compare(password,paswCript,(err,rsl)=>{
      resolve(rsl)
    });
  })
}
function jwtVerify(token){
  return new Promise(function(resolve,reject){
    jwt.verify(token,"2149208",(err,dec)=>{ //config.SECRET -> "2149208"
      resolve(dec) 
    });
  })
}
function jwtSign(dat){
  return new Promise(function(resolve,reject){
    jwt.sign(dat,"2149208",{expiresIn:'300d'},(err,token)=>{ //config.SECRET -> "2149208"
      resolve(token)
    });
  })
}

module.exports = {
  passwordCript,
  bcryptCompare,
  jwtVerify,
  jwtSign
}
