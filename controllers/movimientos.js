const {createdDB,updateDB,readIdDB,deleteDB} = require('../apiNedb/crudDb.js');
const {proformaRegister,proformaUpdate,proformaDelete} = require('./articulos');

async function createdMovimiento(req, resp){
  await createdDB(req.body,"movimientos")
  await proformaRegister(req.body)
  resp.send({msg:"success"})
};

async function updateMovimiento(req, resp){
  //////EDITANDO PROFORMA//////
  let rec = await readIdDB(req.body["id"],"movimientos")
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
  let tim = req.body["timeStamp"]
  let ori = req.body["origen"]
  let des = req.body["destino"]
  for (const key in InvAjus) {
    let id = InvAjus[key]["id"];
    let cant = InvAjus[key]["cant"];
    let ajuste = {"timeStamp":tim}
    let difOri = "" 
    let difDes = "" 
    let r = await readIdDB(id,"articulos")
    if(r[0][ori]){difOri = r[0][ori] - cant; ajuste[ori] = difOri}
    if(r[0][des]){difDes = r[0][des] + cant; ajuste[des] = difDes}
    await updateDB(id,ajuste,"articulos")
    console.log("upCant")
  }
  //////EDITANDO PROFORMA//////
  await updateDB(req.body["id"],req.body,"movimientos")
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