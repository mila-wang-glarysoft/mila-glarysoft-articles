// JavaScript Document
$(function () {
  if (!window.localStorage) {
    if (checkCookie("ckTip")) {
      $(".cookiesTip").hide();
    } else {
      $(".cookiesTip").show();
    }
  } else {
    if (window.localStorage.ckTip) {
      $(".cookiesTip").hide();
    } else {
      $(".cookiesTip").show();
    }
  }
  storeIcon();

  //reset copyright year
  var mydate = new Date();
  var mydateyear = mydate.getFullYear();
  $("#copyyear").text(mydateyear);
  $("#experience").text(mydateyear-2005);
  //AFFILIATE || linkid
  set_aff();

  $(".navshortcut").on("click", function () {
    if ($(".header_r").css("display") == "none") {
      $(".header_r").show();
    } else {
      $(".header_r").hide();
    }
  });

  // Newsletter / subscribe
  var subscribe_tip;
  $("#subscribe").on("click", function (event) {
    event.preventDefault();
    clearTimeout(subscribe_tip);
    $("#subscribe_tip").hide();
    var sub_email = $("#subscribe_email").val();
    var check_sub_email = $.trim(sub_email);
    if (check_sub_email.length == 0) {
      $("#subscribe_tip")
        .removeClass()
        .addClass("fail")
        .text("Enter valid e-mail");
      $("#subscribe_tip").show();
      subscribe_tip = setTimeout(function () {
        $("#subscribe_tip").hide();
      }, 30000);
      return false;
    }
    if (
      null ==
      check_sub_email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    ) {
      $("#subscribe_tip")
        .removeClass()
        .addClass("fail")
        .text("Enter valid e-mail");
      $("#subscribe_tip").show();
      subscribe_tip = setTimeout(function () {
        $("#subscribe_tip").hide();
      }, 30000);
      return false;
    }
    $("#subscribe_tip")
      .removeClass()
      .addClass("info")
      .text("Submitting...");
    $("#subscribe_tip").show();
    $.ajax({
      type: "POST",
      url: "/subscribe/verify.php",
      data: "useremail=" + encodeURIComponent(check_sub_email),
      success: function (msg) {
        if (msg == 1) {
          $("#subscribe_tip")
            .removeClass()
            .text(
              "Thank you! Please check your email and confirm your subscription!"
            );
          $("#subscribe_tip").show();
        } else if (msg == 2 || msg == 4) {
          $("#subscribe_tip")
            .removeClass()
            .addClass("fail")
            .text("Failed, please try again");
          $("#subscribe_tip").show();
        } else {
          $("#subscribe_tip")
            .removeClass()
            .addClass("info")
            .text("Frequent operation, you can try again after half an hour");
          $("#subscribe_tip").show();
        }
        subscribe_tip = setTimeout(function () {
          $("#subscribe_tip").hide();
        }, 30000);
      },
      error: function () {
        $("#subscribe_tip")
          .removeClass()
          .addClass("fail")
          .text("Failed, please try again");
        $("#subscribe_tip").show();
        subscribe_tip = setTimeout(function () {
          $("#subscribe_tip").hide();
        }, 30000);
      },
    });
  });

  var isAndroid =
    navigator.userAgent.toLowerCase().match(/android/i) == "android";

  $(".faq_q").click(function () {
    if ($(this).next(".faq_a").css("display") == "none") {
      $(this).next(".faq_a").show();
      if (window.location.pathname === "/support/faq/") {
        var anchor = $(this).attr("id");
        if ("history" in window && "pushState" in history) {
          var url = window.location.href;
          url = url.replace(window.location.hash, "");
          if (window.location.hash) {
            window.history.replaceState({ url: url }, "", "#" + anchor);
          } else {
            window.history.pushState({ url: url }, "", "#" + anchor);
          }
        } else {
          window.location.hash = anchor;
        }
      }
    } else {
      $(this).next(".faq_a").hide();
    }
  });

  $(".frp_q").click(function () {
    if ($(this).next(".frp_a").css("display") == "none") {
      $(this).parent(".frp_faq_wrap").css("paddingBottom", "30px");
      $(this)
        .css({ fontWeight: 600, fontSize: "16px" })
        .children("img")
        .attr("src", "/images/file-recovery/fold.png");
      $(this).next(".frp_a").show();
    } else {
      $(this).parent(".frp_faq_wrap").css("paddingBottom", 0);
      $(this)
        .css({ fontWeight: "normal", fontSize: "14px" })
        .children("img")
        .attr("src", "/images/file-recovery/open.png");
      $(this).next(".frp_a").hide();
    }
  });

  /*$("#subscribe_email").focus(function(){
		$(this).css("color","#3E3E3E");
		$(this).val("");
	})
	$("#subscribe_email").blur(function(){
		if($(this).val() == ""){
			$(this).css("color","#898989");
			$(this).val("Your email");
		}
	})*/
  /*$(".mailaddress").focus(function(){
		$(this).val("");
	})
	$(".mailaddress").blur(function(){
		if($(this).val() == ""){
			$(this).val("Your email");
		}
	})*/

  $(".supro_feature_con").hover(
    function () {
      $(this).find(".supro_f_de_in").show();
      $(this).find("img").css("opacity", 0.3);
    },
    function () {
      $(this).find(".supro_f_de_in").hide();
      $(this).find("img").css("opacity", 1);
    }
  );

  $("a.download")
    .mouseover(function () {
      $(this).css("background", "url(/images/button.png) 0 -50px no-repeat");
    })
    .mousedown(function () {
      $(this).css("background", "url(/images/button.png) 0 -100px no-repeat");
    })
    .mouseup(function () {
      $(this).css("background", "url(/images/button.png) 0 0 no-repeat");
    })
    .mouseout(function () {
      $(this).css("background", "url(/images/button.png) 0 0 no-repeat");
    });
  $("a.downloadspeedup")
    .mouseover(function () {
      $(this).css("background", "url(/images/button.png) 0 -50px no-repeat");
    })
    .mousedown(function () {
      $(this).css("background", "url(/images/button.png) 0 -100px no-repeat");
    })
    .mouseup(function () {
      $(this).css("background", "url(/images/button.png) 0 0 no-repeat");
    })
    .mouseout(function () {
      $(this).css("background", "url(/images/button.png) 0 0 no-repeat");
    });
  $("a.downloadfr")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) 0 -58px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) 0 -116px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) 0 0 no-repeat"
      );
    });
  $("a.purchasefrp")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) -226px -58px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) -226px -116px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) -226px 0 no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn_l.png) -226px 0 no-repeat"
      );
    });

  $("a.purchasefrp_s")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -178px -46px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -178px -92px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -178px 0 no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -178px 0 no-repeat"
      );
    });

  $(".downtothanks").on("click", function () {
    var oldsw = $(this).attr("oldsw");
    var sw = $(this).attr("sw");
    if (sw == "mh") {
      setTimeout('location.href="/downloadthanks/mh/' + oldsw + '/";', 3000);
    } else if (sw == "gu") {
      setTimeout('location.href="/downloadthanks/gu/' + oldsw + '/";', 3000);
    } else if (sw == "su") {
      setTimeout('location.href="/downloadthanks/su/' + oldsw + '/";', 3000);
    }
  });

  $("a.downloadmh")
    .mouseover(function () {
      $(this).css("background", "url(/images/button.png) 0 -721px no-repeat");
    })
    .mousedown(function () {
      $(this).css("background", "url(/images/button.png) 0 -770px no-repeat");
    })
    .mouseup(function () {
      $(this).css("background", "url(/images/button.png) 0 -672px no-repeat");
    })
    .mouseout(function () {
      $(this).css("background", "url(/images/button.png) 0 -672px no-repeat");
    });

  $("a.buynowmh")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/button.png) -168px -721px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/button.png) -168px -770px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/button.png) -168px -672px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/button.png) -168px -672px no-repeat"
      );
    });

  $("a.downloadreleasePage")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -36px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -72px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 0 no-repeat"
      );
    });

  $("a.buynowreleasePage")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -144px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -180px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -108px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/releasePage_btn.png) 0 -108px no-repeat"
      );
    });

  $("a.android_download")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/android_btn.png) 0 -45px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/android_btn.png) 0 -92px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css("background", "url(/images/android_btn.png) 0 0 no-repeat");
    })
    .mouseout(function () {
      $(this).css("background", "url(/images/android_btn.png) 0 0 no-repeat");
    });
  $("a.update_btn_y")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -50px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -100px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 0 no-repeat"
      );
    });
  $("a.update_btn_n")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -200px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -250px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -150px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/update/updatebtn.png) 0 -150px no-repeat"
      );
    });

  $("a.pro_compare_btn")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) 0 -58px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) 0 -116px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) 0 0 no-repeat"
      );
    });
  $(".downloadfr_s")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -356px -46px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -356px -92px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -356px 0 no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) -356px 0 no-repeat"
      );
    });

  $(".pro_compare.supro tr td a.pro_compare_btn")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -47px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -94px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 0 no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 0 no-repeat"
      );
    });

  $("a.pro_compare_btn.paid")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) -215px -58px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) -215px -116px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) -215px 0 no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/update/download_btn_bg.png) -215px 0 no-repeat"
      );
    });

  $(".next_item")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) 0 -156px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) 0 -174px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/file-recovery/btn.png) 0 -138px no-repeat"
      );
    });

  $(".next_item").click(function () {
    var obj = $(this);
    var len = obj.prev(".comments_wrap").children().length;
    var i =
      obj.prev(".comments_wrap").find(".comments_item.active").index() + 1;
    if (i >= len) {
      i = 0;
    }
    obj
      .prev(".comments_wrap")
      .children()
      .eq(i)
      .siblings()
      .hide()
      .removeClass("active")
      .end()
      .fadeIn(600, function () {
        $(this).addClass("active");
      });
  });

  $(".pro_compare.supro tr td a.pro_compare_btn.paid")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -188px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -235px no-repeat"
      );
    })
    .mouseup(function () {
      $(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -141px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/update/supro_btn.png) 0 -141px no-repeat"
      );
    });

  $(".nav > li#shop > a").on("mouseover", function (e) {
    if (e.target == e.currentTarget) {
      $("#store-wrap").css("background", "none");
      $("#store").css("visibility", "visible");
      lottie.stop("store");
      lottie.play("store");
    }
  });

  $(".submenu p").hover(
    function () {
      $(this).addClass("submenu_location_hover");
    },
    function () {
      $(this).removeClass("submenu_location_hover");
    }
  );

  $("#single_use_more").hover(
    function () {
      $("#single_use_more_con").css({ right: "-338px", bottom: "-54px" });
      $("#single_use_more_con").fadeIn();
    },
    function () {
      $("#single_use_more_con").fadeOut();
    }
  );

  $(
    ".content_003_box_left.frp_box_left, .content_003_box_right.frp_box_right"
  ).hover(
    function () {
      $(this).addClass("frp_box_hover");
    },
    function () {
      $(this).removeClass("frp_box_hover");
    }
  );

  var li_length = $(".screen_show").children("li").length;
  if (li_length > 3) {
    $(".screen_left").click(function () {
      $(".screen_show").css("margin-left", "-250px");
      $(".screen_show").append($(".screen_show").children("li:first"));
      $(".screen_show").css("margin-left", "0px");
    });
    $(".screen_right").click(function () {
      $(".screen_show").append($(".screen_show").children("li:first"));
      $(".screen_show").css("margin-left", "-250px");
    });
  } else {
    $(".screen_left").add($(".screen_right")).hide();
  }
  $(".screen_show")
    .children("li")
    .click(function () {
      var screen_big_img_src = $(this).children("img").attr("src");
      screen_big_img_src =
        screen_big_img_src.substring(
          0,
          screen_big_img_src.lastIndexOf("_s.png")
        ) + ".png";
      $(".screen_big_img").append(
        "<img src='" + screen_big_img_src + "' alt='' />"
      );
      var screen_big_top = ($(window).height() - $(".screen_big").height()) / 2;
      var screen_big_left = ($(window).width() - $(".screen_big").width()) / 2;
      var screen_big_scrollTop = $(document).scrollTop();
      var screen_big_scrollLeft = $(document).scrollLeft();
      $(".screen_big").css({
        top: screen_big_top + screen_big_scrollTop,
        left: screen_big_left + screen_big_scrollLeft,
      });
      $(".screen_big").show();
    });
  $("#screen_big_hide").click(function () {
    $(".screen_big_img").empty();
    $(".screen_big").hide();
    //$(this).children().remove();
    //$(".screen_big").hide();
  });
  $("#Glary_Utilities").click(function () {
    Download_Layer_Show($("#download_layer"));
  });
  $("#Glary_Utilities_1").click(function () {
    Download_Layer_Show($("#download_layer_1"));
  });
  $("#download_layer_close").click(function () {
    Download_Layer_Close($("#download_layer"));
  });
  $("#download_layer_1_close").click(function () {
    Download_Layer_Close($("#download_layer_1"));
  });
  $(".products_right a")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -37px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px 0px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -74px no-repeat"
      );
    });
  $(".products_right_ver a")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -37px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px 0px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -74px no-repeat"
      );
    });
  $(".products_right a#products_buynow")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -148px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -111px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -185px no-repeat"
      );
    });
  $(".products_right_ver a#products_buynow")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -148px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -111px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(../images/button.png) -231px -185px no-repeat"
      );
    });
  $(".Glary_Utilitiespro_buynow")
    .mouseover(function () {
      $(this).css("background", "url(/images/button.png) 0px -200px no-repeat");
    })
    .mouseout(function () {
      $(this).css("background", "url(/images/button.png) 0px -150px no-repeat");
    })
    .mousedown(function () {
      $(this).css("background", "url(/images/button.png) 0px -250px no-repeat");
    });
  $(".Glary_Utilities_upgrade")
    .mouseover(function () {
      $(this).css(
        "background",
        "url(/images/button.png) -191px -272px no-repeat"
      );
    })
    .mouseout(function () {
      $(this).css(
        "background",
        "url(/images/button.png) -191px -222px no-repeat"
      );
    })
    .mousedown(function () {
      $(this).css(
        "background",
        "url(/images/button.png) -191px -323px no-repeat"
      );
    });
  $(".probuynow")
    .mouseover(function () {
      $(this).css("background", "url(/images/button.png) 0px -421px no-repeat");
    })
    .mouseout(function () {
      $(this).css("background", "url(/images/button.png) 0px -371px no-repeat");
    })
    .mousedown(function () {
      $(this).css("background", "url(/images/button.png) 0px -471px no-repeat");
    });

  $(".affiliate_step_title_wrap td").click(function () {
    $(".affiliate_step_con").children("li").stop(true, true);
    var obj = $(this);
    var i = obj
      .parentsUntil(".affiliate_step_title_wrap")
      .find(obj.parent())
      .index();
    obj
      .addClass("cur")
      .find(".affiliate_step_arrow")
      .attr("src", "/images/partners/arrow-select.png");
    obj
      .parent()
      .siblings()
      .children("td[class='cur']")
      .removeClass("cur")
      .find(".affiliate_step_arrow")
      .attr("src", "/images/partners/arrow-default.png");
    $(".affiliate_step_con")
      .children("li")
      .eq(i)
      .height(0)
      .addClass("cur")
      .animate({ height: "326px" }, 800)
      .siblings()
      .removeClass("cur");
  });

  $(".version_lang_inforchange.old")
    .find("td.version_mark")
    .parent("tr")
    .siblings()
    .hide();
  $(".version_lang_inforchange.old")
    .find("td.version_mark")
    .css("background", "url(/images/plus.jpg) left center no-repeat");
  $(".version_lang_inforchange.old")
    .find("td.version_mark")
    .parent("tr")
    .toggle(
      function () {
        $(this).siblings().show();
        $(this)
          .find("td.version_mark")
          .css("background", "url(/images/minus.jpg) left center no-repeat");
      },
      function () {
        $(this).siblings().hide();
        $(this)
          .find("td.version_mark")
          .css("background", "url(/images/plus.jpg) left center no-repeat");
      }
    );
  $(".version_lang_inforchange.latest")
    .find("td.version_mark")
    .parent("tr")
    .toggle(
      function () {
        $(this).siblings().hide();
        $(this)
          .find("td.version_mark")
          .css("background", "url(/images/plus.jpg) left center no-repeat");
      },
      function () {
        $(this).siblings().show();
        $(this)
          .find("td.version_mark")
          .css("background", "url(/images/minus.jpg) left center no-repeat");
      }
    );
  if (isAndroid) {
    $(".nav>li>a,.nav>li>button").bind("click", function () {
      if ($(this).parent().find(".subnavpart").length) {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
          $(this).parent().find(".subnavpart").show();
        } else {
          $(this).parent().find(".subnavpart").hide();
        }
      }
      return false;
    });
  } else {
    $(".nav>li").hover(
      function () {
        if ($(this).children(".subnavpart").length) {
          $(this).children(".arrow").addClass("active");
          $(this).children(".subnavpart").show();
          return false;
        }
      },
      function () {
        $(this).children(".arrow").removeClass("active");
        $(this).children(".subnavpart").hide();
        return false;
      }
    );
  }
  $(".software-item").on("click", function () {
    showDownloadsCon();
  });
  windowWidth = $(window).width();
});
var myVar;
function Download_Layer_Show(ShowObj) {
  if ($(window).width() > 553) {
    var Obj_top = ($(window).height() - ShowObj.height()) / 2;
    var Obj_left = ($(window).width() - ShowObj.width()) / 2;
    var Obj_scrollTop = $(document).scrollTop();
    var Obj_scrollLeft = $(document).scrollLeft();
    if (Obj_top + Obj_scrollTop <= 100) {
      ShowObj.css({ top: 100, left: Obj_left + Obj_scrollLeft });
    } else {
      ShowObj.css({
        top: Obj_top + Obj_scrollTop,
        left: Obj_left + Obj_scrollLeft,
      });
    }
    ShowObj.show();
  } else {
    return;
  }
}
function Download_Layer_Close(CloseObj) {
  CloseObj.hide();
}

function removeCkLayer() {
  if (!window.localStorage) {
    setCookie("ckTip", true);
  } else {
    window.localStorage.setItem("ckTip", true);
  }
  $(".cookiesTip").hide();
  $(".footer").css("margin-bottom", "0px");
  $(".christmas_footer").css("margin-bottom", "0px");
}
function setCookie(cname, cvalue) {
  var expires = "expires=" + new Date(2147483647 * 1000).toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function checkCookie(cname) {
  var c = getCookie(cname);
  if (c != "") {
    return true;
  } else {
    return false;
  }
}
function judge_ie() {
  var win = window;
  var doc = win.document;
  var input = doc.createElement("input");
  var ie = (function () {
    if (win.ActiveXObject === undefined) return null;
    if (!win.XMLHttpRequest) return 6;
    if (!doc.querySelector) return 7;
    if (!doc.addEventListener) return 8;
    if (!win.atob) return 9;
    if (!input.dataset) return 10;
    return 11;
  })();
  return ie;
}
function get_Avangate_link() {
  var url = "https://www.glarysoft.com/";
  var id = $("#avangate-affiliate-ID").val();
  if (id !== "" && judgeIsNum(id)) {
    url = url + "?linkid=" + id;
    $("#avangate-affiliate-link").css("color", "#4764fa");
    $("#avangate-affiliate-link").html(
      "<a href='" + url + "' target='_blank'>" + url + "</a>"
    );
  } else {
    $("#avangate-affiliate-link").css("color", "#D70000");
    $("#avangate-affiliate-link").html("Enter valid affiliate ID");
  }
}
function judgeIsNum(str) {
  var pattern = /^\d+$/g;
  var result = str.match(pattern);
  if (result == null) {
    return false;
  } else {
    return true;
  }
}
function getScriptSiblingPath(fileName) {
  var script = document.querySelector('script[src*="/js/index.js"]');
  if (script && script.src) {
    return script.src.replace(/index\.js(?:\?.*)?$/, fileName);
  }
  return "/js/" + fileName;
}

function storeIcon() {
  var params = {
    container: document.getElementById("store"),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: getScriptSiblingPath("buy.json"),
    name: "store",
  };
  try {
    const ANIM = lottie.loadAnimation(params);
    ANIM.addEventListener("enterFrame", function (e) {
      if (e.currentTime == 15) {
        /* $("#store-wrap").css("visibility", "visible"); */
        ANIM.removeEventListener("enterFrame");
      }
    });
  } catch (e) {
  }
}
function viewportWidth() {
  var e = window,
    a = "inner";
  if (!("innerWidth" in window)) {
    a = "client";
    e = document.documentElement || document.body;
  }
  //return { width: e[a + "Width"], height: e[a + "Height"] };
  return e[a + "Width"];
}

function myTimer() {
  if ($(".goog-te-gadget-simple").length) {
    var language = $(".goog-te-gadget-simple span a span:first").html();
    if (language == "Select Language") {
      $(".goog-te-gadget-simple span a span:first").html("English");
    }
    $("#google_translate_element").css("visibility", "visible");
    clearInterval(myVar);
  }
}

function set_aff() {
  var url = document.location.toString();
  var arrUrl = url.split("?");
  var para = arrUrl[1];
  if (para) {
    var para_arr = para.split("&");
    var reg = /^[1-9][0-9]*$/;
    $.each(para_arr, function (index, value) {
      var v_tmp = value.split("=");
      if (
        (v_tmp[0] == "AFFILIATE" && reg.test(v_tmp[1])) ||
        (v_tmp[0] == "linkid" && reg.test(v_tmp[1]))
      ) {
        setCookie("AFFILIATE", v_tmp[1]);
        return false;
      }
    });
  }
}

function showDownloadsCon() {
  if (location.search) {
    var target = GetRequest();
  } else {
    return false;
  }
  $.each($("#software-list").children(".software-item"), function (i) {
    if ($(this).attr("page") === target) {
      if (!$(this).hasClass("active")) {
        $(this).addClass("active").siblings().removeClass("active");
      } else {
        $(this).removeClass("active").addClass("active");
      }
      if (target === "free-tools") {
        $("#decoration-6,#decoration-7").show();
        $("#decoration-4,#decoration-").addClass("free");
      } else {
        $("#decoration-6,#decoration-7").hide();
      }
      $("#software-now")
        .children()
        .eq(i)
        .addClass("active")
        .siblings()
        .removeClass("active");
      return false;
    }
  });
}

function GetRequest() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest.p;
}
$(window).on("load", function () {
  var myVar = setInterval(function () {
    myTimer();
  }, 50);
});

/* $(window).on("resize", function () {
  var window_width = viewportWidth();
  if ($(".header_r").length > 0) {
    if (window_width > 768) {
      if ($(".header_r").css("display") == "none") {
        $(".header_r").show();
      }
    } else {
      if ($(".header_r").css("display") != "none") {
        $(".header_r").hide();
      }
    }
  }
}); */

/* Resize Event */
$(window).resize(function () {
  if ($(window).width() != windowWidth) {
    windowWidth = $(window).width();
    if ($(".header_r").length > 0) {
      if (windowWidth > 768) {
        if ($(".header_r").css("display") == "none") {
          $(".header_r").show();
        }
      } else {
        if ($(".header_r").css("display") != "none") {
          $(".header_r").hide();
        }
      }
    }
  }
});

function isMobile(){
  return !!navigator.userAgent.match(
    /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
  );
};
