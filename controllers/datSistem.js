const {LocalStorage} = require("node-localstorage");
const localStorage = new LocalStorage('./localStorage');
const fs = require('fs');
const {countDB,nichosProceso} = require('../apiNedb/crudDb.js');
const {diskSize,diskClear} = require("../utilidades/disco.js")

function readNumNota(req, resp){
  let numNota = localStorage.getItem('numNota')
  resp.send(numNota)
};
function writeNumNota(req, resp){
  let numNota = req.body["numNota"]
  localStorage.setItem('numNota', parseInt(numNota))
  resp.send("write")
};
const readFile = (path) =>
new Promise((resolve, reject) => {
  fs.stat("./data/"+path, (error, stats) => {
    if(error){ console.log(error); }
    else { resolve(stats.size) }
  });
})

async function sizeDB(req,rsp){
  let cNic = await countDB("nichos")
  let cUse = await countDB("usuarios") 
  let nic = await readFile("nichos.dat")
  let use = await readFile("usuarios.dat")
  rsp.send({use,nic,cNic,cUse})
}
async function sizeDisk(req, resp){
  let disk = await diskSize()
  resp.send(disk)
};
async function clearDisk(req,resp){
  await diskClear()
  resp.send({msg:"success"})
};
async function numNichosProceso(req,resp){
  let dat = await nichosProceso()
  resp.send(dat)
};
module.exports = {
  sizeDB,
  readNumNota,
  writeNumNota,
  sizeDisk,
  clearDisk,

  numNichosProceso
}