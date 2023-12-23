// ProfilePage.js

import React, {useState, useEffect} from 'react';
import './ProfileStyle.css';
import axios from 'axios';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/chat/api/profile/${userId}`, {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
                const user = response.data.data;

                setName(user.name);
                setStatus(user.status);
                setPhoneNumber(user.phoneNumber);
                setProfilePicture(user.profilePicture);
            } catch (error) {
                console.error('Error fetching user profile', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handlePictureChange = (e) => {
        const file = e.target.files[0];

        // Display the selected image preview
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }

        setSelectedImage(file);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const formData = new FormData();
            formData.append('profilePicture', selectedImage);
            formData.append('name', name);
            formData.append('status', status);

            const response = await axios.put(
                `http://localhost:5000/chat/api/update-profile/${userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `${token}`,
                    },
                }
            );

            const updatedUser = response.data.data;

            setProfilePicture(updatedUser.profilePicture);
            setIsEditing(false); // Set isEditing to false after successful update
        } catch (error) {
            console.error('Error updating profile', error);
        }

        setPreviewImage(null);
        setSelectedImage(null);
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <label className="profile-picture" htmlFor="fileInput">
                    <img
                        src={
                            previewImage ||
                            `http://localhost:5000/${profilePicture || 'images/profileAvatar.png'}`
                        }
                        alt="Profile"
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
                        disabled={!isEditing} // Disable input when not in editing mode
                    />
                </label>
                <div className="profile-details">
                    <div className={isEditing ? 'input-field' : 'profile-info'}>
                        {isEditing ? (
                            <input className="input-field" type="text" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        ) : (
                            <div>{name}</div>
                        )}
                    </div>
                    <div className="profile-label">Status</div>
                    <div className={isEditing ? 'input-field' : 'profile-info'}>
                        {isEditing ? (
                            <input className="input-field" type="text" value={status}
                                   onChange={(e) => setStatus(e.target.value)}/>
                        ) : (
                            <div>{status}</div>
                        )}
                    </div>
                    <div className="profile-label">Phone Number</div>
                    <div className="profile-info">{phoneNumber}</div>
                    {isEditing ? (
                        <button className="edit-button" onClick={handleSave}>
                            Save
                        </button>
                    ) : (
                        <button className="edit-button" onClick={handleEdit}>
                            Edit
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};
export default ProfilePage;
