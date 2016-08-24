(function ($) {
	var dataPath =  window.location.host == 'sportz:8079' || window.location.host == '192.168.100.1:8079' ? 'http://hosted.stats.com/ifb2009/data.asp?file=en/' : 'http://hosted.stats.com/ifb2009/data.asp?file=en/';
	var jsonType = 'normal';
	var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var imgPath = 'http://hosted.stats.com/ifb2009/badges/';
	var indexNo=0;
	var totalMatches=0;
	var refreshRate=30000;
	var refreshTimer;
	var currentLeag;
	var mySports=[];
	var currentSports
	var matchDates;
	var adjusted_width = 2;
	var _mSwiper;
	var Series_Id = "";
	
	var Init = function () {
		$('.si-sportstarRgt').css('left','-91px')
	  	loadConfig();
		var url="http://hosted.stats.com/nba/sportcentre/dataJSON.asp?file=en/nba_matchlist.txt&timezone=IST&json=n&pad=y";
		
	};
	
	function toggle(ele){
		//var newSport = $('.si-sportstarRgt .firstChild span').html();
		var newSport = $(ele).find('span').html();
		var oldSport = $('.si-sportstarLft .firstChild span').html();
		$(ele).find('span').html(oldSport);
		$('.si-sportstarLft .firstChild span').html(newSport);
		return newSport;
	}
	
	function fnToggleSports(){
		var currentsport = toggle($(this));
		//$('.si-menu').remove();
		//$('.si-sportstarTop .secondChild').addClass('active');
				
		if($('.si-sportstarLft .firstChild').hasClass('active')){
			$('.si-sportstarLft .firstChild').removeClass('active');
			$('.si-sportstarRgt').animate({"left":"-91px"},500)
		}
		
		$('#matchs-data').empty();
		$('#matchs-data').css('width','auto')
		
		$('#matchs-data').css('left','0')
		$('#matchs-data').css('transform', 'translate3d(0px, 0px, 0px)')
		showLoader($('#matchs-data'));
		
		$('.si-sportstarTop').html('<div class="tabs"><span class="firstChild">Scoreboard</span><span class="secondChild active">International</span><span class="thirdChild">Domestic</span></div></div>');
		
		
		if($('.si-sportstarwrp').hasClass('iptl'))$('.si-sportstarwrp').removeClass('iptl');
			
		if(currentsport.toLowerCase() == "cricket"){
			currentSports = "cricket";
						
			$('.si-sportstarwrp').removeClass().addClass('si-sportstarwrp default cricket');
			
			$('.si-sportstarTop .secondChild').html('International');
			
			//if($('.si-sportstarTop .thirdChild').hasClass('domestic'))
				//$('.si-sportstarTop .thirdChild').show();
			
			$('.si-sportstarTop .secondChild').off('click').on('click',function(){
				
				console.log(currentSports);
				
				/*if(Series_Id)						
						$('.si-sportstarTop .secondChild').html('India Vs South Africa');		
					else		
						$('.si-sportstarTop .secondChild').html('International');	*/	
					
				$('.si-sportstarTop').find('.active').removeClass('active');
				$(this).addClass('active');
				
				if(currentSports != "football"){
					showLoader($('#matchs-data'));
					cricketInit("allLive");
				}
					
			})
			
			$('.si-sportstarTop .thirdChild').off('click').on('click',function(){
				$('.si-sportstarTop').find('.active').removeClass('active');
				$(this).addClass('active');
				showLoader($('#matchs-data'));
				cricketInit("domestic");
			})
			
			showLoader($('#matchs-data'));
			//$('.si-sportstarTop .thirdChild').show();
			var league = $('.si-sportstarTop').find('.active').html().toLowerCase();
			if(league ==  "international" || league ==  "intl" )
				cricketInit("allLive");
			if(league ==  "domestic" || league == "dom")
				cricketInit("domestic");
						
						 
		}else if(currentsport.toLowerCase() == "football"){
			currentSports = "football";
			
			$('.si-sportstarwrp').removeClass().addClass('si-sportstarwrp default football');
			
			$('.si-sportstarTop .secondChild').html('Indian Super League');
			
			$('.si-sportstarTop').find('.active').removeClass('active');
			$('.si-sportstarTop .secondChild').addClass('active');
			
			$('.si-sportstarTop .thirdChild').hide();	
			showLoader($('#matchs-data'));
			footballInit("india_sl");
			
		}
		else if(currentsport.toLowerCase() == "tennis"){
			
			currentSports = "tennis";
			$('.si-sportstarwrp').removeClass().addClass('si-sportstarwrp default tennis');	
			
			$('.si-sportstarTop').find('.active').removeClass('active');
			$('.si-sportstarTop .secondChild').addClass('active');
			
			$('.si-sportstarTop .thirdChild').hide();	
			showLoader($('#matchs-data'));
			tennisInit();
		}
		else if(currentsport.toLowerCase() == "kabaddi"){
			currentSports = "kabaddi";
			
			$('.si-sportstarwrp').removeClass().addClass('si-sportstarwrp default  kabbadi');
			
			$('.si-sportstarTop .secondChild').html('Pro Kabaddi League');
			
			$('.si-sportstarTop .thirdChild').hide();

			kabaddiInit();	
		}else if(currentsport.toLowerCase() == "motosports"){
			currentSports = "motosports";
			
			$('.si-sportstarwrp').removeClass('motosports football kabaddi iptl').addClass('default');
			
			
			$('.si-sportstarTop .thirdChild').hide();

			motosportsInit('motosports');	
		}
		// else if(){
			
		// }else if(){
			
		// }
		
	}
	
	
	function loadConfig(){
		var url='config.txt';
		showLoader($('#matchs-data'));
		loadJSON(jsonType, url, function(data) {
			config = parseText(data);					
			var stringToSplit=window.location;
			var separator="?";
			var andseparator="&";
			var eseparator="=";
			var sportsID=(config.sports).split("|");
			currentSports=config.default_sports;
			
			externalLeag="allLive"
			$('#prev').off('click').on('click', function (e) {
				if($(this).hasClass('nav-disabled'))
					return;
				
				if(indexNo>0){
					indexNo-=1;					
					navigateMatches(indexNo,totalMatches);
				}
			})
			$('#next').off('click').on('click', function (e) {
				if($(this).hasClass('nav-disabled'))
					return;
				if($(window).width() <= 1024)var scrollItem=1;
				else var scrollItem=2;
				
				
				if(indexNo<(totalMatches-scrollItem)){
					indexNo+=1;					
					navigateMatches(indexNo,totalMatches);
				}
			})
			
			if(stringToSplit.toString().indexOf("?") > 0){
				a=(String(stringToSplit).split(String(separator)));
				b=(String(a[1]).split(String(andseparator)));
				c=(String(b[0]).split(String(eseparator)));
				d=(String(b[1]).split(String(eseparator)));
				e=(String(b[2]).split(String(eseparator)));
				var defaultSports = "";
				if(c[0] == "defaultsports")
					currentSports = c[1];
				else{
					defaultSports = c[1];
					var lowerSport = defaultSports.toLowerCase();
					if(['motosports','f1','motogp'].indexOf(lowerSport)>-1){
						$('.si-sportstarTop .tabs .firstChild').html('Racecentre');
					}
				}
					
				var externalSports = d[0];
				Series_Id = d[1];
				if(Series_Id)
					$('.si-sportstarTop .thirdChild').remove();
				
				if(defaultSports=="default"){
					currentSports=externalSports;
					currentLeag=externalLeag;
				}else if(defaultSports=="mysports"){
					currentSports="all";
					mySports=b;
					sportsID=[];
					for(var i=0;i<b.length;i++){
						sportsID.push(b[i].split("=")[0])
						sportsID[0]="all";
					}
					
				} 
			}
			console.log(defaultSports)
			
			$('.si-sportstarLft .firstChild').off('click').on('click',function(){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					$('.si-sportstarRgt').animate({"left":"-91px"},500)
				}
					
				else{
					$(this).addClass('active');
					if($(window).width() >= 768 && $(window).width() <= 1920)
						$('.si-sportstarRgt').animate({"left":"40px"},500)
					else
						$('.si-sportstarRgt').animate({"left":"30px"},500)
				}
				
			})
			
			$(document).off('click').on('click',function(e){
				
				if($(e.target).closest('.si-sportstarLft').length == 0)
					if($('.si-sportstarLft .firstChild').hasClass('active')){
						$('.si-sportstarLft .firstChild').removeClass('active');
						$('.si-sportstarRgt').animate({"left":"-91px"},500)
					}
			})
			
			
			$('.si-sportstarRgt .secondChild').off('click').on('click',fnToggleSports);
			
			$('.si-sportstarRgt .firstChild').off('click').on('click',fnToggleSports);
			
			$('.si-sportstarTop .secondChild').off('click').on('click',function(){
				//console.log(currentSports)
				/*if(Series_Id)						
						$('.si-sportstarTop .secondChild').html('India Vs South Africa');		
					else{
						if(currentSports == "cricket")
							$('.si-sportstarTop .secondChild').html('International');
						if(currentSports == "tennis")
							$('.si-sportstarTop .secondChild').html('ATP');
					}*/		
								
					
				$('.si-sportstarTop').find('.active').removeClass('active');
				$(this).addClass('active');
				
				//if(currentSports != "football"){
					if(currentSports == "football"){
						showLoader($('#matchs-data'));
						$('.si-sportstarRgt .firstChild.football').trigger('click');
					}
					if(currentSports == "cricket"){
						showLoader($('#matchs-data'));
						cricketInit("allLive");
					}
					if(currentSports == "tennis"){
						showLoader($('#matchs-data'));
						//tennisInit("atp");
						$('.si-sportstarRgt .firstChild.tennis').trigger('click');
					}
					if(currentSports == "kabaddi"){
						showLoader($('#matchs-data'));
						//kabaddiInit();
						$('.si-sportstarRgt .firstChild:last').trigger('click');
					}
					
				//}
					
			})
			
			$('.si-sportstarTop .thirdChild').off('click').on('click',function(){
				$('.si-sportstarTop').find('.active').removeClass('active');
				$(this).addClass('active');
				showLoader($('#matchs-data'));
				if($('.si-sportstarwrp').hasClass('cricket'))
					cricketInit("domestic");
				
				if($('.si-sportstarwrp').hasClass('tennis'))
					tennisInit("wta");
			})
			
			//$('.si-sportstarTop .secondChild').trigger('click');
			
			
			
			if(defaultSports == "cricket"){
				
				/*if(Series_Id)$('.si-sportstarTop .secondChild').html('India Vs South Africa');	else $('.si-sportstarTop .secondChild').html('International');*/
				currentSports = defaultSports;
				$('.si-sportstarTop .secondChild').html('International');
				$('.si-sportstarwrp').addClass('cricket');
				$('.si-sportstarLft .firstChild span').text('cricket');
				$('.si-sportstarRgt').remove();
				$('.si-sportstarLft').remove();
				$('.si-sportstarMain').css('padding','0');
				//cricketInit("allLive");
				
				$('.carusalRgt.carusalArw').css("right","-25px");
				$('.si-sportstarTop .secondChild').trigger('click');
				
			}else if(defaultSports == "football"){
				currentSports = defaultSports;
				$('.si-sportstarTop .secondChild').html('Indian Super League');
				$('.si-sportstarTop .secondChild').addClass('active');
				$('.si-sportstarTop .thirdChild').remove();
				$('.si-sportstarLft .firstChild span').text('Football');
				$('.si-sportstarRgt').remove();
				$('.si-sportstarLft').remove();
				$('.si-sportstarMain').css('padding','0');
				$('.si-sportstarwrp').addClass('football');
				$('.si-sportstarwrp').removeClass('iptl');
				$('.carusalRgt.carusalArw').css("right","-25px");
				footballInit("india_sl");
			}
			else if(defaultSports == "tennis"){
				
				currentSports = defaultSports;
				$('.si-sportstarTop .secondChild').html('ATP');
				$('.si-sportstarTop .secondChild').addClass('active');
				$('.si-sportstarTop .thirdChild').remove();
				$('.si-sportstarRgt').remove();
				$('.si-sportstarLft').remove();
				$('.si-sportstarMain').css('padding','0');
				$('.si-sportstarwrp').addClass('tennis');
				$('.carusalRgt.carusalArw').css("right","0px");
				tennisInit('atp');
			}
			else if(defaultSports == "kabaddi"){
				currentSports = defaultSports;
				$('.si-sportstarwrp').removeClass().addClass('si-sportstarwrp  kabbadi');
				$('.si-sportstarTop .secondChild').html('Pro Kabaddi League');
				$('.si-sportstarTop .secondChild').addClass('active');
				$('.si-sportstarTop .thirdChild').remove();
				$('.si-sportstarRgt').remove();
				$('.si-sportstarLft').remove();
				$('.si-sportstarMain').css('padding','0');
				
				$('.carusalRgt.carusalArw').css("right","0px");
				kabaddiInit();
			}else if(['f1','motogp','motosports'].indexOf(defaultSports) >-1){
				currentSports = defaultSports;
				$('.si-sportstarwrp').removeClass('tennis football iptl kabaddi').addClass('motosports');
				$('.si-sportstarTop .secondChild').html('F1');
				$('.si-sportstarTop .secondChild').addClass('active');
				$('.si-sportstarTop .thirdChild').remove();
				$('.si-sportstarRgt').remove();
				$('.si-sportstarLft').remove();
				$('.si-sportstarMain').css('padding','0');
				$('.carusalRgt.carusalArw').css("right","0px");
				$('.si-menu').show();
				if(defaultSports == 'f1'){
					motosportsInit(defaultSports);
					$('.si-menu').hide();
					$('.mob-menu').hide();
				}else{
					if(defaultSports =='motogp'){
						$('.si-menu').hide();
						$('.mob-menu').hide();
					}
					motosportsInit('motogp');
				}
			}else{
				$('.si-sportstarTop .tabs').show();
				$('.si-sportstarTop .secondChild').trigger('click');
				$('.si-sportstarwrp').addClass('default');
				$('.si-sportstarwrp').addClass('cricket');
			}
		})
	
	}
	//////////////////////// football code start //////////////////////////////////////////
	var footballInit = function (externalLeag) {
		//$('.si-sportstarTop').html('<div class"tabs"></div>')
		var teamList = [];
		var matchList=[];
		var liveMatch=[];
		var fixMatch=[];
		var resMatch=[];
		var matches=[];
		var teamSchedule=[];
		var imgPath = 'http://hosted.stats.com/ifb2009/badges/';
		var config;
		var matchDate=0;
		
		var url='new_football_config.txt';
		
		loadJSON(jsonType, url, function(data) {
			config = parseText(data);
			var leagIds=(config.leag_set).split("|")
			var leagNames=(config.leag_lbl).split("|")
			var default_league = config.series;
					
			//leagLoad(default_league)
			function leagLoad(currentLeag){
				teamList = [];
				matchList=[];
				liveMatch=[];
				fixMatch=[];
				resMatch=[];
				matches=[];
				teamSchedule=[];
				indexNo=0;	
				matchDate=0;
				clearInterval(refreshTimer);
				refreshTimer = null;
				showLoader($('#matchs-data'));
				getMatchList(currentLeag);
			}
			$('.tabs').children().not('.firstChild').remove();
			
			createTabs(leagIds,leagNames);
			
			$('.tabs .tab-select').on('change',function(){
				var val = $(this).children('option:selected').val();
				if(val == 'euro' && $('body').hasClass('si-euro-2016')){
					window.open("http://www.sportstarlive.com/football/matchcentre/euro-2016-euro/schedule/dates/","_blank");
					return;
				}
				var text = $(this).children('option:selected').text();
				if($(window).width() < 340 && text.toLowerCase() == "english premier league")
					$('.mob-menu span').html("EPL");
				else
					$('.mob-menu span').html(text);
				currentLeag=val;
				
				leagLoad(currentLeag)
			
			});
			
			$('.tabs span').not('.firstChild').on('click',function(){
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				var val = $(this).attr('data-legname');
				if(val == 'euro' && $('body').hasClass('si-euro-2016')){
					window.open("http://www.sportstarlive.com/football/matchcentre/euro-2016-euro/schedule/dates/","_blank");
				}else{
					currentLeag=val;
					leagLoad(currentLeag);
				}
				
			});
			
			currentLeag = $('.tabs .tab-select').first().val() == undefined ? $('.tabs span:nth-child(2)').attr('data-legname'):$('.tabs .tab-select').first().val();
			
			//currentLeag="india_sl"
			
			$('.mob-menu span').html($('.tabs .tab-select').children().first().text());
			
			$('.tabs span[data-legname="'+currentLeag+'"]').addClass('active');
			
			leagLoad(currentLeag)
			
			});
			
			function getMatchList(series) {
				matches=[];				
				var url=dataPath+series+"_live.txt&timezone=IST&mobile=true&json=y&pad=y";
				//var url="http://192.168.100.66/football_testing.txt?pad=y";
				
				
				loadJSON("", url, function(data) {
					liveMatch = data.matches;
									
				var url=dataPath+series+"_results.txt&timezone=IST&mobile=true&json=y&pad=y";
				loadJSON("", url, function(data) {
					
					fixMatch = data.matches.fixtures;
					resMatch = data.matches.results;
					
					
					for(var i=0;i<resMatch.length;i++){
						matches.push(resMatch[i]);
					}
					for(var i=0;i<liveMatch.length;i++){
						matches.push(liveMatch[i]);
					}
					for(var i=0;i<fixMatch.length;i++){
						matches.push(fixMatch[i]);
					}
					for(var i=0;i<matches.length;i++){
					if(parseInt(matches[i].statusID)==1){
						indexNo=i
						break;
					}else if(parseInt(matches[i].statusID)==0){
						indexNo=i
						break;
					}else indexNo=matches.length-2;
				}
					totalMatches=matches.length;
					displayData();
					});
				});	
			};
			
			function displayData(){
				refreshRate=30000;
				var hgtWdt='width="100%" height="100%"'
				
				imgPath = 'http://hosted.stats.com/ifb2009/badges/logos-47x47/';
				
				
				var div=''
				for(var i=0;i<totalMatches;i++){
					var matchData = matches[i];
					
					var score="";
					var scoreClass="score";
					var mstats=matchData[2];
					var exta="vsbleHide"
					var img='<img width="12" height="12" src="images/sel.png" />'
					var ids="item"+i;
					var t1score='';
					var t2score='';
					var matchClass=' liverecent';
					var pent1score='';
					var pent2score='';
					var livestatusDisplay = "";	
					var vsIcon = "";
					var timeClass= "";
					var liveClass = "";
					var penalty_score="";
					var agg_score = "";
					var match_status = "";
					
					
					if(matchData.pen.length>0){
						penalty_score = "Pen:"+matchData.pen[0]+"-"+matchData.pen[1];
					}
					if(matchData.agg.length>0){
						agg_score = "Agg:"+matchData.agg[0]+"-"+matchData.agg[1];
					}
					
					
					if(matchData.score.length>0){
						t1score=matchData.score[0];
						t2score=matchData.score[1]; 
						
						livestatusDisplay = matchData.statusDisplay;
						
						var si_tmtxt = "-";
						
						if(livestatusDisplay == "FT"){
							livestatusDisplay = "Full Time";
							match_status = "Result";
						}else if(livestatusDisplay == "HT"){
							livestatusDisplay = "Half Time";
							match_status = "Live";
						}
						else if(isNumber(livestatusDisplay)){
							
							if(parseInt(livestatusDisplay,10)<=45)livestatusDisplay = "1st Half";
							else if(parseInt(livestatusDisplay,10)<=90)livestatusDisplay = "2nd Half";
							else livestatusDisplay = "Live";
							timeClass = "si-time";
							liveClass = "si-live";
							match_status = "Live";
							si_tmtxt = matchData.statusDisplay+"'";
						}
						else{
							livestatusDisplay = livestatusDisplay;
							
						}
							
						if(matchData.statusID=='1')match_status = "Live";						
						score='<div class="si-matchcontent"><div class="matchteam-score team1"><span>'+t1score+'</span></div><div class="matchtime-detail"><span class="si-matchtime '+timeClass+'">'+si_tmtxt+'</span></span></div><div class="matchteam-score team2"><span>'+t2score+'</span></div></div>'						
						exta='';
						
					
					}else{
						exta="vsbleHide";
						vsIcon = "<span class='vsIcon'>VS</span>";
						match_status = "Upcoming";
						var t=matchData.time.split(":");
						matchClass='';
						if(parseInt(t[0],10)<=9)t[0]='0'+t[0];
						
						
											
						var _s=matchData.statusDisplay?matchData.statusDisplay:'';
						if(_s=='' && matchData.statusID==0)_s='Pre Match'
						agg_score=""
						penalty_score=""
						score='<div class="si-matchcontent"><div class="matchteam-detail"><span class="si-txt1"></span><span class="si-txt2">'+convertDate(matchData.date)+'</span><span class="si-txt3">'+t[0]+" : "+t[1]+' IST </span></div></div>'
					}
					var watchlive='';
					
					var lastEleClass="";
					if(i==(totalMatches-1)){
						lastEleClass=" hm-rBrdr";
					}
					var tmAImg=matchData.hmteam.id;
					var tmBImg=matchData.awteam.id;
					var teamA=matchData.hmteam.sc;
					var teamB=matchData.awteam.sc;
					var tmATag='',tmBTag='';
					
					tmATag='<img src="'+imgPath+tmAImg+'.png">'
					tmBTag='<img src="'+imgPath+tmBImg+'.png">'
					if(teamA==''){
						teamA="TBD"
						tmATag='<img src="'+imgPath+'tbd.png">'
					}
					if(teamB==''){
						teamB="TBD"
						tmBTag='<img src="'+imgPath+'tbd.png">'
					}
										
					_s = livestatusDisplay == "" ? _s : livestatusDisplay; //'+matchData.statusDisplay+'
					
					
					
					div+='<div class="swiper-slide carusalBox sportsbox '+matchClass+'" id="'+matchData.globalcode+'" matchid="'+matchData.globalcode+'" tmA="'+matchData.hmteam.name+'" tmB="'+matchData.awteam.name+'"><span class="match-status '+match_status+'">'+match_status+'</span><div class="carusalCont"><div class="ss-tmlogo ss-tmlogoLft"><span class="firstChild">'+tmATag+'</span><span class="secondChild">'+teamA+'</span></div><div class="ss-tmlogo ss-tmlogoRgt"><span class="firstChild">'+tmBTag+'</span><span class="secondChild">'+teamB+'</span></div><div class="si-contTop"><span class="si-liveBadge '+liveClass+'">'+_s+'</span></div><div class="si-contVs">'+vsIcon+'</div><div class="si-contMid"><span class="livescore">'+score+'</span></div><div class="si-contBot"><span><span class="penalty_score">'+penalty_score+'</span><br><span class="agg_score">'+agg_score+'</span></span></div></div></div>'
				}
				removeLoader();
				$('#matchs-data').html(div);
				
				var _w=($('.sportsbox').outerWidth()+5)*totalMatches;
				//$('#matchs-data').css("width",_w);
				
				
				if($(window).width() < 600){
					$('.sportsbox').outerWidth($('.carusalDv').outerWidth()+adjusted_width);
				}
				else if($(window).width() >= 600 && $(window).width() <= 1024){
					$('.sportsbox').outerWidth($('.carusalDv').outerWidth()/2 +adjusted_width );
				}
				
				if(_mSwiper){
					_mSwiper.reInit();
					_mSwiper.resizeFix(_w)	
				}else swipSlide($('.carusalDv'),'.carusalDv',indexNo);
				
				navigateMatches(indexNo,totalMatches);
				
					
				clearInterval(refreshTimer);
				refreshTimer = null;
				if (refreshTimer == null) {
					refreshTimer = setInterval(function () {
						//$('.si-sportstarTop .secondChild').html('Indian Super League');
						updateLiveMatchs();
					},refreshRate);
				}
				
				//if(currentLeag == "india_sl"){
					$('.liverecent').each(function () {
						$(this).off('click').on('click', function (e) {
							thisRef=$(this);	
							console.log(currentLeag);
							var tmA=$(thisRef).attr('tmA').replace(/\s/g, '-').toLowerCase();
							
							var tmB=$(thisRef).attr('tmB').replace(/\s/g, '-').toLowerCase();
							//console.log($(thisRef).attr('tmA'));
							//console.log($(thisRef).attr('tmB'));
							//console.log($(thisRef).attr('matchid'));
							console.log(currentLeag);
							
							var url = "http://www.sportstarlive.com/football/matchcentre/";
							switch(currentLeag){
								case "india_sl":
									url += "isl/isl-matchcentre/?gamecode=";
									break;
								case "epl":	
									url += "english-premier-league-epl"
									break;
								case "liga":
									url += "la-liga-liga";
									break;
								case "bund":
									url += "bundesliga-bund";
									break;
								case "chlg": 
									url += "champions-league-chlg";
									break;
								case "uefa":
									url += "europa-league-uefa";
									break;
								case "euro":
									url += "euro-2016-euro";
									break;
							}
							var _url=url+"/matchpage/"+tmA+"-vs-"+tmB+'-'+$(thisRef).attr('matchid')						
							//console.log(_url)
							window.open(_url, '_blank');
						})
												
					});
				//}
				
				
				
		}
		function updateLiveMatchs(){
			var url=dataPath+currentLeag+"_live.txt&timezone=IST&json=y&pad=y&mobile=true";
			//var url ="http://192.168.100.66/football_testing.txt?pad=y";
			loadJSON("", url, function(data) {
			var liveMatchLen=data.matches.length;
			  for(var i=0;i< liveMatchLen;i++){
				var ele=$('#'+data.matches[i].globalcode);
				var t1score='';
				var t2score='';
				var msts='';
				var penalty_score = "";
				var agg_score = "";
				var pent1score='';
				var match_status = "";
					var pent2score='';					
					if(data.matches[i].pen.length>0){
						penalty_score = "Pen:"+matchData.pen[0]+"-"+matchData.pen[1];
					}
					if(data.matches[i].agg.length>0){
						agg_score = "Agg:"+matchData.agg[0]+"-"+matchData.agg[1];
					}
					
				
				if(data.matches[i].score.length>0){
					t1score=data.matches[i].score[0];
					t2score=data.matches[i].score[1];
					var livestatusDisplay=data.matches[i].statusDisplay;
					
					var si_tmtxt="",timeClass="",liveClass="";
					if(livestatusDisplay == "FT"){
						livestatusDisplay = "Full Time";
						//macth_status = "Recent"
						macth_status = "Result"
					}
						
					else if(livestatusDisplay == "HT"){
						livestatusDisplay = "Half Time";
						macth_status = "Live";
					}
					else if(isNumber(livestatusDisplay)){
						if(parseInt(livestatusDisplay,10)<=45)livestatusDisplay = "1st Half";
						else if(parseInt(livestatusDisplay,10)<=90)livestatusDisplay = "2nd Half";
						else livestatusDisplay = "Live";
						timeClass = "si-time";
						liveClass = "si-live";
						si_tmtxt = data.matches[i].statusDisplay+"'";
						macth_status = "Live";
					}
					else {
						livestatusDisplay = livestatusDisplay;
						macth_status = "Upcoming";
					}
						
					score='<div class="si-matchcontent"><div class="matchteam-score team1"><span>'+t1score+'</span></div><div class="matchtime-detail"><span class="si-matchtime '+timeClass+'">'+si_tmtxt+'</span></span></div><div class="matchteam-score team2"><span>'+t2score+'</span></div></div>';
					
					$(ele).find('.match-status').attr('class','match-status '+macth_status);
					$(ele).find('.si-liveBadge').html(livestatusDisplay);
					$(ele).find('.livescore').html(score);
					$(ele).find('.penalty_score').html(penalty_score);
					$(ele).find('.agg_score').html(agg_score);
				}
							
			  }
			  		  
		});
	  }
	  
    };
	//////////////////////// football code end /////////////////////////////////////////////
	//////////////////////// cricket code start ////////////////////////////////////////////
	var cricketInit = function (externalLeag) {
		//$('.tab').removeClass('tab')
		var matchList=[];
		var liveMatch=[];
		var fixMatch=[];
		var resMatch=[];
		var matches=[];
		var leagS=[];
		var imgPath = 'http://cricket.widgets.stats.com/countryflags/';
		var config;
		indexNo=0;
			
		var url='new_cricket_config.txt';
		clearInterval(refreshTimer);
		refreshTimer = null;
		loadJSON(jsonType, url, function(data) {
			config = parseText(data);			
			currentLeag=config.series;
			
			var leagIds=(config.leag_set).split("|")
			var leagNames=(config.leag_lbl).split("|")
								
			
			function leagLoad(currentLeag){
				indexNo=0;	
				matchDate=0;
				clearInterval(refreshTimer);
				refreshTimer = null;
				showLoader($('#matchs-data'));
				
				getMatchList(currentLeag);
			}
			
			$('.tabs').children().not('.firstChild').remove();
			
			if(!Series_Id){
				createTabs(leagIds,leagNames);
			
				//$('.tabs .si-menu:last').addClass('si-lowercase');
				
				$('.tabs .tab-select').on('change',function(){
					var val = $(this).children('option:selected').val();
					if(val == "ausvsind"){
						window.open("http://www.sportstarlive.com/cricket/cricket-matchcentre/cricket-fixtures/","_blank")
						return ;
					}else if(val == 'iplt20'){
						window.open("http://www.sportstarlive.com/cricket/cricket-fixtures/indian-league-t20-2569","_blank");
					}else{
						var text = $(this).children('option:selected').text();
						if($(window).width() < 340 && text.toLowerCase() == "english premier league")
							$('.mob-menu span').html("EPL");
						else
							$('.mob-menu span').html(text);
						currentLeag=val;
						
						leagLoad(currentLeag)
						
					}
				
				});
				
				$('.tabs span').not('.firstChild').on('click',function(){
					var val = $(this).attr('data-legname');
					if(val == "ausvsind"){
						window.open("http://www.sportstarlive.com/cricket/cricket-matchcentre/cricket-fixtures/","_blank")
						return;
					}else if(val == 'iplt20'){
						window.open("http://www.sportstarlive.com/cricket/cricket-fixtures/indian-league-t20-2569","_blank");
					}else{
						$(this).siblings().removeClass('active');
						$(this).addClass('active');
						currentLeag=val;
						leagLoad(currentLeag);
					}
				});
				
				currentLeag = $('.tabs .tab-select').first().val() == undefined ? $('.tabs span:nth-child(2)').attr('data-legname'):$('.tabs .tab-select').first().val();
				
				//currentLeag="india_sl"
				
				$('.mob-menu span').html($('.tabs .tab-select').children().first().text());
				
				$('.tabs span[data-legname="'+currentLeag+'"]').addClass('active');
			}
			
			leagLoad(externalLeag);		
			//leagLoad("domestic");		
			});
			function checkIndiaMatch(resMatch,cb){
				for(var i = 0 ; i < resMatch.length;i++){
					var data = resMatch[i];
					if(data.teama.toLowerCase() == "india" || data.teamb.toLowerCase() == "india"){
						indexNo = i;
					}						
				}
				if(cb)cb(indexNo)
			}
			function checkIndiaUpComingMatch(_matches,cb){
				for(var i = 0 ; i < _matches.length;i++){
					var data = _matches[i];
					//console.log(i +"--"+data.upcoming)
					//console.log(data.teama.toLowerCase(),data.teamb.toLowerCase())
					if((data.upcoming==1) && (data.teama.toLowerCase() == "india" || data.teamb.toLowerCase() == "india")){
						//console.log(i)
						indexNo = i;
						break;
					}
						
				}
				//return indexNo;
				if(cb)cb(indexNo)
			}
		
			function getIndiaMatch(_matches,indexNo,cb){
				var _indexNo = "";
				
				for(var i = 0 ; i < _matches.length;i++){
					var data = _matches[i];
					if(data.live == 1 && (data.teama.toLowerCase() == "india" || data.teamb.toLowerCase() == "india")){
						_indexNo = i;
						break;
					}
				}
				
				if(!_indexNo){
					for(var i = 0 ; i < _matches.length;i++){
						var data = _matches[i];
						if(data.teama.toLowerCase() == "india" || data.teamb.toLowerCase() == "india"){
							if(data.matchresult){
								var d = data.matchdate_ist.split('/');
								var t = data.matchtime_ist.split(':')
								var matchDate = new Date(d[2],d[0]-1,d[1],t[0],t[1]);
								
								var cDate = new Date();
								
								var diff = Math.abs((cDate - matchDate)/3600000);
								
								if(diff <= 12){
									_indexNo = i;
									break;
								}
									
								
							}
						}
					}
					
					if(!_indexNo){
						for(var i = 0 ; i < _matches.length;i++){
							var data = _matches[i];							
							if(data.upcoming == 1 && (data.teama.toLowerCase() == "india" || data.teamb.toLowerCase() == "india")){
								var d = data.matchdate_ist.split('/');
								var t = data.matchtime_ist.split(':')
								var matchDate = new Date(d[2],d[0]-1,d[1],t[0],t[1]);
								
								var cDate = new Date();
								
								var diff = Math.abs((matchDate - cDate)/3600000);
								
								if(diff <= 12){
									_indexNo = i;
									break;
								}
							}
						}
					}
				}
				if(!_indexNo)_indexNo=indexNo;
				if(cb){cb(_indexNo)}
				
			}
		
			function getMatchList(series) {
				
				if(Series_Id)
					var cricketUrl="http://cricket.hosted.stats.com/apis/fixtures/fetch_fixtures_json.aspx?series="+Series_Id;
					if(Series_Id==2418 || Series_Id==2419)var cricketUrl="http://cricket.hosted.stats.com/apis/fixtures/fetch_fixtures_json.aspx?tour=270";
				else{
					var cricketUrl="http://cricket.hosted.stats.com/apis/fixtures/fetch_fixtures_json.aspx?cal=calendar_new_liupre";
					if(series=="allLive")var cricketUrl="http://cricket.hosted.stats.com/apis/fixtures/fetch_fixtures_json.aspx?cal=calendar_new_liupre";
					else if(series=="domestic")var cricketUrl="http://cricket.hosted.stats.com/apis/fixtures/fetch_fixtures_json.aspx?cal=calendar_new_domestic_indian_liupre";
				}
				
				loadJSON("", cricketUrl, function(data) {
					
					if(typeof(data.data) != "object"){
						removeLoader();
						//console.log(data);
						$('#matchs-data').html('<div>No Data available</div>');
						return;
						/*clearInterval(refreshTimer);
						refreshTimer = null;
						setTimeout(function(){
							if(series == "international")
								getMatchList("allLive");
							else if(series == "domestic")
								getMatchList("domestic");
							else
								getMatchList();
						},5000)*/
						
					}else{
					//console.log(data);
					if(Series_Id){
						var div = ""
						$('div.secondChild.series-title').remove();
						if($(window).width() > 767){
							div = "<div class='secondChild series-title' style='cursor:default;color:white;'>"+data.data.teams[0].full_name+" vs "+data.data.teams[1].full_name+"</div>"
						}else{
							div = "<div class='secondChild series-title' style='cursor:default;color:white;'>"+data.data.teams[0].short_team_name+" vs "+data.data.teams[1].short_team_name+"</div>"
						}
						
						$('.tabs').append(div);
					}
					var resMatch=[];
					var livMatch=[];
					var fixMatch=[];
					matches=[];
					for(var i=0;i<data.data.matches.length;i++){
						var s_name=data.data.matches[i].series_short_display_name;
						if (jQuery.inArray(s_name, leagS) == -1) {
							if(s_name!='')leagS.push(s_name);
						}
						if(data.data.matches[i].live=='1' || data.data.matches[i].live=='yes')livMatch.push(data.data.matches[i])
						else if(data.data.matches[i].recent =='1' || data.data.matches[i].recent=='yes')
							resMatch.push(data.data.matches[i]);
						else if(data.data.matches[i].upcoming =='1'|| data.data.matches[i].upcoming=='yes')
							fixMatch.push(data.data.matches[i]);
					}
					for(var i=0;i<resMatch.length;i++){
						matches.push(resMatch[i]);
					}
					//livMatch.reverse();
					livMatch.sort(function(a,b){
						if(a.live ==1 && b.live == 1)
							return parseInt(a.priority)-parseInt(b.priority);
					});
					
					for(var i=0;i<livMatch.length;i++){
						matches.push(livMatch[i]);
					}
					for(var i=0;i<fixMatch.length;i++){
						matches.push(fixMatch[i]);
					}
					totalMatches=matches.length;
						
					if(refreshTimer==null){
						indexNo=resMatch.length;
						/* if(livMatch.length<=1 && fixMatch.length<=1){
							indexNo=resMatch.length-3;
						} */
						/*indexNo = checkIndiaMatch(resMatch,function(Id){
							indexNo=Id;
							displayData();
						})*/ 
						/* checkIndiaUpComingMatch(matches,function(Id){
							indexNo=Id;
							displayData();
						}) */
						getIndiaMatch(matches,indexNo,function(Id){
							indexNo=Id;
							displayData();
						});
												
					}else displayData();
				}
					
				});
				
			};
			
			
			
			function displayData(){
				//console.log(indexNo)
				if(externalLeag != "domestic")
					matches.sort(function(a,b){
						if(a.live ==1 && b.live == 1)
							return parseInt(a.priority)-parseInt(b.priority);
					});
				var div=''
				for(var i=0;i<totalMatches;i++){
					var matchData = matches[i];	
					//console.dir(matchData);
					var score="";
					var scoreClass="score";
					var exta="vsbleHide"
					var img='<img width="12" height="12" src="images/sel.png" />'
					var ids="item"+i;
					var t1score='';
					var t2score='';
					var tmimg_1 = "";
					var tmimg_2 = "";
					var ext=''
					var watchlive='VS';
					var match_status = "";
					imgPath="http://sportcentre.stats.com/sport_centre/cricket/images/47x47/sportstar/"
					ext='-min.png';
					
					if(matchData.inn_score_1){
						var s = (matchData.inn_score_1).split("(");
						var t = s[1].split(" ov");
						s[0] = s[0].replace(/ /g,'')
						t[0] = t[0].replace(/ /g,'')
						
						if(matchData.teama_Id==matchData.inn_team_1)t1score='<em>'+matchData.teama_short+'</em>:'+ s[0] +", "+t[0]+" ovs "
						else t2score= '<em>'+matchData.teamb_short+'</em>:'+s[0] +", "+t[0]+" ovs ";
					}
					if(matchData.inn_score_2){
						var s = (matchData.inn_score_2).split("(");
						var t = s[1].split(" ov");
						s[0] = s[0].replace(/ /g,'')
						t[0] = t[0].replace(/ /g,'')
						
						if(matchData.teamb_Id==matchData.inn_team_2)t2score= '<em>'+matchData.teamb_short+'</em>: '+s[0] +", "+t[0]+" ovs "
						else t1score= '<em>'+matchData.teama_short+'</em>:'+s[0] +", "+t[0]+" ovs "
					}
					if(matchData.inn_score_3){
						var s = (matchData.inn_score_3).split("(");
						var t = s[1].split(" ov");
						s[0] = s[0].replace(/ /g,'')
						t[0] = t[0].replace(/ /g,'')
						
						if(matchData.teama_Id==matchData.inn_team_3)t1score+= "& "+s[0] +", "+t[0]+" ovs "
						else t2score+= "& "+s[0] +", "+t[0]+" ovs ";
					}
					if(matchData.inn_score_4){
						var s = (matchData.inn_score_4).split("(");
						var t = s[1].split(" ov");
						s[0] = s[0].replace(/ /g,'')
						t[0] = t[0].replace(/ /g,'')
						
						if(matchData.teamb_Id==matchData.inn_team_4)t2score+= "& "+s[0] +", "+t[0]+" ovs "
						else t1score+= "& "+s[0] +", "+t[0]+" ovs ";
					}
					var matchClass=' liverecent';
					if(t1score!='')score='<span class="si-txt2">'+t1score+'</span>'
					if(t2score!='')score='<span class="si-txt2">'+t2score+'</span>'
					if(t1score!='' && t2score!=''){
						score='<span class="si-txt2">'+t1score+'</span><span class="si-txt2">'+t2score+'</span>'
					}
					if(t1score!='' || t2score!=''){						
						if(matches[i].live=='1' || matches[i].live==1){
							exta='';							
							watchlive=matchData.matchstatus;							
						}
						watchlive=matchData.matchstatus;
						//if(externalLeag == "domestic" && matchData.live == 1)
							//matchClass = '';
					}else{
						matchClass=' '						
						score='<span class="si-txt2">'+dateFormate(matchData.matchdate_ist)+'&nbsp;'+matchData.matchtime_ist+'&nbsp;IST </span>'
						watchlive='VS';
					}
					var lastEleClass="";
					if(i==(totalMatches-1)){
						lastEleClass=" hm-rBrdr";
					}
					if(matchData.matchstatus!='')matchClass="liverecent"
					else matchClass=""
					
					var toss='',equation='';
					if (matchData.toss_won_by) {
						var tosswon = matchData.toss_won_by;
						if(tosswon==matchData.teama_Id)
							toss = matchData.teama_short + ' won the toss and elected to ';
						else toss = matchData.teamb_short + ' won the toss and elected to ';
						
						if (tosswon == matchData.current_batting_team)toss += 'bat';
						else toss += 'field';
						equation = matchData.equation ? matchData.equation : toss;
						equation = matchData.matchresult ? matchData.matchresult : equation;
					}else{
						equation = matchData.matchstatus ? matchData.matchstatus : matchData.venue;
						
					}
					
					equation = matchData.matchresult ? matchData.matchresult : equation;
					
					if(matchData.live == 1)
						match_status = "Current";
					else if(matchData.live == 0 && matchData.upcoming == 0)
						match_status = "Result";
					else
						match_status = "Upcoming";
					
					
					tmimg_1 = '<img src="'+imgPath+matchData.teama_short+ext+'"/>';
					tmimg_2 = '<img src="'+imgPath+matchData.teamb_short+ext+'">';
					
					if(currentLeag == "domestic"){
						ext='.png" width="100%" height="100%"';
						imgPath = "images/domestic shields/"
						tmimg_1 = '<img src="'+imgPath+matchData.teama_short.toLowerCase()+ext+'"/>';
						tmimg_2 = '<img src="'+imgPath+matchData.teamb_short.toLowerCase()+ext+'">';
					}
					
					var tour_id = matchData.tour_Id;
					var tour_name = matchData.seriesname;
					var _tourName = replaceAll(' ','-',tour_name + ' ' + tour_id);
					var _matchName = replaceAll(' ','-',(matchData.teama+' '+'vs'+' '+matchData.teamb)+ ' ' + matchData.matchfile);
					
					var mtch_status = match_status;
					var mtch_class = match_status=='Current'?'Live':match_status;
					
					div+='<div live="'+matches[i].live+'" data-tour="'+_tourName+'"  data-match="'+_matchName+'" class="swiper-slide carusalBox sportsbox '+matchClass+'" id="'+ids+'" matchid="'+matchData.matchfile+'" tmA="'+matchData.teama+'" tmB="'+matchData.teamb+'"><span class="match-status '+mtch_class+'">'+mtch_status+'</span><div class="carusalCont"><div class="ss-tmlogo ss-tmlogoLft"><span class="firstChild">'+tmimg_1+'</span><span class="secondChild">'+matchData.teama_short+'</span></div><div class="ss-tmlogo ss-tmlogoRgt"><span class="firstChild">'+tmimg_2+'</span><span class="secondChild">'+matchData.teamb_short+'</span></div><div class="si-contTop"><span>'+matchData.matchnumber+'</span></div><div class="si-contVs"><span class="vsIcon">VS</span></div><div class="si-contMid"><span>'+score+'</span></div><div class="si-contBot"><span>'+equation+'</span></div></div></div>'
				}
				removeLoader();
				
				$('#matchs-data').html(div);
				
				
				if($(window).width() < 600){					
					$('.sportsbox').outerWidth($('.carusalDv').outerWidth()+adjusted_width);
				}
				else if($(window).width() >= 600 && $(window).width() <= 1024){
					$('.sportsbox').outerWidth($('.carusalDv').outerWidth()/2 +adjusted_width );
				}
				//$('#matchs-data').css('width','auto')
				//$('#matchs-data').css('left','0')
				//$('#matchs-data').css('transform', 'translate3d(0px, 0px, 0px)')
				
				var _w=($('.sportsbox').width())*totalMatches;
				//$('#matchs-data').css("width",_w);
				//console.log("indexNo=="+indexNo)
				if(_mSwiper){						
					_mSwiper.reInit();
					_mSwiper.resizeFix(_w)
				}else swipSlide($('.carusalDv'),'.carusalDv',indexNo);				
				
				navigateMatches(indexNo,totalMatches);
				
				$('.liverecent').each(function () {
					$(this).off('click').on('click', function (e) {
						//var _url="http://www.sportstarlive.com/cricket/cricket-matchcentre/?matchid="+$(this).attr('matchid');
						var url = GetMtcUrl($(this).attr('data-tour'),$(this).attr('data-match'));
						window.open(url, '_blank');
					});
				});
				
				clearInterval(refreshTimer);
				refreshTimer = null;
				if (refreshTimer == null) {
					refreshTimer = setInterval(function () {
						if(!Series_Id){
							/*$('.si-sportstarTop .secondChild').html('International');
							if($('.si-sportstarTop').find('.active').html().toLowerCase() == "international")
							getMatchList("allLive");
							if($('.si-sportstarTop').find('.active').html().toLowerCase() == "domestic")
							getMatchList("domestic");*/
						
							if(currentLeag == "international")
								getMatchList("allLive");
							if(currentLeag == "domestic")
								getMatchList("domestic");
						}
						else{
							getMatchList();
						}
						
					},30000)
				}
			}
			
			function replaceAll(findText, replaceText, text) {
				text = text.replace(/[^a-zA-Z0-9- ]/g, '-');
				return text.replace(/[\.'. ,:-]+/g, replaceText).toLowerCase();
			}
			
			 function GetMtcUrl(data_tour,data_match){
				var baseUrl = "http://www.sportstarlive.com/cricket/";
				var _url = baseUrl+'cricket-matchcentre/'+data_tour+'/'+data_match;
				return _url;
			}
			
			
			function combindName(str){
				var tmName=str.split(" ");
				var rtnStr='';
				for(var l=0;l<tmName.length;l++){
					if(l==(tmName.length-1)){
						rtnStr+=tmName[l].toLowerCase();
					}else{
						rtnStr+=tmName[l].toLowerCase()+"-";
					}
				}
				return rtnStr;
			}
			function dateFormate(_date){
				var _newDate='';
				var _d=_date.split('/');
				if(_d[1]==1||_d[1]==21||_d[1]==31)_d[1]=_d[1]+'st';
				else if(_d[1]==2||_d[1]==22)_d[1]=_d[1]+'nd';
				else if(_d[1]==3 ||_d[1]==23)_d[1]=_d[1]+'rd';
				else _d[1]=_d[1]+'th';
				_newDate=_d[1]+"&nbsp;"+months[_d[0]-1]+"&nbsp;"+_d[2];
				return _newDate;
			}
			
		
	};
	//////////////////////// cricket code end //////////////////////////////////////////////
	///////////////////////  tennis code start /////////////////////////////////////////////
	tennisInit = function(externalLeag){
		var matchList=[];
		var liveMatch=[];
		var fixMatch=[];
		var resMatch=[];
		var matches=[];
		var leagS=[];
		var imgPath = 'http://cricket.widgets.stats.com/countryflags/';
		var config;
		indexNo=0;
		var season = 2016;
		var iptlLeagueId ='57';
		var url='tennis_config.txt';
		clearInterval(refreshTimer);
		refreshTimer = null;
		
		loadJSON(jsonType, url, function(data) {
			config = parseText(data);
			var leagIds=(config.leag_set).split("|")
			var leagNames=(config.leag_lbl).split("|")
			
			function leagLoad(currentLeag){
				indexNo=0;	
				matchDate=0;
				matches = [];
				clearInterval(refreshTimer);
				refreshTimer = null;
				showLoader($('#matchs-data'));
				
				if(currentLeag != "iptl"){
					$('.si-sportstarwrp').removeClass('football').removeClass('iptl')
					if(!$('.si-sportstarwrp').hasClass('tennis'))
						$('.si-sportstarwrp').addClass('tennis')
					getMatchList(currentLeag);
				}
				else{
					$('.si-sportstarwrp').removeClass('tennis').addClass('tennis iptl')
					getIPTLMatchList();
				}
					
			}
			
			$('.tabs').children().not('.firstChild').remove();
			
			createTabs(leagIds,leagNames);
			
			$('.tabs').find('.secondChild').addClass('active');
			
			$('.tabs .tab-select').on('change',function(){
				var val = $(this).children('option:selected').val();
				var text = $(this).children('option:selected').text();
				
				$('.tab-select').closest('.mob-menu').find('span').html(text);
			
				currentLeag=val;
			
				leagLoad(currentLeag)
			
			});
			
			$('.tabs span').not('.firstChild').on('click',function(){
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				var val = $(this).attr('data-legname');
				currentLeag=val;
				
				leagLoad(currentLeag);
			
			});
			
			$('.mob-menu span').html($('.tabs .tab-select').children().first().text());
			
			currentLeag = $('.tabs .tab-select').first().val() == undefined ? $('.tabs span:nth-child(2)').attr('data-legname'):$('.tabs .tab-select').first().val();
			
			leagLoad(currentLeag);
			
		});
		
		function getIPTLMatchList(){
			
			var iptlUrl = "http://feeds.tennis.stats.com/live/"+iptlLeagueId+"_calendar.json"
			/*if(window.location.href == "http://www.sportstarlive.com/")
				iptlUrl = "";
			else
				iptlUrl = "57_calendar.json";*/
			
			loadJSON("normal", iptlUrl, function(data) {
				var allMatches = data.calendar.matches;
				var resMatch=[];
				var livMatch=[];
				var fixMatch=[];
				matches=[];
				
				for(var i = 0 ; i < allMatches.length ;i++){
					if(allMatches[i].complete)
						resMatch.push(allMatches[i]);
					else
						fixMatch.push(allMatches[i])
				}
				
				livMatch = $.grep(fixMatch,function(n,i){
					return(n.live);
				})
				
				fixMatch = $.grep(fixMatch,function(n,i){
					return(!n.live);
				})
				
				for(var i = 0 ; i <resMatch.length ;i++ )
					matches.push(resMatch[i]);
				
				for(var i = 0 ; i <livMatch.length ;i++ )
					matches.push(livMatch[i]);
				
				for(var i = 0 ; i <fixMatch.length ;i++ )
					matches.push(fixMatch[i]);
				
			
				
				totalMatches=matches.length;
						
				if(refreshTimer==null){
					
					indexNo=resMatch.length;
					if(livMatch.length<=1 && fixMatch.length<=1){
						indexNo=resMatch.length-3;
					}
					
					displayIPTLData();
				}else displayIPTLData();
				
			});
				
		}
		
		function displayIPTLData(){
			refreshRate=30000;
			var hgtWdt='width="100%" height="100%"'
			
			//imgPath = 'http://hosted.stats.com/ifb2009/badges/logos-47x47/';
			imgPath = 'images/IPTL 2015/'
			
			var div=''
			
			for(var i=0;i<totalMatches;i++){
				var matchData = matches[i];
				var score="";
				var scoreClass="score";
				var mstats=matchData[2];
				var exta="vsbleHide"
				var img='<img width="12" height="12" src="images/sel.png" />'
				var ids="item"+i;
				var t1score='';
				var t2score='';
				var matchClass=' liverecent';
				var pent1score='';
				var pent2score='';
				var livestatusDisplay = "";	
				var vsIcon = "";
				var timeClass= "";
				var liveClass = "";
				var penalty_score="";
				var agg_score = "";
				var match_status = "";
				var matchClass="";
				
				if(matchData.teama_score != null && matchData.teamb_score != null){
					//console.log('Score => '+matchData.teama_score + " --> "+matchData.teamb_score)
					t1score = matchData.teama_score;
					t2score = matchData.teamb_score;
					
					livestatusDisplay = matchData.matchstatus;
					
					matchClass = "liverecent";
					
					if(matchData.complete)
						match_status = "Result"
					else{
						match_status = "Live"
						
					}
						
					
					score='<div class="si-matchcontent"><div class="matchteam-score team1"><span>'+t1score+'</span></div><div class="matchtime-detail"><span class="si-matchtime">-</span></span></div><div class="matchteam-score team2"><span>'+t2score+'</span></div></div>'
					
				}
				else{
					vsIcon = "<span class='vsIcon'>VS</span>";
					match_status = "Upcoming";
					livestatusDisplay = 'Pre Match';
					
					var _s='';
					
					var time = matchData.matchtime_local ? matchData.matchtime_local  : "00:00";
					time = Convert2UserTZ(matchData.matchdate_local+" "+matchData.matchtime_local, matchData.gmt_offset)
					time = new Date(time);
					var m=''+time.getMinutes();
					if(m.length==1)m='0'+m;
					
					time = time.getHours()+":"+m;
					
					score='<div class="si-matchcontent"><div class="matchteam-detail"><span class="si-txt1"></span><span class="si-txt2">'+(matchData.matchdate_local)+'</span><span class="si-txt3">'+time+' IST </span></div></div>'
				}
				var watchlive='';
					
				var lastEleClass="";
				if(i==(totalMatches-1)){
					lastEleClass=" hm-rBrdr";
				}
				var tmAImg=matchData.teama_id;
				var tmBImg=matchData.teamb_id;
				
				var teamA=matchData.teama;
				var teamB=matchData.teamb;
				var tmATag='',tmBTag='';
				
				tmATag='<img src="'+imgPath+tmAImg+'.png">'
				tmBTag='<img src="'+imgPath+tmBImg+'.png">'
				if(teamA=='TBD'){
					
					tmATag='<img src="'+imgPath+'tbd.png">'
				}
				if(teamB=='TBD'){
					
					tmBTag='<img src="'+imgPath+'tbd.png">'
				}
				
				_s = livestatusDisplay == "" ? _s : livestatusDisplay; 
				
				div+='<div class="swiper-slide carusalBox sportsbox '+matchClass+'" id="'+matchData.match_id+'" matchid="'+matchData.match_id+'" tmA="'+matchData.teama+'" tmB="'+matchData.teamb+'"><span class="match-status '+match_status+'">'+match_status+'</span><div class="carusalCont"><div class="ss-tmlogo ss-tmlogoLft"><span class="firstChild">'+tmATag+'</span><span class="secondChild">'+teamA+'</span></div><div class="ss-tmlogo ss-tmlogoRgt"><span class="firstChild">'+tmBTag+'</span><span class="secondChild">'+teamB+'</span></div><div class="si-contTop"><span class="si-liveBadge '+liveClass+'">'+_s+'</span></div><div class="si-contVs">'+vsIcon+'</div><div class="si-contMid"><span class="livescore">'+score+'</span></div><div class="si-contBot"><span><span class="penalty_score"></span><br><span class="agg_score"></span></span></div></div></div>'
			}
			
			removeLoader();
			$('#matchs-data').html(div);
			
			var _w=($('.sportsbox').outerWidth()+5)*totalMatches;
			//$('#matchs-data').css("width",_w);
			
			
			if($(window).width() < 600){
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()+adjusted_width);
			}
			else if($(window).width() >= 600 && $(window).width() <= 1024){
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()/2 +adjusted_width );
			}
			
			if(_mSwiper){
				_mSwiper.reInit();
				_mSwiper.resizeFix(_w)	
			}else swipSlide($('.carusalDv'),'.carusalDv',indexNo);
			
			navigateMatches(indexNo,totalMatches);
			
			$('.liverecent').off('click').on('click',function(){
				var matchId = $(this).attr('id');
				
				var mcenterUrl = "http://www.sportstarlive.com/tennis/tennis-matchcenter/?id="+matchId+"&lg=iptl"
				
				var teamA = $(this).attr('tmA');
				var teamB = $(this).attr('tmB');
				var urlPart = replaceAll(' ','-',(teamA+' vs '+teamB+' '+matchId));
				mcenterUrl = "http://www.sportstarlive.com/tennis/matchcentre/iptl-"+iptlLeagueId+'/matchpage/'+urlPart+'/';
				
				window.open(mcenterUrl,"_blank");
			});
			
			clearInterval(refreshTimer);
			refreshTimer = null;
			if (refreshTimer == null) {
				refreshTimer = setInterval(function () {
					updateIPTLLiveMatchs();
				},refreshRate);
			}
		}
		
		function updateIPTLLiveMatchs(){
			var liveUrl = "http://feeds.tennis.stats.com/live/"+iptlLeagueId+"_calendar.json"
			/*if(window.location.href == "http://www.sportstarlive.com/")
				liveUrl = "";
			else
				liveUrl = "57_calendar.json";*/
			
			loadJSON("normal", liveUrl, function(data) {
				//console.dir(data);
				var allMatches = data.calendar.matches;
				var resMatch=[];
				var livMatch=[];
				var fixMatch=[];
				matches=[];
				
				for(var i = 0 ; i < allMatches.length ;i++){
					if(allMatches[i].complete)
						resMatch.push(allMatches[i]);
					else
						fixMatch.push(allMatches[i])
				}
				
				livMatch = $.grep(fixMatch,function(n,i){
					return(n.live);
				})
				
				for(var i=0;i< livMatch.length;i++){
					var matchData = livMatch[i];
					var ele = $("#"+matchData.match_id)
					var t1score='';
					var t2score='';
					var msts='';
					var match_status = "Live";
					
					if(matchData.teama_score != null && matchData.teamb_score != null){
						t1score=matchData.teama_score;
						t2score=matchData.teamb_score
						var livestatusDisplay=matchData.matchstatus
						
						score='<div class="si-matchcontent"><div class="matchteam-score team1"><span>'+t1score+'</span></div><div class="matchtime-detail"><span class="si-matchtime">-</span></span></div><div class="matchteam-score team2"><span>'+t2score+'</span></div></div>';
						
						$(ele).find('.match-status').attr('class','match-status '+match_status);
						$(ele).find('.match-status').text(match_status)
						$(ele).find('.si-liveBadge').html(livestatusDisplay);
						$(ele).find('.livescore').html(score);
						
					}
				}
			});
		}
		
		function getMatchList(league){

			league = league.toLowerCase();
			var tennisUrl = "http://www.sportstarlive.com/tennis/matchcentre/feeds/live/api.aspx?id=NFNwMHJ0ekFQSQ==&league="+league+"&endpoints=events/?season="+season+"&callback=cb"
			
			loadJSON("", tennisUrl, function(data) {
				var eventData=data.apiResults[0].league.subLeague.season['events'];
				eventData = eventData || {};
				if(refreshTimer==null){

					var resMatch=$('.tennis-match .Result').length;
					var liveMatch=$('.tennis-match .Live').length;
					var fixMatch=$('.tennis-match .Upcoming').length;

					indexNo=resMatch;

					if(liveMatch<=1 && fixMatch<=1){
						indexNo=resMatch-3;
					}
					displayData(eventData);
				}else displayData(eventData);
				
			});
		}
		
		function displayData(eventData){
			var div = "";

			var monthName=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sup','Oct','Nov','Dis'];
			if(eventData.length>0){
				for (var i = 0; i < eventData.length; i++) {
					var event = eventData[i];
					var eventId=event.eventId;
					var tourName=event.tournament['displayName']||event.tournament['name']||"-";
					var tourLocation=event.venue['city'];
					
					for (var k = 0; k < event.matchTypes.length; k++) {
						var matchId = event.matchTypes[k].matchTypeId;
						var dataId = eventId+'_'+matchId;
						var matchTypename=event.matchTypes[k].name?event.matchTypes[k].name:'';
						var NewTourName=tourName+" "+"(" +matchTypename+ ")";
						var startDate=event.startDate[1].full;
						var formatDate= new Date(startDate);
						var smonth_value = formatDate.getMonth();
							smonth_value=monthName[smonth_value];
						var sday_value = formatDate.getDate();

					
						var endDate=event.endDate[1].full;
						var endformatDate= new Date(endDate);
						var Emonth_value = endformatDate.getMonth();
							Emonth_value=monthName[Emonth_value];
						var Eday_value = endformatDate.getDate();

						var getRemVal=sday_value%10;
						var getRemVal2=Eday_value%10;
						function fnGetPostfix(_no){
							var postfix = '';
							switch(_no){
								case 1: postfix='st'; break;
								case 2: postfix='nd'; break;
								case 3: postfix='rd'; break;
								default: postfix='th'; break;
							}
							return postfix;
						};
						sday_value = sday_value+fnGetPostfix(getRemVal);
						Eday_value = Eday_value+fnGetPostfix(getRemVal2);

						var startDateStr=sday_value+" "+smonth_value;
						var EndDateStr=Eday_value+" "+Emonth_value;

						var concatDate=startDateStr+" - "+EndDateStr;
						var matchStaus="",WinnerName="",liveClass='',winnerTitle='';

						var eventStatus=event.matchTypes[k].eventStatus['eventStatusId'];
							if(eventStatus==1){
								matchStaus="Upcoming";
								var champsp = event.matchTypes[k].champions || [];
								var currChamp = $.grep(champsp,function(ch){
									return ch.championType == 'prior';
								});
								if(currChamp.length >0){
									winnerTitle = (season-1)+' Winner : ';
									if(currChamp[0].players.length > 1){
										WinnerName=currChamp[0].players[0].lastName+" / "+currChamp[0].players[1].lastName;
									}else{
										WinnerName=currChamp[0].players[0].firstName+" "+currChamp[0].players[0].lastName;
									}
								}
							}else if([2,26].indexOf(eventStatus)>-1){
										liveClass = 'liverecent';
										matchStaus="Live";
										WinnerName=" ";
									}else if(eventStatus==4){
										liveClass = 'liverecent';
										matchStaus="Result";
										winnerTitle = 'Winner : ';
										var champsp = event.matchTypes[k].champions || [];
										var currChamc = $.grep(champsp,function(ch){
											return ch.championType == 'current';
										});
										if(currChamc.length >0){
											if(currChamc[0].players.length > 1){
												WinnerName=currChamc[0].players[0].lastName+" / "+currChamc[0].players[1].lastName;
											}else{
												WinnerName=currChamc[0].players[0].firstName+" "+currChamc[0].players[0].lastName;
											}
										}
									}
						var dataTourName = replaceAll(' ','-',(tourName+' '+matchTypename+' '+eventId+' '+matchId));
					   	div+='<div class="tennis-match swiper-slide carusalBox sportsbox '+liveClass+'" id="'+dataId+'" data-tourname="'+dataTourName+'"><span class="match-status '+matchStaus+'">'+matchStaus+'</span><div class="carusalCont"><div class="ss-tmlogo ss-tmlogoLft"></div><div class="ss-tmlogo ss-tmlogoRgt"></div><div class="si-contTop"><span>'+NewTourName+'</span></div><div class="si-contVs">'+tourLocation+'</div><div class="si-contMid"><span>'+concatDate+'</span></div><div class="si-contBot" data-id="'+matchStaus+'"><span class="firstChild">'+winnerTitle+'</span><span class="secondChild">'+WinnerName+'</span></div></div></div>';
					}
				}
			}
			removeLoader();
			$('#matchs-data').html(div);
			$('.si-contBot').each(function(){
				if($(this).attr('data-id')=='Live'){
					$(this).hide();
				}else{
					$(this).show();
				}
			});
			totalMatches=$('.tennis-match').length;

			var resMatch=$('.tennis-match .Result').length;
			var liveMatch=$('.tennis-match .Live').length;
			var fixMatch=$('.tennis-match .Upcoming').length;

				if(indexNo <=0){
					indexNo=resMatch;

					if(liveMatch<=1 && fixMatch<=1){
						indexNo=resMatch-3;
					}
				}
					
			
				
			if($(window).width() < 600){					
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()+adjusted_width);
			}
			else if($(window).width() >= 600 && $(window).width() <= 1024){
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()/2 +adjusted_width );
			}
			
			var _w=($('.sportsbox').width())*totalMatches;
			//$('#matchs-data').css("width",_w);
			
			if(_mSwiper){						
				_mSwiper.reInit();
				_mSwiper.resizeFix(_w)
			}else swipSlide($('.carusalDv'),'.carusalDv',indexNo);				
			
			navigateMatches(indexNo,totalMatches);
			
			$('.liverecent').off('click').on('click',function(){
				var league = currentLeag.toLowerCase();
				var dataTourName = $(this).attr('data-tourname');
				var mcenterUrl = "http://www.sportstarlive.com/tennis/matchcentre/"+league+'/tournamentpage/'+dataTourName+'/';
				window.open(mcenterUrl,"_blank");
			});
			clearInterval(refreshTimer);
			refreshTimer = null;
			if (refreshTimer == null) {
				refreshTimer = setInterval(function () {
					updateTennisLiveMatchs();
				},refreshRate);
			}
		}
		function updateTennisLiveMatchs(){
			getMatchList(currentLeag);
		};
	}
		
	
	
	///////////////////// tennis code end //////////////////////////////////////////////////
	
	
	
	//////////////////// motosport code start/////////////////////////////////////////////////
	var motosportsInit = function(_defaultSport){
		
		var matchList=[];
		var liveMatch=[];
		var fixMatch=[];
		var calArr=[];
		var gpArr=[];
		var matches=[];
		var leagS=[];
		var imgPath = 'http://cricket.widgets.stats.com/countryflags/';
		var config;
		indexNo=0;
		
		var gpData = {},calData = {};
		
		var url='motosports_config.txt';
		clearInterval(refreshTimer);
		refreshTimer = null;
		
		loadJSON(jsonType, url, function(data) {
			config = parseText(data);
			var leagIds=(config.leag_set).split("|")
			var leagNames=(config.leag_lbl).split("|")
			
			function leagLoad(currentLeag){
				indexNo=0;	
				matchDate=0;
				matches = [];
				clearInterval(refreshTimer);
				refreshTimer = null;
				showLoader($('#matchs-data'));
				
				if(currentLeag == "motogp"){
					$('.si-sportstarwrp').removeClass('football tennis cricket iptl motogp f1').addClass('motogp');
					
					getMotoMatchList(currentLeag);
				}else if(currentLeag == "f1"){
					$('.si-sportstarwrp').removeClass('football tennis cricket iptl motogp motogp').addClass('f1');
					getF1MatchList(currentLeag);
				}
					
			}
			
			$('.tabs').children().not('.firstChild').remove();
			
			createTabs(leagIds,leagNames);
			if(window.location.search.indexOf('motosports')>-1 || _defaultSport == 'motosports'){
				$('.si-menu').show();
				$('.mob-menu').show();
			}else{
				$('.si-menu').hide();
				$('.mob-menu').hide();
				
			}
			
			
			
			$('.tabs').find('.secondChild').addClass('active');
			
			$('.tabs .tab-select').on('change',function(){
				var val = $(this).children('option:selected').val();
				var text = $(this).children('option:selected').text();
				
				$('.tab-select').closest('.mob-menu').find('span').html(text);
			
				currentLeag=val;
			
				leagLoad(currentLeag)
			
			});
			
			$('.tabs span').not('.firstChild').on('click',function(){
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				var val = $(this).attr('data-legname');
				currentLeag=val;
				
				leagLoad(currentLeag);
			
			});
			
			$('.mob-menu span').html($('.tabs .tab-select').children().first().text());
			
			currentLeag = $('.tabs .tab-select').first().val() == undefined ? $('.tabs span:nth-child(2)').attr('data-legname'):$('.tabs .tab-select').first().val();
			if(_defaultSport && _defaultSport != 'motosports'){
				currentLeag = _defaultSport;
			}
			leagLoad(currentLeag);
			
		});
		
		function updateIPTLLiveMatchs(){
			var liveUrl = "http://feeds.tennis.stats.com/live/57_calendar.json"
			/*if(window.location.href == "http://www.sportstarlive.com/")
				liveUrl = "";
			else
				liveUrl = "57_calendar.json";*/
			
			loadJSON("normal", liveUrl, function(data) {
				//console.dir(data);
				var allMatches = data.calendar.matches;
				var resMatch=[];
				var livMatch=[];
				var fixMatch=[];
				matches=[];
				
				for(var i = 0 ; i < allMatches.length ;i++){
					if(allMatches[i].complete)
						resMatch.push(allMatches[i]);
					else
						fixMatch.push(allMatches[i])
				}
				
				livMatch = $.grep(fixMatch,function(n,i){
					return(n.live);
				})
				
				for(var i=0;i< livMatch.length;i++){
					var matchData = livMatch[i];
					var ele = $("#"+matchData.match_id)
					var t1score='';
					var t2score='';
					var msts='';
					var match_status = "Live";
					
					if(matchData.teama_score != null && matchData.teamb_score != null){
						t1score=matchData.teama_score;
						t2score=matchData.teamb_score
						var livestatusDisplay=matchData.matchstatus
						
						score='<div class="si-matchcontent"><div class="matchteam-score team1"><span>'+t1score+'</span></div><div class="matchtime-detail"><span class="si-matchtime">-</span></span></div><div class="matchteam-score team2"><span>'+t2score+'</span></div></div>';
						
						$(ele).find('.match-status').attr('class','match-status '+match_status);
						$(ele).find('.match-status').text(match_status)
						$(ele).find('.si-liveBadge').html(livestatusDisplay);
						$(ele).find('.livescore').html(score);
						
					}
				}
			});
		}
		function fnFormatDate(_d){
			if(!_d) return;
			function format(_dt){
				var dtStr=_dt.split("/");
				if(parseInt(dtStr[0])<=9){
					dtStr[0]='0'+dtStr[0];
				}					
				_dt = dtStr[0]+" "+months[parseInt(dtStr[1])-1];
				return _dt;
			}
			_d = _d.split(' - ');
			var lftDate = format(_d[0]);
			var rgtDate = format(_d[1]);
			var newDate = lftDate;
			if(rgtDate){
				newDate+=' - '+rgtDate;
			}
			return newDate;
		}
		function getMotoMatchList(series){
			var calUrl = "http://sportcentre.stats.com/sport_centre/motogp/sportstar/api/data.aspx?lang=en&file=static/16/calendar_motogp.txt&pad=y"
			
			loadJSON("normal", calUrl, function(caldata) {
				calData = parseText(caldata);
				calArr = calData.cal && calData.cal.split('|');
				var gpUrl = 'http://sportcentre.stats.com/sport_centre/motogp/sportstar/api/data.aspx?lang=en&file=live/16_gp_motogp.txt&pad=y';
				loadJSON("normal", gpUrl, function(gpdata) {
					gpData = parseText(gpdata);
					var schedule = gpData.gp_name && gpData.gp_name.split('|');
					if(!(schedule && schedule.length>0)){
						return;
						warn('no calender data');
					}
					gpArr = schedule;
					totalMatches=gpArr.length;
							
					if(refreshTimer==null){
						indexNo=gpArr.length;
						if(liveMatch.length<=1 && fixMatch.length<=1){
							indexNo=gpArr.length-3;
						}
						displayMotoData(series);
					}else displayMotoData(series);
				});
			});
			
		}
		function displayMotoData(type){
			var div = "";
			for(var i = 0 ; i < gpArr.length ;i++ ){
				var matchData = gpArr[i].split("~");
				var calMatchData = calArr[i].split("~");
				var tourDate=matchData[7] || '-';
				var td = fnFormatDate(tourDate);
				//console.log(calMatchData)
				var tourName = matchData[6] || '-';
				var tourLocation = matchData[8] || '-';
				var tourWinner = calMatchData[7] || '-';
				//var tourWinner = calMatchData[11] || '-';
				var id = matchData[3] || '-';
				var gpSts = matchData[5].toLowerCase();
				
				var displayStatus = 'Live',liveRecent='liverecent',winnerTxt='';
				
				if(gpSts == 'race'){
					displayStatus = 'Result';
					winnerTxt = '<span class="firstChild">Winner : </span><span class="secondChild">'+tourWinner+'</span>'
				}else if(gpSts == 'info'){
					displayStatus = 'Upcoming';
					liveRecent = '';
				}
				div+='<div class="motogp-match swiper-slide carusalBox sportsbox '+liveRecent+'" data-id="'+id+'"><span class="match-status '+displayStatus+'">'+displayStatus+'</span><div class="carusalCont"><div class="ss-tmlogo ss-tmlogoLft"></div><div class="ss-tmlogo ss-tmlogoRgt"></div><div class="si-contTop"><span>'+tourName+'</span></div><div class="si-contVs">'+tourLocation+'</div><div class="si-contMid"><span>'+td+'</span></div><div class="si-contBot">'+winnerTxt+'</div></div></div>'
			}
			removeLoader();
			$('#matchs-data').html(div);
				
			indexNo = $('.motogp-match.liverecent:last').index();
			if($(window).width() < 600){					
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()+adjusted_width);
			}
			else if($(window).width() >= 600 && $(window).width() <= 1024){
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()/2 +adjusted_width );
			}
			
			var _w=($('.sportsbox').width())*totalMatches;
			//$('#matchs-data').css("width",_w);
			
			if(_mSwiper){						
				_mSwiper.reInit();
				_mSwiper.resizeFix(_w)
			}else swipSlide($('.carusalDv'),'.carusalDv',indexNo);				
			
			navigateMatches(indexNo,totalMatches);
			
			$('.liverecent').off('click').on('click',function(){
				var matchId = $(this).attr('data-id');
				var mcenterUrl = "http://www.sportstarlive.com/motorsport/motogp/race-centre-motogp/?raceid="+matchId;
				window.open(mcenterUrl,"_blank");
			});
			
		}
		
		function getF1MatchList(series){
			//var calUrl = "http://hosted.stats.com/matchcast/racingv4/xsltxtfiles/data.aspx?lang=en&file=static/16/16_schedule.txt&pad=y"
			//var calUrl = "http://sportcentre.stats.com/sport_centre/f1/api/data.aspx?lang=en&file=static/16/16_schedule.txt&pad=y"
			var calUrl = "http://hosted.stats.com/matchcast/racingv4/api/data.aspx?lang=en&file=static/16/16_schedule.txt&pad=y"
			
			loadJSON("normal", calUrl, function(caldata) {
				calData = parseText(caldata);
				//calArr = calData.cal && calData.cal.split('|');
				//var gpUrl = 'http://hosted.stats.com/matchcast/racingv4/xsltxtfiles/data.aspx?lang=en&file=live/16_gp.txt&pad=y';
				//var gpUrl = 'http://sportcentre.stats.com/sport_centre/f1/api/data.aspx?lang=en&file=live/16_gp.txt&pad=y';
				var gpUrl = 'http://hosted.stats.com/matchcast/racingv4/api/data.aspx?lang=en&file=live/16_gp.txt&pad=y';
				loadJSON("normal", gpUrl, function(gpdata) {
					gpData = parseText(gpdata);
					var schedule = gpData.gp_name && gpData.gp_name.split('|');
					if(!(schedule && schedule.length>0)){
						return;
						warn('no calender data');
					}
					gpArr = schedule;
					totalMatches=gpArr.length;
							
					if(refreshTimer==null){
						indexNo=gpArr.length;
						if(liveMatch.length<=1 && fixMatch.length<=1){
							indexNo=gpArr.length-3;
						}
						displayF1Data(series);
					}else displayF1Data(series);
				});
			});
			
		}
		
		
		function displayF1Data(type){
			var div = "";
			for(var i = 0 ; i < gpArr.length ;i++ ){
				var matchData = gpArr[i].split("~");
				//var calMatchData = calArr[i].split("~");
				var tourDate=matchData[7] || '-';
				var td = fnFormatDate(tourDate);
				var tourName = matchData[6] || '-';
				var tourLocation = matchData[8] || '-';
				var tourWinner = '-';//calMatchData[9] || '-';
				var id = matchData[3] || '-';
				var gpSts = matchData[5].toLowerCase();
				//console.log(gpSts)
				var displayStatus = 'Live',liveRecent='liverecent',winnerTxt='';
				if(gpSts == 'race'){
					var idKey = id+'_events';
					var row = calData[idKey].split('|');
					row=  row[row.length-1];
					row = row.split('^');
					
					//if(matchData[3]!=949){
						displayStatus = 'Result';
						winnerTxt = '<span class="firstChild">Winner : </span><span class="secondChild">'+row[row.length-1]+'</span>';
					//}
					//console.log(row);
					//console.log(row[row.length-1]);
					
				}else if(gpSts == 'info'){
					displayStatus = 'Upcoming';
					liveRecent = '';
				}
				div+='<div class="motogp-match swiper-slide carusalBox sportsbox '+liveRecent+'" id="'+id+'"><span class="match-status '+displayStatus+'">'+displayStatus+'</span><div class="carusalCont"><div class="ss-tmlogo ss-tmlogoLft"></div><div class="ss-tmlogo ss-tmlogoRgt"></div><div class="si-contTop"><span>'+tourName+'</span></div><div class="si-contVs">'+tourLocation+'</div><div class="si-contMid"><span>'+td+'</span></div><div class="si-contBot">'+winnerTxt+'</div></div></div>'
			}
			removeLoader();
			$('#matchs-data').html(div);
				
			indexNo = $('.motogp-match.liverecent:last').index();
			if($(window).width() < 600){					
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()+adjusted_width);
			}
			else if($(window).width() >= 600 && $(window).width() <= 1024){
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()/2 +adjusted_width );
			}
			
			var _w=($('.sportsbox').width())*totalMatches;
			//$('#matchs-data').css("width",_w);
			
			if(_mSwiper){						
				_mSwiper.reInit();
				_mSwiper.resizeFix(_w)
			}else swipSlide($('.carusalDv'),'.carusalDv',indexNo);				
			
			navigateMatches(indexNo,totalMatches);
			
			$('.liverecent').off('click').on('click',function(){
				var matchId = $(this).attr('id');
				
				//var matchType = $(this).find('.match-status').text() == "Live" ? "&tab=live" : ""
				var mcenterUrl = "http://www.sportstarlive.com/motorsport/f1/race-centre-f1/?page=race&raceid="+matchId;
				
				window.open(mcenterUrl,"_blank");
			});
			
		}
	}
	//////////////////// motosport code End/////////////////////////////////////////////////
	
	
	//////////////////// kabaddi code start/////////////////////////////////////////////////
	var kabaddiInit = function () {
		//$('.tab').removeClass('tab')
		var matchList=[];
		var liveMatch=[];
		var fixMatch=[];
		var resMatch=[];
		var matches=[];
		var leagS=[];
		var imgPath = 'http://cricket.widgets.stats.com/countryflags/';
		var config;
		indexNo=0;
		
		clearInterval(refreshTimer);
		refreshTimer = null;
		
		function leagLoad(){
			indexNo=0;	
			matchDate=0;
			clearInterval(refreshTimer);
			refreshTimer = null;
			showLoader($('#matchs-data'));
			
			getMatchList();
		}
		
		leagLoad();	
			
		function getMatchList() {
			var kabaddiUrl = "http://sportstar.cricket.sportzdeck.stats.com/boxscorecards/kabaddi/proxy/FetchData.aspx?url=http://www.prokabaddi.com/data/live/4_calendar.json"
			loadJSON("", kabaddiUrl, function(data) {
				
				if(typeof(data.calendar) != "object"){
					removeLoader();
					console.log(data);
					//$('#matchs-data').html('<div>Error Occured</div>');
					//return;
				}
				
				var matches = data.calendar.matches ;
				//console.log(data);
				
				var resMatch=[];
				var livMatch=[];
				var fixMatch=[];
				matches=[];
				for(var i=0;i< data.calendar.matches.length;i++){
					if( data.calendar.matches[i].live)
						livMatch.push( data.calendar.matches[i])
					else if( data.calendar.matches[i].recent )
						resMatch.push( data.calendar.matches[i]);
					else if( data.calendar.matches[i].matchstatus_id =='1'||  data.calendar.matches[i].matchstatus_id == 1)
						fixMatch.push( data.calendar.matches[i]);
				}
				
				for(var i=0;i<resMatch.length;i++){
					matches.push(resMatch[i]);
				}
				//livMatch.reverse();
				livMatch.sort(function(a,b){
					if(a.live ==1 && b.live == 1)
						return parseInt(a.priority)-parseInt(b.priority);
				});
				
				for(var i=0;i<livMatch.length;i++){
					matches.push(livMatch[i]);
				}
				for(var i=0;i<fixMatch.length;i++){
					matches.push(fixMatch[i]);
				}
				
				totalMatches=matches.length;
					
				if(refreshTimer==null){
					indexNo=resMatch.length;
					if(livMatch.length<=1 && fixMatch.length<=1){
						indexNo=resMatch.length-3;
					}
					displayData(matches);
				}else displayData(matches);
				
			});
			
		};
			
		function displayData(matches){
			var div=''
			for(var i=0;i<totalMatches;i++){
				var matchData = matches[i];	
				//console.dir(matchData);
					
				var score="";
				var scoreClass="score";
				var mstats=matchData[2];
				var exta="vsbleHide"
				var img='<img width="12" height="12" src="images/sel.png" />'
				var ids="item"+i;
				var t1score='';
				var t2score='';
				var matchClass=' liverecent';
				var matchStaus = "";
				var matchClass = "";
				var imgPath = "images/kabaddi_flags/";
				var teama = "";
				var teamb = "";
				var contTop = "";
				var vs = "";
				var cimtMid = "";
				
				var teamAscore = "";
				var teamBscore = "";
				
				if(matchData.matchstatus_id == 1){
					matchStaus = "Upcoming"
					matchClass = "upcoming"
					
					contTop = "Pre Match"
					
					vs = "<span class='vsIcon'>VS</span>"
				}	
				else if(matchData.live){
					matchStaus = "Live"
					matchClass = "liverecent"
					
					if(matchData.currentmin < 20) contTop = "1st Half"
					if(matchData.currentmin == 20) contTop = "Half Time"
					if(matchData.currentmin > 20) contTop = "2nd Half"
					
				}
				else if(matchData.recent == true){
					matchStaus = "Result"
					matchClass = "liverecent"
					contTop = "Full Time"
				}
				
				if(matchData.matchstatus_id == 1){
					var date = dateFormate(matchData.matchdate_local)
					
					contMid = "<span class='livescore'>"+
								"<div class='si-matchcontent'>"+
									"<div class=matchteam-detail''>"+
										"<span class='si-txt1'><span>"+
										"<span class='si-txt2'>"+date+"</span>"+
										"<span class='si-txt3'>"+matchData.matchtime_local+" IST</span>"+
									"</div>"+
								"</div>"+
							  "</span>";		
				}
				else{
					
					teamAscore = matchData.teama_score ?  matchData.teama_score : 0;
					teamBscore = matchData.teamb_score ? matchData.teamb_score : 0;
					
					contMid = "<span class='livescore'>"+
								"<div class='si-matchcontent'>"+
									"<div class='matchteam-score team1'><span>"+teamAscore+"</span></div>"+
									"<div class='matchtime-detail'><span class='si-matchtime'>-</span></div>"+
									"<div class='matchteam-score team2'><span>"+teamBscore+"</span></div>"+
								"</div>"+
							  "</span>";
					
				}
				
				
				
				/*if(matchData.matchnumber.toLowerCase() == "semi-final 1"){
					teama = "semi-final-1-a";
					teamb = "semi-final-1-b";
					
				}else if(matchData.matchnumber.toLowerCase() == "semi-final 2"){
					teama = "semi-final-2-a";
					teamb = "semi-final-2-b";
					
				}else if(matchData.matchnumber.toLowerCase() == "3/4 place"){
					teama = "3-4-place-a";
					teamb = "3-4-place-b";
					
				}else if(matchData.matchnumber.toLowerCase() == "final"){
					teama = "final-a";
					teamb = "final-b";
					
				}else{*/
					teama = matchData.teama_id;
					teamb = matchData.teamb_id;
				//}
				
				
				
				div += '<div class="swiper-slide carusalBox sportsbox '+matchClass+'" matchid="'+matchData.match_id+'">'+
							'<span class="match-status '+matchStaus+'">'+matchStaus+'</span>'+
							'<div class="carusalCont">'+
								"<div class='ss-tmlogo ss-tmlogoLft'>"+
									"<span class='firstChild'>"+
										"<img src='"+imgPath+teama+".png'/>"+
									"</span>"+
									"<span class='secondChild'>"+matchData.teama_short+"</span>"+
								"</div>"+	
								"<div class='ss-tmlogo ss-tmlogoRgt'>"+
									"<span class='firstChild'>"+
										"<img src='"+imgPath+teamb+".png'/>"+
									"</span>"+
									"<span class='secondChild'>"+matchData.teamb_short+"</span>"+
								"</div>"+
								"<div class='si-contTop'>"+
									"<div class='si-liveBadge'>"+contTop+"</div>"+
								"</div>"+
								"<div class='si-contVs'>"+vs+"</div>"+
								"<div class='si-contMid'>"+contMid+"</div>"+
							"</div>"+
						"</div>";	
				
			}
			
			removeLoader();
			
			$('#matchs-data').html(div);
			
			
			if($(window).width() < 600){					
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()+adjusted_width);
			}
			else if($(window).width() >= 600 && $(window).width() <= 1024){
				$('.sportsbox').outerWidth($('.carusalDv').outerWidth()/2 +adjusted_width );
			}
			//$('#matchs-data').css('width','auto')
			//$('#matchs-data').css('left','0')
			//$('#matchs-data').css('transform', 'translate3d(0px, 0px, 0px)')
			
			var _w=($('.sportsbox').width())*totalMatches;
			//$('#matchs-data').css("width",_w);
			
			if(_mSwiper){						
				_mSwiper.reInit();
				_mSwiper.resizeFix(_w)
			}else swipSlide($('.carusalDv'),'.carusalDv',indexNo);				
			
			navigateMatches(indexNo,totalMatches);
			
			$('.liverecent').each(function () {
				$(this).off('click').on('click', function (e) {
					var _url = "http://www.sportstarlive.com/kabaddi/kabaddi-matchcentre/?matchcentre="+$(this).attr('matchid')+"-scorecard"
					
					window.open(_url, '_blank');
				});
			});
			
			clearInterval(refreshTimer);
			refreshTimer = null;
			if (refreshTimer == null) {
				refreshTimer = setInterval(function () {
					getMatchList();
				},30000)
			}
		}
		
		function dateFormate(Str){
			var dtStr=Str.split("/");
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			if(parseInt(dtStr[1])<=9)dtStr[1]='0'+dtStr[1];		
			var rtnDate = dtStr[1]+" "+months[parseInt(dtStr[0])-1];
			return rtnDate+" 2016";
		};
	};
	
	///////////////////////kabaddi code end//////////////////////////////////////////////////
	
		function fnformatDate(date){
			if(date.indexOf('.') != -1)
				var t = date.split('.')
			else
				var t = date.split(' ');
			if(t[1] != undefined){
				t[1] = t[1].replace(/ /,'');
				t[1] = getGetOrdinal(t[1]);
				return t[1]+" "+t[0];
			}else{
				return "";
			}
	}
	
	 function Convert2UserTZ(localdate, o) {
        function pad(n) { return n < 10 ? '0' + n : n };
        var localtime = new Date(localdate).getTime();
        if (o) {
            var off = o.split(':');
            localtime += (off[0] - 5) * -1 * 60 * 60 * 1000; 	//adding Offset Hours
            localtime += (off[1] - 30) * 60 * 1000 * -1; 	//adding Minutes
        }

        return new Date(localtime);
    };
	
	function getGetOrdinal(n) {
	   var s=["th","st","nd","rd"],
		   v=n%100;
	   return n+(s[(v-20)%10]||s[v]||s[0]);
	}
	
	function createTabs(leagIds,leagNames,default_series){		
			var l = leagIds.length;		
			var tabs = "";		
			var tabs_menu = "";		
			var mob_menu = "<div class='mob-menu'><span></span><select class='tab-select'>";		
			$('.tabs .secondChild').remove();		
			/*if($(window).width() <= 767){		
				tabs_str = "<select class='tab-select'>";		
			}		
						
			for(var i = 0 ; i < l ; i++){		
				if($(window).width() <= 767){		
					tabs_str += "<option value='"+leagIds[i]+"'>"+leagNames[i]+"</option>";		
				}		
				else{		
					tabs_str += "<span style='margin-left:5px;margin-right:5px;' data-legname='"+leagIds[i]+"'>"+leagNames[i]+"</span>";		
				}		
			}		
			if($(window).width() <= 767)		
				tabs_str += "</select>";*/		
					
			for(var i = 0 ; i < l ; i++){		
				var secondChild = i == 0 ? "secondChild" : "";		
				tabs_menu += "<span class='si-menu "+secondChild+"' data-legname='"+leagIds[i]+"'>"+leagNames[i]+"</span>";		
				mob_menu += "<option value='"+leagIds[i]+"'>"+leagNames[i]+"</option>";		
			}		
					
			tabs = tabs_menu + mob_menu;		
					
			//console.log(tabs)	
			$(tabs).appendTo($('.si-sportstarTop .tabs'));		
					
			return;		
					
		}
	function swipSlide(container, className, Id) {
		_mSwiper = new Swiper(className, {
			pagination: false,
			loop: false,
			autoplay: false,
			grabCursor: true,
			calculateHeight: true,
			cssWidthAndHeight:false,
			resizeReInit: true,
			slidesPerView: 'auto',
			autoplayDisableOnInteraction: false,
			onSlideChangeEnd: function () {
					if($(window).width() < 600)var scrollItem=1;
					else if($(window).width() > 1024)var scrollItem=3;
						else var scrollItem=2;
						
					var _id = $(container).find('.swiper-slide-active').index();
					
					indexNo = _id;
					
					if(totalMatches<3){
						$('#prev').addClass('nav-disabled');
						$('#next').addClass('nav-disabled');
					}else if(_id==0){
						$('#prev').addClass('nav-disabled');
						$('#next').removeClass('nav-disabled');
					}else if(_id == (totalMatches-scrollItem) || $(container).find('.swiper-slide-active').next().length == 0){
						
						$('#next').addClass('nav-disabled');
						$('#prev').removeClass('nav-disabled');
					}else{
						$('#prev').removeClass('nav-disabled');
						$('#next').removeClass('nav-disabled');
					}

			}
		});
		

        };
	
	
	function navigateMatches(n,ln){
		
		if($(window).width() <= 1024)var scrollItem=1;
		else var scrollItem=2;
		
		
		if(ln<3){
			$('#prev').addClass('nav-disabled');
			$('#next').addClass('nav-disabled');
		}else if(n==0){
			$('#prev').addClass('nav-disabled');
			$('#next').removeClass('nav-disabled');
		}else if(n>=(ln-scrollItem-1)){
			$('#next').addClass('nav-disabled');
			$('#prev').removeClass('nav-disabled');
		}else{
			$('#prev').removeClass('nav-disabled');
			$('#next').removeClass('nav-disabled');
		}
		
		_mSwiper.swipeTo(parseInt(n));	
		
		
		
	}
	
	
	function showLoader(thisRef){
		
		$('#matchs-data').html('');
		$('.carusalWrp .loader').show();
	};
	function removeLoader(){
		
		$('.carusalWrp .loader').hide();
	};
	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	function convertDate(date){
		var year = date.substr(0,4);
		var month = date.substr(4,2);
		var day = date.substr(6,2);
		var today = new Date(year,month-1,day);
		var dd = today.getDate();
		var dy = weekday[today.getDay()];
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10){dd='0'+dd} 
		
		var today = dy+" "+dd+' '+months[mm]+' '+yyyy;
		
		return today;
	};
	function animateLabels() {
		
	   $('.scoreA').fadeOut(1000,function(){ 
		$('.penscore').fadeIn(1000,function(){
			$('.penscore').fadeOut(1000,function(){
				$('.scoreA').fadeIn(1000,function(){
					animateLabels(); 
				});
			});
		});
	   });
	}
	function convertDateTime(date,tm){
		var year = date.substr(0,4);
		var month = date.substr(4,2);
		var day = date.substr(6,2);
		var today = new Date(year,month-1,day);
		var dd = today.getDate();
		var dy = weekday[today.getDay()];
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10){dd='0'+dd} 
		
		var today = months[mm]+' '+dd+' '+yyyy+' '+tm+':01';
    	
		return today;
	};
	 function parseText(obj){
		var cricksub = {};
		var data=[];
		data = obj.split('&');
		var l = data.length;
		for (var i = 0; i < l; i++) {
			var dat = data[i].split('=');
			var m = dat.length;
			for (var j = 0; j < m; j += 2) {
				cricksub[dat[j]] = {};
				cricksub[dat[j]] = dat[j + 1];
			}
		}
		return cricksub;
	};
	function loadJSON(type, params, cb) {
		var url = params;
		if (type == "normal") {
			$.ajax({
				url : url,
				timeout : 100000,
				cache : true,
				success : function(data) {
						cb(data);
				},
				error : function(data) {
					//doNothing(data);
					//(data);
				}
			});
		} else {
			var jqxhr = $.jsonp({
				url : params,
				timeout : 100000,
				cache : true,
				callbackParameter : "callback",
				callback : "cb",
				success : function(data) {
						cb(data);
				},
				error : function(data) {
					//console.log(data);	
					//doNothing(data);
				}
			});
		}
	};
		
    $(document).ready(function () {	
	$('.si-sportstarTop .secondChild').html("");
		Init();
		
		$(window).resize(function() {
				var _id = $('.carusalDv').find('.swiper-slide-active').index();
				
				if($(window).width() < 600)var scrollItem=1;
					else var scrollItem=2;
					
				if(totalMatches<3){
					$('#prev').addClass('nav-disabled');
					$('#next').addClass('nav-disabled');
				}else if(_id==0){
					$('#prev').addClass('nav-disabled');
					$('#next').removeClass('nav-disabled');
				}else if(_id == totalMatches-scrollItem || $('.carusalDv').find('.swiper-slide-active').next().length == 0){
					$('#next').addClass('nav-disabled');
					$('#prev').removeClass('nav-disabled');
				}else{
					$('#prev').removeClass('nav-disabled');
					$('#next').removeClass('nav-disabled');
				}
				
				if($(window).width() < 600){
					$('.sportsbox').outerWidth($('.carusalDv').outerWidth()+adjusted_width);
				}
				else if($(window).width() >= 600 && $(window).width() <= 1024){
					$('.sportsbox').outerWidth($('.carusalDv').outerWidth()/2 +adjusted_width );
				}
			
		})
	
	});
	var getFormatedDate = function(date){
		var newDate = '';
		var time = date.split(' ');
		var dt2Pass = time[0].split('/');
		var dt = dt2Pass[1]+'/'+dt2Pass[0]+'/'+dt2Pass[2];
		var convertedDate = adjustTime(time[1],'+5:30',dt,'date');
		var convertedTime = adjustTime(time[1],'+5:30',dt,'time');
		
		convertedDate = convertedDate.split('/');
		var mm = parseInt(convertedDate[0]);
			mm = mm>9?mm:('0'+mm);
		var dd = parseInt(convertedDate[1]);
			dd = dd>9?dd:('0'+dd);
		
		var yyyy = dt2Pass[2];
		
		newDate = dd+'/'+mm+'/'+yyyy+', '+convertedTime+' IST';
		return newDate;
	}
	function adjustTime(timStr,offSetTim,dteStr,type,pm){
		if (dteStr != undefined) {
			var timStr1=''//timStr.split(' ')[1];
			timStr=timStr.split(' ')[0];
			
			var tempDate1 = dteStr.split("/");
			var myDateObj = new Date(parseInt(tempDate1[2]), parseInt(parseInt(tempDate1[1])-1), parseInt(tempDate1[0]));
			var timeHrMinArr= timStr.split(":");
			myDateObj.setHours(timeHrMinArr[0]);
			myDateObj.setMinutes(timeHrMinArr[1]);
			var timAdjst= '+|11:00';//GMT time +5.30
			var timAdjstArr= timAdjst.split("|");
			var adjstOprtn = timAdjstArr[0];
			var adjstTimArr = timAdjstArr[1].split(":");
			var hrIsNum = adjstTimArr[0];
			var minIsNum = adjstTimArr[1];
			if (hrIsNum!='' && minIsNum!='') {
				var hoursMilliseconds = adjstTimArr[0]*60*60*1000;
				var minutesMilliseconds = adjstTimArr[1]*60*1000;
				var totlTimInMilliseconds = hoursMilliseconds+minutesMilliseconds;
				
				if(offSetTim.indexOf('-')!=-1){
					var _offSetTim=offSetTim.split('-')[1].split(":")
					var offSetHoursMilliseconds = _offSetTim[0]*60*60*1000;
					var offSetMinutesMilliseconds = _offSetTim[1]*60*1000;
					var offSetTotlTimInMilliseconds = offSetHoursMilliseconds+offSetMinutesMilliseconds;
					totlTimInMilliseconds=totlTimInMilliseconds+offSetTotlTimInMilliseconds;
								
				}else {
					if(offSetTim.indexOf('+')!=-1)var _offSetTim=offSetTim.split('+')[1].split(":")
					else var _offSetTim=offSetTim.split(":")

					var offSetHoursMilliseconds = parseInt(_offSetTim[0])*60*60*1000;
					var offSetMinutesMilliseconds = parseInt(_offSetTim[1])*60*1000;
					var offSetTotlTimInMilliseconds = offSetHoursMilliseconds+offSetMinutesMilliseconds;
					totlTimInMilliseconds=totlTimInMilliseconds-offSetTotlTimInMilliseconds;
				}
				
				var myAppDateObj = new Date();
				if(adjstOprtn == "-")myAppDateObj.setTime(myDateObj.getTime()-totlTimInMilliseconds);
				else myAppDateObj.setTime(myDateObj.getTime()+totlTimInMilliseconds);
				var dspHrs = "",dspMins = "";
				 dspHrs = myAppDateObj.getHours().toString();
				 dspHrs = dspHrs<10?('0'+dspHrs):dspHrs;
				if (myAppDateObj.getMinutes().toString().length<2)dspMins = "0"+myAppDateObj.getMinutes().toString();
				else dspMins = myAppDateObj.getMinutes().toString();
				
				if(pm){
					dspHrs = parseInt(dspHrs,10) + 12;
					if(dspHrs === 24) dspHrs = '00';
				} 
				
				var ptTime = dspHrs+":"+dspMins+" "+timStr1;
				var ptDate=(parseInt(myAppDateObj.getMonth())+1)+"/"+myAppDateObj.getDate();
				
				if(type=='date')return ptDate;
				else return ptTime;
				
			} else return "";
		} else return "";
	};
})($);
var warn = function(_str){
	if(window.console && window.console.warn){
		console.warn(_str);
	}
}
var replaceAll = function(findText, replaceText, text) {
	text = text.replace(/[^a-zA-Z0-9- ]/g, '-');
	return text.replace(/[\.'. ,:-]+/g, replaceText).toLowerCase();
}