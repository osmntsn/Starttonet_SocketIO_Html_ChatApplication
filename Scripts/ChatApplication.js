var apiKey = '44b0e2ad';
var name = "not_set";
function connect(socketName) {
    console.log("Trying to connect starttonet server with apiKey:" + apiKey);
    connecttoStarttonet(apiKey, socketName);
}
function onConnect() {
    $("#disconnectedAlert").fadeOut("fast", function () {
        $("#connectedAlert").fadeIn("fast", function () {
        });
    });
    socket.emit("getConnectedUsers");
}
function onDisconnect() {
    $("#connectedAlert").fadeOut("fast", function () {
        $("#disconnectedAlert").fadeIn("fast", function () {
        });
    });
    document.getElementById('userArea').innerHTML = "";
}
function onError(errorMessage) {
    console.log(errorMessage);
}

function onData(data) {
    console.log("Data Recived:" + data);
    var recivedData = JSON.parse(data);
    if (recivedData['dc_MessageTo'] == "All") {
        $('#messageArea').append(recivedData['dc_UserName'] + ":" + recivedData["dc_Message"] + "</br>");
        $("#messageArea").animate({ scrollTop: $('#messageArea')[0].scrollHeight }, 1000);
    }
    else {
        if (recivedData['dc_MessageTo'] == name) {
            var message = recivedData["dc_UserName"] + ": " + recivedData["dc_Message"];
            document.getElementById('privateMessageDiv').innerHTML = message;
            $('#messageModal').modal('show');
        }

    }
}
function onGetColumns(columns) {

}
function onSocketDisconnected(socketName) {

    var userList = document.getElementById('userArea').innerHTML;
    console.log(socketName + ' disconnected ' + userList);
    document.getElementById('userArea').innerHTML = userList.replace("<div>" + socketName + "</div>", "");
    $('#messageArea').append(socketName + " Sohbetten Ayrıldı</br>");
}
function onSocketConnected(socketName) {
    if (document.getElementById('userArea').innerHTML.indexOf(socketName) < 0) {
        $('#userArea').append("<div>" + socketName + "</div>");
        $('#messageArea').append(socketName + " Sohbete Bağlandı</br>");
        console.log(socketName + ' connected');
    }
}
function getUserList(users) {
    console.log('users:' + users);
    $.each(users, function (key, value) {
        //$('#kullanicilar').append("<div>" + key + "</div>");
        if (document.getElementById('userArea').innerHTML.indexOf(value) < 0)
            $('#userArea').append("<div>" + value + "</div>");
    });
}

/*function onGetDataFromSocket(data) {
    data = JSON.parse(data);
    var message = data["dc_UserName"] + ": " + data["dc_Message"];
    document.getElementById('privateMessageDiv').innerHTML = message;
    $('#messageModal').modal('show');
}*/

$(function () {
    $('#sendButton').click(function () {
        var message = $('#messageText').val();
        message = message;
        var columns = ["dc_UserName", "dc_Message", "dc_MessageTo"];
        var data = [name, message,"All"];
        createAndSendData(columns, data, "All");
    });
});

$(function () {
    $('#nameSetButton').click(function () {
        name = $('#nameText').val();
        if (name.length >= 3) {
            connect(name);
            $("#namePanel").fadeOut("slow", function () {
                $("#MessagingPanel").fadeIn("slow", function () {
                });
            });
        }
        else
            alert("İsim alanı 3 karakterden fazla olmalı");
    });
});


$(function () {
    $('#modalSend').click(function () {
        var message = $('#modalText').val();
        var user = $('#modalUser').val();
        var columns = ["dc_UserName", "dc_Message","dc_MessageTo"];
        var data = [name, message,user];
        console.log("private message send to " + user);
        createAndSendData(columns, data, user);
    });
});
