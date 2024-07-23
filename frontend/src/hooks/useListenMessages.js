import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from '../store/useConversation';
import notification from '../assets/notification.mp3';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, addMessage } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            if (newMessage.senderId === selectedConversation?._id || newMessage.receiverId === selectedConversation?._id) {
                addMessage(newMessage);
                const sound = new Audio(notification);
                sound.play();
            }
        });

        return () => {
            socket?.off("newMessage");
        }
    }, [socket, selectedConversation, addMessage]);
}

export default useListenMessages;
