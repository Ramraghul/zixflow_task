import { Request, Response } from 'express';
import UserContact from '../model/contact.model';
import { v4 as uuidv4 } from 'uuid';
import { addNumbers } from './sum';


const contactController = {
    //Create New Contact
    async createNewContact(req: Request, res: Response) {
        try {
            const { email, phone } = req.validBody;

            //Email and Phone Number Validation (If Exist);
            const existingContact = await UserContact.findOne({ email, phone });

            if (existingContact) {
                return res.status(403).json({//403 Already Exist;
                    status: false,
                    message: 'Contact with the same email and phone already exists.'
                });
            } else {
                const id = uuidv4();
                const inData: object = req.validBody;
                const contactData = { ...inData, id };
                await UserContact.create(contactData);
                return res.status(201).json({//201 Successfully Created
                    status: true,
                    message: 'New Contact Created Successfully',
                });
            }
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    },

    //Get All Contact List
    async getContactList(req: Request, res: Response) {
        try {

            const contactList = await UserContact.find();

            if (contactList.length <= 0) {
                return res.status(404).json({//404 No Data Founded;
                    status: false,
                    message: 'No Contact Details Founded'
                });
            } else {
                return res.status(200).json({//200 Successfully Data Fetched
                    status: true,
                    message: 'Successfully Data Fetched',
                    data: contactList
                });
            }
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    },

    //Get Contact By Id
    async getContactById(req: Request, res: Response) {
        try {
            const { id }: { id?: string } = req.params;

            if (!id) {
                return res.status(204).json({//204 No Data Found;
                    status: false,
                    message: "Give The Valid Contact Id"
                })
            }

            const contactDetails = await UserContact.findOne({ id: id });

            if (!contactDetails) {
                return res.status(404).json({//404 No Data Found;
                    status: false,
                    message: "Contact not found"
                })
            } else {
                return res.status(200).json({//200 Successfully Data Found;
                    status: true,
                    message: "Data Found",
                    data: contactDetails
                });
            }
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    },

    //Update Contact By Id
    async updateContactById(req: Request, res: Response) {
        try {
            const { id }: { id?: string } = req.params;
            const updateData = req.validBody
            
            //Params Id Validation
            if (!id) {
                return res.status(204).json({//204 No Data Found;
                    status: false,
                    message: "Give The Valid Contact Id"
                })
            } else {
                const contactDetails = await UserContact.findOne({ id: id });
                //Contact data Validation
                if (!contactDetails) {
                    return res.status(404).json({//404 No Data Found;
                        status: false,
                        message: "Contact not found"
                    })
                } else {
                    //Update Data Into Database
                    let result = await UserContact.findOneAndUpdate({ id: id }, updateData);
                    if (result) {
                        return res.status(202).json({//202 Successfully Updated
                            status: true,
                            message: 'Contact Successfully Updated',
                        });
                    } else {
                        return res.status(409).json({//409 Failed in Update (Conflict)
                            status: false,
                            message: 'Failed in Update',
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: (error as Error).message });
        }
    },

    //Delete Contact By Id
    async deleteContactById(req: Request, res: Response) {
        try {
            const { id }: { id?: string } = req.params;
            if (!id) {
                return res.status(204).json({//204 No Data Found;
                    status: false,
                    message: "Give The Valid Contact Id"
                })
            }

            const contactDetails = await UserContact.findOneAndDelete({ id: id });

            if (!contactDetails) {
                return res.status(404).json({//404 No Data Found;
                    status: false,
                    message: "Contact not found"
                })
            } else {
                return res.status(202).json({//202 Successfully Data Deleted;
                    status: true,
                    message: "Contact Delete Successfully",
                });
            }
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    },

    //Delete List
    async deleteContactList(req: Request, res: Response) {
        try {
            const { listId } = req.validBody;

            for (const id of listId) {
                const contactDetails = await UserContact.findOneAndDelete({ id: id });

                if (!contactDetails) {
                    return res.status(404).json({
                        status: false,
                        message: "Contact not found"
                    });
                }
            }

            return res.status(202).json({
                status: true,
                message: "Contacts deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    },


};



export default contactController;
