const Chat = require("../models/chatModel");

const postChat = async (message) => {
    try {
        const newChat = new Chat(message)
        const a = await newChat.save()
        console.log(a);
    } catch (e) {
        console.log(e);
    }
}
module.exports = postChat