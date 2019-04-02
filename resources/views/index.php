<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>海外仓WMS系统 - 主页</title>
    <!--加css-->
    <link type="text/css" rel="stylesheet" href="/resources/css/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">
    <link type="text/css" rel="stylesheet" href="/resources/css/self.css">
    <link type="text/css" rel="stylesheet" href="/resources/css/style.min.css">
</head>
<body class="fixed-sidebar full-height-layout gray-bg mini-navbar" style="overflow:hidden">
    <div id="wrapper">
        <!--左侧导航开始-->
        <nav class="navbar-default navbar-static-side" role="navigation" id="leftSideBar">
            <div class="nav-close">
                <i class="fa fa-times-circle"></i>
            </div>
            <div class="sidebar-collapse">
                <div class="logo-element nav-header">
                    海外仓WMS系统
                </div>

                <ul class="nav" id="side-menu">
                    <li>
                        <a class="J_menuItem" href="/main/home">
                            <i class="fa fa-home"></i>
                            <span class="nav-label">主页</span>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-cogs"></i>
                            <span class="nav-label">系统设置</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="setting/index">基础环境</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="subject/index">主体分组</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="queueManage/index">消息队列管理</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="dd/rankList">排行管理</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-tablet"></i>
                            <span class="nav-label">产品管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/goods/index">产品列表</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-floppy-o"></i>
                            <span class="nav-label">储位管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/skuPlace/index">储位管理</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/placeMeter_placeList/index">储位明细</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/placeMeter_skuList/index">商品明细</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/overHead/index">高位锁定</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/placeGroup/index">储位分组</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-tablet"></i>
                            <span class="nav-label">调拨管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/allocate_createPlan/index">调拨计划单管理</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/allocate_outgoingManagement/index">调拨出库管理</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/allocate_box/index">箱唛查询</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-inbox"></i>
                            <span class="nav-label">到货管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/receive_arrivalNotice/index">到货通知</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/receive_arrivalWaitReceive/index">到货签收</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-arrow-circle-down"></i>
                            <span class="nav-label">入库管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/receive_arrivalPick/index">提货</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/importSKUindex">产品导入</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/returnExchange/index">退换入库</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-arrow-circle-up"></i>
                            <span class="nav-label">出库管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem"
                                   href="/mbbMode_returnOrder/indexPc">
                                    待回库汇总列表</a>
                            </li>
                            <li>
                                <a class="J_menuItem"
                                   href="/pickOrder/index&orderState=40&problemType=normal&PHC=1">
                                    待拣货列表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/mbbMode_scanOrder/mbbScanOrderIndex">MBB扫描核对</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/mbbMonitor/index">MBB捡货监控</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/mbbMode_mb/createCode">打印随机条码</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/check/index">扫描核对</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/import/indexTN">追踪号导入</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/packingList/index">封箱单列表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/transfer/index'">调拨出库</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/transfer/transferOut'">核对调拨</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-desktop"></i>
                            <span class="nav-label">盘点管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/inventory/index">盘点单列表</a>
                            </li>
                        </ul>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/inventory/skuInventory">商品盘点</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-trash"></i>
                            <span class="nav-label">FBA退货管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/scan/returnIndex" >FBA退货记录表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/fbaGoods/index" >FNSKU已匹配列表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/scan/errorIndex" >FNSKU未匹配列表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/scan/goodIndex" >良品退货入库</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/scan/badIndex" >不良品退货入库</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-pie-chart"></i>
                            <span class="nav-label">报表管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/inOutReport/index" >进销存报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_inOutLog/inLog">入库数据报表</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="fa fa-pie-chart"></i>
                            <span class="nav-label">报表管理</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a class="J_menuItem" href="/report_scanCheckLog/index">扫描核对绩效报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_reportOfToday/index">当日订单商品汇总报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_reportOfStatistics/index">订单汇总报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_skuDelivery/index">SKU出入库报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_lockReport/index&type=MOV">SKU移动记录报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_lockReport/index&type=BID">订单绑定记录报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_lockReport/index&type=CGD">收货记录报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_lockReport/index&type=CHK">盘点记录报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_lockReport/index&type=THD">退货记录报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_skuPlaceReport/index">SKU历史储位报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_inOutLog/inLog">入库数据报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_inOutLog/outLog">出库数据报表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/report_inOutLog/monthLog">按月进销存报表</a>
                            </li>

                            <li>
                                <a class="J_menuItem" href="/report_inventoryRate/inventoryRate">按月库存周转率报表</a>
                            </li>

                            <li>
                                <a class="J_menuItem" href="/report_inOutLog/orderNumLogisticsType">按渠道统计已发货订单数</a>
                            </li>

                            <li>
                                <a class="J_menuItem" href="/report_inShelvesLog/index">按月收货已上架明细表</a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="/platform_salesStatistics/index">各平台销售金额汇总报表</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <!--左侧导航结束-->
        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row border-bottom" style="display: none;">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header">
                        <form role="search" class="navbar-form-custom" method="post"
                              action="http://www.zi-han.net/theme/hplus/search_results.html">
                        </form>
                    </div>

                </nav>
            </div>
            <!--0612-->
            <div class="row content-tabs">
                <button class="roll-nav roll-left J_tabLeft" style="">
                    <i class="fa fa-backward"></i>
                </button>
                <nav class="page-tabs J_menuTabs">
                    <div class="page-tabs-content">
                        <a href="javascript:;" class="active J_menuTab" data-id="home.html" authorize-kind="ctrl_main::home">首页</a>
                        <a href="javascript:;" class="J_menuTab"
                           data-id="/pickOrder/index&orderState=40&problemType=normal&PHC=1">待拣货列表 <i
                                    class="fa fa-times-circle"></i></a>
                        <a href="javascript:;" class="J_menuTab" data-id="/check/index">扫描核对 <i
                                    class="fa fa-times-circle"></i></a>
                        <a href="javascript:;" class="J_menuTab" data-id="/overHead/index">高位锁定
                            <i class="fa fa-times-circle"></i></a>
                    </div>
                </nav>
                <!-- <button class="roll-nav roll-right J_tabRight">
                    <i class="fa fa-forward"></i>
                </button> -->
            </div>
            <div style="position: absolute; top:0;right:0;height: 40px;z-index:99; background: #fff; line-height: 32px;">
                <ul class="list-inline">
                    <li><i class="fa fa-forward"></i></li>
                    <li> <span class="dropdown" data-toggle="dropdown">
                            <i class="fa fa-times-circle-o" style="font-size: 16px"></i>
                            <span class="caret"></span>
                            </span>
                        <ul role="menu" class="dropdown-menu dropdown-menu-left">
                            <li class="J_tabShowActive">
                                <a>定位当前选项卡</a>
                            </li>
                            <li class="divider"></li>
                            <li class="J_tabCloseAll">
                                <a>关闭全部选项卡</a>
                            </li>
                            <li class="J_tabCloseOther">
                                <a>关闭其他选项卡</a>
                            </li>
                        </ul>
                    </li>
                    <li><a class="dropdown-toggle count-info" data-toggle="dropdown">
                            <i class="fa fa-tasks"></i>
                            <!--语言选择-->
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><a href="javascript:void(0);" onclick="getLang('CN')">中文(Chinese)</a></li>
                            <li class="divider"></li>
                            <li><a href="javascript:void(0);" onclick="getLang('EN')">英文(English)</a></li>
                        </ul>
                    </li>
                    <li id="login_user"><!--<? echo core_user::getUser(); ?>--></li>
                    <li><a href="/main/logout" href="login.html" class="J_tabExit">
                            <i class="fa fa fa-sign-out"></i> 退出</a>
                    </li>
                </ul>
            </div>

            <div class="row J_mainContent" id="content-main">
                <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="/main/home"
                        frameborder="0" data-id="home.html" seamless></iframe>
                <iframe class="J_iframe" name="iframe11" width="100%" height="100%"
                        src="/pickOrder/index&orderState=40&problemType=normal&PHC=1"
                        frameborder="0"
                        data-id="/pickOrder/index&orderState=40&problemType=normal&PHC=1"
                        seamless="" style="display: inline;"></iframe>
                <iframe class="J_iframe" name="iframe12" width="100%" height="100%"
                        src="/check/index" frameborder="0"
                        data-id="/check/index" seamless=""
                        style="display: none;"></iframe>
                <iframe class="J_iframe" name="iframe13" width="100%" height="100%"
                        src="/mbbMode_scanOrder/mbbScanOrderIndex" frameborder="0"
                        data-id="/mbbMode_scanOrder/mbbScanOrderIndex" seamless=""
                        style="display: none;"></iframe>
                <iframe class="J_iframe" name="iframe7" width="100%" height="100%"
                        src="/overHead/index" frameborder="0"
                        data-id="/overHead/index" seamless="" ></iframe>
            </div>

        </div>
        <!--右侧部分结束-->
    </div>
    <script src="/resources/js/jquery.min.js"></script>
    <script src="/resources/js/bootstrap.min.js"></script>
    <script src="/resources/js/jquery.metisMenu.js"></script>
    <script src="/resources/js/jquery.slimscroll.min.js"></script>
    <script src="/resources/js/layer/layer.min.js"></script>
    <script src="/resources/js/hplus.min.js"></script>
    <script src="/resources/js/contabs.min.js"></script>
    <script>
        function getLang($lang) {
            L.cookie('of_base_language[name]=' + $lang);
            location.reload();
        }

        $(function () {
            var leftSideBar = $('#leftSideBar');
            /*leftSideBar.hover(function(){
             $("body").toggleClass("mini-navbar");
             SmoothlyMenu();

             },function(){
             $("body").toggleClass("mini-navbar");
             SmoothlyMenu();
             });*/
            leftSideBar.mouseover(function () {
                $("body").removeClass("mini-navbar");
                SmoothlyMenu();
            });
            leftSideBar.mouseout(function () {
                $("body").addClass("mini-navbar");
                SmoothlyMenu();
            });
        });

        function changeNavWidth() {
            $("body").toggleClass("mini-navbar");
            SmoothlyMenu();
            return false;
        }

    </script>
</body>
</html>