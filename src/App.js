import React from "react";
import { useState } from "react";
import './App.css';
let id=1;
function App() 
{
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [contacts, setContacts] = useState([]);
    const [editMode, setEditMode] = useState({});
    const submit = () => {
      if(editMode.id)
      {
        handleEdit()
      }
      else
      {
        handleAdd()
      }
  }

  const handleAdd = () => {
    
      const data = {
        id: id,
        name : name,
        phoneNumber: number
      }
      setContacts([...contacts,data])
      setName('')
      setNumber('')
      id++    
  }
  const handleEdit = () => {
    let index = -1;
    for(let i=0;i<contacts.length;i++)
    {
      if(editMode.id === contacts[i].id){
        index = i
        break;
      }
    }
    contacts[index].name = name;
    contacts[index].phoneNumber = number;
    setEditMode({})
    setName('')
    setNumber('')
  } 
  const editContact = (e) => {
    const contactId = parseInt(e.target.id);
    let contact = {}
    for(let i=0;i<contacts.length;i++)
    {
      if(contactId === contacts[i].id){
        contact = contacts[i]
        break;
      }
    }
    setName(contact.name)
    setNumber(contact.phoneNumber)
    setEditMode({id:contactId})
  }

  const deleteContact = (e) => {
    const contactId = parseInt(e.target.id);
    let newContacts = []
    for(let i=0;i<contacts.length;i++)
    { 
      if(contactId!== contacts[i].id){
        newContacts.push(contacts[i])  
      }
    }
    setContacts(newContacts)
  }

  const cancel = (e) => {
    setName('')
    setNumber('')
    setEditMode({})
  }
  const ContactList = () => {
    return(
      
    <div className='output'>
      <h2>Contacts</h2>
       <div className='OutputSection'>
         
        
          { contacts.map((val) =>{
               return (
                <div>
                  <span>
                    <button className="edit-btn" id={val.id} onClick={editContact}>Edit</button>
                    <button className="delete-btn" id={val.id} onClick={deleteContact}>Delete</button>
                  </span>
                  { val.name } - { val.phoneNumber }
                </div>
               )
            })}
      </div>
    </div>
    )
  }
  return(
    <div id='DataConatiner' style={{display: 'flex'}}>
        <div className='InputFields'>
        <h2>Add Contacts</h2>
        <div>
          <div className="inputData">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              placeholder='Name'
              required={true}
              onChange={(e)=>{setName(e.target.value);}}
            />
          </div>
          
          <div className="inputData">
            <label htmlFor="contact-number">Contact Number</label>
            <input
              type="text"
              value={number}
              placeholder="Contact Number"
              required={true}
              onChange={(e) => {setNumber(e.target.value);}}
            />
          </div>
          <button className='submit-btn' onClick={submit}>Submit</button>
          <button className='cancel-btn' style={{visibility: editMode.id?'visible':'hidden'}} onClick={cancel}>CANCEL</button>
        </div>
      </div>
      
      <div className='separator'></div>
      <ContactList />
    </div>
    
  );
}
export default App;



