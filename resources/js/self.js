//////////////////////////全选按钮
$(function() {
    $("#checkAll").click(
        function() {
            if (this.checked) {
                $("input[name='subBox']").prop('checked', true);
            } else {
                $("input[name='subBox']").prop('checked', false);
            }
        }
    );
});
