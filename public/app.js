$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#artList").append("<li data-id='" + data[i]._id + "'>" + 
        "<strong>" + data[i].title + "</strong>" + 
        "<br />" + data[i].link + "</li>");
    }
});

$(document).on("click", "li", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .done(function(data) {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");

        $("#notes").append("<input id='titleInput' name='title' >");

        $("#notes").append("<textarea id='bodyInput' name='body'></textarea>");

        $("#notes").append("<button data-id='" + data._id + "' id='saveNote'>Save Note</button>");
  
        if (data.note) {

          $("#titleInput").val(data.note.title);
          $("#bodyInput").val(data.note.body);
        }
      });
  });

  
  $(document).on("click", "#saveNote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleInput").val(),
        body: $("#bodyInput").val()
      }
    })
      .done(function(data) {
        console.log(data);
        $("#notes").empty();
      });

    $("#titleInput").val("");
    $("#bodyInput").val("");
  });
