// ConversationPage.js

import React, {useState, useEffect} from 'react';
import './ConversationStyle.css';
import SearchBar from "../../components/search-bar/SearchBar";
import ConversationItem from '../../components/Items/conversation-item/ConversationItem';
import axios from 'axios';

const ConversationPage = ({onConversationClick}) => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:5000/chat/api/conversations/${userId}`, {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
                setConversations(response.data.data);
                console.log("Data Response", response.data.data);
            } catch (error) {
                console.error('Error fetching conversations', error);
            }
        };

        fetchConversations();
    }, []);

    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
        onConversationClick(conversation);
    };


    const renderConversationItem = (conversation) => {
        const currentUserID = localStorage.getItem('userId');

        const participants = conversation.participants.map(participant => participant.userData);

        const currentUserIndex = participants.findIndex(user => user._id === currentUserID);

        if (currentUserIndex !== -1) {
            const otherUserIndex = currentUserIndex === 0 ? 1 : 0;

            const otherParticipant = participants[otherUserIndex];

            const lastMessage = conversation.lastMessage;
            const lastMessageContent = lastMessage.content;
            const lastMessageTimestamp = lastMessage.timestamp;

            return (
                <ConversationItem
                    key={conversation._id}
                    avatar={otherParticipant.profilePicture ? otherParticipant.profilePicture : 'images/profileAvatar.png'}
                    name={otherParticipant.name}
                    message={lastMessageContent}
                    time={formatTime(lastMessageTimestamp)}
                    onClick={() => handleConversationClick(conversation)}
                />
            );
        }

        return null;
    };

    const filteredConversations = conversations.filter((conversation) =>
        conversation.participants.some((participant) =>
            participant.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            participant.userData.phoneNumber.includes(searchTerm)
        )
    );

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12 || 12;

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    };


    return (
        <div className="conversation-page-container">
            <div className="conversation-header-section">
                <h2>Chat Page</h2>
            </div>
            <SearchBar
                placeholder="Search or start a new chat..."
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="conversation-list-section">
                <ul className="conversation-list-group">
                    {filteredConversations.map((conversation) => renderConversationItem(conversation))}
                </ul>
            </div>
        </div>
    );
};

export default ConversationPage;
