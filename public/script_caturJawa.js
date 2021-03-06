var socket = io.connect("http://localhost:8080/");
var datachat = {};

$(".game").hide();
$(".loading").hide();

$(function(){
    $(".login .form #button").click(function(){
        socket.emit("join");
        datachat.nickname = $("#nickname").val();
        socket.emit("nickname", datachat);
        socket.on("userOnline", function(userOnline){
            console.log("User Join = " + userOnline);
            if (userOnline <= 1){
                $(".login").hide(1000);
                $(".loading").show(1000);
            } else{
                $(".login").hide(1000);
                $(".loading").hide(1000);
                $(".game").show(1000);
            }
        });
    });

    $(".loading #button").click(function(){
        socket.on("userOnline", function(){
            userOnline--;
            console.log("User Out");
        });
        $(".loading").hide(1000);
        $(".login").show(1000);
    });

    $("#send").click(function(){
        datachat.nama = $("#nickname").val();
        datachat.chat = $("#text").val();
        socket.emit("chat", datachat);
        $("#text").val('');
    });

    $(".home").click(function(){
        socket.on("userOnline", function(){
            userOnline--;
            console.log("User Out");
        });
        $(".game").hide(1000);
        $(".login").show(1000);
        $("#nickname").val();
        $("#live-chat").html($(''));
    });

    const menuToggle = document.querySelector('.menu-toggle input');
    const nav = document.querySelector('.left-col');
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('slide');
    });
});

socket.on("nickname", function(data){
    if (datachat.nickname === data.nickname){
        $("#player1").html($("<div>" + data.nickname + "</div>"));
        $("#a3").html($('<img class="p" id="bP1" src="./black.png">'));
        $("#b3").html($('<img class="p" id="bP2" src="./black.png">'));
        $("#c3").html($('<img class="p" id="bP3" src="./black.png">'));
        $("#a1").html($('<img class="p" id="wP1" src="./white.png">'));
        $("#b1").html($('<img class="p" id="wP2" src="./white.png">'));
        $("#c1").html($('<img class="p" id="wP3" src="./white.png">'));
        $("#time_1").html($('<div>10:00</div>'));
    } else {
        $("#player2").html($("<div>" + data.nickname + "</div>"));
        $("#a3").html($('<img class="p" id="wP1" src="./white.png">'));
        $("#b3").html($('<img class="p" id="wP2" src="./white.png">'));
        $("#c3").html($('<img class="p" id="wP3" src="./white.png">'));
        $("#a1").html($('<img class="p" id="bP1" src="./black.png">'));
        $("#b1").html($('<img class="p" id="bP2" src="./black.png">'));
        $("#c1").html($('<img class="p" id="bP3" src="./black.png">'));
        $("#time_2").html($('<div>10:00</div>'));
    }
});

socket.on("chat", function(data){
    $(".live-chat").append($("<div id='message'>" + data.nama + ": " + data.chat + "</div>"));
});