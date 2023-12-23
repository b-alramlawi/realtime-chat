// GroupConversationPage.js

import React, {useState, useEffect} from 'react';
import './GroupConversationStyle.css';
import SearchBar from '../../components/search-bar/SearchBar';
import GroupConversationItem from "../../components/Items/group-item/GroupItem";

const GroupConversationPage = ({onGroupConversationClick}) => {
    const [groupConversations, setGroupConversations] = useState([]);
    const [selectedGroupConversation, setSelectedGroupConversation] = useState(null);
    const [groupSearchTerm, setGroupSearchTerm] = useState('');

    useEffect(() => {
        const fetchGroupConversations = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:5000/chat/api/user/${userId}/groups`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log("GroupConversations Data Response", data);
                setGroupConversations(data.data);
            } catch (error) {
                console.error('Error fetching group conversations', error);
            }
        };

        fetchGroupConversations();
    }, []);

    const handleGroupConversationClick = (groupConversation) => {
        setSelectedGroupConversation(groupConversation);
        onGroupConversationClick(groupConversation);
        console.log("Hello Log");
    };
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12 || 12;

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    };
    const renderGroupConversationItem = (groupConversation) => (
        <GroupConversationItem
            key={groupConversation._id}
            groupAvatar={groupConversation.groupImage ? groupConversation.groupImage : 'images/profileAvatar.png'}
            groupName={groupConversation.groupName}
            lastGroupMessage={groupConversation.lastMessage?.content || 'Initiate the discussion with the group.'}
            groupTime={formatTime(groupConversation.lastMessage?.timestamp) || '00:00'}
            onGroupClick={() => handleGroupConversationClick(groupConversation)}
        />
    );

    const filteredGroupConversations = groupConversations.filter((groupConversation) =>
        groupConversation.groupName.toLowerCase().includes(groupSearchTerm.toLowerCase())
    );

    return (
        <div className="group-conversation-page-container">
            <div className="group-conversation-header-section">
                <h2>Group Chat Page</h2>
            </div>
            <SearchBar
                placeholder="Search or start a new group chat..."
                type="text"
                onChange={(e) => setGroupSearchTerm(e.target.value)}
            />
            <div className="group-conversation-list-section">
                <ul className="group-conversation-list-group">
                    {filteredGroupConversations.map((groupConversation) => renderGroupConversationItem(groupConversation))}
                </ul>
            </div>
        </div>
    );
};

export default GroupConversationPage;
