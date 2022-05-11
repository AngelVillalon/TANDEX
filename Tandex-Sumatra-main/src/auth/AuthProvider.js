import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    
    useEffect(() =>{
        try{
            localStorage.setItem("user", JSON.stringify(user))
        }catch (error){
            localStorage.removeItem("user")  
        }
    }, [user])

    const contextValue = {
        user,
        login(email, password) {
            setUser({email: email, password: password})
            sessionStorage.setItem("email",email)
        },
        logout() {
            setUser(null);
        },

    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;