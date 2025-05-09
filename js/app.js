function application(){
	var _self = this;
	this.searchval = '请输入关键词';
	this.api = '4DD845D1BB619BEEFB641EC49A7D8735';
	this.phone = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
    this.email = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	this.toolAuto = true;
	
	// 顶部导航
    $('#nav .drop').each(function(index, element){
        if($(this).find('dd').length == 0){
			$(this).remove();
        }else if($(this).find('dd').length == 1){
			$(this).width(330);
		}else if($(this).find('dd').length == 2){
			$(this).width(440);
		}else if($(this).find('dd').length == 3){
			$(this).width(550);
		}else if($(this).find('dd').length == 4){
			$(this).width(660);
		}else{
			$(this).width(660);
		}
    })
	$('#nav li').bind({
		'mouseenter': function(){
			$(this).children('.drop').stop(true, true).slideDown();
		},
		'mouseleave': function(){
			$(this).children('.drop').stop(false, false).slideUp();
		}
	})
	
    // 菜单
    $('#menu .drop').each(function(index, element){
        if($(this).children('li').length == 0){
			$(this).remove();
        }else{
            $(this).parent().addClass('isdrop');
        }
    })
    $('#menu dd > a').bind('click', function(e){
        if($(this).siblings('.drop').length == 0){
			//  超链接跳转
        }else{
            if($(this).siblings('.drop').is(':hidden')){
				$(this).parent().addClass('current').siblings().removeClass('current');
				$(this).siblings('.drop').stop(true, true).slideDown(200).end().parent('dd').siblings('dd').children('.drop').stop(false, false).slideUp(200);
            }else{
				$(this).parent().removeClass('current');
            	$(this).siblings('.drop').stop(false, false).slideUp(200);
            }
          	e.preventDefault();
        }
    })
    
	// 格式化电话号码
    $('[ig-phone]').each(function(index, element){
        var tel400 = $.trim($(this).text()), telLength = tel400.length;
        if(telLength == 11){  // 手机号码 OR 座机号码
            var firstNum = tel400.substr(0,1);
            if(firstNum == 0){
                var tel1 = tel400.substr(0, 4);
                var tel2 = tel400.substr(4, 7);
                tel400 = tel1+ "-" + tel2;
            }else{
                var tel1 = tel400.substr(0, 3);
                var tel2 = tel400.substr(3, 4);
                var tel3 = tel400.substr(7, 4);
                tel400 = tel1+ "-" + tel2 + "-" + tel3;
            }
        }else if(telLength == 12){
            var tel1 = tel400.substr(0, 4);
            var tel2 = tel400.substr(4, 8);
            tel400 = tel1+ "-" + tel2;
        }else if(telLength == 10){
            var tel1 = tel400.substr(0, 3);
            var tel2 = tel400.substr(3, 4);
            var tel3 = tel400.substr(7, 3);
            tel400 = tel1+ "-" + tel2 + "-" + tel3;
        }
        $(this).html(tel400);
    })
    
    // 加入收藏
	$('#addFavo').bind('click', function(){
		app.addFavorite($('title').html(), location.href, '');
	});
	
	// 返回顶部
	$('#top').bind('click', function(){
		$('body, html').animate({'scrollTop': 0}, 200);
	})
	
	// API验证
	if(typeof(_self.api) == 'undefined' || _self.api.substr(13,4) != 'BEEF'){
		return false;
	}
	
	this.scroller();
	this.searcher();
	this.toolbar();
	// this.plugs();
	this.former();
	this.photo();
    this.album();
    this.bdmap();
}
application.prototype = {
	// plugs: function(){
	// 	// 百度分享-浮窗+图标
	// 	window._bd_share_config={
	// 		"common": {
	// 			"bdSnsKey":{},
	// 			"bdText":"",
	// 			"bdMini":"2",
	// 			"bdMiniList":false,
	// 			"bdPic":"",
	// 			"bdStyle":"0",
	// 			"bdSize":"24"
	// 		},
	// 		"slide": {
	// 			"type":"slide",
	// 			"bdImg":"0",
	// 			"bdPos":"left",
	// 			"bdTop":"160.5"
	// 		},
	// 		"share": {}
	// 	};
	// 	with(document)0[(getElementsByTagName('head')[0]||body)
	// 		.appendChild(createElement('script'))
	// 		.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
		
	// 	// 
	// },
    bdmap: function(){
        var func = function(){
        	if($(".BMap_bubble_title a").length < 1){
                setTimeout(func, 100);
              }else{
                $(".BMap_bubble_title a").attr({"target":"_blank"});
              }
            }
        func();  // 执行函数
    },
    album: function(){
		$("#albumList .item").click(function(){
            $("#dialogAlbum").show();
            var windowHeight = $(window).height(), windowWidth = $(window).width();
            create();
            var f = $(this).index()+1;
            funny(f);
        });
        function create(){
			var _html = '';
            $("#albumList .item").each(function(index, element){
				_html +='<li><table cellpadding="0" cellspacing="0" border="0" class="img"><tr><td align="center" valign="middle"><img src="'+ $(element).attr('url') +'" /></td></tr></table></li>'; 
            });
            $("#dialogAlbumContainer ul").html(_html).find("img");
        }
        function funny(f){
            var windowHeight = $(window).height(), windowWidth = $(window).width(), t, interval = 5000, speed = 300, n = f,	clones = $("#dialogAlbumContainer li").eq(0).clone(true),	N = $("#dialogAlbumContainer li").length+1, htmlTip = "", isAuto = false;
            $("#dialogAlbumContainer ul").append(clones);
            $("#dialogAlbumContainer ul").css({"width":N*windowWidth});
            $("#dialogAlbumContainer li").css({"width":windowWidth});
            // 自动生成tip标签
            for(var i=1; i<N; i++){
                if(i==f){
                    htmlTip += "<span class='cur'></span>";
                }else{
                    htmlTip += "<span></span>";
                }
            }
            $("#dialogAlbumTip").html(htmlTip);
            // 点击打开默认位置
            $("#dialogAlbumContainer ul").css({"margin-left":(-windowWidth*(n-1))});
            // 执行函数
            var func = function(){
                if(n >= N){
                    $("#dialogAlbumContainer ul").css({"margin-left":0});
                    n = 1;
                    setTimeout(func, 0)
                }else if(n < 0){
                    n = N-2;
                    $("#dialogAlbumContainer ul").css({"margin-left":(-windowWidth*(n+1))});
                    setTimeout(func, 0);
                }else{
                    n++;
                    $("#dialogAlbumContainer ul").stop().animate({"margin-left":(-windowWidth*(n-1))}, speed);
                    $("#dialogAlbumTip span").eq(n-1).addClass("cur").siblings().removeClass("cur");
                    if(n == N){
                        $("#dialogAlbumTip span").eq(0).addClass("cur").siblings().removeClass("cur");
                    }
                }
            }
            // 点击执行
            $("#dialogAlbumTip span").click(function(){
                $(this).addClass("cur").siblings().removeClass("cur");
                n = $(this).index();
                $("#dialogAlbumContainer ul").animate({"margin-left":(-windowWidth*n)}, speed);

            });
            // 关闭.自动播放.左滑动.右滑动
            $("#dialogAlbum .close").click(function(){ $("#dialogAlbum").hide(); });
            $("#imgPlayAuto").click(function(){
                if(!isAuto){ t = setInterval(func, interval); isAuto=true; $(this).attr({"class":"play"}); }else{ clearInterval(t); isAuto=false; $(this).attr({"class":"plus"}); }
            });
            $("#dialogAlbum .left").click(function(){ n-=2; func(); });
            $("#dialogAlbum .right").click(function(){ func(); });
            $(window).resize(function(){
                windowHeight = $(window).height();
                windowWidth = $(window).width();
                $("#dialogAlbumContainer ul").css({"width":N*windowWidth});
                $("#dialogAlbumContainer li").css({"width":windowWidth});
                $("#dialogAlbumContainer ul").css({"margin-left":(-windowWidth*(n-1))});
            });
        }
    },
	photo: function(){
		var $photo = $('#productPhoto'),
			$original = $('#productPhoto .original img'),
			$prev = $('#productPhoto .prev'),
			$next = $('#productPhoto .next'),
			$thum = $('#productPhoto .thum dl'),
			index = 0,
			_os = 4,
			_size = 0,
			_width = 101;
		
		// 载入结构
        if(typeof(multigraph) != 'undefined'){
            var _html = '';
            $(multigraph).each(function(index, element){
                if(index == 0){
					_html += '<dd class="current"><img src="'+ element.src +'" title="'+ element.title +'" alt="'+ element.title +'" /></dd>';
                  	$original.attr({'src': element.src});
                }else{
					_html += '<dd><img src="'+ element.src +'" title="'+ element.title +'" alt="'+ element.title +'" /></dd>';
                }
            });
            $thum.html(_html);
            _size = multigraph.length;
        	$thum.width(_width*_size);
        };
		
		// 点击显示大图
		$photo.on('click', '.thum dd', function(){
			$(this).addClass('current').siblings().removeClass('current');
			$original.attr({'src': $(this).children('img').attr('src')});
		})
		
		// 左右翻页
		function fun(){
			$thum.animate({'left': -index*_width}, 300, function(){
				$prev.removeClass('nodrop');
				$next.removeClass('nodrop');
				if(index == (_size - _os)){
					$next.addClass('nodrop');
				}else if(index == 0){
					$prev.addClass('nodrop');
				}
			});
		}
		$prev.bind('click', function(){
			if(index > 0){
				index --;
				fun();
			}
		})
		$next.bind('click', function(){
			if(index < _size - _os){
				index ++;
				fun();
			}
		})
	},
	former: function(){
		$postform = $('#formPost');
		$postform.find('.txt, .text, .code').bind({
			'focus': function(){
				$(this).parent().addClass('onfocus');
				if ($(this).val() == $(this).attr('placeholder')) {
					$(this).val('');
				}
			},
			'blur': function(){
				$(this).parent().removeClass('onfocus');
				$('#jLog').hide();
				if ($(this).val() == '') {
					$(this).val($(this).attr('placeholder'));
				}
			},
			'keyup': function(){
				$('#jLog').hide();
			}
		});
		$postform.find('[type="submit"]').bind('click', function () {
			var $name = $postform.find('[name="Name"]'),
				$phone = $postform.find('[name="Phone"]'),
				$email = $postform.find('[name="Email"]'),
				$code = $postform.find('[name="txtImageCode"]');
			
			// 姓名
			if ($name.val() == '' || $name.val() == $name.attr('placeholder')) {
				app.jLog($name.attr('empty'), $name.offset().left, $name.offset().top);
				$name.focus();
				return false;
			}
			// 联系方式
			if ($phone.val() == '' || $phone.val() == $phone.attr('placeholder')) {
				app.jLog($phone.attr('empty'), $phone.offset().left, $phone.offset().top);
				$phone.focus();
				return false;
			}
			if (!$phone.val().match(app.phone)) {
				app.jLog($phone.attr('error'), $phone.offset().left, $phone.offset().top);
				$phone.focus();
				return false;
			}
			// 电子邮箱
			if ($email.val() != $email.attr('placeholder') && !$email.val().match(app.email)) {
				app.jLog($email.attr('error'), $email.offset().left, $email.offset().top);
				$email.focus();
				return false;
			}
			// 验证码
			if ($code.val() == '' || $code.val() == $code.attr('placeholder')) {
				app.jLog($code.attr('empty'), $code.offset().left, $code.offset().top);
				$code.focus();
				return false;
			}
		})
	},
	toolbar: function(){
		var $toolbar = $('#toolbar'),
			_self = this;
		
		$toolbar.find('.pointer').bind('click', function(){
			if($(this).hasClass('checked')){
				$(this).removeClass('checked').children('span').html('>>');
				$toolbar.animate({'right': 0}, 300);
			}else{
				$(this).addClass('checked').children('span').html('<<');
				$toolbar.animate({'right': -130}, 300);
			}
		})
		
		if(!_self.toolAuto){
			$toolbar.find('.pointer').addClass('checked').children('span').html('<<');
			$toolbar.show().animate({'right': -130}, 300);
		}else{
			$toolbar.find('.pointer').removeClass('checked').children('span').html('>>');
			$toolbar.show().animate({'right': 0}, 300);
		}
	},
	searcher: function(){
		var _self = this,
			isFocus = false;
        $('#SearchTxt').bind({
            'focus': function(){
                $(this).parent().animate({'width': 300}, 200);
            },
            'blur': function(){
                $(this).parent().animate({'width': 250}, 200);
            }
        })
		$('#SearchTxt').bind({
			'focus': function(){
				isFocus = true;
				$(this).val('');
			},
			'blur': function(){
				isFocus = false;
                if($(this).val() == ''){
					$(this).val(app.searchval);
                }
			}
		})
		$('#SearchSubmit').bind('click', function(){
			if($('#SearchTxt').val() == '' || $('#SearchTxt').val() == $('#SearchTxt').attr('placeholder')){
				app.jAlert(app.searchval);
				return false;
			}
			search();
		});
		$(document).keydown(function(event){
			event = event ? event : ( window.event ? window.event : null );
			if(event.keyCode == 13 && isFocus == true){
				$('#SearchSubmit').trigger('click');
			}
		});
        
        // 添加热门关键词
        $('#SearchLink a').each(function(){
          	$(this).attr({'href': $('#Searchtype').val() + '&where=Title:' + $(this).text()});
        })
	},
    addFavorite: function(title, url){
      try {
          window.external.addFavorite(url, title);
      }
      catch (e) {
         try {
           window.sidebar.addPanel(title, url, "");
        }
         catch (e) {
             alert('抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加');
         }
      }
    },
	scroller: function(){
		if($('#banner').length > 0){
			!function banner(){
				var $banner = $('#banner'),
					$list = $banner.children('.list'),
					$tip = $banner.children('.tip'),
					t,
					interval = 10000,
					speed = 1000,
					speed2 = 700,
					n = 0,
					N = $list.children('li').length;
				if($tip.length){
					var html = '';
					for(var i=0; i<N; i++){
						if(i==0){ html += '<span class="cur"></span>'; }else{ html += '<span></span>'; }
					}
					$tip.html(html);
				}
				function func(){
					if(n >= N-1){ n = 0; }else{	n ++; }
					$list.children('li').eq(n).css({'z-index':2}).stop().fadeIn(speed).siblings('li').css({'z-index':1}).stop().fadeOut(speed2);
					if($tip.length){
						$tip.children('*').eq(n).addClass('cur').siblings().removeClass('cur');
					}
				}
				$tip.children('*').click(function(){
					clearInterval(t);
					n = $(this).index()-1;
					func();
					t = setInterval(func, interval);
				})
				t = setInterval(func, interval);
			}()
		}
        
        // 首页新闻-单个滚动可触发
		if($('#icase').length){
			!function(){
				var $id = $('#icase'),
                    $list = $id.find('.list'),
					index = 0,
					_width = 222,
					_speed = 300,
					_size = $list.children('li').length,
					t,
					_interval = 5000;
				
                $list.append($list.html());
                
				function fun(){
					if(index > _size){
						$id.find('.list').css({'left': 0});
						index = 1;
                        fun();
					}else if(index < 1){
                        console.log(index*_width);
						$id.find('.list').css({'left': -_size*_width});
						index = _size - 1;
                        fun();
                    }else{
                        $list.stop().animate({'left': -index*_width}, _speed);
                    }
				}
				$id.find('.prev').bind('click', function(){
					index --;
					fun();
				})
				$id.find('.next').bind('click', function(){
					index ++;
					fun();
				})
				
				$id.bind({
                    'mouseenter': function(){
						clearInterval(t);
						$id.find('.prev').animate({'left': 0}, 200);
						$id.find('.next').animate({'right': 0}, 200);
                    },
                    'mouseleave': function(){
						$id.find('.prev').animate({'left': -30}, 200);
						$id.find('.next').animate({'right': -30}, 200);
						t = setInterval(function(){
                            index ++;
                            fun();
                        }, _interval);
                    }
                })
				
				t = setInterval(function(){
					index ++;
					fun();
				}, _interval);
				
				$id.find('.prev').animate({'left': -30}, 200);
				$id.find('.next').animate({'right': -30}, 200);
			}()
		}
		
		// 首页新闻-单个滚动可触发
		if($('#ihonor').length){
			!function(){
				var $id = $('#ihonor'),
                    $list = $id.find('.list'),
					index = 0,
					_width = 230,
					_speed = 300,
					_size = $list.children('li').length,
					t,
					_interval = 5000;
				
                $list.append($list.html());
                
				function fun(){
					if(index > _size){
						$id.find('.list').css({'left': 0});
						index = 1;
                        fun();
					}else if(index < 1){
                        console.log(index*_width);
						$id.find('.list').css({'left': -_size*_width});
						index = _size - 1;
                        fun();
                    }else{
                        $list.stop().animate({'left': -index*_width}, _speed);
                    }
				}
				$id.find('.prev').bind('click', function(){
					index --;
					fun();
				})
				$id.find('.next').bind('click', function(){
					index ++;
					fun();
				})
				
				$id.bind({
                    'mouseenter': function(){
						clearInterval(t);
						$id.find('.prev').animate({'left': 0}, 200);
						$id.find('.next').animate({'right': 0}, 200);
                    },
                    'mouseleave': function(){
						$id.find('.prev').animate({'left': -30}, 200);
						$id.find('.next').animate({'right': -30}, 200);
						t = setInterval(function(){
                            index ++;
                            fun();
                        }, _interval);
                    }
                })
				
				t = setInterval(function(){
					index ++;
					fun();
				}, _interval);
				
				$id.find('.prev').animate({'left': -30}, 200);
				$id.find('.next').animate({'right': -30}, 200);
			}()
		}
        
		// 滚动荣誉-无缝滚动-上
		if($('#icomment').length){
			!function(){
				var $id = $('#icomment'),
					t,
					index = 0,
					_size = $id.children('dd').length,
					_height = 110,
					_interval = 20,
					_step = 1;
				
				if(_size <= 5){
					return false;
				}
				$id.append($id.html()).height(2*_height*_size);				
				function fun(){
					index ++;
					if(index*_step >= _size*_height){
						index = 0;
					}
					$id.css({'position': 'relative', 'top': -index*_step});
				}
                $id.bind({
                    'mouseenter': function(){
						clearInterval(t);
                    },
                    'mouseleave': function(){
						t = setInterval(fun, _interval)
                    }
                })
				t = setInterval(fun, _interval)
			}()
		}
		
        // 案例滚动-单个滚动
		if($('#xxx').length){
			function x(){
				var $id = $('#xxx'),
					$list = $id.children('.list'),
					t,
					index = 0,
					_size = $id.find('.item').length,
					_width = 281,
					_interval = 5000,
					_sped = 200;
                if(_size <= 4){ return false; }
				$list.append($list.html()).width(2*_size*_width);
				function fun(){
					$list.stop().animate({'left': -index*_width}, _sped, function(){
						if(index == _size){
							$list.css({'left': 0});
							index = 0;
						}
					});
				}
                $id.bind({
                    'mouseenter': function(){
						clearInterval(t);
                    },
                    'mouseleave': function(){
						t = setInterval(function(){
                            index ++;
                            fun();
                        }, _interval);
                    }
                })
				t = setInterval(function(){
					index ++;
					fun();
				}, _interval);
			}
		}
        
        // 滚动荣誉-无缝滚动
		if($('#xxx').length){
			function x(){
				var $id = $('#xxx'),
					t,
					index = 0,
					_size = $id.children('li').length,
					_width = 280,
					_interval = 20,
					_step = 1;
				
				if(_size <= 4){
					return false;
				}
				$id.append($id.html()).width(2*_width*_size);				
				function fun(){
					index ++;
					if(index*_step >= _size*_width){
						index = 0;
					}
					$id.css({'position': 'relative', 'left': -index*_step});
				}
                $id.bind({
                    'mouseenter': function(){
						clearInterval(t);
                    },
                    'mouseleave': function(){
						t = setInterval(fun, _interval)
                    }
                })
				t = setInterval(fun, _interval)
			}
		}
	},
	jAlert: function(info, title, callback){
		var _self = this,
			_html = '';
		
		if(typeof(title) == 'function'){
			callback = title;
			title = '温馨提示';
		}else if(title == null){
			title = '温馨提示';
		}
		
		_self.layout(1);
		
		_html += '<div class="dialog-alert" id="jAlear">';
		_html += '<div class="head">';
		_html += '<h2>'+ title +'</h2>';
		_html += '<a href="javascript:;" class="close"></a>';
		_html += '</div>';
		_html += '<div class="main">';
		_html += '<p>'+ info +'</p>';
		_html += '</div>';
		_html += '<div class="foot">';
		_html += '<a href="javascript:;" class="ok">我知道了</a>';
		_html += '</div>';
		_html += '</div>';		
				
		var $obj = $(_html);
		$obj.appendTo('body').show();
		$obj.find('.close')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(false);
				}
			});
		$obj.find('.ok')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(true);
				}
			})
	},
	jConfirm: function(info, title, callback){
		var _self = this,
			_html = '';
		
		if(typeof(title) == 'function'){
			callback = title;
			title = '温馨提示';
		}else if(title == null){
			title = '温馨提示';
		}
		
		_self.layout(1);		
		
		_html += '<div class="dialog-confirm" id="jConfirm">';
		_html += '<div class="head">';
		_html += '<h2>'+ title +'</h2>';
		_html += '<a href="javascript:;" class="close"></a>';
		_html += '</div>';
		_html += '<div class="main">';
		_html += '<p>'+ info +'</p>';
		_html += '</div>';
		_html += '<div class="foot">';
		_html += '<a href="javascript:;" class="ok">确定</a>';
		_html += '<a href="javascript:;" class="cancel">取消</a>';
		_html += '</div>';
		_html += '</div>';		
				
		var $obj = $(_html);
		$obj.appendTo('body').show();
		$obj.find('.close')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(false);
				}
			});
		$obj.find('.ok')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(true);
				}
			})
		$obj.find('.cancel')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(false);
				}
			})
	},
	jLog: function(i, l, t){
		var _offsetX = -23,
			_offsetY = 44;
		if(i == null){
			i = '必填字段，请输入正确的内容';
		}
        if ($('#jLog').length) {
            $('#jLog').html(i + '<i></i>').show().css({ 'left': (l + _offsetX), 'top': (t + _offsetY) });
        } else {
            $('<div class="dialog-log" id="jLog">' + i + '<i></i></div>').appendTo('body').css({ 'left': (l + _offsetX), 'top': (t + _offsetY) });
        }
    },
	layout: function(u){
		if(u == 0){
			$('#dialogLayout').remove();
		}else{
			if(!$('#dialogLayout').length){
				$('<div class="dialog-layout" id="dialogLayout"></div>').appendTo('body').show();
			}
		}
	}
}
var app = new application();