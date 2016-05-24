<?php

namespace Warthog {
  class Core {
    private $url;
    private $lib;

    public function __construct()
    {
      $this->$url = "{{ URL }}";
      $this->lib = array();

      $this->load_lib();
    }

    private function load_lib()
    {
      foreach ($this->lib as $key => $lib) {
          $lib->init();
      }
    }

    public function post()
    {

    }
  }

  class CoreCaller {
    public function __construct()
    {

    }

    private function normalize_data()
    {

    }

    private function post()
    {

    }

    private function get() {

    }
  }

  class CoreCache {
    public function __construct() {

    }

    public function save() {

    }

    public function get() {

    }
  }
}
