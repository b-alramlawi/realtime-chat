// ContactPage.js

import React, {useState, useEffect} from 'react';
import './ContactStyle.css';
import ContactItem from "../../components/Items/contact-item/ContactItem";
import SearchBar from "../../components/search-bar/SearchBar";
import axios from 'axios';

const ContactPage = ({onContactClick, onGroupPageOpen}) => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
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

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        onContactClick(contact);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phoneNumber.includes(searchTerm)
    );

    const handleCreateGroupClick = () => {
        // Add your logic for creating a group or navigating to the group creation page
        console.log('Create Group clicked!');
        // Instead of logging, call the function to open the SelectContactPage
        onGroupPageOpen();
    };


    return (
        <div className="contact-page-container">
            <div className="contact-header-section">
                <h2>Contact Page</h2>
            </div>
            <SearchBar
                placeholder="Search name or number..."
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="create-group-section" onClick={() => handleCreateGroupClick()}>
                <div className="group-icon-container">
                    <img src='/icons/group-white.svg' alt="Create Group" className="group-icon"/>
                </div>
                <span className="create-group-text">Create Group</span>
            </div>

            <div className="contact-list-section">
                <ul className="contact-list-group">
                    {filteredContacts.map(contact => (
                        <ContactItem
                            key={contact._id}
                            avatar={contact.profilePicture ? contact.profilePicture : 'images/profileAvatar.png'}
                            name={contact.name}
                            status={contact.status}
                            onClick={() => handleContactClick(contact)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ContactPage;
