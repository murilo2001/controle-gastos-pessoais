const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1198338",
    key: "55dee10dc9023f5b092f",
    secret: "aed25b75ad4d99ebe4f5",
    cluster: "us2",
    useTLS: true
});

module.exports = {

    pusherPush(event, data = '')  {
        pusher.trigger('upper-fi-channel', event, {
            message: data
          });
    },
}