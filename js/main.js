$(function() {
    var db;
    var getData = function() {
        $.ajax({
            url: "database/app.json",
            dataType: "json",
            success: function(response){
                db = response;
                buildSite();
            },
            error: function(response){
                alert("some ajax porblem.")
            }
        })
    };
    getData();

    var buildSite = function(page){
        var currentPage = page || getRoute();
        if(typeof currentPage === "undefined") {
            currentPage = "home";
            setRoute("#home");
        }
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

        //intercept all link clicks
        var anchors = document.querySelectorAll("a");
        anchors.forEach(function(anchor){
            var linkValue = anchor.getAttribute("href");

            //is this a link to one of our internal pages? (e.g., first character is `#`)
            if(linkValue.charAt(0) === "#") {
                // get the page name without the `#`
                var linkName = linkValue.substr(1);
                //does this link exist in our database of pages?
                if(db.pages[linkName]) {
                    //then set up an event listener for this event.
                    anchor.addEventListener("click", function(event){ //*callback functions, "this" context is different
                        //onclick, intercept and stop normal behavior
                        event.preventDefault();
                        var newPage = this.getAttribute("href");
                        //tell the browser we are changing pages
                        history.pushState({"page": newPage}, "", newPage);
                        changeRoute(newPage);
                    });
                }
            }
        });
    };

    //listen for page history changes (e.g. 'back' button)
    window.onpopstate = function(e){
        var page = e.state.page;
        changeRoute(page);
    };

    var changeRoute = function(page){
        var pageName = page.substr(1)
        buildSite(pageName);
    }

    var getRoute = function(){
        var path = document.location.href.split("#")[1];
        return path;
    };

    var setRoute = function(newRoute){
        history.pushState({"page": newRoute}, "", newRoute);
    };
});
