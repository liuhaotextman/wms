<?php
/**
 * Created by PhpStorm.
 * User: justl
 * Date: 2019/3/30
 * Time: 16:57
 */
interface Board {
    public function type();
}

class CommonBoard implements Board {
    public function type(){
        echo '普通键盘';
    }
}

class MechanicalKeyboard implements Board {
    public function type(){
        echo '机械键盘';
    }
}

class Computer {
    protected $keyboard;

    public function __construct (Board $keyboard) {
        $this->keyboard = $keyboard;
    }
}

//class Container
//{
//    protected $binds;
//
//    protected $instances;
//
//    public function bind($abstract, $concrete)
//    {
//        if ($concrete instanceof Closure) {
//            $this->binds[$abstract] = $concrete;
//        } else {
//            $this->instances[$abstract] = $concrete;
//        }
//    }
//
//    public function make($abstract, $parameters = [])
//    {
//        if (isset($this->instances[$abstract])) {
//            return $this->instances[$abstract];
//        }
//
//        array_unshift($parameters, $this);
//        return call_user_func_array($this->binds[$abstract], $parameters);
//    }
//}
//
//$container = new Container;
//
//$container->bind('Board', function($container){
//    return new CommonBoard;
//});
//$container->bind('Computer',function($container,$module){
//    return new Computer($container->make($module));
//});
//
//$computer = $container->make('Computer',['Board']);
//var_dump($computer);
class Container
{
    protected $binds;

    public function bind($abstract, $concrete,$depend = null)
    {
        if ($depend != null){
            $this->binds[$abstract] = new $concrete($this->make($depend));
            return;
        }
        $this->binds[$abstract] = new $concrete();
    }

    public function make($abstract)
    {
        if (isset($this->binds[$abstract])){
            return $this->binds[$abstract];
        }
    }
}
$concreter = new Container();
$concreter->bind('Board','CommonBoard');
$concreter->bind('Computer','Computer','Board');
$computer = $concreter->make('Computer');
var_dump($computer);