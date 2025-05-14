import { Server } from "socket.io";
import http from 'http';
import express from 'express';
import User from '../models/user.model.js';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:["http://localhost:3001"],
        methods:["GET", "POST"]
    }
});

export const getRecieverSocketId = (recieverId) => { return userSocketMap[recieverId]; }

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log("user connected: ", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId != "undefined")
        userSocketMap[userId] = socket.id;

    // отправляет ивент всем подключенным юзерам
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", async () => {
        console.log("user disconnected: ", socket.id);

        const userId = socket.handshake.query.userId;
        if(userId) {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                    last_seen: new Date()
                }
            );

            io.emit("userLastSeen", {
                userId: userId,
                lastSeen: updatedUser.last_seen
            });
        }

        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {app, io, server};