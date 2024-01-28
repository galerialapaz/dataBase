var express = require('express');
var router = express.Router();
const midFun = require("../middleware/middleware")
const crudFun = require("../controllers/crud");
const logFun = require('../controllers/login');
const useFun = require("../controllers/usuarios");
const admFun = require('../controllers/datSistem');
const movFun = require('../controllers/movimientos');
const artFun = require('../controllers/articulos');

router.post("/created",midFun.verifyLog,crudFun.created);//creasted
router.post("/readAll",midFun.verifyLog,crudFun.readAll);//read
router.post('/readTime',midFun.verifyLog,crudFun.readTime);
router.post('/readTimeUser',midFun.verifyLog,crudFun.readTimeUser);
router.post('/readTimeTime',midFun.verifyLog,crudFun.readTimeTime);
router.post('/readTimeTimeUser',midFun.verifyLog,crudFun.readTimeTimeUser);
router.post("/readId",midFun.verifyLog,crudFun.readId);
router.post('/readUser',midFun.verifyLog,crudFun.readUser);
router.post('/update',midFun.verifyLog,crudFun.update);//update
router.post('/delet',midFun.verifyLog,crudFun.delet);//delete
router.post("/readIds",midFun.verifyLog,crudFun.readIds);
router.post("/count",midFun.verifyLog,crudFun.count);

router.post("/createdMovimiento",midFun.verifyLog,movFun.createdMovimiento);
router.post("/updateMovimiento",midFun.verifyLog, movFun.updateMovimiento);
router.post("/deleteMovimiento",midFun.verifyLog,movFun.deleteMovimiento);

router.post("/itemCantMenos",midFun.verifyLog,artFun.itemCantMenos);
router.post("/itemCantMas",midFun.verifyLog,artFun.itemCantMas);

router.post('/login',[],logFun.login);
router.post('/updatePassword',midFun.verifyLog,logFun.updatePassword);

router.post("/createdAdminInit",[],useFun.createdAdminInit);
router.post("/createdUse",midFun.verifyLog,useFun.createdUse);

router.post("/sizeDB",midFun.verifyLog, admFun.sizeDB);
router.post("/sizeDisk",midFun.verifyLog, admFun.sizeDisk);
router.post("/clearDisk",midFun.verifyLog, admFun.clearDisk);

module.exports = router;
