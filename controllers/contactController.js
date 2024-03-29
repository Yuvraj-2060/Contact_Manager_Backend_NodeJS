const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@routes GET/api/contacts
//@access public

const getContacts= asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create new contacts
//@routes POST/api/contacts
//@access public

const createContact= asyncHandler(async (req, res) => {
    console.log(req.body);

    const {name, email, phone } = req.body;
    if( !name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields Are Mandatory");
    }
    else{
        const contact = await Contact.create({
            name, email, phone,
        });
        res.status(201).json(contact);
    }
});

//@desc Get contacts
//@routes GET/api/contacts/id
//@access public

const getContact= asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

//@desc Update new contacts
//@routes PUT/api/contacts/id
//@access public

const updateContact= asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
        return;
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );
    res.status(200).json({ message: "Contact Updated successfully",updatedContact:contact});
});


//@desc Delete new contacts
//@routes DELETE/api/contacts/id
//@access public

const deleteContact= asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await contact.deleteOne(); // Remove the found contact, not the entire Contact model
    res.status(200).json({ message: "Contact deleted successfully", deletedContact: contact });
});




module.exports ={ getContacts,createContact,getContact,updateContact,deleteContact };