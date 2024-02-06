const {createdDB,readAllDB,readTimeDB,readTimeUserDB,readTimeTimeDB,readTimeTimeUserDB,readIdDB,readUserDB,updateDB,deleteDB,readIdsDB,countDB} = require('../apiNedb/crudDb.js');

async function created(req,rsp){
  createdDB(req.body,req.body["coleccion"]).then((r)=>{ if(r){rsp.send({msg:"success"})}else{rsp.send({msg:"fail"})} } )
};
function readAll(req,rsp){
  readAllDB(req.body["coleccion"]).then((dat)=>{ rsp.send(dat) })
};
function readTime(req, resp) {
  readTimeDB(req.body["timeStamp"],req.body["coleccion"]).then((dat)=>{ resp.send(dat) })
};

function readUser(req,rsp){/// "user"
  readUserDB(req.body["user"],req.body["coleccion"]).then((dat)=>{ rsp.send(dat) })
}
function readTimeUser(req,rsp){/// "fecha" "user"
  readTimeUserDB(req.body,req.body["coleccion"]).then((dat)=>{ rsp.send(dat) })
};
function readTimeTime(req,resp) {/// "fecha" "fecha"
  readTimeTimeDB(req.body,req.body["coleccion"]).then((dat)=>{ resp.send(dat) })
};
function readTimeTimeUser(req,resp){///"fecha"  "fecha" "user"
  readTimeTimeUserDB(req.body,req.body["coleccion"]).then((dat)=>{ resp.send(dat) })
};

function readId(req,rsp){
  readIdDB(req.body["id"],req.body["coleccion"]).then((dat)=>{ rsp.send(dat) })
};
function update(req,rsp){
  updateDB(req.body["id"],req.body,req.body["coleccion"]).then((r)=>{ if(r){rsp.send({msg:"success"})}else{rsp.send({msg:"fail"})} })
};
function delet(req,rsp){
  deleteDB(req.body["id"],req.body["coleccion"]).then((r)=>{ if(r){rsp.send({msg:"success"})}else{rsp.send({msg:"fail"})} })
};
function readIds(req, rsp){
  readIdsDB(req.body["coleccion"]).then((dat)=>{ rsp.send(dat) })
};

function count(req,rsp){
  countDB(req.body["coleccion"]).then((dat)=>{ rsp.send(dat) })
};
module.exports = {
  created,
  readAll,
  readTime,
  readTimeUser,
  readTimeTime,
  readTimeTimeUser,
  readId,
  readUser,
  update,
  delet,
  readIds,
  count
}
