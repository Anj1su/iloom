$(document).ready(function(){

  let prevScrollpos = window.pageYOffset;

  window.onscroll = function() {
    let currentScrollpos = window.pageYOffset;

    if (prevScrollpos > currentScrollpos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-150px";
    }
    prevScrollpos = currentScrollpos;
  }

  $(document).ready(function() {
    $(window).scroll(function() {
      const scroll = $(window).scrollTop();
      if (scroll > 1) {
        $(".navbar").css("background", "#fff");
        $("#nav >li >a").css("color", "#333");
      } else {
        $(".navbar").css("background", "none");
        $("#nav >li >a").css("color", "#fff");
      }
    })
  })

      //tabMenu
  $('.tabMenu li').click(function(){
    $('.tabMenu li').removeClass('on');
    $(this).addClass('on');
  });

  $("#modtxt").click(function(){
    $("#modern").show();
    $("#natural").hide();
    $('#cozy').hide();
    $('#classic').hide();
  });
  $("#cozytxt").click(function(){
    $("#cozy").show();
    $("#natural").hide();
    $('#classic').hide();
    $('#modern').hide();
  });
  $("#natutxt").click(function(){
    $("#natural").show();
    $("#cozy").hide();
    $('#classic').hide();
    $('#modern').hide();
  });
  $("#clatxt").click(function(){
    $("#classic").show();
    $("#natural").hide();
    $('#cozy').hide();
    $('#modern').hide();
  });

  //slider
  $(document).ready(function() {

    let $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length - 1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 6000,
      $pagination = $(".slider-pagi");

    function createBullets() {
      for (let i = 0; i < numOfSlides + 1; i++) {
        let $li = $("<li class='slider-pagi__elem'></li>");
        $li.addClass("slider-pagi__elem-" + i).data("page", i);
        if (!i) $li.addClass("active");
        $pagination.append($li);
      }
    };

    createBullets();

    function manageControls() {
      $(".slider-control").removeClass("inactive");
      if (!curSlide) $(".slider-control.left").addClass("inactive");
      if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
    };

    function autoSlide() {
      autoSlideTimeout = setTimeout(function() {
        curSlide++;
        if (curSlide > numOfSlides) curSlide = 0;
        changeSlides();
      }, autoSlideDelay);
    };

    autoSlide();

    function changeSlides(instant) {
      if (!instant) {
        animating = true;
        manageControls();
        $slider.addClass("animating");
        $slider.css("top");
        $(".slide").removeClass("active");
        $(".slide-" + curSlide).addClass("active");
        setTimeout(function() {
          $slider.removeClass("animating");
          animating = false;
        }, animTime);
      }
      window.clearTimeout(autoSlideTimeout);
      $(".slider-pagi__elem").removeClass("active");
      $(".slider-pagi__elem-" + curSlide).addClass("active");
      $slider.css("transform", "translate3d(" + -curSlide * 100 + "%,0,0)");
      $slideBGs.css("transform", "translate3d(" + curSlide * 50 + "%,0,0)");
      diff = 0;
      autoSlide();
    }

    function navigateLeft() {
      if (animating) return;
      if (curSlide > 0) curSlide--;
      changeSlides();
    }

    function navigateRight() {
      if (animating) return;
      if (curSlide < numOfSlides) curSlide++;
      changeSlides();
    }

    $(document).on("mousedown touchstart", ".slider", function(e) {
      if (animating) return;
      window.clearTimeout(autoSlideTimeout);
      let startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
      diff = 0;

      $(document).on("mousemove touchmove", function(e) {
        let x = e.pageX || e.originalEvent.touches[0].pageX;
        diff = (startX - x) / winW * 70;
        if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
        $slider.css("transform", "translate3d(" + (-curSlide * 100 - diff) + "%,0,0)");
        $slideBGs.css("transform", "translate3d(" + (curSlide * 50 + diff / 2) + "%,0,0)");
      });
    });

    $(document).on("mouseup touchend", function(e) {
      $(document).off("mousemove touchmove");
      if (animating) return;
      if (!diff) {
        changeSlides(true);
        return;
      }
      if (diff > -8 && diff < 8) {
        changeSlides();
        return;
      }
      if (diff <= -8) {
        navigateLeft();
      }
      if (diff >= 8) {
        navigateRight();
      }
    });

    $(document).on("click", ".slider-control", function() {
      if ($(this).hasClass("left")) {
        navigateLeft();
      } else {
        navigateRight();
      }
    });

    $(document).on("click", ".slider-pagi__elem", function() {
      curSlide = $(this).data("page");
      changeSlides();
    });

  });

  //tabMenu
    $('.pick-in li .show').click(function(){
      $('.pick-in li .show').removeClass('on');
      $(this).addClass('on');
    });

  // VR
  $('.vr-back').on('mousemove',function(e){
    const x = e.pageX;
    const y = e.pageY;
    const win = $(window).width();
    
    let percent = Math.floor((x/win)*159);
   
    $('.vr-back >a >img').hide();
    $('.vr-back >a >img').eq(percent).show();
  });
  let imgs = '';

  for(let i=0; i<=159; i++){
      imgs += '<img src="images/vrimg/vr' + i + '.png">'
  }
  $('.vr-back a').html(imgs);

  //modal
  $('.heB').click(function(){
    $('.modalWarp').show();
  });
  $('.no').click(function(){
    $('.modalWarp').hide();
  });
});