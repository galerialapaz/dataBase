const {createdDB,updateDB,readIdDB,deleteDB} = require('../apiNedb/crudDb.js');
const {proformaRegister,proformaUpdate,proformaDelete} = require('./articulos');

async function createdMovimiento(req, resp){
  await createdDB(req.body,"movimientos")
  await proformaRegister(req.body)
  resp.send({msg:"success"})
};

async function updateMovimiento(req, resp){
  await updateDB(req.body["id"],req.body,"movimientos")
  let rec = await readIdDB(req.body["id"],"movimientos")

  //////EDITANDO PROFORMA//////
  let carroAnt = rec[0]["proforma"]
  let carroNue = req.body["proforma"]
  var InvAjus = {}
  //for borrados o modificados//
  for (const key in carroAnt){
    const itemNue = carroNue[key];
    const itemAnt = carroAnt[key];
    if(itemNue == undefined){//borrados del carro
      InvAjus[key] = {id:key,cant:-itemAnt["cant"]} 
    }else{//modifico del carro
      InvAjus[key] = {id:key,cant: (itemNue["cant"]-itemAnt["cant"]) } 
    }  
  }
  //for nuevos//
  for (const key in carroNue) {
    if(carroAnt[key] == undefined){
      InvAjus[key] = {id:key,cant:carroNue[key]["cant"]}
    }
  }
  //////EDITANDO PROFORMA//////

  


  resp.send({"msg":"success"})
};

async function deleteMovimiento(req, resp){
  let rec = await readIdDB(req.body["id"],"movimientos")
  deleteDB(req.body["id"],"movimientos").then((r)=>{
    if(r){ 
      proformaDelete(rec[0]).then(()=>{ 
        resp.send({msg:"success"}) 
      }) 
    }else{ 
      resp.send({msg:"fail"}) 
    }
  })
};
module.exports = {
  createdMovimiento,
  updateMovimiento,
  deleteMovimiento
}