/**
 * 描述 : 共用基础方法
 */
var base = {
    /**
     * 描述 : 复制text到剪贴板
     * 作者 : gxh
     */
    copyToClipboard:function(text){
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            successful ? layer.msg(L.getText('复制成功!'), {icon: 6}) : layer.msg(L.getText('该浏览器不支持点击复制到剪贴板'), {icon: 5});
        } catch (err) {
            layer.msg(L.getText('该浏览器不支持点击复制到剪贴板'), {icon: 6});
        }
        document.body.removeChild(textArea);
    },

    /**
     * 描述 : 模拟POST提交
     * 作者 : zongzhigang
     */
    postData: function (url, params) {
        var temp = document.createElement("form");
        temp.action = url;
        temp.method = "post";
        temp.style.display = "none";
        for (var x in params) {
            if(typeof params[x] === 'object') {
                for(var xx in params[x]) {
                    var opt = document.createElement("textarea");
                    opt.name = x + '[' + xx + ']';
                    opt.value = params[x][xx];
                    temp.appendChild(opt);
                }
            } else {
                var opt = document.createElement("textarea");
                opt.name = x;
                opt.value = params[x];
                console.log(opt);
                temp.appendChild(opt);
            }
        }
        document.body.appendChild(temp);
        temp.submit();
        return temp;
    },

    /**
     * 描述 : 用于监听当前按钮所在form下回车功能
     * 调用方法 : className : 搜索按钮class名称 eg:
     * 作者 : zhongzhigang
     */
    'listenEnter': function (className) {
        var $this = $(className);
        if ($this.length === 0) {
            return false;
        }
        $this.closest('form').on("keydown", function (e) {
            var theEvent = e || window.event;                                                                               // 兼容FF和IE和Opera
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                $this.trigger('click');                                                                                     //回车执行查询
                e.preventDefault();
            }
        });
    },

    /**
     * 描述 : 时间控件
     * 作者 : zhongzhigang
     */
    'inputData': function (className, minFlag) {
        var minFlag = arguments[1] ? arguments[1] : '';
        // $(className).each(function () {                                                                                      //输入精确到日
        //     window.L.open('wDate', {
        //         'obj': this,
        //         'eventType': 'focus',
        //         'params': {'readOnly': true, 'dateFmt': 'yyyy-MM-dd'}
        //     });
        // });
        //自动补充时间 xxxx-xx-xx 00:00:00 ~ xxxx-xx-xx 23:59:59
        var date = 'yyyy-MM-dd HH:mm:ss';
        if (className.indexOf('Start') != -1) {
            date = 'yyyy-MM-dd 00:00:00';
        } else if (className.indexOf('End') != -1) {
            date = 'yyyy-MM-dd 23:59:59';
        }
        //设置最大最小时间
        var minDate = minFlag ? '%y-{%M-1}-%d' : '';
        var maxDate = minFlag ? '%y-%M-%d' : '';

        $(className).each(function () {                                                                                  //输入精确到秒
            window.L.open('wDate', {
                'obj': this,
                'eventType': 'focus',
                'params': {'readOnly': true, 'dateFmt': date, 'minDate': minDate, 'maxDate': maxDate}
            });
        });
    },

    /**
     * 描述 : 主要用于上一页下一页回调功能
     * 作者 : zhongzhigang
     */
    saveFunction: function (callBack, windowObj, callBackObj) {
        var oDialogDiv = L.open('oDialogDiv');
        var thisFrame = oDialogDiv.getAncestorWindow()
            .document.getElementById("oDialogDiv_iframe_" + callBackObj.handle);
        var $thisFun = arguments.callee;

        /**
         *  描述 : 用于使用判断页面翻页是否翻页到底
         *  参数: pageBtn: "prev"或者"next"按钮
         *  作者 : zzg
         */
        $thisFun.pageEnd = function (pageBtn, tableId) {
            var $loc = !!L.cookie().location ? L.cookie().location[tableId] : "";
            var $table = $('[name="pagingBlock"]').get(0);
            var itemNum, pageNum, size;
            var returnType = true;
            if (!!$table) {
                itemNum = !!$table.paging(null) ? $table.paging(null).items : "";
                pageNum = !!$table.paging(null) ? $table.paging(null).page : "";
                size = !!$table.paging(null) ? $table.paging(null).size : "";
                if (itemNum === "") {
                    returnType = null;
                }
            } else {
                returnType = null;
            }
            if (pageBtn === "next") {
                if (parseInt(itemNum) - 1 < (parseInt($loc) + (pageNum - 1) * size + 1)) {
                    returnType = false;
                }
            } else if (pageBtn === "prev") {
                if (0 > ( parseInt($loc) + (pageNum - 1) * size + -1)) {
                    returnType = false;
                }
            }
            if (!returnType) {
                window.L.open('tip')('没有更多,不能翻页', 2000);
            }
            return returnType;
        };

        /**
         *  描述: 用于旗舰的翻页功能，修改当前页面的url中的额外的数据，根据turnPageNum加减后，找到分页中对应的数据，传递到后台
         *      从而进行翻译。
         *  参数:
         *      turnPageNum: "+1" 或者 "-1" 为上下页，如果是5（数字），为翻到对应页面。
         * 作者 : zzg
         */
        $thisFun.ultraTurnPage = function (turnPageNum, argsObj) {
            var tableData = $('table[name="pagingBlock"]').get(0).data;
            var tWindow = callBackObj.oDialogDivObj;
            var currenctWin = tWindow.find('iframe').eq(0).get(0).contentWindow;
            var currenctDoc = currenctWin.document;
            var turnpageKey = JSON.parse(tWindow.find('.operating').find('.jsNextBtn').attr('extra-key'));
            var firstKey = turnpageKey.key[0];
            var currentHref = currenctWin.location.href;
            var id = $(currenctDoc).find('[name="' + firstKey + '"]').val();
            var noMore = false;
            var optionObj = {
                callBackFun: "",
                callBackArgs: ""
            };
            $.extend(optionObj, argsObj);
            var regex = new RegExp("(\\?|&)([ac]=[\\s\\S]*?)(?=&|$)", "ig");
            var search = currentHref.match(regex);
            search = search[0] + search[1];
            $.each(tableData, function (i, t) {
                if (t[firstKey] === id) {
                    var reg = /[+-]\d+/;
                    turnPageNum = turnPageNum.toString().match(reg) ? i + parseInt(turnPageNum) : parseInt(turnPageNum);    //传过来的页面中的需要
                    if (turnPageNum >= 0 && turnPageNum < tableData.length) {
                        $.each(turnpageKey.key, function (ind, ite) {
                            search += "&" + ite + "=" + tableData[turnPageNum][ite];
                        });
                        optionObj.callBackFun && optionObj.callBackFun(optionObj.callBackArgs);
                        return false;
                    } else {
                        noMore = true;
                        L.open('tip')("不能翻页，当前分页的最后（或最前）一条", 1000);
                        return false;
                    }
                }
            });
            if (!noMore) {
                regex = new RegExp("\\?.*", "i");
                currentHref = currentHref.replace(regex, '');
                thisFrame.src = currentHref + search;
            }
        };
        $thisFun.changPageTitle = function () {
            var $title = callBackObj.oDialogDivObj.find('.title').find('h4');
            var title = $title.text();
            var reg = /^(.+?\:).+?$/;
            var commonTitle = !!title.match(reg) ? title.match(reg)[1] : "";
            if (commonTitle) {
                $(thisFrame).on('load', function () {
                    var frameGlobalOrder = thisFrame.contentWindow.allObj &&
                        thisFrame.contentWindow.allObj.order.globalOrder;
                    $title.text(commonTitle + frameGlobalOrder);
                });
            }
        };
        if (parseInt(callBack) == 11) {
            //出库单列表上一页
            $thisFun.ultraTurnPage("-1");
            return false;
        } else if (parseInt(callBack) == 12) {
            //出库单列表下一页
            $thisFun.ultraTurnPage("+1");
            return false;
        }
    },

    /**
     * 描述 : 全选功能，area为所在区域（table），allSelect为全选按钮，followSelect为勾选框
     * 作者 : zhongzhigang
     */
    allSelect: function (area, allSelect, followSelect) {
        $(area).on('click', allSelect, function () {
            var $this = $(this);
            var isCheck = $this.prop('checked');
            var $jsFollowSelects = $this.closest('table').find(followSelect);
            if (isCheck) {
                $jsFollowSelects.each(function () {
                    if (!$(this).prop('checked')) {
                        $(this).prop('checked', true)
                    }
                });
            } else {
                $jsFollowSelects.each(function () {
                    if ($(this).prop('checked')) {
                        $(this).prop('checked', false)
                    }
                });
            }
        });
        $(area).on('click', followSelect, function () {
            var $this = $(this);
            var isCheck = $this.prop('checked');
            var $jsFollowSelects = $this.closest('table').find(followSelect);
            var $allSelect = $this.closest('table').find(allSelect);
            var isAllCheck = true;
            if (isCheck) {
                $jsFollowSelects.each(function () {
                    if (!$(this).prop('checked')) {
                        isAllCheck = false;
                    }
                });
                if (isAllCheck) {
                    $allSelect.prop('checked', true);
                }
            } else {
                if ($allSelect.prop('checked')) {
                    $allSelect.prop('checked', false);
                }
            }
        });
    },

    /**
     * 描述 : 切换支持多输入框
     * 注明 : 触发目标input类 .jsForMultiSearch
     * 作者 : zhongzhigang
     */
    tabText: function (obj) {
        var $this = $(obj).find('span');
        var input = $(obj).siblings('input.jsForMultiSearch');
        if (input.length) {
            input = input.eq(0);
            var $hasClass = $this.hasClass('glyphicon-minus');
            if ($hasClass) {
                $this.removeClass("glyphicon-minus").addClass("glyphicon-plus");
                input.removeClass('input-multiple').removeClass("jsMultiSearch").unbind().focus().select();
            } else {
                $this.removeClass("glyphicon-plus").addClass("glyphicon-minus");
                input.addClass("jsMultiSearch").addClass('input-multiple');
                base.multipleText();
                input.focus();
            }
        }
    },

    /**
     * 描述 : 弹出大输入框，处理订单号，追踪号，SKU多条查询
     * 作者 : caijunhongyu
     */
    multipleText: function () {
        $('.input-multiple').on('focus', function () {
            var $this = $(this);
            var thisVal = $this.val();
            var pageX = $this.offset().left;
            var pageY = $this.offset().top;
            var $area = $('body');
            var $textWrapper = $('<textarea id=\'multipleText\' class="spinner-input form-control" ' +
                'onpaste="pasteEvent(event, this)"></textarea>');
            $area.append($textWrapper);
            $textWrapper.css({
                left: pageX,
                top: pageY,
                'z-index': 4,
                width: '300px',
                height: '400px',
                resize: 'none',
                position: 'absolute'
            });
            $textWrapper.focus().val(thisVal);
            $textWrapper.on('blur', function () {
                $textWrapper.remove();
                $this.val($textWrapper.val());
            });
            $textWrapper.on("keydown", function (e) {
                var theEvent = e || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code == 13) {
                    $this.val($textWrapper.val());
                    $textWrapper.remove();
                    $('.searchBtn').trigger('click');
                    e.preventDefault();
                }
            });
        });
    },
    /**
     * 描述 : 用于接收后台传过来的权限数组（没有的权限展示），之后进行对应的锁定或者隐藏
     * 选项: 当前元素添加class为jsAuthHide实现强制隐藏
     *              添加jsAuthDisabled强制锁定
     * 样例:
     *  var userInfo2 = {
     *      "deny": {
     *          "pack": {
     *              "admin": {
     *                  "data": "",
     *                  "func": {
     *                      "show_order::setGlobalOrder@trueRefund": "show_order::setGlobalOrder@trueRefund",
     *                      "show_order::setGlobalOrder@falseRefund": "show_order::setGlobalOrder@falseRefund",
     *                      "show_order::setCancel@delZero": "show_order::setCancel@delZero",
     *                      "show_chunk::index": "show_chunk::index",
     *                   }
     *               }
     *          }
     *      }
     *  };
     */
    checkAuthorize: function (checkObj) {
        var userRole,
            thisFun = arguments.callee,
            $this,
            _this,
            kinds,
            canHide,
            canDisabled,
            kindsObj,
            tagName,
            authorize,
            denyInfo,
            kindResult,
            $parentArr = [],
            $childArr = [],
            $checkObj = $(checkObj),
            _checkObj = $checkObj.get(0),
            $subObj;
        if (!$('#userRole').val()) {
            return false;
        }
        userRole = JSON.parse($('#userRole').val());
        denyInfo = userRole.deny.func;
        /**
         * 描述 : 用于检测传入权限数组（authorizeObj）和需要找寻的权限数组（kindsObj），返回对应的数据，false代表需要disabled；null表示可能需要隐藏，true表示正常展示
         * 作者 : liubibo
         */
        thisFun.authorizeResult = function (authorizeObj, kindsObj) {
            var tempCon = kindsObj.controller ? kindsObj.controller : "";
            var tempFunc = kindsObj.func ? "::" + kindsObj.func : "";
            var tempSub = kindsObj.sub ? '@' + kindsObj.sub : "";
            if (!kindsObj.controller || kindsObj.controller === "") {
                throw "没有写控制器";
            } else if (!kindsObj.func || kindsObj.func === "") {
                if (!!denyInfo && !!denyInfo[tempCon]) {
                    return null;
                } else {
                    return true;
                }
            } else if (!kindsObj.sub || kindsObj.sub === "") {
                if (!!denyInfo) {
                    if (!!denyInfo[tempCon + tempFunc]) {
                        return null;
                    } else if (!!denyInfo[tempCon + tempFunc]) {
                        return null;
                    } else {
                        return true;
                    }
                }
            } else {
                if (!!denyInfo) {
                    if (!!denyInfo[tempCon]) {
                        return null;
                    } else if (!!denyInfo[tempCon + tempFunc]) {
                        return null;
                    } else if (!!denyInfo[tempCon + tempFunc + tempSub]) {
                        return false;
                    }
                }
            }
            return true;
        };
        /**
         * 描述 : 用于处理传入的对应数据处理，auth为true false(初步判断为锁定输入)  null（初步判定为隐藏），检测当前是否有class为jsAuthHide（隐藏）和jsAuthDisabled（锁定），有则根据class来处理
         *      没有则按初步判断的结果处理。
         *      当隐藏，系统自动该元素添加jsAuthCloak和jsAuthDenied样式
         *      当锁定，系统自动该元素添加jsAuthLock和jsAuthDenied 样式
         * 作者 : liubibo
         */
        thisFun.handleType = function (obj, auth) {
            var thisObj = $(obj);
            var thisTagName = obj.tagName;
            var thisCanHide = thisObj.hasClass('jsAuthHide');
            var thisCanDisabled = thisObj.hasClass('jsAuthDisabled');
            if ((thisTagName === "OPTION" || thisTagName === "A") && thisCanDisabled) {                                     //当自身是option或者是a，开启的是disabled功能，会失效，进行报错处理
                throw "当前为option或者a，不能用disabled限制，只能隐藏，请删除class=jsAuthDisabled";
            }
            if (auth === false) {
                if (!!canHide || thisTagName === "OPTION" || thisTagName === "A") {
                    thisObj.css('display', 'none');
                    thisObj.addClass('jsAuthCloak');
                } else {
                    thisObj.attr({"disabled": "disabled", "readonly": "readonly"})
                        .css({"background-color": "#eee", "opacity": 1, "cursor": "not-allowed"});
                    thisObj.addClass('jsAuthLock');
                }
            } else if (auth === null) {
                if (!!canDisabled) {
                    thisObj.attr({"disabled": "disabled", "readonly": "readonly"})
                        .css({"background-color": "#eee", "opacity": 1, "cursor": "not-allowed"});
                    thisObj.addClass('jsAuthLock');
                } else {
                    thisObj.css('display', 'none');
                    thisObj.addClass('jsAuthCloak');
                }
            }
            thisObj.addClass('jsAuthDenied');
        };
        /**
         * 描述 : 根据字符串进行处理，返回对象{"controller":"..", "func":"...","sub":"..."},
         *   controller用于检测控制器的权限，没有则直接隐藏或者disabled。
         *   再进一步找寻下自身的权限，没有则直接隐藏或者disabled。
         * 作者 : liubibo
         */
        thisFun.kindsToObj = function (str) {
            if (!str) {
                return false;
            }
            var regex = /^(.*?)\:\:(.*?)(?:@(.*?))?$/;                                                                      //匹配该种kinds （fewf > fes ），父级($1)和子级别($2)关系
            var result = str.match(regex);
            var kindsObj = {controller: '', func: "", sub: ""};
            if (!!result && result[2] !== undefined) {
                kindsObj.controller = result[1];
                kindsObj.func = result[2];
                if (result[3] !== undefined) {
                    kindsObj.sub = result[3];
                }
            }
            return kindsObj;
        };
        /**
         * 描述 : 如果本身不是输入框，可能是一块div，而且不会隐藏情况下，则进行子输入框检测，返回true，表明子输入框本身没有检测权限。 返回false,表明子输入框本身有权限检测
         * 作者 : liubibo
         */
        thisFun.checkSubInputs = function (obj, parentHide) {
            var thisKind = $.trim($(obj).attr('authorize-kind'));
            if (!!thisKind && !parentHide) {
                return false;
            }
            return true;
        };
        /**
         * 描述 : 用于判断当前类型是否是返回child， 或者返回auhorize为true 或者false
         * 作者 : liubibo
         */
        thisFun.multiKinds = function (str) {
            var tempArr;
            if (!str) {                                                                                                     //当前元素没有authorize-kind，返回child
                return 'child';
            }
            if (str.indexOf("||") > 0) {
                tempArr = str.split("||");
                tempArr.some(function (item, index, array) {
                    kindsObj = thisFun.kindsToObj(item);
                    return authorize = thisFun.authorizeResult(denyInfo, kindsObj);
                });
            } else if (str.indexOf('&&') > 0) {
                tempArr = str.split("&&");
                tempArr.every(function (item, index, array) {
                    kindsObj = thisFun.kindsToObj(item);
                    return authorize = thisFun.authorizeResult(denyInfo, kindsObj);
                });
            } else {
                kindsObj = thisFun.kindsToObj(str);
                authorize = thisFun.authorizeResult(denyInfo, kindsObj);
            }
            return authorize;
        };
        /**
         * 原因 : 由于authorize-kind和另一个authorize-kind 有一个重合的元素（如input[authorzie-kind="none"]），无法准确判断属于哪一个，用于解决此问题
         * 机制 : 当前元素有authorize-kind的时候，保存结果到 该元素的data-authorize中。其结果有 true ,false, child。如果是child的话，auhorize会取最近父级的data-authorize的结果
         * 参数 : obj为当前元素，isAuth为返回情况
         * 作者 : liubibo
         */
        thisFun.markAuthrize = function (obj, isAuth) {
            if (isAuth === true) {
                $(obj).attr('authorize', true);
            } else if (isAuth === false) {
                $(obj).attr('authorize', false);
            } else if (isAuth === 'child') {
                //暂时不做任何处理
            } else if (isAuth === null) {
                $(obj).attr('authorize', null);
            }
        };
        /**
         * 描述 : 收集有authorize-kind且内含元素的数组
         * 作者 : liubibo
         */
        thisFun.parentArr = function (obj) {
            var temp = $(obj);
            $parentArr.push(temp);
        };
        /**
         * 描述 : 收集authorize-kind的内包含的元素数组
         * 作者 : liubibo
         */
        thisFun.childArr = function (obj) {
            $.each($parentArr, function (i, t) {
                $childArr.push(t.find('select,input,textarea,button').not('[authorize]'));
            });
        };
        /**
         * 描述 : 用于处理authorize-kind子元素数组（不包含authorize-kind),找子元素父级的authorize是“false”，则锁定该子元素
         * 作者 : liubibo
         */
        thisFun.handleChild = function ($arr) {
            if (!!$arr && $arr.length > 0) {
                $.each($arr, function (i, t) {
                    var parentAuth = t.closest('[authorize]');
                    if (parentAuth.attr('authorize') === "false") {
                        thisFun.handleType(this, false);
                    }
                });
            }
        };
        /**
         * 描述 : 主函数
         * 作者 : liubibo
         */
        thisFun.checkObjFun = function (obj) {
            $this = $(obj);
            _this = obj;
            tagName = _this.tagName;
            kinds = $.trim($this.attr('authorize-kind'));
            canHide = $this.hasClass('jsAuthHide');
            canDisabled = $this.hasClass('jsAuthDisabled');
            kindResult = thisFun.multiKinds(kinds);
            thisFun.markAuthrize(_this, kindResult);
            if (!!canHide && !!canDisabled) {
                throw "不能同时锁定和隐藏，选择删除jsAuthHide或者jsAuthDisabled";
            }
            if ((tagName === "OPTION" || tagName === "A") && canDisabled) {                                                 //当自身是option或者是a，开启的是disabled功能，会失效，进行报错处理
                throw "当前为option或者a，不能用disabled限制，只能隐藏，请添加class=jsAuthHide";
                return false;
            }
            if (!authorize) {                                                                                               //当没有权限时候，判断当前对象输入框之类的，直接进行处理
                var typeArr = ["SELECT", "INPUT", "TEXTAREA", "BUTTON", "OPTION", "A"];
                var isBlock = 1;
                $.each(typeArr, function (ind, item) {
                    if (item === tagName) {
                        thisFun.markAuthrize(_this, kindResult);                                                            //当前input没有authorize-kind，以此寻找最近有authorize-kind的父级
                        thisFun.handleType(_this, authorize);
                        isBlock = 0;
                        return false;
                    }
                });
                if (isBlock === 1) {                                                                                        //当可能是div这种块状的，检测是否隐藏。隐藏直接隐藏该块。
                    if (!!canHide || (authorize === null && !canDisabled)) {
                        thisFun.handleType(_this, authorize);
                    } else {                                                                                                //不是隐藏，则进行进行锁定各个子输入框的功能。
                        thisFun.parentArr(_this);
                    }
                }
            }
        };

        /**
         * 描述 : 根据块状的authorize-kind，遍历块状(div或者别的块标签)中的输入框（不带authorize-kind），再遍历整个区域中输入框attr是authorize-kind元素，进行处理。
         * 作者 : liubibo
         */
        if (!!$checkObj.attr('authorize-kind')) {
            thisFun.checkObjFun(_checkObj);
        }
        $subObj = $checkObj.find('[authorize-kind]');
        if ($subObj.length > 0) {
            $subObj.each(function (ind, item) {
                if (!!$(this).attr('authorize-kind').trim()) {
                    thisFun.checkObjFun(item);
                }
            });
        }
        thisFun.childArr($parentArr);
        thisFun.handleChild($childArr);
    }
};

$(function () {
    $(window).scroll(function () {
        var $scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if ($scrollTop > 150) {
            $("#up").fadeIn();
        } else {
            $("#up").fadeOut();
        }
        ;
        var viewH = $(this).height(),//可见高度
            contentH = document.documentElement.scrollHeight;//内容高度
        if ((contentH - viewH - $scrollTop) > 300) {
            $("#buttomDiv").fadeIn();
        } else {
            $("#buttomDiv").fadeOut();
        }
        ;
    });
    //滚动条与底部的距离
    $('body,html').append('<div id="up" >↑TOP</div>');
    $('body,html').append('<div id="buttomDiv">↓BOT</div>');
    $("#buttomDiv").click(function () {
        $('body,html').animate({scrollTop: 9999}, 500);
    });
    $("#up").click(function () {
        $('body,html').animate({scrollTop: 0}, 500);
    });
});

$(function () {
    base.checkAuthorize('body');                                                                                             //调用权限功能
});

/**
 * 描述 : 弹出大输入框，处理订单号，追踪号，SKU多条查询
 * 作者 : caijunhongyu
 */
base.multipleText();

/**
 * 描述 : 粘贴事件监听处理粘贴数据
 * 作者 : caijunhongyu
 */
function pasteEvent(event, thisObj) {
    var value = thisObj.value;
    value && (value += ',');
    thisObj.value = '';
    window.setTimeout(function () {
        //格式化内容, 转换无效空格换行逗号 xxx,xxx,xx,
        thisObj.value = (value + thisObj.value + ',').replace(/\r\n|\r|\n/g, ',').replace(/\s*,+\s*/g, ',');
    }, 0);
}