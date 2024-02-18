<?php
require "init.php";

$router = new RouterController();
$router->procces([$_SERVER["REQUEST_URI"]]);
$router->renderView();