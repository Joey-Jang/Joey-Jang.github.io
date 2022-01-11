$(document).ready(function() {
    $(".post").on("click", ".post-category a", function(event) {
        if($(event.delegateTarget).attr("route") === window.location.hash.substring(1)) {
            location.reload();
            $(window).scrollTop(0);
        };
    });
});