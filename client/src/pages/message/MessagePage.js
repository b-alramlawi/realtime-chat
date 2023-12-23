// MessagePage.js

import React, {useState, useEffect, useRef} from 'react';
import './MessageStyle.css';
import OutgoingMessageCard from "../../components/outgoing-message-card/OutgoingMessageCard";
import IncomingMessageCard from "../../components/incoming-message-card/IncomingMessageCard";
import io from 'socket.io-client';

const socket = io('/chat');

const MessagePage = ({contact, isConversation}) => {

    const senderID = localStorage.getItem('userId');
    // const receiverID = isConversation ? contact.participants[1].id : contact._id
    const receiverID = isConversation ? (contact.participants[1].id === senderID ? contact.participants[0].id : contact.participants[1].id) : contact._id;

    const [participantName, setParticipantName] = useState('');
    const [participantPicture, setParticipantPicture] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const chatContainerRef = useRef(null);
    useEffect(() => {
        const fetchMessages = async () => {
            console.log("ReceiverID", receiverID)
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:5000/chat/api/messages?senderID=${senderID}&receiverID=${receiverID}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`);
                }

                const responseData = await response.json();


                if (responseData.status && responseData.status.statusCode === 200) {
                    // Check if the messages array is present in the response data
                    const messagesArray = responseData.data && responseData.data.messages;

                    if (messagesArray) {
                        setMessages(messagesArray);
                        console.log('All messages:', messagesArray);

                        // Use the createdAt timestamp from the latest message (if available)
                        const latestCreatedAt = messagesArray.length > 0 ? messagesArray[0].createdAt : new Date().toISOString();
                        console.log('Latest message createdAt:', latestCreatedAt);


                        ////////////////////////////////////////////////////////////////////////////////////////////////
                        // Check if the participant id is equal to the senderID
                        const participantToLog = contact.participants[0].id === senderID
                            ? contact.participants[1] // If equal, log information about the other participant
                            : contact.participants[0];

                        setParticipantName(participantToLog.userData.name);
                        setParticipantPicture(participantToLog.userData.profilePicture);
                        ////////////////////////////////////////////////////////////////////////////////////////////////

                        // Set the scroll to the bottom when the component mounts
                        scrollToBottom();
                    } else {
                        console.error('Error: Messages array not found in the response data');
                    }
                } else {
                    console.error('Error: Unexpected response status or structure');
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        const handleChatMessage = (msg) => {
            console.log('Received message:', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
            // Scroll to the bottom after receiving a new message
            scrollToBottom();
        };

        socket.on('chat message', handleChatMessage);
        // Set the scroll to the bottom when the component mounts
        scrollToBottom();

        return () => {
            socket.off('chat message', handleChatMessage);
        };
    }, [senderID, receiverID]);


    const handleSendMessage = () => {
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});

        if (messageInput.trim() !== '') {
            socket.emit('chat message', {
                senderID: senderID,
                receiverID: receiverID,
                message: messageInput,
                time: currentTime,
            });

            setMessageInput('');
            // Scroll to the bottom after sending a message
            scrollToBottom();
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    return (
        <div className="message-page">
            <div className="contact-bar">
                <div className="avatar">
                    <img
                        src={isConversation ? (participantPicture || 'images/profileAvatar.png') : (contact.profilePicture || 'images/profileAvatar.png')}
                        alt="Avatar"
                    />

                </div>
                <div className="contact-info">
                    <div className="contact-name">{isConversation ? participantName : contact.name}</div>
                    {/*<div className="last-seen">last seen today at 1:26 PM</div>*/}
                </div>

            </div>

            <div className="full-height-message" ref={chatContainerRef}
                 style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`}}>
                {messages.map((msg, index) => {
                    const messageTime = new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    });

                    return msg.senderID === senderID ? (
                        <OutgoingMessageCard key={index} message={msg.message} time={messageTime}/>
                    ) : (
                        <IncomingMessageCard key={index} message={msg.message} time={messageTime}/>
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
                <div className="send-button" onClick={handleSendMessage}>
                    <img src="/icons/send-white.svg" alt="Send"/>
                </div>
            </div>
        </div>
    );
};
export default MessagePage;
