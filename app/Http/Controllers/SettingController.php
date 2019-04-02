<?php
/**
 * Created by PhpStorm.
 * User: justl
 * Date: 2019/3/20
 * Time: 10:35
 */

namespace App\Http\Controllers;


class SettingController extends Controller
{
    public function index()
    {
        return view('setting/baseenv');
    }
}