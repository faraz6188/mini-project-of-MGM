//material contact form animation
$('.contact-form').find('.form-control').each(function() {
    var targetItem = $(this).parent();
    if ($(this).val()) {
      $(targetItem).find('label').css({
        'top': '10px',
        'fontSize': '14px'
      });
    }
  })
  $('.contact-form').find('.form-control').focus(function() {
    $(this).parent('.input-block').addClass('focus');
    $(this).parent().find('label').animate({
      'top': '10px',
      'fontSize': '14px'
    }, 300);
  })
  $('.contact-form').find('.form-control').blur(function() {
    if ($(this).val().length == 0) {
      $(this).parent('.input-block').removeClass('focus');
      $(this).parent().find('label').animate({
        'top': '25px',
        'fontSize': '18px'
      }, 300);
    }
  })

  function myFunction() {
    var txt;
if (confirm("Press a button OK to know total views!")) {

let count = Number(localStorage.getItem('count')) || 0;
alert(`Total Website Views = ${count}`);
localStorage.setItem('count', count + 1);
}
  }

  var addDropBtn = "<div id=\"addDropBtn\"><div id=\"dropBtn\">－</div>&nbsp;<div id=\"addBtn\">＋</div></div>";
  $("body").append(addDropBtn);
  var isCtrlDown = false;
  $("body").on("keydown", function(e) {
    if (e.keyCode == 17) {
      isCtrlDown = true;
    } else if (e.keyCode == 80 && isCtrlDown) {
      //adjust printing styles
      $("section").css("margin", 0);
      $("body").css("background", "white");
      $("#addDropBtn").hide();
      $(".page-break").hide();
      $("article").css("padding", 0);
      $(":focus").blur();
      window.print();
      //adjust back to preview styles
      $("section").css("margin", "50px auto");
      $("body").css("background", "black");
      $(".page-break").show();
      $("article").css("padding", 36);
      return false;
    }
  });
  $("body").on("keyup", function(e) {
    if (e.keyCode == 17) {
      isCtrlDown = false;
    }
  });
  $("body").on("keydown", "[contenteditable]", function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();//prevent line break
      $(this).blur();
    }
  });
  $("body").on("paste", "[contenteditable]", function (event){
    var e = event || window.event;
    // 阻止默认粘贴
    e.preventDefault();
    var text =  (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
    // 插入
    document.execCommand("insertText", false, text || "");//paste as plain text
  });
  /* contenteditable元素内粘贴纯文本 */
  
  // object to store add_drop element
  var ele_to_be_addDroped = {
    cmpnt_index: 0,
    cmpnt_p_index: 0,
    cmpnt_li_index: 0,
    ele: ""
  };
  function addDropBtn_right(a) {// the distance between addDropBtn and right window edge
    return ($(window).width() - ($(a).offset().left + $(a).outerWidth()));;
  }
  $("body").on("mouseenter", ".rsm-cmpnt", function() {
    var that = this;
    ele_to_be_addDroped.cmpnt_index = $(".rsm-cmpnt").index(this);//overall index, not by category
    ele_to_be_addDroped.ele = this;
    $("#addDropBtn").css("top", $(that).offset().top - $(window).scrollTop() - 2);
    $("#addDropBtn").css("right", addDropBtn_right(that) + 4);
    $("#addBtn").attr("class", "cmpnt-btn");
    $("#dropBtn").attr("class", "cmpnt-btn");
    if (!$(this).prev().hasClass("rsm-header")) {//if component is the first in its category
      $("#dropBtn").show();//only drop btn will be applicable
    } else {
      $("#dropBtn").hide();
    }
    $("#addDropBtn").show();
  });
  
  $("body").on("mouseleave", ".rsm-cmpnt", function() {
    $("#addDropBtn").hide();
  });
  $("body").on("mouseenter", ".rsm-cmpnt-btm p", function() {
    var that = this;
    ele_to_be_addDroped.cmpnt_index = $(".rsm-cmpnt").index($(that).parent().parent());
    ele_to_be_addDroped.cmpnt_p_index = $(this).index();
    ele_to_be_addDroped.ele = this;
    $("#addDropBtn").css("top", $(that).offset().top - $(window).scrollTop() - 3);
    $("#addDropBtn").css("right", addDropBtn_right(that) + 2);
    $("#addBtn").attr("class", "cmpnt-p-btn");
    $("#dropBtn").attr("class", "cmpnt-p-btn");
    if ($(this).index()) {
      $("#dropBtn").show();
    } else {
      $("#dropBtn").hide();
    }
    $("#addDropBtn").show();
  });
  $("body").on("mouseleave", ".rsm-cmpnt-btm p", function() {
    $("#addDropBtn").hide();
  });
  $("body").on("mouseenter", ".rsm-cmpnt-btm li", function() {
    var that = this;
    ele_to_be_addDroped.cmpnt_index = $(".rsm-cmpnt").index($(that).parent().parent().parent());
    ele_to_be_addDroped.cmpnt_p_index = $(this).parent().prev().index();
    ele_to_be_addDroped.cmpnt_li_index = $(this).index();
    ele_to_be_addDroped.ele = this;
    $("#addDropBtn").css("top", $(that).offset().top - $(window).scrollTop() - 3);
    $("#addDropBtn").css("right", addDropBtn_right(that) + 2);
    $("#addBtn").attr("class", "cmpnt-li-btn");
    $("#dropBtn").attr("class", "cmpnt-li-btn");
    if ($(this).index()) {
      $("#dropBtn").show();
    } else {
      $("#dropBtn").hide();
    }
    $("#addDropBtn").show();
  });
  $("body").on("mouseleave", ".rsm-cmpnt-btm li", function() {
    $("#addDropBtn").hide();
  });
  $("body").on("mouseover", "#addDropBtn", function() {
    $("#addDropBtn").show();
  });
  $("body").on("mouseleave", "#addDropBtn", function() {
    $("#addDropBtn").hide();
  });
  $("body").on("click", "#dropBtn", function() {
    var targetEle;
    if (ele_to_be_addDroped.ele.tagName == "DIV") {
      targetEle = $(".rsm-cmpnt").eq(ele_to_be_addDroped.cmpnt_index);
    } else if (ele_to_be_addDroped.ele.tagName == "P") {
      let div = $(".rsm-cmpnt").eq(ele_to_be_addDroped.cmpnt_index);
      targetEle = $(div).children(".rsm-cmpnt-btm").children().eq(ele_to_be_addDroped.cmpnt_p_index);
      $(targetEle).next().remove();// remove ul element next to p element
    } else if (ele_to_be_addDroped.ele.tagName == "LI") {
      let div = $(".rsm-cmpnt").eq(ele_to_be_addDroped.cmpnt_index);
      let p = $(div).children(".rsm-cmpnt-btm").children().eq(ele_to_be_addDroped.cmpnt_p_index);
      targetEle = $(p).next().children().eq(ele_to_be_addDroped.cmpnt_li_index);
    }
    $(targetEle).remove();
    $("#addDropBtn").hide();
  });
  $("body").on("click", "#addBtn", function() {
    var targetEle, newEle;
    if (ele_to_be_addDroped.ele.tagName == "DIV") {
      newEle = $(".rsm-cmpnt").eq(ele_to_be_addDroped.cmpnt_index).prop('outerHTML');
      targetEle = $(".rsm-cmpnt").eq(ele_to_be_addDroped.cmpnt_index);
    } else if (ele_to_be_addDroped.ele.tagName == "P") {
      let tempEle = ele_to_be_addDroped.ele;
      targetEle = $(tempEle).next();
      newEle = $(tempEle).prop("outerHTML") + $(targetEle).prop("outerHTML");
    } else if (ele_to_be_addDroped.ele.tagName == "LI") {
      let div = $(".rsm-cmpnt").eq(ele_to_be_addDroped.cmpnt_index);
      let p = $(div).children(".rsm-cmpnt-btm").children().eq(ele_to_be_addDroped.cmpnt_p_index);
      targetEle = $(p).next().children().eq(ele_to_be_addDroped.cmpnt_li_index);
      newEle = $(targetEle).prop("outerHTML");
    }
    $(targetEle).after(newEle);
    $("#addDropBtn").hide();
  });
  $("body").on("mouseenter", "[contenteditable]", function() {
    $(this).focus();
  });