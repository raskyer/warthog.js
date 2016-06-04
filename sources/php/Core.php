<?php

namespace Warthog\Core;

use Warthog\Package\FormListener;

class Core {
  private $libs;
  private $listeners;

  public function __construct()
  {
    $this->libs = array("FormListener" => new FormListener());
    $this->listeners = array();
  }

  #Core
  public function callLib()
  {
    foreach($this->libs as $lib) {
      $lib->init();
    }
  }

  #Caller
  public function postRequest($url, $param)
  {
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($param)
        )
    );

    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    $this->emit("POST_END", $result);
  }

  public function getRequest($url, $param)
  {
  }

  #Cache
  public function setCache($key, $value) 
  {
    $_SESSION[$key] = $value;
  }

  public function getCache($key)
  {
    return $_SESSION[$key];
  }

  #EventListener
  public function registerListener($name, $call)
  {
    $this->listeners[$name][] = array("call" => $call);
  }

  public function emit($name, $data)
  {
    foreach ($this->listeners[$name] as $listener) {
      $this->$listener["call"]($data);
    }
  }
}
