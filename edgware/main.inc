<script>
define("clickableguide/pubsub", ["jquery-1"], function(e) {
    var s = e({});
    e.on = function(t, i) {
        function n() {
            return i.apply(this, Array.prototype.slice.call(arguments, 1))
        }
        n.guid = i.guid = i.guid || (e.guid ? e.guid++ : e.event.guid++), s.on(t, n)
    }, e.off = function() {
        s.off.apply(s, arguments)
    }, e.emit = function() {
        s.trigger.apply(s, arguments)
    }
});
</script>
<!--newsspec_11531 edgware-->
<link rel="stylesheet" href="http://newsimg.bbc.co.uk/news/special/2015/newsspec_11531/main.css">
<div class="ns__container--small-screens">
    <!--#include virtual="/news/special/2015/newsspec_11531/edgware/art_dir.inc"-->
</div>
<!--#include virtual="/news/special/2015/newsspec_11531/edgware/clickable_guide.inc"-->