$(document).ready(function () {
  var tSelector = [".topStories .tswrap-lead", ".topStories .tswrap"];

  ksl.addTracking(".ssLogo", "event", "Logo", "click", "Header Logo Click");// logo tracking
  $(".dMenu>li a").click(function (e) {
    var menuValue = $(this).text() + " Link";
    ksl.gaTrackEvent("event", "Menu Link Click", "click", menuValue);
  });// menu

  ksl.addTracking(tSelector[0] + ">a img," + tSelector[1] + ">a img",
      "event", "Hero Area", "click", "Hero Area Article Image" ); //homepage top stories images
  ksl.addTracking(".topStories .tsSecName>a",
  "event", "Hero Area", "click", "Hero Area Article Section label");// homepage top stories section label
  ksl.addTracking(".topStories .tsTitle>a", "event",
      "Hero Area", "click", "Hero Area Article Headline");// homepage top stories title
  ksl.addTracking(".topStories .share-info .share", "event",
      "Hero Area", "click", "Hero Area Main Article Share Button");// homepage top stories share button
  ksl.addTracking(".topStories .social-iconset>a:eq(0), .mobileTopStories .social-iconset>a:eq(0)",
      "event", "Hero Area Share", "click", "Hero Area Facebook Icon");// homepage top stories fb share
  ksl.addTracking(".topStories .social-iconset>a:eq(1), .mobileTopStories .social-iconset>a:eq(1)",
      "event", "Hero Area Share", "click", "Hero Area Twitter Icon");// homepage top stories fb share

  ksl.addTracking(".trending-block .trendOwlPrev",
    "event", "Trending Widget", "click", "Trending Widget Left Arrow Icon");// trending left arrow
  ksl.addTracking(".trending-block .trendOwlNext",
    "event", "Trending Widget", "click", "Trending Widget Right Arrow Icon");// trending right arrow
  ksl.addTracking(".trendingOwlCarousel .owl-item:not(.cloned) img",
    "event", "Trending Widget", "click", "Trending Widget Article Image");// trending image
  ksl.addTracking(".trendingOwlCarousel .owl-item:not(.cloned) .trendTxt>a",
    "event", "Trending Widget", "click", "Trending Widget Article Headline");// trending title

  ksl.addTracking(".columns-box>a",
    "event", "Columnist widget", "click", "Columnist widget Columns Headline");// Column headine
  ksl.addTracking(".columns-story .columnImageHolder>a img",
    "event", "Columnist widget", "click", "Columnist widget Article Image (1,2,3)");// Column image
  ksl.addTracking(".columns-story .secTitle a",
    "event", "Columnist widget", "click", "Columnist widget Article Headline (1,2,3)");// Column title
  ksl.addTracking(".colHolder .viewMore2",
    "event", "Columnist widget", "click", "Columnist widget More button");// Column more

// most popular
  ksl.addTracking(".mostPopularCommentsRecentHolder li:even>a",
    "event", "Popular Recent Widget", "click", "Popular Recent Widget Recent button");// most recent
  ksl.addTracking(".mostPopularCommentsRecentHolder li:odd>a",
    "event", "Popular Recent Widget", "click", "Popular Recent Widget Popular Button");// most popular
  ksl.addTracking(".mostRecent .mostPopularImageHolder>a img",
    "event", "Popular Recent Widget", "click", "Recent Widget Article Image");// most Recent image
  ksl.addTracking(".mostPopular .mostPopularImageHolder>a img",
    "event", "Popular Recent Widget", "click", "Popular Widget Article Image");// most popular image
  ksl.addTracking(".mostRecent .secTitle a",
    "event", "Popular Recent Widget", "click", "Recent Widget Article Headline");// most popular image


  // article list widgets
  ksl.addTracking("#homeSectionBox .label-headd",
    "event", "Aricle Widget All ", "click", "Aricle Widget All Section label");// section title
  ksl.addTracking(".secnavIconn .down-button",
    "event", "Aricle Widget All ", "click", "Aricle Widget All Move up button");// move up
  ksl.addTracking(".secnavIconn .up-button",
    "event", "Aricle Widget All ", "click", "Aricle Widget All Move down button");// move down
  ksl.addTracking(".secnavIconn .add-button",
    "event", "Aricle Widget All ", "click", "Aricle Widget All Add section");// add section
  ksl.addTracking(".secListWrap .secWrap>a img, .secListWrap  .epwrap>a img",
    "event", "Aricle Widget All ", "click", "Aricle Widget All Article Image");// article image
  ksl.addTracking(".secListWrap .secTitle a",
    "event", "Aricle Widget All ", "click", "Aricle Widget All Article Headline ");// article title
  ksl.addTracking("#homeSectionBox .viewMore",
    "event", "Aricle Widget All ", "click", "Aricle Widget All More button");// more

  // more news
  ksl.addTracking(".story-box>a",
    "event", "More News", "click", "More News More News label"); // headline
  ksl.addTracking(".iconStoriesHolder a",
    "event", "More News", "click", "More News Text Link"); // title
  ksl.addTracking(".wgt-more-bk a",
    "event", "More News", "click", "More News More Button"); // more


  // Starlife
  ksl.addTracking(".starCarouselHeader a",
    "event", "Star Life widget", "click", "Star Life widget Star Life label"); // section
  ksl.addTracking(".starCarouselBody .scTitle a",
    "event", "Star Life widget", "click", "Star Life widget Article Headline ");// title
  ksl.addTracking(".starCarouselBody li>a img",
    "event", "Star Life widget", "click", "Star Life widget Article Image");// image
  ksl.addTracking(".starCarouselBody .leftLive1",
    "event", "Star Life widget", "click", "Star Life widget Left arrow");// left click
  ksl.addTracking(".starCarouselBody .rightLive1",
    "event", "Star Life widget", "click", "Star Life widget Right arrow");// left click

  // photo gallery
  ksl.addTracking(".photoSlideshowFP .label-headd",
    "event", "Photo slideshow widget", "click", "Photo slideshow widget Photo slideshow label");// section
  ksl.addTracking(".photoSlideshow .psSlideshowMainContainer li img",
    "event", "Photo slideshow widget", "click", "Photo slideshow widget Article Image");// image
  ksl.addTracking(".psSlideshowMainContainer .tsTitle-inner",
    "event", "Photo slideshow widget", "click", "Photo slideshow widget Article Headline");// title
  ksl.addTracking(".photoSlideshow  .left",
    "event", "Photo slideshow widget", "click", "Photo slideshow widget Left arrow");// left arrow
  ksl.addTracking(".photoSlideshow  .right",
    "event", "Photo slideshow widget", "click", "Photo slideshow widget Right arrow");// right arrow
  ksl.addTracking(".photoSlideshow  .right",
    "event", "Photo slideshow widget", "click", "Photo slideshow widget Right arrow");// right arrow

  // photo slideshow thumbnail
  $(".psSlideshowSlideContainer .rtSlideshow>a:odd").each(function(idx){
      $(this).click(function(e){
        var eventLabel = "Photo slideshow widget Thumbnail " + (++idx);
        ksl.gaTrackEvent("event", "Photo slideshow widget", "click", eventLabel);
      });
  });

  //video gallery
  ksl.addTracking(".videoGalleryHeading .label-headd",
    "event", "Video Gallery Widget", "click", "Video Gallery Widget Photo slideshow label");// section
  ksl.addTracking(".videoGallery .tsTitle-inner",
    "event", "Video Gallery Widget", "click", "Video Gallery Widget Article Headline");// title
  ksl.addTracking(".videoGallery .videoGalleryMainContainer li img",
    "event", "Video Gallery Widget", "click", "Video Gallery Widget Article Image");// image
  ksl.addTracking(".videoGallery .left",
    "event", "Video Gallery Widget", "click", "Video Gallery Widget Left arrow");// left arrow
  ksl.addTracking(".videoGallery .right",
    "event", "Video Gallery Widget", "click", "Video Gallery Widget Right arrow");// right arrow
  // right side thumbnail
  $("#vdoListRight li>a").each(function(idx){
      $(this).click(function(e){
        var eventLabel = "Video Gallery Widget Thumbnail " + (++idx);
        ksl.gaTrackEvent("event", "Photo slideshow widget", "click", eventLabel);
      });
  });

  // live links
  ksl.addTracking("#liveLinksCarousel>h2",
    "event", "Live links widget", "click", "Live links widget Live links label");// label
  ksl.addTracking("#liveLinksCarousel li>a",
    "event", "Live links widget", "click", "Live links widget Image");// image
  ksl.addTracking("#liveLinksCarousel .leftLive",
    "event", "Live links widget", "click", "Live links widget Left arrow");// LEFT ARROW
  ksl.addTracking("#liveLinksCarousel .rightLive",
    "event", "Live links widget", "click", "Live links widget Left arrow");// RIGHT ARROW

  // footer
  ksl.addTracking(".ftr-icon-fb",
    "event", "Footer Links", "click", "Footer Facebook icon");// fb
  ksl.addTracking(".ftr-icon-twitter",
    "event", "Footer Links", "click", "Footer Twitter Icon");// twitter
  ksl.addTracking(".list-inline.ftr:eq(1) a[href$='http://tamil.thehindu.com/']",
    "event", "Footer Links", "click", "Footer Tamil hindu link");// tamil indhu
  $(".list-inline.ftr:eq(1) a[href!='http://tamil.thehindu.com/']").click(function(e){
    var eventLabel = "Footer " + $(this).text().replace(/[^\w\s]/gi, '').trim() + " link";
    ksl.gaTrackEvent("event", "Footer Links", "click", eventLabel);
  });
  $(".list-inline.ftr:eq(2) a").click(function(e){
    var eventLabel = "Footer " + $(this).text().replace(/[^\w\s]/gi, '').trim();
    ksl.gaTrackEvent("event", "Footer Links", "click", eventLabel);
  });

});

//	tracking of facebook like, twitter follow buttons for all Social Plug-ins
$(window).load(function(){
	 try {
		  twttr.events.bind('follow', function (event) {
			  var category  = ("tw_follow" == $(event.target).parent().prop("id")) ? "Exit Overlay Facebook/Twitter" : "Side Bar Facebook /Twitter";
			  ksl.gaTrackEvent("event", category, "follow", "Twitter follow button");
		  });

		  FB.Event.subscribe('edge.create', function(url, html_element) {
			  var category  = ("fb_like" === $(html_element).parent().prop("id")) ? "Exit Overlay Facebook/Twitter" : "Side Bar Facebook /Twitter";
			  ksl.gaTrackEvent("event", category, "like", "Facebook like button");
		  });
	  } catch (err) {
	  }
});


function addSearchEventTracking()
{
    ksl.gaTrackEvent("event", "Search", "click", "Search Submit");
}
