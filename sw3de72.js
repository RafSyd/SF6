var IndexClass=BaseClass.extend({init:function(){this._super();this.initGeosuggest();this.initOther();this.initFacebook();if($.inArray(sitecode,['olxpt'])>-1)this.initLocationInfo();this.initMainCategories();this.initScreening();this.initExpandbar();ObserveObject.bindClicks();setTimeout(function(){ObserveObject.updateList()},100);this.initPromoSubcategories();if(typeof NinjaTracker!=='undefined')this.initNinjaAdImpressions();this.bindPixelEvents();this.initBusinessPartnerTracking();this.initFeedTheDogAdTracking();this.initFeedTheDogBannerTracking();this.initFeedTheDogCategoryTracking();this.state={data:[]};this.initTopBarBanner();this.clearTraderCache()},getPromoSubcategories:function(){return[]},initPromoSubcategories:function(){var cats=this.getPromoSubcategories();$('.maincategories-list').find('.parent').click(function(){var $this=$(this);if(!$this.hasClass('subcatBinded')){$this.addClass('subcatBinded');var catId=$this.data('id');if(cats[catId])for(i in cats[catId]){var subcatData=cats[catId][i];subcatData.loadScript();var $subcatDiv=$('#bottom'+catId),lastClear=$subcatDiv.find('.clear:last'),lastClearIndex=lastClear.index()+1;if(lastClearIndex%4===0){$subcatDiv.find('ul').append('<li class="clear"></li>');$subcatDiv.find('.clear:last').before('<li id="subcatLink_'+subcatData.id+'" class="fleft"><a href="'+subcatData.url+'" class="link-maincategory cat-main inlblk link icon-link" target="'+subcatData.target+'"><span class="block category-name">'+subcatData.name+'</span></a>')}else lastClear.before('<li id="subcatLink_'+subcatData.id+'" class="fleft"><a href="'+subcatData.url+'" class="link-maincategory cat-main inlblk link icon-link" target="'+subcatData.target+'"><span class="block category-name">'+subcatData.name+'</span></a>');$subcatDiv.find('#subcatLink_'+subcatData.id).click(subcatData.clickScript)}}})},initPromoCategories:function(){'use strict';var thiz=this,$cmtEndpoint=window.urls_config.CMT_PROMO_CATEGORIES;$.get($cmtEndpoint+'?brand='+window.sitecode+'&lang='+window.lang,function(data){data.forEach(function(category,index){var categoryCode='category-'+index,newCategoryRow='<div class="maincategories-list clr"><div class="li fleft"><div class="item"><a href="'+category.link.url+'" data-id="promo" class="link parent search promo"><span>'+category.name+'</span><span class="cat-icon cat-icon-circle '+categoryCode+' cat-icon-promo"></span></a></div></div></div></div>',newCategory='<div class="li fleft"><div class="item"><a href="'+category.link.url+'" data-id="promo" class="link parent search"><span>'+category.name+'</span><span class="cat-icon cat-icon-circle '+categoryCode+' cat-icon-promo"></span></a></div></div>',lastCategoryRow=$('.maincategories-list.clr .item').last().parents('.maincategories-list'),lastRow=$('.maincategories-list.clr .item').last().parents('.maincategories-list'),countCategoryInLastRow=lastCategoryRow.find('.item').length,style='<style type="text/css"> .maincategories .maincategories-list .li .item a[data-id="promo"] .'+categoryCode+'.cat-icon-promo{background-image: url('+category.icon.image_url+');} </style>';if(countCategoryInLastRow===9){if($(".subcategories-list.clr[id^='bottomdiv']").first().length){$(".subcategories-list.clr[id^='bottomdiv']").first().before(newCategoryRow)}else lastRow.after(newCategoryRow);$('body').append($(style))}else{lastCategoryRow.append(newCategory);$('body').append($(style))}});if(typeof window.cmtCategoriesColors!=='undefined')thiz.initHomepageCategoriesColors()}).fail(function(){return})},initHomepageCategoriesColors:function(){'use strict';$('.cat-icon').each(function(index,categoryElement){if(index>=window.cmtCategoriesColors.length)index=index%window.cmtCategoriesColors.length;$(categoryElement).css({'background-color':window.cmtCategoriesColors[index]['foreground']})})},initMainCategories:function(){var thiz=this,$leftLinks=$('.maincategories-list a.parent'),$uls=$('.subcategories-list'),$input=$('#cityField'),defaultText=$input.attr('defaultval'),defaultAlternative=$input.attr('defaultalternative');if(typeof cmtPromoCategories!=='undefined'&&cmtPromoCategories)this.initPromoCategories();$leftLinks.click(function(){var $this=$(this);if($this.hasClass('search'))return true;var id=$this.data('id'),$subcategories=$uls.filter('#bottom'+id),subcategoriesIsHidden=$subcategories.is(':hidden');$uls.hide();$leftLinks.removeClass('selected');if(subcategoriesIsHidden){$subcategories.show();$this.addClass('selected');thiz.firePixelEventByCat(id);$('html, body').animate({scrollTop:$('.maincategories').offset().top-50},200)}else{$subcategories.hide();$this.removeClass('selected')};return false})},initScreening:function(){var $banner=$('.fullscreen-banner');if($banner.length){var $document=$(document),topBanner=$banner.offset().top;function fixBanner(){var yScroll=Math.abs($document.scrollTop());if(yScroll>=topBanner){$banner.addClass('fix').css('top',0)}else $banner.removeClass('fix').css('top','')};fixBanner();$(window).scroll(function(){fixBanner()});$(window).resize(function(){fixBanner()})}},initExpandbar:function(){var $dfpExpandbar=$('#dfpExpandbar'),$dfpExpandbarVideo=$('#dfpExpandbarVideo'),dfpExpandbarCookie=$dfpExpandbar.data('cookie');if($dfpExpandbar.length>0&&$.cookie(dfpExpandbarCookie)==null){$dfpExpandbar.removeClass('hidden dfp-expandbar--collapsed');$.cookie(dfpExpandbarCookie,'1',{expires:30,path:'/',domain:'.'+session_domain})}else $dfpExpandbar.removeClass('hidden');$('.dfp-expandbar__close',$dfpExpandbar).click(function(e){e.preventDefault();$('.dfp-expandbar__inner',$dfpExpandbar).css('top','100%').animate({top:0},300);$dfpExpandbar.toggleClass('dfp-expandbar--collapsed');if($dfpExpandbarVideo.length>0)if($dfpExpandbar.hasClass('dfp-expandbar--collapsed')){$dfpExpandbarVideo[0].pause()}else $dfpExpandbarVideo[0].play();return false})},initFacebook:function(){if(typeof fb_connect_url=='undefined')return false;var cache=$.ajaxSettings.cache;$.ajaxSettings.cache=true;$.getScript(fb_connect_url,function(){FB.init({appId:fb_app_id,status:false,cookie:false,xfbml:true})});$.ajaxSettings.cache=cache},fblockActive:function(element,space){$(space).find('.fblock').removeClass('active');$(element).closest('.fblock').addClass('active')},initGeosuggest:function(){var thiz=this,$input=$('#cityField'),defaultText=$input.attr('defaultval'),defaultAlternative=$input.attr('defaultalternative');$input.focus(function(){if($input.val()==defaultText||$input.val()==defaultAlternative)$input.val('');if($input.val()==''){$input.val(defaultAlternative);$input.addClass('ca2');$input.setSelection(0,0)}else{var inputLength=$input.val().length;$input.setSelection(inputLength,inputLength)};thiz.fblockActive(this,'.searchmain')}).blur(function(){if($input.val()==defaultAlternative)$input.val(defaultText)}).keydown(function(){if($input.val()==defaultText||$input.val()==defaultAlternative)$input.val('').removeClass('ca2')}).geosuggest({showGeoSuggestions:false,saveAsDefaultLocationInCookie:true,loadDefaultLocationFromCookie:true,distanceSelect:$('#distanceSelect'),citiesOld:window.module_cities_old===1,locationChanged:function(text,regionID,cityID,districtID,distance,byUser,locUrl){thiz.updateCategoriesLinks(regionID,cityID,districtID,distance);var url='';if(typeof locUrl!=="undefined")url=locUrl.replace(';','_').replace(':','-');if(window.module_cities_old==1&&(sitecode=='olxua'||sitecode=='olxkz')){$('#maincat-grid').find('a[data-search="1"]').each(function(){$(this).attr('href',$(this).data('url').replace(/(http[s]?:\/\/)/g,"\$1"+url+(url.length?'.':'')))})}else{if(typeof districtID!=="undefined"&&districtID!=0){url+='/?search[district_id]='+districtID;if(typeof distance!=="undefined"&&distance!=0)url+='&search[dist]='+distance}else if(url.length&&typeof distance!=="undefined"&&distance!=0)url+='/?search[dist]='+distance;$('#maincat-grid').find('a[data-search="1"]').each(function(){$(this).attr('href',$(this).data('url')+url)})}},cookiesLocationSaved:function(){var inputEvent=document.createEvent('Event');inputEvent.initEvent('locationchange',true,true);$input[0].dispatchEvent(inputEvent);thiz.get('ads','homepage',{},function(data){if(data){$('#mainpageAds').html(data);ObserveObject.bindClicks();ObserveObject.updateList();if(typeof NinjaTracker!=='undefined')thiz.initNinjaAdImpressions()}})},lastLocationsNoBlur:($.inArray(sitecode,['olxpt'])>-1)?true:false})},updateCategoriesLinks:function(regionID,cityID,districtID,distance){var thiz=this;thiz.post('geo6','getstatsandlinks',{region_id:regionID,city_id:cityID,district_id:districtID,dist:distance,onlylinks:1},function(data){if(data.status=='error')return;$('#searchmain-container').find('.maincategories').find('a.link, a.link-relatedcategory').each(function(){var $t=$(this);if($t.data('id')&&typeof data.data.urls[$t.data('id')]!="undefined")$t.attr('href',data.data.urls[$t.data('id')])})})},initOther:function(){var thiz=this;$.fn.setCursorPosition=function(pos){this.each(function(index,elem){if(elem.setSelectionRange){elem.setSelectionRange(pos,pos)}else if(elem.createTextRange){var range=elem.createTextRange();range.collapse(true);range.moveEnd('character',pos);range.moveStart('character',pos);range.select()}});return this};$('input#headerSearch').focus(function(){$this=$(this);if($this.val()==''){$this.addClass('ca2').val($this.attr('defaultval'));$this.setCursorPosition(0)}else if($this.val()==$this.attr('defaultval')){$this.val($this.attr('defaultval'));$this.setCursorPosition(0)};$('#distanceSelect').find('ul').addClass('hidden').hide();$('#categorySelectList').hide();thiz.fblockActive(this,'.searchmain')}).keydown(function(){$this=$(this);if($this.val()==$this.attr('defaultval'))$this.removeClass('ca2').val('')}).keyup(function(){$this=$(this);if($this.val().length==0){$this.addClass('ca2').val($this.attr('defaultval'));$this.setCursorPosition(0)}}).click(function(){$this=$(this);if($this.val()==$this.attr('defaultval'))$this.setCursorPosition(0)}).bind('paste',function(){$this=$(this);if($this.val()==$this.attr('defaultval'))$this.removeClass('ca2').val('')});$('input#headerSearch').focus();$('#lastsearchclear').click(function(){$this=$(this);$.get(www_base_ajax+'/misc/clearcategories/',function(){$('.lastsearch, .youractivity').fadeOut()});return false});var allTags=null,maxSpace=$('#lastsearchBox').width()-$('#lastsearchclear').outerWidth(true);$('#lastsearchBox a.item').each(function(index){allTags+=($(this).outerWidth(true));if(maxSpace>allTags)$(this).show()});mediaQuery();$(window).resize(function(){mediaQuery()})
function mediaQuery(){var windowWidth=$(window).width();if(windowWidth<'1110'){$('body').addClass('smallscreen')}else $('body').removeClass('smallscreen')};if($('#categorySelect').size()>0){var dropdownHeight=$('#categorySelectList > li').length*28,dropdownTopMargin=$('#categorySelect').offset().top+$('#categorySelect').height();function scaleDropDown(){if($('#categorySelectList').is(':visible')){var viewportHeight=$(window).height(),viewportSpace=viewportHeight-dropdownTopMargin-18+$(document).scrollTop();if(dropdownHeight<viewportSpace){$('#categorySelectList').css('max-height','none')}else $('#categorySelectList').css('max-height',viewportSpace)}};$(window).resize(function(){scaleDropDown()});$('#categorySelect').click(function(){thiz.fblockActive(this,'.searchmain');var $selectList=$('#categorySelectList');$selectList.toggle();$selectList.is(':visible')?$(document).trigger('hidedropdowns'):'';scaleDropDown();return false});$('.categorySelectA1, .categorySelectA2').click(function(){$('#categorySelectList').hide();$('#categorySelectHidden').val($(this).data('id'));$('#categorySelectName').text($(this).data('name'));$('#categorySelect').addClass('data-inserted');$("#categorySelect").removeClass(function(index,css){return(css.match(/\ba-category-\S+/g)||[]).join(' ')});$('#categorySelect').addClass($(this).data('icon_class'));return false});$(document).bind('click',function(e){var $clicked=$(e.target);if(!$clicked.parents().hasClass('categorySelectList'))$('#categorySelectList').hide()});var timer=null;function getFacets(){if(timer!=null)window.clearTimeout(timer);timer=window.setTimeout(function(){var $input=$('input#headerSearch'),oldValue=$input.val();if($input.val()==$input.attr('defaultval'))$input.val('');$.post(www_base_ajax+'/searchfacets/',$('#searchmain').serialize(),function(data){var categoriesStats=data.data;$('.categorySelectA1, .categorySelectA2').find('span.counter').each(function(){if(categoriesStats[$(this).data('id')]){$(this).html(categoriesStats[$(this).data('id')]).removeClass('hidden')}else $(this).addClass('hidden')})});$input.val(oldValue)},600)};$('body').live('geo-suggest-selected',function(e){getFacets()});$('select#distanceSelect, #cityField').change(function(){getFacets()});$('input#headerSearch').blur(function(){getFacets()})}},initLocationInfo:function(){var $locationInfoBox=$('#locationInfoBox'),$showLocationInfo=$('#showLocationInfo'),$regionsList=$('.regionsList','#proposalContainer'),$tooltipText,$tooltip;$tooltipText='<p>Estas são as freguesias com mais anúncios!<br>Se não encontra a freguesia desejada na lista, escreva o nome da mesma ou código postal.</p>';$tooltip=$('<div id="subregionTooltip" class="suggest tooltip-subregion abs zi3 br3"><i data-icon="circle_info"></i>'+$tooltipText+'</div>');$locationInfoBox.prependTo('#proposalContainer').removeClass('hidden');$showLocationInfo.click(function(e){e.preventDefault();$locationInfoBox.toggleClass('info-active')});$('#cityField, #locationInfoBox').click(function(e){e.stopPropagation()});$('body').bind('click',function(e){$('#proposalContainer').addClass('hidden');$locationInfoBox.removeClass('info-active')});$('input#headerSearch').focus(function(){$('#proposalContainer').addClass('hidden');$locationInfoBox.removeClass('info-active')});if(window.module_cities_old===undefined){$regionsList.find('> li').live('mouseenter',function(){var $this=$(this),$childUl=$this.find('ul');if($childUl.length!=0)if($childUl.offset().top<110)$childUl.css({top:function(index,value){return parseFloat(value)+110}})});$regionsList.find('ul').live('mouseenter',function(){var $this=$(this),cssTop=$this.position().top+'px',cssMarginTop=parseInt($this.css('margin-top'))-110+'px';$tooltip.css({top:cssTop,'margin-top':cssMarginTop});$tooltip.insertBefore($this)});$regionsList.find('ul').live('mouseleave',function(){$('#subregionTooltip').remove()})}},firePixelEventByCat:function(categoryId){if(typeof homePageCategoryEventData=='undefined'||typeof homePageCategoryEventData[categoryId]=='undefined')return;var pixelEventId=homePageCategoryEventData[categoryId];this.firePixelEvent(pixelEventId)},firePixelEvent:function(pixelEventId){var axel=Math.random(),a=axel*1e13,_DFPAudiencePixel=new Image(1,1);_DFPAudiencePixel.src="https://pubads.g.doubleclick.net/activity;dc_iu=/"+mainPixelId+"/DFPAudiencePixel;ord="+a+";dc_seg="+pixelEventId+"?"},bindPixelEvents:function(){if(typeof pixelMyolxEvent=='undefined')return true;var thiz=this;$('#topLoginLink').click(function(){thiz.firePixelEvent(pixelMyolxEvent);return true})},initNinjaAdImpressions:function(){var $ads=$('#gallerywide li:not(.gallerywide__dfp)'),scrollTimer=null,eventName='scroll.adimpressions';Main.pushAdImpressionsOnScroll($ads);$(window).unbind(eventName).bind(eventName,function(){if(scrollTimer)clearTimeout(scrollTimer);scrollTimer=setTimeout(function(){Main.pushAdImpressionsOnScroll($ads)},100)})},initBusinessPartnerTracking:function(){$('.footer-business-partner__btn').click(function(){if(typeof NinjaTracker!=='undefined'&&NinjaTracker.isTrackingDataValid())NinjaTracker.push(NinjaTracker.mergeValidOptionalParams(NinjaTracker.getDataFrom(trackingData.pageView),{trackEvent:['olx_pro_banner_click'],action_type:'olx_pro_banner_click',event_type:'click'}))})},initFeedTheDogAdTracking:function(){$('.feed-the-dog-link').click(function(){if(typeof NinjaTracker!=='undefined'&&NinjaTracker.isTrackingDataValid())NinjaTracker.push(NinjaTracker.mergeValidOptionalParams(NinjaTracker.getDataFrom(trackingData.pageView),{trackEvent:['ad_click'],action_type:'ad_click',event_type:'click',ad_reason:'feed_the_dog'}))})},handleTopBarBannerTracking:function(name,eventType){if(typeof NinjaTracker!=='undefined'&&NinjaTracker.isTrackingDataValid())NinjaTracker.push(NinjaTracker.mergeValidOptionalParams(NinjaTracker.getDataFrom(trackingData.pageView),{trackEvent:[name],action_type:name,event_type:eventType,banner_cta_content_id:this.state.data[0].id,banner_cta_content_name:this.state.data[0].name}))},initFeedTheDogCategoryTracking:function(){$('.feed-the-dog-category').click(function(){if(typeof NinjaTracker!=='undefined'&&NinjaTracker.isTrackingDataValid())NinjaTracker.push(NinjaTracker.mergeValidOptionalParams(NinjaTracker.getDataFrom(trackingData.pageView),{trackEvent:['fake_category_feed_dog_click'],action_type:'fake_category_feed_dog_click',event_type:'click'}))})},initFeedTheDogBannerTracking:function(){$('.feed-the-dog-cta').click(function(){if(typeof NinjaTracker!=='undefined'&&NinjaTracker.isTrackingDataValid())NinjaTracker.push(NinjaTracker.mergeValidOptionalParams(NinjaTracker.getDataFrom(trackingData.pageView),{trackEvent:['olx_homepage_banner_cta_clicked'],action_type:'olx_homepage_banner_cta_clicked',event_type:'click',touch_point_button:'feed_the_dog'}))})},initTopBarBanner:function(){var thiz=this,localStorageName='closedBanners',storedItem=localStorage.getItem(localStorageName),country=window.sitecode.substring(3).toLowerCase(),lang=window.lang,contentMangerUrl=window.euonb_content_manager_url,excludedContentIds='';if(storedItem!==null)excludedContentIds='&excludedContentIds='+storedItem.substring(0,storedItem.length-1);var topBannerUrl=contentMangerUrl+'?country='+country+'&brand=olx&language='+lang+'&type=banner&channel=desktop_web'+excludedContentIds,iconType=null,iconTypes=['success','error','warning'],$topBarBanner=$('.topbarbanner'),$psIcon=$('.psIcon'),$closeIcon=$('.closeIcon');$(document).ready(function(){if(topBannerUrl)$.get(topBannerUrl,function(response){thiz.state.data=response;if(thiz.state.data.length){var storedItemsArr;if(storedItem!==null)storedItemsArr=storedItem.substring(0,storedItem.length-1).split(',');if(storedItemsArr&&storedItemsArr.includes(thiz.state.data[0].id))$topBarBanner.remove();if(thiz.state.data[0].icon){iconType=thiz.state.data[0].icon.toLowerCase();$psIcon.remove()};$topBarBanner.css('display','flex').css('background-color',thiz.state.data[0].bgColor);thiz.handleTopBarBannerTracking('olx_homepage_banner_viewed','pv');if(iconType&&iconTypes.indexOf(iconType)!==-1){$("#icon").addClass(iconType)}else $("#icon").addClass('hide');$closeIcon.click(function(){var storedId;if(storedItem){storedId=storedItem+thiz.state.data[0].id}else storedId=thiz.state.data[0].id;localStorage.setItem(localStorageName,storedId+',');$topBarBanner.remove();thiz.handleTopBarBannerTracking('olx_homepage_banner_close','click')});$("#text").text(thiz.state.data[0].text).css('color',thiz.state.data[0].textColor);if(thiz.state.data[0].cta){$("#cta-link").text(thiz.state.data[0].ctaLabel).attr('href',thiz.state.data[0].ctaUrl).click(function(){thiz.handleTopBarBannerTracking('olx_homepage_banner_cta_clicked','click')});$("#cta-link-experiment").text(thiz.state.data[0].ctaLabel).attr('href',thiz.state.data[0].ctaUrl).click(function(){thiz.handleTopBarBannerTracking('olx_homepage_banner_cta_clicked','click');$topBarBanner.remove()})}}}).fail(function(){return})})},clearTraderCache:function(){if(window.user_logged===0){localStorage.removeItem('user_trader_data_cache_with_TTL');localStorage.removeItem('user_trader_data_cache')}}});IndexClass=IndexClass.extend({init:function(){this._super()},getPromoSubcategories:function(){var cats=[];(cats[619]=cats[619]||[]).push({id:'fixly',name:'Usługi remontowe - Fixly!',url:'https://fixly.pl/kategorie/remont?utm_source=olx-l2&utm_medium=l2&utm_campaign=OLX&utm_content=remont',target:'_blank',loadScript:function(){},clickScript:function(){}});return cats},track:function(trackingParams){if(typeof NinjaTracker!=='undefined'&&NinjaTracker.isTrackingDataValid())NinjaTracker.push(NinjaTracker.mergeValidOptionalParams(NinjaTracker.getDataFrom(trackingData.pageView),trackingParams))}});$(function(){IndexObj=new IndexClass()});$(function(){LinkSenderObject=new LinkSender()});LinkSender=BaseClass.extend({init:function(){this._super();this.$form=$('#appLinkSender');this.initValidators()},initValidators:function(){var thiz=this;if(thiz.$form.length>0)thiz.$form.validate({ignore:'.ignore',dontScrollToError:true,rules:{'notif[email_phone]':{required:true,email_phone:true}},messages:{'notif[email_phone]':{required:'To pole jest wymagane',email_phone:'Niepoprawny format e-mail lub numer telefonu'}},submitHandler:function(){var serialized=thiz.$form.serializeArray();thiz.post('misc','sendlinkwithapps',serialized,function(data){if(typeof data.errors!=='undefined'&&!$.isEmptyObject(data.errors)){thiz.$form.validate().showErrors({"notif[email_phone]":data.errors})}else $('button',thiz.$form).addClass('success').removeClass('sending').text('Wysłano!')},'json');return false}}).showErrorsFromAction()}});(function(Context){"use strict";var _settings={categories:{selector:'.maincategories-list a',eventType:'click'},subcategories:{selector:'.subcategories-list > ul a',eventType:'click'},showAllAds:{selector:'.subcategories-title a',eventType:'click'},locationChange:{selector:'#cityField',eventType:'locationchange'},locationTyping:{selector:'#cityField',eventType:'change'},locationClick:{selector:'#cityField',eventType:'click'},search:{selector:'#submit-searchmain',eventType:'click'},addToFavourite:{selector:'.observe-link',eventType:'click'},removeFromFavourite:{selector:'.observe-link',eventType:'click'}};Context.widget={init:function(){this.bindUIActions();return this},bindUIActions:function(){var _$=Context.$;_settings.categories.params=function(){return Context.mergeValidOptionalParams(Context.getDataFrom(trackingData.pageView),{trackEvent:['home_l1_click'],action_type:'home_l1_click',touch_point_page:trackingData.pageView.listing_type||trackingData.pageView.trackPage,'$dataset':{cat_l1_id:'data-id'},city_id:_$('.autosuggest-geo-input').value,district_id:_$('.autosuggest-geo-district-input').value,region_id:_$('.autosuggest-geo-input-region').value})};_settings.subcategories.params=function(){return Context.mergeValidOptionalParams(Context.getDataFrom(trackingData.pageView),{trackEvent:['home_l2_click'],action_type:'home_l2_click',touch_point_page:trackingData.pageView.listing_type||trackingData.pageView.trackPage,'$dataset':{cat_l1_id:'data-category-id',cat_l2_id:'data-id'},city_id:_$('.autosuggest-geo-input').value,district_id:_$('.autosuggest-geo-district-input').value,region_id:_$('.autosuggest-geo-input-region').value})};_settings.subcategories.delayLocation=true;_settings.showAllAds.params=function(){return Context.mergeValidOptionalParams(Context.getDataFrom(trackingData.pageView),{trackEvent:['show_l1_ads'],action_type:'show_l1_ads',touch_point_page:trackingData.pageView.listing_type||trackingData.pageView.trackPage,'$dataset':{cat_l1_id:'data-id'},city_id:_$('.autosuggest-geo-input').value,district_id:_$('.autosuggest-geo-district-input').value,region_id:_$('.autosuggest-geo-input-region').value})};_settings.showAllAds.delayLocation=true;_settings.locationChange.params=function(){return Context.mergeValidOptionalParams(Context.getDataFrom(trackingData.pageView),{trackEvent:['location_change_valid'],action_type:'location_change_valid',touch_point_page:trackingData.pageView.listing_type||trackingData.pageView.trackPage,city_id:_$('.autosuggest-geo-input')?_$('.autosuggest-geo-input').value:null,district_id:_$('.autosuggest-geo-district-input')?_$('.autosuggest-geo-district-input').value:null,region_id:_$('.autosuggest-geo-input-region')?_$('.autosuggest-geo-input-region').value:null,distance_filt:_$('.autosuggest-geo-dist-input')?_$('.autosuggest-geo-dist-input').value:null})};_settings.locationTyping.params=function(){return Context.mergeValidOptionalParams(Context.getDataFrom(trackingData.pageView),{trackEvent:['location_typing'],action_type:'location_typing',touch_point_page:trackingData.pageView.listing_type||trackingData.pageView.trackPage,city_id:_$('.autosuggest-geo-input')?_$('.autosuggest-geo-input').value:null,district_id:_$('.autosuggest-geo-district-input')?_$('.autosuggest-geo-district-input').value:null,region_id:_$('.autosuggest-geo-input-region')?_$('.autosuggest-geo-input-region').value:null,distance_filt:_$('.autosuggest-geo-dist-input')?_$('.autosuggest-geo-dist-input').value:null})};_settings.locationClick.params=function(){return Context.mergeValidOptionalParams(Context.getDataFrom(trackingData.pageView),{trackEvent:['location_change_click'],action_type:'location_change_click',touch_point_page:trackingData.pageView.listing_type||trackingData.pageView.trackPage,city_id:_$('.autosuggest-geo-input')?_$('.autosuggest-geo-input').value:null,district_id:_$('.autosuggest-geo-district-input')?_$('.autosuggest-geo-district-input').value:null,region_id:_$('.autosuggest-geo-input-region')?_$('.autosuggest-geo-input-region').value:null,distance_filt:_$('.autosuggest-geo-dist-input')?_$('.autosuggest-geo-dist-input').value:null})};_settings.search.params=function(){var s=_$('#headerSearch');return Context.mergeValidOptionalParams(Context.getDataFrom(trackingData.pageView),{trackEvent:['keyword_search'],action_type:'keyword_search',touch_point_page:trackingData.pageView.listing_type||trackingData.pageView.trackPage,cat_l1_id:(typeof root_category_id!=='undefined'?root_category_id:null),cat_l2_id:(typeof second_category_id!=='undefined'?second_category_id:null),cat_l3_id:((typeof second_category_id!=='undefined')&&(second_category_id!==category_id)?category_id:null),city_id:_$('.autosuggest-geo-input').value,district_id:_$('.autosuggest-geo-district-input').value,region_id:_$('.autosuggest-geo-input-region').value,keyword:(s.value!==s.getAttribute('defaultval')?s.value:null)})};_settings.addToFavourite.params=function(){return Context.mergeValidOptionalParams(Context.getDataFrom(trackingData.pageView),{trackEvent:['favourite_ad_click'],action_type:'favourite_ad_click',touch_point_page:trackingData.pageView.listing_type||trackingData.pageView.trackPage})};_settings.addToFavourite.beforeCallback=function(node,e,listener,eventType){var stateHandler=Context.getClosest(node,'.observelinkgallery');if(!Context.hasClass(stateHandler,'inobserved'))listener(e);return false};_settings.removeFromFavourite.params=function(){return Context.mergeValidOptionalParams(Context.getDataFrom(trackingData.pageView),{trackEvent:['favourite_ad_deleted'],action_type:'favourite_ad_deleted',touch_point_page:trackingData.pageView.listing_type||trackingData.pageView.trackPage})};_settings.removeFromFavourite.beforeCallback=function(node,e,listener,eventType){var stateHandler=Context.getClosest(node,'.observelinkgallery');if(Context.hasClass(stateHandler,'inobserved'))listener(e);return false};Context.unregisterAsyncPayload();for(var key in _settings)if(_settings.hasOwnProperty(key))Context.registerEvent(_settings[key].selector,_settings[key].eventType,_settings[key].params,true,_settings[key].beforeCallback||false,_settings[key].afterCallback||false,_settings[key].delayLocation||false);return this},XHRCompleted:function(isPageRequest){var isPageRequest=isPageRequest||false;if(isPageRequest)Context.reInit();this.bindUIActions();return this}};return Context})((typeof NinjaTracker!=='undefined'?NinjaTracker:{}));// JavaScript Document