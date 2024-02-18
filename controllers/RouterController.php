<?php
class RouterController extends Controller {
    protected $controller;

    public function procces($params){
        $this->view = "layout";

        $url = $params[0];
        
        $path = $this->parseURL($url);
        if (empty($path)){
            require_once "ErrorController.php";
            $this->controller = new ErrorController();
            $this->controller->procces();
        }
        else{
            $controllerPartName = array_shift($path); // vrátí první prvek a ostatní prvky posune na začátek
            
            $controllerName = $this->toCamelCase($controllerPartName)
                                . "Controller";
            if (file_exists("controllers/$controllerName.php")) {
              $this->controller = new $controllerName;
              $this->controller->procces($path);  
            }
            else {
                require_once "ErrorController.php";
                $this->controller = new ErrorController();
                $this->controller->procces($path);
            }
        }
    
    }
    
    private function toCamelCase($text) {
        $text = str_replace("-", " ", $text);
        $text = ucwords($text);
        $text = str_replace(" ", "", $text);
        return $text;
    }

    private function parseURL($url) {
        $parsedURL = parse_url($url);
        $path = $parsedURL["path"];
        $path = ltrim($path, "/");
        $path = trim($path);
        $splitPath = explode("/", $path);
        return $splitPath;
    }
}


