// GroupMessagePage.js

import React, {useState, useEffect, useRef} from 'react';
import './GroupMessageStyle.css';
import io from 'socket.io-client';
import OutgoingMessageCard from '../../components/outgoing-message-card/OutgoingMessageCard';
import IncomingGroupMessageCard from "../../components/incoming-group-message-card/IncomingGroupMessageCard";
import axios from "axios";

const socket = io('/group');

const GroupMessagePage = ({group}) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const chatContainerRef = useRef(null);

    const fetchInitialMessages = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:5000/chat/api/group/messages?groupID=${group._id}`, {
                headers: {
                    'Authorization': `${token}`,
                }
            });
            if (!response.ok) {
                new Error(`Failed to fetch group messages: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json();

            if (responseData.status && responseData.status.statusCode === 200) {
                const messagesArray = responseData.data && responseData.data.messages;

                if (messagesArray) {
                    setMessages(messagesArray);
                    scrollToBottom();
                } else {
                    console.error('Error: Messages array not found in the response data');
                }
            } else {
                console.error('Error: Unexpected response status or structure');
            }
        } catch (error) {
            console.error('Error fetching group messages:', error);
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            const isScrolledToBottom =
                chatContainerRef.current.scrollHeight - chatContainerRef.current.scrollTop ===
                chatContainerRef.current.clientHeight;

            if (isScrolledToBottom) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }
    };

    useEffect(() => {
        fetchInitialMessages();

        // Listen for group messages
        socket.on('group message', (msg) => {
            console.log('Received group message:', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
            scrollToBottom();
        });

        // Cleanup socket event listener
        return () => {
            socket.off('group message');
        };
    }, [group._id]);

    const handleSendGroupMessage = () => {
        const currentTime = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        if (messageInput.trim() !== '') {
            const newMessage = {
                groupID: group._id,
                senderID: localStorage.getItem('userId'),
                message: messageInput,
                time: currentTime,
            };

            // Update UI optimistically
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            scrollToBottom();

            // Emit the message to the server
            socket.emit('group message', newMessage);

            // Clear the input
            setMessageInput('');
        }
    };

    return (
        <div key={group._id} className="group-conversation-page">
            <div className="contact-bar">
                <div className="avatar">
                    <img
                        src={group.groupImage ? group.groupImage : 'images/profileAvatar.png'}
                        alt="Group Avatar"
                    />
                </div>
                <div className="contact-info">
                    <div className="contact-name">{group.groupName}</div>
                </div>
            </div>

            <div
                className="full-height-message"
                ref={chatContainerRef}
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
                }}
            >
                {messages.map((msg, index) => {
                    const messageTime = new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    });

                    // Find the participant whose _id matches the senderID from the message
                    const senderParticipant = group.participants.find(participant => participant._id === msg.senderID);

                    return (
                        <React.Fragment key={index}>
                            {msg.senderID === localStorage.getItem('userId') ? (
                                <OutgoingMessageCard message={msg.message} time={messageTime}/>
                            ) : (
                                // Check if senderParticipant is found
                                senderParticipant ? (
                                    <IncomingGroupMessageCard
                                        message={msg.message}
                                        time={messageTime}
                                        senderName={senderParticipant.name}
                                        senderImage={senderParticipant.profilePicture}
                                    />
                                ) : (
                                    // Default values if participant is not found (you can adjust this as needed)
                                    <IncomingGroupMessageCard
                                        message={msg.message}
                                        time={messageTime}
                                        senderName="Unknown User"
                                        senderImage={'images/defaultProfileImage.png'}
                                    />
                                )
                            )}
                        </React.Fragment>
                    );
                })}


            </div>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="placeholder"
                />
                <div className="send-button" onClick={handleSendGroupMessage}>
                    <img src="/icons/send-white.svg" alt="Send"/>
                </div>
            </div>
        </div>
    );
};

export default GroupMessagePage;

