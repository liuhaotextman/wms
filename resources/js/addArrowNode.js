/**
 * 描述 : gxh
 */
var createArrowNode = {
    arrow: function () {
        if (!($("#warning-arrow").length > 0)) {
            var date = new Date();
            var hour = date.getHours();
            var divObj = document.createElement("div");
            divObj.innerHTML = '<div id="warning-arrow" class="asideNav">' +
                '<div id="rightArrow"><a href="javascript:;" title="未完成任务列表"></a></div>' +
                '<div id="floatDivBoxs">' +
                '<div class="floatDtt">' + L.getText('未完成任务列表') + '</div>' +
                '<div class="floatShadow">' +
                '<ul class="floatDqq">' +
                '<a href="?c=ctrl_pickOrder&a=index&orderState=40&problemType=normal&PHC=1" target="_blank"> <li id="wait-print">' + L.getText('待打印') + ': loading...</li></a>' +
                '<a href="?c=ctrl_pickOrder&a=index&orderState=50&problemType=normal&PHC=1" target="_blank"> <li id="wait-check">' + L.getText('待核对') + ': loading...</li></a>' +
                '<a href="?c=ctrl_pickOrder&a=index&orderState=50&problemType=1&PHC=1" target="_blank"> <li id="scanOutOfStock">' + L.getText('扫描缺货未处理') + ': loading...</li></a>' +
                '<a href="?c=ctrl_receive_arrivalWaitReceive&a=index" target="_blank"> <li id="sPurchaseQty">' + L.getText('未收货柜') + ': loading...</li></a>' +
                '<a href="?c=ctrl_receive_arrivalWaitReceive&a=index" target="_blank"> <li id="arriSkuQty">' + L.getText('未收货SKU款数') + ': loading...</li></a>' +
                '<a href="?c=ctrl_receive_arrivalWaitReceive&a=index" target="_blank"> <li id="arriQty">' + L.getText('未收货PCS总数') + ': loading...</li></a>' +
                '<a href="#"> <li id="inSkuCount">' + L.getText('当天采购入库SKU款数') + ': loading...</li></a>' +
                '<a href="#"> <li id="inSkuQty">' + L.getText('当天采购入库PCS总数') + ': loading...</li></a>' +
                '<a href="#"> <li id="inSkuVolume">' + L.getText('当天采购入库净体积') + ': loading...</li></a>' +
                '<a href="#"> <li id="availSkuCount">' + L.getText('有库存SKU款数') + ': loading...</li></a>' +
                '<a href="#"> <li id="availSkuQty">' + L.getText('有库存PCS总数') + ': loading...</li></a>' +
                '<a href="#"> <li id="availSkuVolume">' + L.getText('有库存净体积') + ': loading...</li></a>' +
                '<a href="#"> <li id="orderCount">' + L.getText((hour - 1) + '点-' +hour + '点发货订单数量') + ': loading...</li></a>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>';
            $(document.body).prepend(divObj);
            var $cookie = L.cookie();
            //防止捕捉不到节点
            $(document).ready(function () {
                if (typeof $cookie.showUser !== 'undefined') {
                    if ($cookie.showUser == 'true') {
                        $("#floatDivBoxs").css('right', '0px');
                        $('#rightArrow').css('right', '300px');
                        $('#rightArrow').css('background-position', '0px 0');
                    } else if ($cookie.showUser == 'false') {
                        //将默认显示改为不显示
                        $("#floatDivBoxs").css('right', '-305px');
                        $('#rightArrow').css('right', '-5px');
                        $('#rightArrow').css('background-position', '-50px 0');
                    }
                }
            });
            createArrowNode.ajaxUdata();
        }
    },

    /**
     * 描述 : 异步更新数据
     */
    ajaxUdata: function () {
        $.ajax({
            url: ROOT_URL + '/index.php?c=ctrl_main&a=orderCount',
            type: 'post',
            data: {},
            dataType: 'json',
            success: function (result) {
                $("#warning-arrow #wait-print").text(L.getText('待打印') + ": " + result.orderCount[40]);
                $("#warning-arrow #wait-check").text(L.getText('待核对') + ": " + result.orderCount[50]);
                $("#warning-arrow #scanOutOfStock").text(L.getText('扫描缺货未处理') + ": " + result.orderCount.scanOutOfStock);
                $("#warning-arrow #sPurchaseQty").text(L.getText('未收货柜') + ": " + result.skuQtyCount.sPurchaseQty);
                $("#warning-arrow #arriSkuQty").text(L.getText('未收货SKU款数') + ": " + result.skuQtyCount.arriSkuQty);
                $("#warning-arrow #arriQty").text(L.getText('未收货PCS总数') + ": " + result.skuQtyCount.arriQty);
                $("#warning-arrow #inSkuCount").text(L.getText('当天采购入库SKU款数') + ": " + result.new.inSkuCount);
                $("#warning-arrow #inSkuQty").text(L.getText('当天采购入库PCS总数') + ": " + result.new.inSkuQty);
                $("#warning-arrow #inSkuVolume").text(L.getText('当天采购入库净体积') + ": " + result.new.inSkuVolume);
                $("#warning-arrow #availSkuCount").text(L.getText('有库存SKU款数') + ": " + result.new.availSkuCount);
                $("#warning-arrow #availSkuQty").text(L.getText('有库存PCS总数') + ": " + result.new.availSkuQty);
                $("#warning-arrow #availSkuVolume").text(L.getText('有库存净体积') + ": " + result.new.availSkuVolume);
                $("#warning-arrow #orderCount").text(L.getText(result.new.time + '发货订单数量') + ": " + result.new.orderCount);
            },
        });
    }

};

//过滤用户
var user = $("#login_user").text();
if ($.inArray(user, ['USWarehouse', 'UKWarehouse', 'PLWarehouse']) === -1){
    createArrowNode.arrow();
}

