<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">

    <title>YKSUI框架 - 基础表格</title>
    <!--加css-->
    <link type="text/css" rel="stylesheet" href="/resources/css/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">
    <link type="text/css" rel="stylesheet" href="/resources/css/self.css">
    <link type="text/css" rel="stylesheet" href="/resources/css/style.min.css">
    <link href="/resources/css/iCheck/custom.css" rel="stylesheet">
    <link href="/resources/css/base.css" rel="stylesheet">
    <link href="/resources/css/paging/main.css" rel="stylesheet">
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>基础环境</h5>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" placeholder="请输入关键词" class="input-sm form-control" id="keyword"> <span class="input-group-btn">
                                            <button type="button" class="btn btn-sm btn-primary" onclick="search()"> 搜索</button> </span>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <span class="input-group-btn">
                                        <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#myModal" authorize-kind="ctrl_dd::saveDd">
                                            新增
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table name="pagingBlock" method="ctrl_dd::ddPaging" items="17" size="10" page="1" params="[]" event="" save="" id="whPaging" class="table table-hover table-striped table-scroll jsHoverDetails textC" style=""><thead class="of-paging_wait" name="pagingWait" style="display: none;"><tr><td colspan="4"></td></tr></thead><thead class="of-paging_head"><tr><th rowspan="1" colspan="1"><font>序号</font></th><th rowspan="1" colspan="1"><font name="pagingSort" sort="ddName" class="of-paging_sort_def">标识</font></th><th rowspan="1" colspan="1"><font>名称</font></th><th rowspan="1" colspan="1"><font>操作</font></th></tr></thead><tbody class="of-paging_body"><tr name="pagingItem" class="of-paging_item_odd"><td>27</td><td>rankListDays</td><td>排行天数统计</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(27)" authorize="true">管理</a></td></tr><tr name="pagingItem" class="of-paging_item_even"><td>26</td><td>rankListNum</td><td>排行数量</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(26)" authorize="true">管理</a></td></tr><tr name="pagingItem" class="of-paging_item_odd"><td>25</td><td>transferState</td><td>调拨状态</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(25)" authorize="true">管理</a></td></tr><tr name="pagingItem" class="of-paging_item_even"><td>24</td><td>transportType</td><td>运输方式</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(24)" authorize="true">管理</a></td></tr><tr name="pagingItem" class="of-paging_item_odd"><td>23</td><td>pdaVersion</td><td>PDA最新版本信息</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(23)" authorize="true">管理</a></td></tr><tr name="pagingItem" class="of-paging_item_even"><td>22</td><td>purchaseNoticeType</td><td>采购通知类型</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(22)" authorize="true">管理</a></td></tr><tr name="pagingItem" class="of-paging_item_odd"><td>21</td><td>deliveryType</td><td>出库类型</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(21)" authorize="true">管理</a></td></tr><tr name="pagingItem" class="of-paging_item_even"><td>20</td><td>platform</td><td>平台</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(20)" authorize="true">管理</a></td></tr><tr name="pagingItem" class="of-paging_item_odd"><td>16</td><td>orderCount</td><td>订单产品种类</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(16)" authorize="true">管理</a></td></tr><tr name="pagingItem" class="of-paging_item_even"><td>15</td><td>orderState</td><td>出库状态</td><td><a class="jsOpendBtn" authorize-kind="ctrl_dd::saveDdItem" onclick="showItem(15)" authorize="true">管理</a></td></tr></tbody><tbody class="of-paging_empty" name="pagingEmpty" style="display: none;"><tr><td colspan="4"></td></tr></tbody><tfoot class="of-paging_foot"><tr><td colspan="4"><div class="of-paging_action"><a name="pagingFirst" class="of-paging_first" href="#">&nbsp;</a><a name="pagingPrev" class="of-paging_prev" href="#">&nbsp;</a><a name="pagingNext" class="of-paging_next" href="#">&nbsp;</a><a name="pagingLast" class="of-paging_last" href="#">&nbsp;</a><span name="pagingCount" class="of-paging_count">17</span><span name="pagingPage" class="of-paging_page">1/2</span><input name="pagingJump" class="of-paging_jump" type="text"><input name="pagingSize" class="of-paging_size" type="text"></div></td></tr></tfoot></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">新增基础环境项</h4>
            </div>
            <form class="form-horizontal m-t" id="commentForm" method="post" action="?c=ctrl_dd&a=saveDd">
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">标识: </label>
                        <div class="col-sm-8">
                            <input id="name" name="name" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">名称: </label>
                        <div class="col-sm-8">
                            <input id="caption" name="caption" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" onclick="ddSave()" authorize-kind="ctrl_dd::saveDd">保存</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!--加本页面 的js文件与js代码-->
<script src="/resources/js/vue.js"></script>
<script src="/resources/js/baseenv.js"></script>
</body>
</html>