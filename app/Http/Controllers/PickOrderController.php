<?php
/**
 * Created by PhpStorm.
 * User: justl
 * Date: 2019/3/30
 * Time: 9:29
 */

namespace App\Http\Controllers;
use App\Model\DeliveryOrderDetail;
use App\Jobs\ProcessPodcast;
use Illuminate\Http\Request;

class PickOrderController
{
    public function index(Request $request)
    {
        $detail = DeliveryOrderDetail::where('id',1)->first();
        ProcessPodcast::dispatch($detail);
    }
}