import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";



const App = () => {
const [contacts, setContacts] = useState(data);
const [addFormData, setAddFormData] = useState({
nume: "",
prenume: "",
perioade: "",
telefon: "",
mail: "",
});



const [editFormData, setEditFormData] = useState({
  nume: "",
  prenume: "",
  perioade: "",
  telefon: "",
  mail: "",
});



const [editContactId, setEditContactId] = useState(null);



const handleAddFormChange = (event) => {
event.preventDefault();



const fieldName = event.target.getAttribute("name");
const fieldValue = event.target.value;



const newFormData = { ...addFormData };
newFormData[fieldName] = fieldValue;



setAddFormData(newFormData);
};



const handleEditFormChange = (event) => {
event.preventDefault();



const fieldName = event.target.getAttribute("name");
const fieldValue = event.target.value;



const newFormData = { ...editFormData };
newFormData[fieldName] = fieldValue;



setEditFormData(newFormData);
};



const handleAddFormSubmit = (event) => {
event.preventDefault();



const newContact = {
id: nanoid(),
nume: addFormData.nume,
prenume: addFormData.prenume,
perioade: addFormData.perioade,
telefon: addFormData.telefon,
mail: addFormData.mail,
};



const newContacts = [...contacts, newContact];
setContacts(newContacts);
};



const handleEditFormSubmit = (event) => {
event.preventDefault();



const editedContact = {
id: editContactId,
nume: editFormData.nume,
prenume: editFormData.prenume,
perioade: editFormData.perioade,
telefon: editFormData.telefon,
mail: editFormData.mail,
};



const newContacts = [...contacts];



const index = contacts.findIndex((contact) => contact.id === editContactId);



newContacts[index] = editedContact;



setContacts(newContacts);
setEditContactId(null);
};



const handleEditClick = (event, contact) => {
event.preventDefault();
setEditContactId(contact.id);



const formValues = {
nume: contact.nume,
prenume: contact.prenume,
perioade: contact.perioade,
telefon: contact.telefon,
mail: contact.mail,
};



setEditFormData(formValues);
};



const handleCancelClick = () => {
setEditContactId(null);
};



const handleDeleteClick = (contactId) => {
const newContacts = [...contacts];



const index = contacts.findIndex((contact) => contact.id === contactId);



newContacts.splice(index, 1);



setContacts(newContacts);
};



return (
<div className="app-container">
<form onSubmit={handleEditFormSubmit}>
<table>
<thead>
<tr>
<th>Nume</th>
<th>Prenume</th>
<th>Perioade active</th>
<th>Telefon</th>
<th>Mail institutional</th>
</tr>
</thead>
<tbody>
{contacts.map((contact) => (
<Fragment>
{editContactId === contact.id ? (
<EditableRow
editFormData={editFormData}
handleEditFormChange={handleEditFormChange}
handleCancelClick={handleCancelClick}
/>
) : (
<ReadOnlyRow
contact={contact}
handleEditClick={handleEditClick}
handleDeleteClick={handleDeleteClick}
/>
)}
</Fragment>
))}
</tbody>
</table>
</form>



<h2>Add a Contact</h2>
<form onSubmit={handleAddFormSubmit}>
<input
type="text"
name="nume"
required="required"
placeholder="Introduce un nume..."
onChange={handleAddFormChange}
/>
<input
type="text"
name="prenume"
required="required"
placeholder="Introduce un prenume..."
onChange={handleAddFormChange}
/>
<input
type="text"
name="perioade"
required="required"
placeholder="Perioade active..."
onChange={handleAddFormChange}
/>
<input
type="text"
name="telefon"
required="required"
placeholder="Numar de telefon..."
onChange={handleAddFormChange}
/>
<input
type="email"
name="mail"
required="required"
placeholder="Email..."
onChange={handleAddFormChange}
/>
<button type="submit">Add</button>
</form>
</div>
);
};



export default App;