<?php
/**
 * Created by PhpStorm.
 * User: justl
 * Date: 2019/3/22
 * Time: 16:19
 */

namespace App\Core;
use App\Model\DeliveryOrderDetail;
use App\model\SkuFragAttr;
use App\Model\SkuFragLockAttr;
use Illuminate\Support\Facades\DB;
use App\Model\SkuBaseAttr;

class SkuInout
{
    private $orderSn;
    //占用库存
    public function occupy(string $orderSn)
    {
        $this->$orderSn = $orderSn;
        $this->cancelOccupy($orderSn);
        $orderDetail = DeliveryOrderDetail::where('orderSn',$orderSn)->first();
        $goodList = $orderDetail->data;
        $goodList = json_decode($goodList,true);
        $goodList = $goodList['goodsList'];
        foreach($goodList as $sku=>$info){
            $skuQty = $info['quantity'];
            //查看sku的库存够不够
           $sku_base = DB::select("select avaiQty from sku_base_attr where sku=:sku for update",['sku'=>$sku]);
           if ($sku_base) {
               $sku_base = $sku_base[0];
               if ($sku_base->avaiQty < $skuQty){
                   return ['state'=>400,'info'=>$sku.'库存不足'];
               }
           } else {
               return ['state'=>400,'info'=>$sku.'库存不足'];
           }
           //把可用库存改为占用库存
            //$sku_frags = DB::select("select * from sku_frag_attr where sku=:sku",['sku'=>$sku]);
           $sku_frags = SkuFragAttr::where('sku',$sku)->get();
           foreach($sku_frags as $frag){
               $lock = new SkuFragLockAttr();
               if ($frag->avaiQty >= $skuQty){
                   $frag->avaiQty = $frag->avaiQty - $skuQty;
                   $frag->occuQty = $frag->occuQty + $skuQty;
                   $frag->save();
                   $lock->quantity = $skuQty;
                   $skuQty = 0;
               } else {
                   $skuQty = $skuQty - $frag->avaiQty;
                   $lock->quantity = $frag->avaiQty;
                   $frag->occuQty = $frag->avaiQty+$frag->occuQty;
                   $frag->avaiQty = 0;
                   $frag->save();

               }
               $lock->sku = $sku;
               $lock->placeKey = $frag->placeKey;
               $lock->type = 'BID';
               $lock->target = $orderSn;
               $lock->state = 1;
               $lock->createTime = date('Y-m-d H:i:s');
               $lock->save();
               if ($skuQty == 0)break;
           }
           if ($skuQty !== 0) {
               return ['state'=>400,'info'=>$sku.'库存异常'];
           }
           DB::update('update sku_base_attr set avaiQty=avaiQty-?,occuQty=occuQty+? where sku=?',[$info['quantity'],$info['quantity'],$sku]);
        }
        return ['state'=>200,'info'=>'审核通过'];
    }

    /**
     * 撤销订单的占用库存
     */
    public function cancelOccupy(string $target)
    {
        $locks = SkuFragLockAttr::where('target',$target)->get();
        foreach($locks as $lock){
            $placeKey = $lock->placeKey;
            $sku = $lock->sku;
            $quantity = $lock->quantity;
            $sku_attr = SkuBaseAttr::where('sku',$sku)->first();
            $sku_frag = SkuFragAttr::where(['sku'=>$sku,'placeKey'=>$placeKey])->first();
            $sku_frag->avaiQty = $sku_frag->avaiQty + $quantity;
            $sku_frag->occuQty = $sku_frag->occuQty - $quantity;
            $sku_attr->avaiQty = $sku_attr->avaiQty + $quantity;
            $sku_attr->occuQty = $sku_attr->occuQty - $quantity;
            $sku_frag->save();
            $sku_attr->save();
            $lock->delete();
        }
    }



}