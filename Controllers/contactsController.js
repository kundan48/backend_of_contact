const Contact = require("../Models/contactModels");


const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving contacts", error: error.message });
    }
};



const createContact = async(req, res) => {
    console.log(req.body);
    const{name, age, mob, email} = req.body;
    if(!name || !age || !mob || !email){
        res.status(400);
        throw new Error("all field are mendetory");
    }
    const contact = await Contact.create({
        name,
        age,
        mob,
        email
    });
    res.status(201).json(contact);
};

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving contact", error: error.message });
    }
};



const updateContact = async(req, res) => {
    const { name, age, mob, email } = req.body;
   
    try {
        if (!name && !age && !mob && !email) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(400);
        throw new Error("contact not found");
        }
        if (name) contact.name = name;
        if (age) contact.age = age;
        if (mob) contact.mob = mob;
        if (email) contact.email = email;
        const updatedContact = await contact.save();
        res.status(200).json(updatedContact);

    } catch (error) {
        res.status(500).json({ message: "Error updating contact", error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        await contact.deleteOne();
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contact", error: error.message });
    }
};


module.exports = {
    getAllContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
};
