(function($) {
	'use strict';

var jdate = new Date();
var jdtime = jdate.getTime();

	$(function()
	{ 
		var tweets = new Tweets('http://sportstarlive.foxymoron.tv/feeds/tweet.php?timestamp'+jdtime);
		instagram('http://sportstarlive.foxymoron.tv/feeds/insta.php?timestamp'+jdtime);

	});

	function Tweets (jsonURL) {
		
		this.tweets = [];
		this.user = '';
		this.jsonURL = jsonURL;
		this.tweetHolder = $('.olmp-tweets-wrap');
		this.tweetTemplate = '<div class="olmp-tweet"><p>TWEET_TEXT</p><footer><ul><li><a class="action action--heart img-link share-button" href="https://twitter.com/intent/like?tweet_id=TWEET_ID" title="Like"></a></li><li class="tweet-share"><div class="dropup"><a class="action action--share img-link dropdown-toggle" href="#" title="Share" data-toggle="dropdown"></a><ul class="dropdown-menu"><li class="disabled"><span>Share on</span></li><li><a href="https://twitter.com/intent/retweet?tweet_id=TWEET_ID" class="share-button">Twitter</a></li><li><a href="https://www.facebook.com/sharer/sharer.php?u=https://twitter.com/USER/status/TWEET_ID" class="share-button">Facebook</a></li><li><a href="https://linkedin.com/shareArticle?mini=true&amp;url=https://twitter.com/USER/status/TWEET_ID" class="share-button">LinkedIn</a></li><li><a href="https://tumblr.com/widgets/share/tool?canonicalUrl=https://twitter.com/USER/status/TWEET_ID" target="_blank">Tumblr</a></li></ul></div></li><li class="tweet-time"><span>AGO</span></li></ul></footer></div>';

		this.get();

		var $this = this;

		$(document).on('click', '.load-more-tweets', function (e) {
			e.preventDefault();

			var btn = $(this);

			if ( ! $this.tweets.length )
				return;

			btn.hide();
			btn.siblings('.olmp-loader').addClass('show');

			setTimeout(function () {
				btn.siblings('.olmp-loader').removeClass('show');
				btn.show();
				$this.load(3);
			}, 1000);
		});
	}

	Tweets.prototype.get = function ()
	{
		var $this = this;

		$.getJSON($this.jsonURL, function( data ) {
			$this.tweets = data.tweets;
			$this.user = data.info.screen_name;
			$this.load(3);
		});
	};

	Tweets.prototype.load = function (num)
	{
		var $this = this;

		for (var i = 0; i < num; i++) {
			$this.tweetHolder.append(
				$this.tweetTemplate.replace('TWEET_TEXT', JQTWEET.ify.clean($this.tweets[i].text))
				.replace('AGO', JQTWEET.timeAgo($this.tweets[i].created_at))
				.replace(/TWEET_ID/g, $this.tweets[i].id_str)
				.replace(/USER/g, $this.user)
				);

		}

		for (var i = 0; i < num; i++) {
			$this.tweets.shift();
		}
	};

	function instagram (jsonURL)
	{
		$.getJSON(jsonURL, function( data )
		{
			var items = '';

			$.each( data.posts, function( key, val ) {
			items += '<div class="item"><a href="'+val.link+'" class="img-link" target="_blank"><img alt="" src="'+val.standard_resolution+'" class="image-responsive"/></a></div>';
			});

			$('.olmp-carousel-sidebar').html(items);

			$('.olmp-carousel-sidebar').owlCarousel({
				loop: true,
				nav: true,
				dots: false,
				autoplay: true,
				responsive: {
					0: {
						items: 1,
						slideBy: 1
					}
				}
			});
		});
	}

})(jQuery);  