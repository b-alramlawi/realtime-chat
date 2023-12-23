// GroupProfilePage.js

import React, {useState} from 'react';
import axios from 'axios';
import './GroupProfileStyle.css';

const GroupProfilePage = ({selectedGroups}) => {
    const [groupName, setGroupName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [errorMessages, setErrorMessages] = useState({
        groupName: '',
        selectedImage: '',
        selectedUsers: '',
    });

    const handlePictureChange = (e) => {
        const file = e.target.files[0];

        // Display the selected image preview
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }

        setSelectedImage(file);
    };

    const handleSave = async () => {
        // Validate required fields
        if (!groupName.trim()) {
            setErrorMessages({groupName: 'Group name is required.', selectedImage: '', selectedUsers: ''});
            return;
        }

        // Validate selected users
        if (selectedGroups.length === 0) {
            setErrorMessages({groupName: '', selectedImage: '', selectedUsers: 'Please select at least one user.'});
            return;
        }

        // Validate selected image
        if (!selectedImage) {
            setErrorMessages({groupName: '', selectedImage: 'Please select a group image.', selectedUsers: ''});
            return;
        }

        // Additional validation for other fields can be added here

        // Clear all error messages on successful validation
        setErrorMessages({groupName: '', selectedImage: '', selectedUsers: ''});

        // Prepare the form data for the group creation request
        const formData = new FormData();
        formData.append('admin', '657f28d296f50f3b1ab79c7b'); // Replace with the actual admin user ID
        formData.append('groupName', groupName);
        formData.append('groupImage', selectedImage);

        // Append each participant ID individually to the form data
        selectedGroups.forEach((user, index) => {
            formData.append(`participants[${index}]`, user._id);
        });

        try {
            const token = localStorage.getItem('authToken');
            // Make a POST request to your server endpoint
            const response = await axios.post('http://localhost:5000/chat/api/groups/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`,
                },
            });

            // Handle the response as needed
            console.log('Group creation response:', response.data);
        } catch (error) {
            // Handle errors
            console.error('Error creating group:', error.message);
        }
    };

    return (
        <div className="group-profile-container">
            <div className="group-profile-content">
                <label className="group-profile-picture" htmlFor="fileInput">
                    <img
                        src={previewImage || 'images/profileAvatar.png'}
                        alt="Group Profile"
                        onError={(e) => {
                            e.target.src = 'images/profileAvatar.png';
                        }}
                    />
                    <div className="camera-icon">
                        <img src="/icons/camera-white.svg" alt="Settings"/>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePictureChange}
                        id="fileInput"
                        style={{display: 'none'}}
                    />
                </label>
                <div className="group-profile-details">
                    <div className="error-message">{errorMessages.selectedImage}</div>
                    <input
                        className="input-field"
                        type="text"
                        value={groupName}
                        onChange={(e) => {
                            setGroupName(e.target.value);
                            setErrorMessages({groupName: '', selectedImage: '', selectedUsers: ''});
                        }}
                        placeholder="Enter Group Name"
                    />

                    <div className="error-message">{errorMessages.groupName}</div>
                    <h3>Selected Users:</h3>
                    <div className="error-message">{errorMessages.selectedUsers}</div>
                    <div className="user-row">
                        {selectedGroups.map((user) => (
                            <div key={user.id} className="user-column">
                                <img
                                    src={user.profilePicture || 'images/profileAvatar.png'}
                                    alt={user.name}
                                    className="user-image"
                                />
                                <span className="user-name">{user.name}</span>
                            </div>
                        ))}
                    </div>

                    <button className="edit-button" onClick={handleSave}>
                        Create Group
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupProfilePage;
