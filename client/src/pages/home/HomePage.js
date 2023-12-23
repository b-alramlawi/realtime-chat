// HomePage.js

import React, {useState} from 'react';
import './HomeStyle.css';
import Sidebar from "../../components/sidebar/Sidebar";
import ConversationPage from "../conversation/ConversationPage";
import ContactPage from "../contact/ContactPage";
import SettingsPage from "../settings/SettingsPage";
import Navbar from "../../components/navbar/Navbar";
import MessagePage from "../message/MessagePage";
import ProfilePage from "../profile/ProfilePage";
import WelcomePage from "../welcome/WelcomePage";
import SelectContactPage from "../select-contact/SelectContactPage";
import GroupProfilePage from "../group-profile/GroupProfilePage";
import GroupConversationPage from "../group-conversation/GroupConversationPage";
import GroupMessagePage from "../group-message/GroupMessagePage";

function HomePage() {
    const [currentPage, setCurrentPage] = useState('conversation');
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedGroupConversation, setSelectedGroupConversation] = useState(null);
    const [selectedNewGroup, setSelectedNewGroup] = useState([]);
    const [selectedSetting, setSelectedSetting] = useState(null);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSelectedConversation(null);
        setSelectedContact(null);
        setSelectedGroupConversation(null);
        setSelectedNewGroup([]);
        setSelectedSetting(null);
    };

    const handleConversationClick = (conversationId) => {
        setSelectedConversation(conversationId);
        setSelectedContact(null);
        setSelectedGroupConversation(null);
        setSelectedNewGroup([]);
        setSelectedSetting(null);
    };

    const handleContactClick = (contactId) => {
        setSelectedContact(contactId);
        setSelectedConversation(null);
        setSelectedGroupConversation(null);
        setSelectedNewGroup([]);
        setSelectedSetting(null);
    };

    const handleGroupConversationClick = (groupConversationId) => {
        setSelectedGroupConversation(groupConversationId);
        setSelectedConversation(null);
        setSelectedContact(null);
        setSelectedNewGroup([]);
        setSelectedSetting(null);
    };

    const handleNewGroupClick = (selectedGroups) => {
        setSelectedNewGroup(selectedGroups);
        setSelectedConversation(null);
        setSelectedContact(null);
        setSelectedGroupConversation(null);
        setSelectedSetting(null);
    };
    const handleGroupPageOpen = () => {
        handlePageChange('select-contact');
    };


    const handleSettingClick = (settingId) => {
        setSelectedSetting(settingId);
        setSelectedConversation(null);
        setSelectedContact(null);
        setSelectedGroupConversation(null);
        setSelectedNewGroup([]);
    };


    const getSelectedPage = () => {
        if (selectedConversation) {
            return <MessagePage contact={selectedConversation} isConversation={true}/>;
        } else if (selectedContact) {
            return <MessagePage contact={selectedContact} isConversation={false}/>;
        } else if (selectedGroupConversation) {
            return <GroupMessagePage group={selectedGroupConversation}/>;
        } else if (selectedSetting) {
            return <ProfilePage callId={selectedSetting}/>;
        } else if (selectedNewGroup.length > 0) {
            return <GroupProfilePage selectedGroups={selectedNewGroup}/>;
        } else {
            return <WelcomePage/>;
        }
    };

    return (
        <div className="home-container">
            <Navbar className="navbar"/>
            <div className="content-container">
                <Sidebar onSelectPage={handlePageChange}/>
                {currentPage === 'conversation' && <ConversationPage onConversationClick={handleConversationClick}/>}
                {currentPage === 'contact' &&
                    <ContactPage onContactClick={handleContactClick} onGroupPageOpen={handleGroupPageOpen}/>}
                {currentPage === 'select-contact' && <SelectContactPage onGroupClick={handleNewGroupClick}/>}

                {currentPage === 'group-conversation' &&
                    <GroupConversationPage onGroupConversationClick={handleGroupConversationClick}/>}

                {currentPage === 'settings' && <SettingsPage onSettingClick={handleSettingClick}/>}
                {getSelectedPage()}
            </div>
            <div className="map-container"></div>
        </div>
    );
}

export default HomePage;
