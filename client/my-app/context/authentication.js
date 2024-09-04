// import { createContext, useState } from "react";

// export const authenticationContext = createContext({
//     isSignedIn: false
// })

// export default function AuthenticationProvider({children}) {
//     const [isSignedIn,setIsSignedIn] = useState(false)

//     return(<authenticationContext.Provider value={{
//         isSignedIn,
//         setIsSignedIn
//     }}>
//         {children}
//     </authenticationContext.Provider>)
// }

// // import { createContext } from "react";


// // export const authenticationContext = createContext(null)

import { createContext, useState } from "react";

export const AuthContext = createContext({
    isSignedIn: false
})

export default function AuthProvider({children}) {
    const [isSignedIn,setIsSignedIn] = useState(false)

    return(<AuthContext.Provider value={{
        isSignedIn,
        setIsSignedIn
    }}>
        {children}
    </AuthContext.Provider>)
}