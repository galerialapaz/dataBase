const {createdDB,updateDB,readIdDB,deleteDB} = require('../apiNedb/crudDb.js');
const {proformaRegister,proformaUpdate,proformaDelete} = require('./articulos');

async function createdMovimiento(req, resp){
  await createdDB(req.body,"movimientos")
  await proformaRegister(req.body)
  resp.send({"msg":"success"})
};

async function updateMovimiento(req, resp){
  await updateDB(req.body["id"],req.body,"movimientos")
  let rec = await readIdDB(req.body["id"],"movimientos")
  await proformaUpdate(rec[0]["proforma"],req.body["proforma"])
  resp.send({"msg":"success"})
};

function deleteMovimiento(req, resp){
  deleteDB(req.body["id"]).then((r)=>{
    if(r){ proformaDelete(rec[0]["proforma"]).then(()=>{ resp.send({msg:"success"}) }) }else{ resp.send({msg:"fail"}) }
  })
};
module.exports = {
  createdMovimiento,
  updateMovimiento,
  deleteMovimiento
}