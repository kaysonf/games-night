import io, {Socket} from 'socket.io-client';
import {createContext, useContext} from "react";

const socketIo = io('localhost:5000');
// @ts-ignore
const socketCtx = createContext();
export const useWebSocket = () => useContext(socketCtx);

// @ts-ignore
export const WebSocketProvider = ({children}) => {
    const subscribe = (callback: any) => handleSubs(socketIo, callback);

    const emitMove = (msg: any) => makeMove(socketIo, msg);
    // @ts-ignore
    return (
        <socketCtx.Provider value={{subscribe, emitMove}}>
            {children}
        </socketCtx.Provider>
    )
}

const makeMove = (socketIo: Socket, msg: any) => {
    socketIo.emit('move', msg);
}

const handleSubs = (socketIo: Socket, callback: any) => {
    socketIo.onAny(callback);
    return () => socketIo.offAny(callback);
}