$(document).ready(function() {
    var url = 'https://chitter-backend-api.herokuapp.com/peeps';
    $.getJSON(url, function (data) {
      printPeeps(data);
    });

   $("button").click(function(){
     $.getJSON(url, function (data) {
       printPeeps(data);
     });
   });
});


  function printPeeps(data) {
    var content = ""
    for (var i = 0; i < data.length; i++) {
      content += "<br>" + data[i].body;
      content += "<br>Posted by: " + data[i].user.handle;
      content += "  |  Posted at: " + data[i].created_at + "<br><br>";
    }
    $("#peeps").html(content);
  };
