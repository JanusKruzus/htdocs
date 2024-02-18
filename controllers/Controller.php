<?php
abstract class Controller {
    protected $view = ""; 

    abstract public function procces($params);

    public function renderView() {
        require "views/{$this->view}.phtml";
    } 
}