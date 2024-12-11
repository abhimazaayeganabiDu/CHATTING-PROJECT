import { createContext, useContext, useMemo } from 'react'
import io from 'socket.io-client'
import { server } from './constants/config'


const SocketContest = createContext()

const getSocket = () => useContext(SocketContest)

const SocektProvider = ({ children }) => {
    const socket = useMemo(() => io(server, { withCredentials: true, }), [])

    return (
        <SocketContest.Provider value={socket}>
            {children}
        </SocketContest.Provider>
    )
}

export { getSocket, SocektProvider }
