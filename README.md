# Zixflow

This MERN Task For Zixflow

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Ramraghul/zixflow_task.git
    ```

2. Navigate to the server directory:
    ```bash
    cd ./server
    ```

3. Install server dependencies:
    ```bash
    yarn install
    ```

4. Navigate to the client directory:
    ```bash
    cd ../client
    ```

5. Install client dependencies:
    ```bash
    yarn install
    ```

## Usage (Local)

1. Start the server:
    ```bash
    cd ../server
    yarn start or nodemon
    ```

2. Start the client:
    ```bash
    cd ../client
    yarn start
    ```

3. Access the client application at `http://localhost:3001`.
4. Access the server application at `http://localhost:8080`.

## Usage (Live)

1. Access the client application at `https://zixflow-client.vercel.app`.
2. Access the server application at `https://zixflow-task.vercel.app`.

## API Detail

### Get All Contacts
- Endpoint: `http://localhost:8080/contact/getContactsList` or  `https://zixflow-task.vercel.app/contact/getContactsList`
- Method: Get
- Description: This endpoint is used for Get all Contacts.
- Request Body: JSON
    ```json
    [
    {
    "firstName": "John",
    "lastName": "Doe",
    "gender": "MALE",
    "address": {
    "line1": "123 Main Street",
    "line2": "",
    "city": "New York",
    "country": "USA",
    "zipCode": "10001"
  },
    "email": "gust@gust.com",
    "phone": "1234567890",
    "other": "Some additional information"
    }
    ]
    ```

### Create New Contact
- Endpoint: `http://localhost:8080/contact/createContact` or  `https://zixflow-task.vercel.app/contact/createContact`
- Method: POST
- Description: This endpoint is used to create a new Contact.
- Request Body: JSON
    ```json
    {
    "firstName": "John",
    "lastName": "Doe",
    "gender": "MALE",
    "address": {
    "line1": "123 Main Street",
    "line2": "",
    "city": "New York",
    "country": "USA",
    "zipCode": "10001"
  },
    "email": "gust@gust.com",
    "phone": "1234567890",
    "other": "Some additional information"
    }
    ```

### Update Contact By ID
- Endpoint: `http://localhost:8080/contact/updateContactById/:id` or  `https://zixflow-task.vercel.app/contact/updateContactById/:id`
- Method: PUT
- Description: This endpoint is used to update a Contact by its ID.
- Request Body: JSON
    ```json
    {
        "firstName": "Elon"
    }
    ```

### Delete Contact By ID
- Endpoint: `http://localhost:8080/contact/deleteContactById/:id` or  `https://zixflow-task.vercel.app/contact/deleteContactById/:id`
- Method: DELETE
- Description: This endpoint is used to delete a Contact by its ID.

### Delete Contact's By ID's (Multiple)
- Endpoint: `http://localhost:8080/contact/deleteContactList` or  `https://zixflow-task.vercel.app/contact/deleteContactList`
- Method: DELETE
- Description: This endpoint is used to delete multiple Contact's same time.
-  Request Body: JSON
    ```json
    {
        "listId" :["79e689b5-af51-40a0-822f-630532029c74","2918e7b4-4ca1-4ad8-a6c8-c26efa669473"]
    }
    ```

## Contact

For any inquiries or feedback, please contact [Raghul](mailto:raghulraghul111@gmail.com).
