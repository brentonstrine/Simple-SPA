$(function() {
    var getData = function() {
        $.ajax({
            url: "database/app.json",
            dataType: "json",
            success: function(response){
                data = response;
                buildSite(data);
            },
            error: function(response){
                console.log("some ajax porblem.")
            }
        })
    };
    getData();

    var buildSite = function(db){
        
    };
});
