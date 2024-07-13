import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error);
                }
                if (data.filteredUsers && Array.isArray(data.filteredUsers)) {
                    setConversations(data.filteredUsers);
                } else {
                    throw new Error('API did not return an array of filtered users');
                }
            } catch (error) {
                console.error('Error fetching conversations:', error);
                toast.error(error.message);
                setConversations([]); // empty array on error
            } finally {
                setLoading(false);
            }
        }

        getConversations();
    }, []);

    return { loading, conversations };
}

export default useGetConversations;
