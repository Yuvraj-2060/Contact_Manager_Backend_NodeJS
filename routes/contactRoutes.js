const express = require("express")
const {getContacts,createContact,getContact,updateContact,deleteContact} = require("../controllers/contactController.js");
const validateToken = require("../middleware/validateTokenHandler.js");
//const {route} = require("express/lib/application")
const router = express.Router();


router.use(validateToken);
router.route("/").get( getContacts).post(createContact);
//   OR you can make separate call. just like below
// router.post("/", createContact);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);


module.exports = router;