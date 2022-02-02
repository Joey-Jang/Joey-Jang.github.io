/* global NexT: true */

$(document).ready(function() {
    // enable category link of posts in the same category page
    // $(".post").on("click", ".post-category a", function(event) {
    //     if($(event.delegateTarget).attr("route") === window.location.hash.substring(1)) {
    //         location.reload();
    //         $(window).scrollTop(0);
    //     };
    // });

    // change home page li structure in mobile
    if(window.matchMedia('(max-width: 767px)').matches || window.NexT.utils.isMobile()) {
        $(".project .period-inner").hide();
        $(".project .period-outer").show();
    } else {
        $(".project .period-inner").show();
        $(".project .period-outer").hide();
    }

    let timerHandler;
    $(window).on("resize", () => {
        clearTimeout(timerHandler);

        timerHandler = setTimeout(() => {
            if(window.matchMedia('(max-width: 767px)').matches || window.NexT.utils.isMobile()) {
                $(".project .period-inner").hide();
                $(".project .period-outer").show();
            } else {
                $(".project .period-inner").show();
                $(".project .period-outer").hide();
            }
        }, 300);
    });
})

