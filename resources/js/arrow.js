/**
 * Created by gongxiaohua on 17年10月25日.
 */
$(function () {
    var flag = 0;
    $cookie = L.cookie();
    if (typeof $cookie.showUser !== 'undefined' && $cookie.showUser == 'false') {
        flag = 1;
    }
    $('#rightArrow').on("click", function () {
        if (flag == 1) {
            //每次显示去请求一次数据库
            createArrowNode.ajaxUdata();
            document.cookie = "showUser=true;";
            $("#floatDivBoxs").animate({right: '0px'}, 300);
            $(this).animate({right: '300px'}, 300);
            $(this).css('background-position', '0px 0');
            flag = 0;
        } else {
            document.cookie = "showUser=false;";
            $("#floatDivBoxs").animate({right: '-305px'}, 300);
            $(this).animate({right: '-5px'}, 300);
            $(this).css('background-position', '-50px 0');
            flag = 1;
        }
    });
});
