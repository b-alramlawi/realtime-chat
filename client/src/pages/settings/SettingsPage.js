// SettingsPage.js

import React, {useState} from 'react';
import './SettingsStyle.css';
import SearchBar from "../../components/search-bar/SearchBar";
import SettingItem from "../../components/Items/setting-item/SettingItem";
import {useHistory} from "react-router-dom";
import ConfirmationDialog from "../../components/confirmation-dialog/ConfirmationDialog";

const SettingsPage = ({onSettingClick}) => {
    const history = useHistory();
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    const handleLogout = () => {
        // Open the confirmation dialog
        setConfirmationDialogOpen(true);
    };

    const confirmLogout = () => {
        // Clear data from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('otherId');
        localStorage.removeItem('phoneNumber');

        // Redirect to login page
        history.push('/login');
    };

    const cancelLogout = () => {
        // Close the confirmation dialog
        setConfirmationDialogOpen(false);
    };

    return (
        <div className="setting-page-container">
            <div className="setting-header-section">
                <h2>Settings Page</h2>
            </div>
            <SearchBar placeholder="Search any settings..." type="text"/>
            <div className="setting-list-section">
                <ul className="setting-list-group">
                    <SettingItem avatar="icons/settings.svg" name="Profile" onClick={onSettingClick}/>
                </ul>
            </div>

            {/* Bottom section */}
            <div className="bottom-section">
                <hr className="logout-divider"/>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <p className="description-text">Your chat history will be cleared when you log out.</p>
            </div>

            {/* Add ConfirmationDialog */}
            <ConfirmationDialog
                isOpen={isConfirmationDialogOpen}
                onClose={cancelLogout}
                onConfirm={confirmLogout}
                text="Are you sure you want to logout?"
            />
        </div>
    );
};
export default SettingsPage;
