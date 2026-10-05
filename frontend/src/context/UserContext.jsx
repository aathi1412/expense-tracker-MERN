import { createContext, useEffect, useState} from 'react'
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    }

    const clearUser = () => {
        setUser(null);
    }

    useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token) return;

      const getUser = async () => {
        try {
          const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
          updateUser(response.data);
        } catch (error) {
          console.error("Error getting user:", error);
          clearUser();
        }
      };

      getUser();
    }, []);
    
  return (
    <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser
        }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;