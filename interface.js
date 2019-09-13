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
     newSession();
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
var sessionDetails;
var handle;
var password;

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
    handle = $("#handle").val();
    password = $("#password").val();
    postSession();
  };

  function addUser() {
   handle = $("#handle").val();
   password = $("#password").val();
   postUser('https://chitter-backend-api.herokuapp.com/users', {"user": {"handle": handle, "password": password }})
     .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
     .catch(error => console.error(error));
};

  function addPeep() {
    var body = $("#peep-text").val();
    console.log(body);
    console.log(sessionDetails);
    postPeep('https://chitter-backend-api.herokuapp.com/peeps', {"peep": {"user_id": sessionDetails.user_id, "body": body }})
      .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
  };

  function postSession() {
    console.log(JSON.stringify({"session": {"handle":handle, "password":password }}));
    // $.post(
    //   'https://chitter-backend-api.herokuapp.com/sessions',
    //   JSON.stringify({session: {handle: handle, password: password }}),
    //   function (data) { sessionDetails = data }
    // )
    $.ajax({
     url: 'https://chitter-backend-api.herokuapp.com/sessions',
     type: 'post',
     dataType: 'json',
     contentType: 'application/json',
     success: function (data) {
       sessionDetails = data;
       console.log(sessionDetails);
     },
     data: JSON.stringify({"session": {"handle":handle, "password":password }})
   });
  };

  //
  //   // Default options are marked with *
  //     return fetch(url, {
  //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //         mode: 'cors', // no-cors, cors, *same-origin
  //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //         credentials: 'same-origin', // include, *same-origin, omit
  //         headers: {
  //             'Content-Type': 'application/json',
  //             // 'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         redirect: 'follow', // manual, *follow, error
  //         referrer: 'no-referrer', // no-referrer, *client
  //         body: JSON.stringify(data), // body data type must match "Content-Type" header
  //         function(data) {
  //           var sessionDetails = data;
  //           console.log("TEST:" + sessionDetails);
  //         }
  //
  //     })
  //     .then(response => response.json()); // parses JSON response into native JavaScript objects
  // };


   function postUser(url = '', data = {}) {
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

   function postPeep(url = '', data = {}) {
     // Default options are marked with *
       return fetch(url, {
           method: 'POST', // *GET, POST, PUT, DELETE, etc.
           mode: 'cors', // no-cors, cors, *same-origin
           cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
           credentials: 'same-origin', // include, *same-origin, omit
           headers: {
               'Content-Type': 'application/json',
               'Authorization': "'Token token =" + sessionDetails.session_key,
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
