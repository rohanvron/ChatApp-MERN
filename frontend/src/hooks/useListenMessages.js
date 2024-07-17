import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from '../store/useConversation';
import notification from '../assets/notification.mp3';

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notification);
            sound.play();
            setMessages([...messages, newMessage]);
        })

        return () => {
            socket?.off("newMessage");
        }

    }, [socket, messages, setMessages]);
}

export default useListenMessages
