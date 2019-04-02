/**
 * 描述：获取页面输入值，新增基础环境项
 * 作者：caijunhongyu
 */
function ddSave(){
    var name = $("#name").val().trim();
    var caption = $("#caption").val().trim();
    if (name == "" || caption == ""){
        layer.msg('请输入有效的值！');
    } else if (name.length > 20 || caption.length > 20){
        layer.msg('请输入小于20个字符！');
    } else {
        $.post('?c=ctrl_dd&a=saveDd',{ddName:name,ddCaption:caption},function (result) {
            if (result.state == 200) {
                layer.msg(result.info,{time:3000},function(){
                    window.location.reload();
                });
            } else {
                layer.msg('<font color="red">'+result.info+'</font>');
            }
        },"json");
    }
}

/**
 * 描述：数据字典页面展示
 * 参数：
 *      id：根据基础环境id，显示数据字典项弹出层页面
 * 作者：caijunhongyu
 */
function showItem(id){
    layer.open({
        type: 1,
        title:'管理字典项',
        area: ['600px', '480px'],
        content: '<div class="row" style="margin: 20px 10px;"><div class="col-md-6">\
                    <table class="table table-bordered table-striped" style="height:140px;width:270px;table-layout:fixed;">\
                    <tr><th>值</th><th>名称</th><th>操作</th></tr>\
                    <tbody id="table"></tbody></table></div>\
                    <div class="col-md-6">\
                    <b>添加字典项</b><hr/>\
                    <form>\
                            <input id="id" type="text" hidden="hidden">\
                            <input id="ddId" type="text" value="'+id+'" hidden="hidden">\
                        <div class="form-group">\
                            <label>值 ：</label>\
                            <input id="itemValue" type="text" class="form-control" placeholder="请输入值">\
                        </div>\
                        <div class="form-group">\
                            <label>名称：</label>\
                            <input id="itemCaption" type="text" class="form-control" placeholder="请输入名称">\
                        </div>\
                        <div class="form-group pull-right">\
                            <button class="btn btn-sm btn-primary" type="button" authorize-kind="ctrl_dd::saveDdItem" onclick="itemSave()">保存</button>\
                            <button class="btn btn-sm btn-white" type="button" onclick="reset()">重置</button>\
                        </div>\
                    </form>\
                    </div></div>',
        success:function(layero,index){
            getItemList(id);
        }
    });
}

/**
 * 描述：获取数据字典列表
 * 参数：
 *      id：根据基础环境的id，获取数据字典列表信息
 * 作者：caijunhongyu
 */
function getItemList(id){
    var tr = "";
    $.post('?c=ctrl_dd&a=getDdItem',{id:id},function (result) {
        if (result.state == 200) {
            for(var i=0;i<result.data.length;i++){
                tr += '<tr onclick="itemEdit('+result.data[i]['id']+',\''+result.data[i]['diValue']+'\',\''+result.data[i]['diCaption']+'\')">' +
                    '<td style="word-wrap:break-word;">'+result.data[i]['diValue']+'</td><td style="word-wrap:break-word;">'+result.data[i]['diCaption']+'</td>' +
                    '<td><button type="button" class="btn btn-sm btn-danger" onclick="itemDelete('+result.data[i]['id']+','+id+')">删除</button></td></tr>';
            }
            $("#table").html(tr);
        } else {
            $("#table").html("");
            layer.msg(result.info+' 请添加！');
        }
    },"json");
}

/**
 * 描述：根据输入的值，保存数据字典项
 * 作者：caijunhongyu
 */
function itemSave(){
    var id      = $("#id").val();
    var ddId    = $("#ddId").val();
    var value   = $("#itemValue").val();
    var caption = $("#itemCaption").val();
    if (value == "" || caption == "") {
        layer.msg('请输入有效的值！');
    } else {
        $.post('?c=ctrl_dd&a=saveDdItem',{id:id,ddId:ddId,diValue:value,diCaption:caption},function(result){
            if (result.state == 200 || result.state == 201) {
                layer.msg(result.info,{time:2000},function(){
                    getItemList(ddId);
                    reset();
                });
            } else {
                layer.msg('<font color="red">'+result.info+'</font>');
            }
        },"json");
    }
}

/**
 * 描述：重置输入信息
 * 作者：caijunhongyu
 */
function reset(){
    $("#id").val("");
    $("#itemValue").val("");
    $("#itemCaption").val("");
}

/**
 * 描述：修改数据字典项
 * 参数：
 *      id：数据字典项id值
 *      value：数据字典值
 *      caption：数据字典名称
 * 作者：caijunhongyu
 */
function itemEdit(id,value,caption){
    $("#id").val(id);
    $("#itemValue").val(value);
    $("#itemCaption").val(caption);
}

/**
 * 描述：删除数据字典项
 * 参数：
 *      id：数据字典id
 *      ddId：基础环境的id
 * 作者：caijunhongyu
 */
function itemDelete(id,ddId) {
    layer.confirm('确定是否需要删除？', {
        btn: ['删除','取消'],
        shade: 0.5
    }, function(){
        $.post('?c=ctrl_dd&a=deleteDdItem',{id:id},function(result){
            if (result.state == 200) {
                layer.msg(result.info,{time:1000},function(){
                    getItemList(ddId);
                    reset();
                });
            }
        },"json");
    });
}

/**
 * 描述：页面搜索
 * 作者：caijunhongyu
 */
function search() {
    var args = {
        keyword: $('#keyword').val().trim()
    };
    var paging = document.getElementById('whPaging');
    paging.paging({'search': args});
}