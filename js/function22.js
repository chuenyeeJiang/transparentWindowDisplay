function cycle(){
$(function() {
	// 初始化轮播
	$("#div_log2Back").carousel('cycle');
});
}
function resize() {
	// 初始化轮播
	if (window.innerHeight > 800) {
		// 800+window.innerHeight/800
		$("#div_log2Back img").css('width', 1920 * window.innerHeight / 800);
		$("#div_log2Back img").css('margin-top',
				-100 * window.innerHeight / 800);
	}
	/* $("#carousel-inner img").css('hight','130%'); */
};

function readUsername(){
	// 初始化用户名
	$.ajax({
		url : "readUsername.do",
		success : function(result) {
			if (result != null && result != "" && result != "null") {
			$(".input-remenberUsername").val(result);
			$(".checkbox-remenberUsername").attr("checked", true);
				// 自动登陆
		/*		$.ajax({
					url : "readPassword.do",
					success : function(result) {
						$(".input-autoLogin").val(result);
						if (result != null && result != "") {
							$(".checkbox-autoLog").attr("checked", true);
							if ("${noLog}" != 1) {
								$(".form-login").submit();
							}
						}
					}
				});*/
			}
		}
	});
	// 已登陆
//	$.ajax({
//		url : "hasLogin.do",
//		success : function(result) {
//			if (result != 1) {
//				alert("账号已经成功登录!");
//				document.write(result);
//			}
//		}
//	});

}

// 复选框处理（自动登陆等于拥有记住用户名功能 ）
/*function checkbox_checked(){
$(document).ready(
		function() {
			$(".checkbox-remenberUsername").click(function() {
				if (!$(this).is(":checked") && $("#autoLog").is(":checked")) {
					$(".checkbox-autoLog").removeProp("checked");
				} else if ($(".checkbox-autoLog").is(":checked")) {
					$(".checkbox-autoLog").removeProp("checked");
					$(this).removeProp("checked")
				}
			});

			$(".checkbox-autoLog").click(
					function() {
						if ($(this).is(":checked")
								&& !$(".checkbox-remenberUsername").is(
										":checked")) {
							$(".checkbox-remenberUsername").prop("checked",
									true);
						}
					});
		});
}*/

// 登陆聚焦
function autoFocus(){
var focusIndex = null;
$(document).ready(function() {
	var autoComonent = $(".form-autoFocus .input-autoFocus");

	/*
	 * $(autoComonent).each(function(index){ alert($(this).attr("name")); });
	 */
	function PointerHeaderAddressByOneListener(){
		document.addEventListener("keyup",firstFocus
			,true);
	}
	PointerHeaderAddressByOneListener();
	autoComonent.blur(function(){
		PointerHeaderAddressByOneListener();
	});
	
	

	
	function firstFocus(event){
		if (event.which == 13) {
		$(autoComonent)[0].focus();
		document.removeEventListener("keyup",firstFocus,true);
		}
	}
	
	
	$(autoComonent).keyup(function(event) {
		var key = event.which;
		if (key == 13) {
			focusIndex = $(this).attr("focus-index");
			if (focusIndex == null) {
				return;
			}
			if ($(this).hasClass("input-submit")) {
				$(this).onclick();
			}
			// 下一位置
			focusIndex = eval(focusIndex) + 1;
			$(autoComonent)[focusIndex].focus();
		}
	});
});
}

//  提交
function submitformautoFocus() {
	$(".form-autoFocus").submit();
}


function ChangeValidatecode() {
	var image = new Image();
	image.src = "aJax_validatecode.do?date=" + new Date();
	image.className = "img-validatecode";
	$(".img-validatecode").replaceWith(image);
}

/*// 数目增减
function numIncreaseOrReduce(){
var NumBtnId = null;
var NumId = null;
$(document).ready(function() {
	$(".btn-numReduce").click(function() {
		// 获取组件标志
		if ($(this).attr("id") == null)
			NumBtnId = "btn-num";

		NumId = "#" + NumBtnId.substr(4, NumBtnId.length);

		if (eval($(NumId).text()) > 1)
			$(NumId).text(eval($(NumId).text()) - 1);
	});
});

$(document).ready(function() {

	$(".btn-numIncrease").click(function() {
		// 获取组件标志
		NumBtnId = $(this).attr("id");
		if (NumBtnId == null)
			NumBtnId = "btn-num";

		NumId = "#" + NumBtnId.substr(4, NumBtnId.length);
		$(NumId).text(eval($(NumId).text()) + 1);
	});
});
}*/

/*
  数目增减
 */
function numIncreaseOrReduce(Input_num,initNum){
	$(Input_num).val(initNum);
	$(Input_num).readOnly;
	this.increment =1 ;
	this.decrement =1 ;
	this.lowerLimit= 0;
	this.upperLimit = 1000;
	this.numChangeRun = function () {

	};
	this.numReduce = function () {
		$(Input_num).val(parseInt($(Input_num).val()-eval(this.decrement)));
	};
	this.numIncrease = function () {
		$(Input_num).val(parseInt(eval($(Input_num).val())+eval(this.increment)));
	};

	this.Button_numChange = function (fun) {
		if(parseInt($(Input_num).val())>this.lowerLimit&&parseInt($(Input_num).val())<this.upperLimit)
			this.numChangeRun()
	}

	this.numChange = function (fun) {
		this.numChangeRun = fun;
		numIncreaseOrReduce.numChangeRun = fun;
		$(document).ready(function(){
			$(Input_num).keyup(function (){
					if(parseInt($(Input_num).val())>this.lowerLimit&&parseInt($(Input_num).val())<this.upperLimit)
				numIncreaseOrReduce.numChangeRun()}
				);
		});


	};
	/*$(Input_num).change(function () {
		alert(1)
	});*/
}

//外部验证
function  loginCl()
{
       var usernameCl=/^[\u4E00-\u9FA5a-zA-Z]*$/;
       //用户名不合法
       if(!usernameCl.test($("#username").val())){
       $("#log_font_msg").text("用户名不合法,只支持由中文或字母组成!");
       return false;
       }
       var passwordCl=/^[a-zA-Z0-9\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*||||\-|\_|\+|\=|\||\\||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]{6,14}$/;
       if(!passwordCl.test($("#password").val())){
       $("#log_font_msg").text("密码不合法!");
       return false;
       }
}
function  regisCl()
{
       var usernameCl=/^[\u4E00-\u9FA5a-zA-Z]*$/;
       //用户名不合法
       if(!usernameCl.test($("#regisUsername").val())){
       $("#regis_font_msg").text("用户名不合法,只支持由中文或字母组成!");
       return false;
       }
       var passwordCl=/^[a-zA-Z0-9\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*||||\-|\_|\+|\=|\||\\||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]{6,14}$/;
       if(!passwordCl.test($("#regisPassword").val())){
       $("#regis_font_msg").text("密码不合法!");
       return false;
       }
       if($("#regisPassword").val()!=$("#confirmPassword").val()){
       $("#regis_font_msg").text("密码不一致!");
       return false;
       }
}

/*
   控件拖拽
 */
function draggable(element,edgeProcessing) {
	/*
	  初始化
	 */
	//取消图片原有拖拽
	if ($(element).prop("tagName") === "IMG") {
		$(element).attr("ondragstart", "return false");
		$(element).attr("onselect", "return false");
	}
	$(element).css("position", "fixed");
	var children = $(element).find("IMG");
	children.attr("ondragstart", "return false");
	children.attr("onselect", "return false");
	//修复黏鼠问题
	$("input").on("click",function (ev) {
		isMove = false;
	});
	$(element).on("click",function (e) {
		isMove = false;
	});


	/*
	   变量
	 */

	
	
	var clickValue = $(element).attr("onclick");
	var hrefValue = $(element).attr("href");
	var isMove = false;
	var elementX, elementY;
	var left0, top0;
	var x, y;
	var reg = new RegExp("px", "g");
	var theWidthPxValue, theHeightPxValue, theWidthValue, theHeightValue;
	var clickedElements;

	/*
	方法
	 */


	/*
	   拖拽监听
	 */
	$(element).on('mousedown', function (e) {
		clickedElements = this;
		isMove = true;
		left0 = e.pageX;
		top0 = e.pageY;
		elementX = parseInt(e.pageX) - parseInt($(this).css("margin-left"));
		elementY = parseInt(e.pageY) - parseInt($(this).css("margin-top"));
	});

	$(element).on('touchstart', function (event) {
		clickedElements = this;
		isMove = true;
		left0 = event.originalEvent.targetTouches[0].pageX;
		top0 = event.originalEvent.targetTouches[0].pageY;
		elementX = parseInt(event.originalEvent.touches[0].pageX) - parseInt($(this).css("margin-left"));
		elementY = parseInt(event.originalEvent.touches[0].pageY) - parseInt($(this).css("margin-top"));
	});

	$(document).on('mousemove', function (e) {
		console.log("mousemove");
		if (isMove) {
			x = parseInt(e.pageX - elementX);
			y = parseInt(e.pageY - elementY);

			//获取控件宽高
			theWidthPxValue = $(element).css("width");
			theHeightPxValue = $(element).css("height");
			theWidthValue = theWidthPxValue.replace(reg, "");
			theHeightValue = theHeightPxValue.replace(reg, "");

			if (edgeProcessing === "触碰") {
				if (x < 0)
					x = 1;
				if (y < 0)
					y = 1;
				if (x > parseInt(document.body.clientWidth - theWidthValue))
					x = parseInt(document.body.clientWidth - theWidthValue);
				if (y > parseInt(window.innerHeight - theHeightValue))
					y = parseInt(window.innerHeight - theHeightValue);
			}
			if (edgeProcessing === "露角") {
				if (x <  -theWidthValue/2)
					x = (-parseInt($(element).css("width")) + 5);
				if (y < 0)
					y = 1;
				if (x > parseInt(document.body.clientWidth - theWidthValue/2))
					x = parseInt(document.body.clientWidth - 5);
				if (y > parseInt(window.innerHeight - theHeightValue))
					y = parseInt(window.innerHeight - theHeightValue);
			}
			$(clickedElements).css("margin-left", parseInt(x));
			$(clickedElements).css("margin-top", parseInt(y));
		}
	});
	$(element).on('touchmove', function (event) {
		event.preventDefault();
		//event.propertyIsEnumerable()
		if (isMove) {

			x = parseInt(event.originalEvent.targetTouches[0].pageX - elementX);
			y = parseInt(event.originalEvent.targetTouches[0].pageY - elementY);

			//获取控件宽高
			theWidthPxValue = $(element).css("width");
			theHeightPxValue = $(element).css("height");
			theWidthValue = theWidthPxValue.replace(reg, "");
			theHeightValue = theHeightPxValue.replace(reg, "");

			if (edgeProcessing === "触碰") {
				if (x < 0)
					x = 1;
				if (y < 0)
					y = 1;


				if (x > parseInt(document.body.clientWidth - theWidthValue))
					x = parseInt(document.body.clientWidth - theWidthValue);
				if (y > parseInt(window.innerHeight - theHeightValue))
					y = parseInt(window.innerHeight - theHeightValue);
			}
			if (edgeProcessing === "露角") {

				if (x <  -theWidthValue/2)
					x = (-parseInt($("." + className).css("width")) + 5);
				if (y < 0)
					y = 1;
				if (x > parseInt(document.body.clientWidth - theWidthValue/2))
					x = parseInt(document.body.clientWidth - 5);
				if (y > parseInt(window.innerHeight - theHeightValue))
					y = parseInt(window.innerHeight - theHeightValue);
			}
			$(clickedElements).css("margin-left", parseInt(x));
			$(clickedElements).css("margin-top", parseInt(y));
		}
	});

	$(document).on('mouseup', function (e) {
		console.log("touchend");
		isMove = false;
		if (e.pageX !== left0 || e.pageY !== top0) {
			$(clickedElements).removeAttr("onclick");
			$(clickedElements).removeAttr("href");
		} else {
			$(clickedElements).attr("onclick", clickValue);
			$(clickedElements).attr("href", hrefValue);

		}
	});
	$(document).on('touchend', function (e) {
		console.log("touchend");
		isMove = false;
		if (e.pageX !== left0 || e.pageY !== top0) {
			$(clickedElements).removeAttr("onclick");
			$(clickedElements).removeAttr("href");
		} else {
			$(clickedElements).attr("onclick", clickValue);
			$(clickedElements).attr("href", hrefValue);
		}
	});


}


/*
       上传
*/
//三个参数为按钮触发,用于文件上传INPUT,需要显示上传图片的IMG
function resouceUpload(ClassName_input,ClassName_Show) {
    /*
    变量
     */
	var eleFile = document.querySelector("." + ClassName_input);
	var file ;
    var input =$("." + ClassName_input);
    var show =$("." + ClassName_Show);
    resouceUpload.onlyOnePlay=true;
	/*
	初始化
	 */

	$("." + ClassName_input).on("change",function (ev) {
		show =$("." + ClassName_Show);
        if ($(input).val().match(/.jpg|.gif|.png|.bmp/i)) {
            var reader = new FileReader();
            file = eleFile.files[0];
            reader.readAsDataURL(file);
            //加载
            reader.onload = function (e) {
				var img = "<img  class='" + $(show).attr("class") + "' onclick='"+$(show).attr("onclick")+"' src='"+this.result+"' onselectstart='return false' ondragstart='return false' style='"+$(show).attr("style")+"'>";
				$(show).after(img);
				$(show).remove();
                reader.flush;
                reader.close;
                return false;
            };
        }
        if ($(input).val().match(/.mp4|.webm/i)) {

            file = eleFile.files[0];
                var getUrl = null;

                if (window.createObjectURL != undefined) { // basic

                    getUrl = window.createObjectURL(file);

                } else if (window.URL != undefined) { // mozilla(firefox)

                    getUrl = window.URL.createObjectURL(file);

                } else if (window.webkitURL != undefined) { // webkit or chrome
                    getUrl = window.webkitURL.createObjectURL(blob);

                }
                //加载                                                                                                                                                       style='"+$(show).attr("style")+"'
                    var video = "<video class='" + $(show).attr("class") + "' onclick='"+$(show).attr("onclick")+"' loop='' autoplay='' accept='audio/mp4,video/mp4' style='"+$(show).attr("style")+";pointer-events: none' controls  >" +
                        "<source src='" + getUrl + "' type='video/mp4'>" +
						"<source src='" + getUrl + "' type='video/video/webm'>" +
                        "</video>";
                     $(show).after(video);
			         $(show).remove();
                     //绑定只允许一个视频播放
            if( resouceUpload.onlyOnePlay) {
                oneVideoPlay();
            }
                     return false;

        }

	});

		/*
		方法
		 */
		var i = 0;
	this.pictureUploadStart = function (ex) {

		$("." + ClassName_input).click();
	};
	//this.pictureUploadStart();
}




 /*   //XML功能 (只支持IE)
	function LoadXML() {
		var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
		xmlDoc.async = false;
		xmlDoc.resolveExternals = false;
		xmlDoc.load("xml/test.xml");

		this.queryNode = function  () {
			     var theme = xmlDoc.selectSingleNode("/resouce/theme[name='theme1']");

			     alert(theme.selectSingleNode("/background").text);


		}
	}*/

 /*
   XML 读取
  */
 function LoadXML(theme){
	 var name;

	 var result;
 	$.ajax({
		url:"XML/test.xml",
		type: 'GET',
		dataType: 'xml',
		timeout: 1000,
		async: false,
		cache:false,
		success: function (xml) {
			$(xml).find("theme").each(function (i) {
				name=$(this).children("name");
				console.log(theme);
				console.log(name.text()===theme);
				if(name.text()===theme){
					result = $(this);
				}

			});

		}
	});
	 return result;
 }


 function fullScreenHeight(className){
 	$("."+className).css("Height",window.innerHeight);
 }

function launchFullScreen() {

   $(document).dblclick (
        function () {
            if (document.documentElement.requestFullscreen) {

                document.documentElement.requestFullscreen();

            } else if (document.documentElement.mozRequestFullScreen) {

                document.documentElement.mozRequestFullScreen();

            } else if (document.documentElement.webkitRequestFullscreen) {

                document.documentElement.webkitRequestFullscreen();

            } else if (document.documentElement.msRequestFullscreen) {

                document.documentElement.msRequestFullscreen();

            }
            $(document).unbind("dblclick");
        }
     );
}

/*function oneVideoPlayByClassName(ClassName){
     var video  = null;
     alert("oneVideoPlay:"+Video_onlyOnePlay);

    var video =  document.getElementsByClassName("ClassName");
    video.onplay= function()
    {
        alert("视频开始播放");
    };
    video.onplaying=function(){
         alert("playing")
        video.pause();
         alert("pause")
        video.play();
         alert("play")
     };
}*/

function oneVideoPlay(){

var au=document.getElementsByTagName("video");
    var lastPlayVideo =new Array() ;
    var this1=null;;
for(var i=0;i<au.length;i++){

    //暂停其他视频播放
    au[i].addEventListener("playing", function(){

        this1=this;
        this.play();

        for(var b=0;b<au.length;b++){
            var this2=au[b];
            if(!this2.paused){
                //内存保留正在播放的视频
                lastPlayVideo.push(this2);
            }
            if(this1!==this2){
                this2.pause();
            }
        }
    });
    //恢复其他视频播放
    if(this1!==null)
    this1.addEventListener("pause", function(){
        $.each(lastPlayVideo,function(i,item){
            item.play();
            lastPlayVideo.clear();
        });

    });

}

}

