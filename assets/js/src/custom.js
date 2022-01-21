/* global NexT: true */

$(document).ready(function() {
    // enable category link of posts in the same category page
    $(".post").on("click", ".post-category a", function(event) {
        if($(event.delegateTarget).attr("route") === window.location.hash.substring(1)) {
            location.reload();
            $(window).scrollTop(0);
        };
    });

    // change home page li structure in mobile
    if(window.NexT.utils.isMobile()) {
        const spanWrapper = $(".span-wrapper");
        Array.prototype.forEach.call(spanWrapper, (wrapper) => {
            let period = $(wrapper).children("span").eq(1);
            period.detach();
            $(wrapper).parent().append(period);
        });
    }
})

