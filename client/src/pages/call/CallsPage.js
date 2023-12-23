// CallsPage.js

import React from 'react';
import './CallsStyle.css';
import SearchBar from "../../components/search-bar/SearchBar";

const CallsPage = () => {
    return (
        <div className="call-page-container">
            <div className="call-header-section">
                <h2>Calls Page</h2>
            </div>
            <SearchBar placeholder="Search or start a new call..." type="text"/>
            <div className="call-center-image-container">
                <img
                    src="/images/maintenance.png"
                    alt="Calls Image"
                    className="call-center-image"
                />
            </div>
        </div>
    );
};
export default CallsPage;
