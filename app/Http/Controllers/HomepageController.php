<?php
/**
 * Created by PhpStorm.
 * User: justl
 * Date: 2019/3/12
 * Time: 10:45
 */

namespace App\Http\Controllers;


class HomepageController
{
    public function index()
    {
        return view('index');
    }
}