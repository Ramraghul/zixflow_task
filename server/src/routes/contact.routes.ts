import express from "express";
const route = express.Router();
import contactController from "../controller/contact.controller";
import validation from "../validation/index.validation";
import { validateCreateContact, validateAddTwoNumber, validateDeleteList, validateUpdateContact } from "../validation/contact.validations";
import { addTwoNumbers } from "../controller/sum";

//Create New Contact
route.post("/createContact", validation(validateCreateContact), contactController.createNewContact)

//GetList
route.get('/getContactsList', contactController.getContactList);

//getById
route.get('/getContactById/:id', contactController.getContactById);

//Update
route.put('/updateContactById/:id', validation(validateUpdateContact), contactController.updateContactById)

//delete
route.delete('/deleteContactById/:id', contactController.deleteContactById);

//delete List
route.delete('/deleteContactList', validation(validateDeleteList), contactController.deleteContactList);

//add 2 number 
route.post('/addTwoNumber', validation(validateAddTwoNumber), addTwoNumbers)


export default route;
