$(document).ready(() => {
  $('#query').keypress((event) => {
    if (event.keyCode == 13) {
      $('#go').click();
    }
  })
});

$('#go').click(() => {
  const query = $("#query").val();
  $.ajax({
    type: "GET",
    url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + encodeURIComponent(query) + "&callback=?",
    contentType: "applicatino/json; character=utf-8",
    async: true,
    dataType: "json"
  }).done((json) => {
      const markup = json.parse.text["*"];
      const blurb = $('<div></div>').html(markup);
      $(".results").html($(blurb).find('p'));
  }).fail((error) => {
      const blurb = $('<div></div>').html(error);
      $(".results").html($(blurb).find('p'));
      console.error("Error: " + error);
  });
});
