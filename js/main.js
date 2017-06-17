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
                alert("some ajax porblem.")
            }
        })
    };
    getData();

    var buildSite = function(db){
        var currentPage = "home"
        var siteHeading = document.querySelector(".js-site__heading");
        var content = document.querySelector(".js-content");
        var pageHeading = content.querySelector(".js-page__heading");
        var pageContent = content.querySelector(".js-page__content");
        var footer = document.querySelector(".js-footer");
        var dbPage = db.pages[currentPage];

        //populate heading
        document.querySelector("title").textContent = dbPage.title;
        siteHeading.textContent = db.components.title;

        //populate header
        pageHeading.textContent = dbPage.heading;

        //populate sidebar
        var navBarUL = document.querySelector(".js-navbar__ul");
        var navBarListFrag = "";
        db.components.sidebar.links.forEach(function(link){
            navBarListFrag += "<li class='nav-item'><a class = 'nav-link' href='" + link[1] + "'>" + link[0] + "</a></li>";
        });
        navBarUL.innerHTML = navBarListFrag;

        //populate main content
        var mainFrag = "";
        dbPage.main.forEach(function(paragraph){
            mainFrag += "<p>" + paragraph + "</p>";
        });
        pageContent.innerHTML = mainFrag;

        //populate footer
        var currentYear = "2017";
        var footerString = db.components.footer.replace("{year}", currentYear);
        footer.innerHTML ="<p>" + footerString + "</p>";
    };


    window.onpopstate = changeRoute;
    var changeRoute = function(){
        debugger;
    }
});
