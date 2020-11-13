const socket = io();

Notification.requestPermission().then(function (result) {
    console.log(result);
});

function notifyMe(message = "Hi there") {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        var notification = new Notification(message);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                var notification = new Notification(message);
            }
        });
    }
}

socket.on("new message", (data) => {
    notifyMe("New SMS received");
    const messagesList = document.getElementById("messages");
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-warning list-group-item-action";

    const body = document.createElement('p');
    body.appendChild(document.createTextNode(data.Body));

    data.From = data.From.replace(/[0-9]/g, 'x');
    const from = document.createElement('span');
    from.appendChild(document.createTextNode(data.From));

    const _id = document.createElement('span');
    _id.appendChild(document.createTextNode(data._id));

    const createdAt = document.createElement('span');
    createdAt.appendChild(document.createTextNode(timeago.format(data.createdAt)));

    li.appendChild(body);
    li.appendChild(_id);
    li.appendChild(from);
    li.appendChild(createdAt);
    messagesList.prepend(li);
});
