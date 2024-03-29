const express = require("express")
const {getContacts,createContact,getContact,updateContact,deleteContact} = require("../controllers/contactController.js")
//const {route} = require("express/lib/application")
const router = express.Router();

router.get("/", getContacts);

router.get("/:id", getContact);

router.post("/", createContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);


module.exports = router;