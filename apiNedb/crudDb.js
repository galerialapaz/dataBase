const Datastore = require('nedb');
db = {};
db.usuarios = new Datastore({filename:'./data/usuarios.dat', autoload: true});

db.articulos = new Datastore({filename:'./data/articulos.dat', autoload: true});
db.movimientos = new Datastore({filename:'./data/movimientos.dat', autoload: true});

function createdDB(dat,col){ ///CREATED--no puede rescribir el registro 
  return new Promise((resolve,reject)=>{
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    dat["_id"]=dat["id"]; delete dat["coleccion"]
    colDB.insert(dat,(err,rc)=>{ if(rc){resolve(true)}else{resolve(false)} }) 
  })
}
function readAllDB(col){///READ
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    colDB.find({},(err,rc)=>{ colDB.count({},(err,cn)=>{ resolve({"record":rc,"count":cn}) }) }) 
  })
}
function readIdDB(id,col){///READ ID
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    colDB.find({_id:id},(err,rec)=>{ resolve(rec) }); 
  })
}
function readIdsDB(col){///READ IDS
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    colDB.find({},(err, rec)=>{
      let ids = []; 
      for (let i=0; i<rec.length; i++){ ids.push(rec[i]["id"]) }; 
      resolve(ids)
    });
  })
}
function readTimeDB(t,col){/*timeStamp mayores*/
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    colDB.find({ "timeStamp":{$gt:t} },(err,rc)=>{ colDB.count({},(err,cn)=>{ resolve({"record":rc,"count":cn}) }) }) 
  })
}
function readTimeTimeDB(dat,col){/*fecha(numerico) intervalo*/
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    let fecha1 = dat["fecha1"];let fecha2 = dat["fecha2"]
    colDB.find({$and:[{"fecha":{$gte:fecha1}},{"fecha":{$lte:fecha2}}]},(err,rc)=>{ colDB.count({},(err,cn)=>{ resolve({"record":rc,"count":cn}) }) })
  })
}
function readUserDB(us){/*read user*/
  return new Promise(function(resolve,reject){
    let colDB = db.usuarios
    colDB.find({"user":us},(err,rec)=>{ resolve(rec) }) 
  })
}
function readTimeTimeUserDB(dat,col){/*fecha(numerico) intervalo y usuario*/
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    let fecha1=dat["fecha1"]; let fecha2=dat["fecha2"];let user=dat["user"];
    colDB.find({$and:[{"fecha":{$gt:fecha1}},{"fecha":{$lt:fecha2}},{"user":user} ]},(err,rc)=>{ resolve({"record":rc}) });
  })
}
function readTimeUserDB(dat,col){/*fecha(numerico) mayores y usuario*/
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    let user = dat["cel"]; let tim = dat["time"]
    colDB.find({$and:[{"fecha":{$gt:tim}},{"user":user} ]},(err,rc)=>{ resolve({rc}) })
  })
}
function updateDB(id,dat,col){///UPDATE
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    delete dat["coleccion"] 
    colDB.update({ _id:id},{$set:dat},{},(err,n)=>{ if(n==1){resolve(true)}else{resolve(false)} }) 
  })
}
function deleteDB(id,col){///DELETE
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    colDB.remove({_id:id},{},(err,r)=>{ if(r==1){resolve(true)}else{resolve(false)} }) 
  })
};

function countDB(col){
  return new Promise(function(resolve,reject){
    let colDB
    for (const key in db) {
      if(key==col){ colDB = db[key]; continue;}
    }
    colDB.count({},(err,count)=>{resolve(count)}) 
  })
}

module.exports = {
  createdDB,
  readAllDB,
  readTimeDB,
  readTimeUserDB,
  readTimeTimeDB,
  readTimeTimeUserDB,
  readIdDB,
  readUserDB,
  updateDB,
  deleteDB,
  readIdsDB,
  countDB,
}
