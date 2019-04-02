<?php
/**
 * Created by PhpStorm.
 * User: justl
 * Date: 2019/3/27
 * Time: 11:04
 */

namespace App\Core;
use App\Model\DeliveryOrder;
use Illuminate\Support\Facades\DB;

class OrderState
{


    /**
     * @param $orderSn  订单号
     * 返回订单的二级类型
     * 1 单品单件   2   单品多件      3  多品多件
     */
    public function getorderType($orderSn)
    {

    }

}