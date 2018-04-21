$(document).ready(function() {
  $('.search').click(function() {
    const query = $(".query").val();
    $.ajax({
      type: "GET",
      url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + encodeURIComponent(query) + "&callback=?", //encodeURIComponent(query)
      contentType: "applicatino/json; character=utf-8",
      async: true,
      dataType: "json"
    })
      .done((json) => {
        //console.log(JSON.stringify(json));
        const markup = json.parse.text["*"];
        const blurb = $('<div></div>').html(markup);
        $(".results").html($(blurb).find('p'));
      })
      .fail(function(error) {
        console.error("ERRROR!!!");
      });
    });
});

function getData(json) {
  const markup = json.parse.text["*"];
  const blurb = $('<div></div>').html(markup);
  $(".results").html($(blurb).find('p'));
}

function reportError(error) {
  $(".results").html("<strong>Error, please read detailed descriptio<br></strong>" + error);
}
