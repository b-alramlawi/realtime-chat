// SelectContactPage.js

import React, {useState, useEffect} from 'react';
import './SelectContactStyle.css';
import SelectContact from "../../components/Items/select-contact-item/SelectContact";
import SearchBar from "../../components/search-bar/SearchBar";
import axios from 'axios';

const SelectContactPage = ({onGroupClick}) => {
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:5000/chat/api/get-all-contacts/${userId}`, {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
                setContacts(response.data.data);
            } catch (error) {
                console.error('Error fetching contacts', error);
            }
        };

        fetchContacts();
    }, []);


    const handleCheckboxChange = (contact, isChecked) => {
        if (isChecked) {
            setSelectedContacts([...selectedContacts, contact]);
        } else {
            setSelectedContacts(selectedContacts.filter(selectedContact => selectedContact !== contact));
        }
    };

    const handleNextClick = () => {
        onGroupClick(selectedContacts);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="select-contact-page-container">
            <div className="contact-header-section">
                <div>
                    <h2 className="contact-title">Select Contact Page</h2>
                    {selectedContacts.length > 0 && (
                        <p className="subtitle">{`Selected ${selectedContacts.length} contact(s).`}</p>
                    )}
                </div>
                <button className="circle-red-button" onClick={handleNextClick}>
                    <img src="/icons/arrow-right-white.svg" alt="Next" className="arrow-icon"/>
                </button>
            </div>

            <SearchBar
                placeholder="Search contacts..."
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="contact-list-section">
                <ul className="contact-list-group">
                    {filteredContacts.map(contact => (
                        <SelectContact
                            key={contact._id}
                            avatar={contact.profilePicture ? contact.profilePicture : 'images/profileAvatar.png'}
                            name={contact.name}
                            isSelected={selectedContacts.includes(contact)}
                            onCheckboxChange={(isChecked) => handleCheckboxChange(contact, isChecked)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default SelectContactPage;
