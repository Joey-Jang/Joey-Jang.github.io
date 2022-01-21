// $(document).ready(function() {
//     $(".post").on("click", ".post-category a", function(event) {
//         if($(event.delegateTarget).attr("route") === window.location.hash.substring(1)) {
//             location.reload();
//             $(window).scrollTop(0);
//         };
//     });
// });

//
$(function() {
    $(window).on("resize", function() {
        console.log("window resized");

        if(NexT.utils.isMobile()) {
            console.log("is mobile")

            const spanWrapper = $(".span-wrapper");
            const period = spanWrapper.children("span").eq(1);
            $(".span-wrapper").children("span").eq(1).detach();
            spanWrapper.parent().append(period);
        }
    });
})
