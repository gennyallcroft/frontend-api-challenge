$(document).ready(function() {
    var peepsUrl = 'https://chitter-backend-api.herokuapp.com/peeps';

    $.getJSON(peepsUrl, function (data) {
      printPeeps(data);
    });

   $("#refresh").click(function(){
     $.getJSON(peepsUrl, function (data) {
       printPeeps(data);
     });

   });

  $("#sign-up").click(function(){
      signUpRedirect();
  });

  $("#user-details").click(function(e){
    e.preventDefault();
    addUser();
    // peepsRedirect();
   });

   $("#sign-in").click(function(){
       signInRedirect();
   });

   $("#new-session").click(function(e){
     e.preventDefault();
     newSession().then(console.log(user_id));
     // peepsRedirect();
    });

    $("#add-peep").click(function(){
      var peepBox = document.getElementById("peep-box");
      peepBox.style.display = "block";
    });

    $("#peep").click(function(e){
      e.preventDefault();
      addPeep();
      $.getJSON(peepsUrl, function (data) {
        printPeeps(data);
      });
    });


});

  function signUpRedirect() {
      window.location.href = "/Users/student/Documents/projects/frontend-api-challenge/signup.html";
    };

  function peepsRedirect() {
    window.location.href = "/Users/student/Documents/projects/frontend-api-challenge/index.html"
  };

  function signInRedirect() {
    window.location.href = "/Users/student/Documents/projects/frontend-api-challenge/signin.html"
  };

  function newSession() {
    var handle = $("#handle").val();
    var password = $("#password").val();
    postData('https://chitter-backend-api.herokuapp.com/sessions', {"session": {"handle":handle, "password":password }})
      .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
  };

  function addUser() {
   var handle = $("#handle").val();
   var password = $("#password").val();
   postData('https://chitter-backend-api.herokuapp.com/users', {"user": {"handle": handle, "password": password }})
     .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
     .catch(error => console.error(error));

};

// function addPeep() {
//   console.log(user_id);
//   var body = $("#peep-text").val();
//   console.log(body);
//   postData('https://chitter-backend-api.herokuapp.com/peeps', {"peep": {"user_id": 1, "body": body }})
//     .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
//     .catch(error => console.error(error));
// };



   function postData(url = '', data = {}) {
     // Default options are marked with *
       return fetch(url, {
           method: 'POST', // *GET, POST, PUT, DELETE, etc.
           mode: 'cors', // no-cors, cors, *same-origin
           cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
           credentials: 'same-origin', // include, *same-origin, omit
           headers: {
               'Content-Type': 'application/json',
               // 'Content-Type': 'application/x-www-form-urlencoded',
           },
           redirect: 'follow', // manual, *follow, error
           referrer: 'no-referrer', // no-referrer, *client
           body: JSON.stringify(data), // body data type must match "Content-Type" header
       })
       .then(response => response.json()); // parses JSON response into native JavaScript objects
   };


  function printPeeps(data) {
    var content = ""
    for (var i = 0; i < data.length; i++) {
      content += "<h3>@" + data[i].user.handle;
      content += "  |  " + data[i].created_at + "</h3>";
      content += "<h4>" + data[i].body + "</h4><br>";
    }
    $("#peeps").html(content);
  };
