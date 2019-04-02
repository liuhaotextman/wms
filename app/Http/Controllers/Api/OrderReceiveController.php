<?php
/**
 * Created by PhpStorm.
 * User: justl
 * Date: 2019/3/14
 * Time: 10:17
 */

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Events\LogApi;
use App\Model\DeliveryOrder;
use App\Model\DeliveryOrderDetail;
use App\Model\DeliveryOrderError;
use Illuminate\Support\Facades\DB;
use App\Core\SkuInout;

class OrderReceiveController extends Controller
{
    public function push(Request $request)
    {
        $orderData = $request->get('data');
        event(new LogApi($orderData));//记录在日志中
        $initData = array(
            'globalOrder' => '',
            'chunkOrder' => '',
            'subject' => 'SZYKS',
            'mode' => 1,
            'logCode' =>'',
            'type' =>'RET',
            'orderSubject' => '',
            'platformType' => '',
            'orderCost' => 0,
            'orderAmount' => 0,
            'platformAmount' => 0,
            'platformCurrency' => '',
            'platformRate' => '',
            'salesAccount' => '',
            'buyerUser' => '',
            'receiverName' => '',
            'receiverPhone' => '',
            'receiverEmail' => '',
            'receiverAddress' => '',
            'receiverMessage' => '',
            'receiverCountry' => '',
            'receiverProvince' => '',
            'receiverCity' => '',
            'receiverCounty' => '',
            'receiverZipCode' => '',
            'paymentCurrency' => '',
            'paymentTime' => '2001-01-01 00:00:00',
            'paymentType' => '',
            'amountPaid' => 0,
            'paymentOrder' => '',
            'paymentAccount' => '',
            'paymentRate' => 0,
            'logisticsType' => '',
            'logisticsCharges' => 0,
            'countryCode' => '',
            'goodsList' => array(),
            'logisticsInfo' => array(
                'type' => '',
                'code' => '',
                'charges' => '',
                'currency' => '',
                'amount' => ''
            )
        );
        $orderData = json_decode($orderData,true);
        $orderData = array_merge($initData,$orderData);
        $check = $this->checkOrder($orderData);
        if (!$check['state']!=true){
            echo json_encode($check);
            return ;
        }
        //先查看库存是否足够

        //订单主表
        DB::beginTransaction();
        $order = DeliveryOrder::where('orderSn',$orderData['chunkOrder'])->first();
        if ($order && $order->orderState>4){
            echo json_encode(['state'=>400,'该订单状态已进入拣货流程,禁止修改']);
            return ;
        }
        if ($order == null){
            $order = new DeliveryOrder;
        }
        $order->orderSn = $orderData['chunkOrder'];
        $order->finishTime = date('Y-m-d H:i:s',time());
        $order->subject = $orderData['subject'];
        $order->logType = $orderData['logisticsType'];
        $order->type = $orderData['type'];
        $order->mode = $orderData['mode'];
        $order->orderState = 1;
        $order->stateMode = 0;
        $order->stateTime = date('Y-m-d H:i:s',time());
        $order->logType = $orderData['logisticsType'];
        $order->totalReceipt = $orderData['totalReceipt'];
        $order->totalReceipt = $orderData['totalReceipt'];
        $order->totalDisburse = $orderData['totalDisburse'];
        $order->createTime = $orderData['createTime'];
        $order->save();
        //订单日志表
        $orderDetail = DeliveryOrderDetail::where('orderSn',$orderData['chunkOrder'])->first();
        if (!$orderDetail){
            $orderDetail = new DeliveryOrderDetail();
        }
        $orderDetail->orderSn = $orderData['chunkOrder'];
        $orderDetail->data = json_encode($orderData);
        $orderDetail->save();
        //错误订单表
        $orderError = DeliveryOrderError::where('orderSn',$orderData['chunkOrder'])->first();
        if ($orderError){
            $orderError->delete();
        }
        //占用库存
        $occu = new SkuInout();
        $result = $occu->occupy($orderData['chunkOrder']);
        if ($result['state'] == 200){
            $order->orderState = 2;
            $mode = $this->getorderType($orderData);
            $order->mode = $mode;
            $order->save();
            DB::commit();
        } else {
            DB::rollBack();
        }
        return json_encode($result);
    }

    public function getorderType(array $orderData): int
    {
        $goodList = $orderData['goodsList'];
        $sku_num = 0;$quantity_num = 0;
        foreach($goodList as $sku=>$info){
            $sku_num++;
            $quantity_num = $quantity_num + $info['quantity'];
        }
        if ($sku_num >= 2){
            return 3;
        } elseif ($sku_num < 2 && $quantity_num > 1) {
            return 2;
        } else {
            return 1;
        }
    }
    public function test()
    {
        $result = DB::select('select * from delivery_order where id=:id',['id'=>2]);
        var_dump($result);exit;
    }
    public function checkOrder(array $order): array
    {
        if (!$order){
            return ['state'=>false,'info'=>'请求参数为空'];
        }
        if (empty($order['goodList'])){
            return ['state'=>false,'info'=>'商品信息不能为空'];
        }
        if (empty($order['orderData']['receiverName'])
            || empty($order['orderData']['receiverAddress'])
            || empty($order['orderData']['receiverCity'])
            || empty($order['orderData']['receiverZipCode'])){
            return ['state'=>false,'info'=>'用户信息不完整'];
        }
        return ['state'=>true];
    }
}