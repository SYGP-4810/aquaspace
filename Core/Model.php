<?php

namespace Core;
use App\Config;
use PDO;

class DB{


	//(A)connect to database
	public $error = "";
	private $pdo = null;
	private $stmt = null;


	function __construct(){
			$this ->pdo = new PDO(
				"mysql:host =".DB_HOST.";port=3309;dbname=".DB_NAME.";charset=".DB_CHARSET,
				DB_USER,DB_PASSWORD,[
					PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
					PDO::ATTR_DEFAULT_FETCH_MODE =>PDO::FETCH_ASSOC
					]
			);
			// Throw an Exception when an error occurs
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

//(B)close connection
	function __destruct(){
		if($this-> stmt!==null){$this->stmt = null;}
		if($this-> pdo!==null){$this->pdo = null;}
	}

//(c) run a select query 
	function select($sql, $cond=null){
		$result = false;
		$this->stmt = $this->pdo->prepare($sql);
		$this->stmt->execute($cond);
		$result = $this->stmt->fetchAll();
		if(count($result) == 0){
			return false;
		}else{
			return $result;
		} 

	}

	//sql insert $sql -> ex : INSERT INTO users (email, vorname, nachname) VALUES (?, ?, ?) $vals is a array of values needed to be inserted
	function insert($sql,$vals = []){
			if(count($vals) == 0 || substr_count($sql,"?") == count($vals)) throw new \Exception("there should be values to add or there is invalid structure of values");
			$this->stmt = $this->pdo->prepare($sql);
			$this->stmt->execute($vals);
	}

	function insertNew($table = '',$cols = [],$vals = []){
			if($table == '') throw new \Exception("add a table name");
			if(count($cols) != count($vals)) throw new \Exception("number of columns and number of values are not equal");
			$sql = "INSERT INTO " . $table . " (";
			for($i = 0 ; $i < count($cols); $i){
				$sql += $cols[$i]; 
			}
			$sql += ")";
			$brackets = " VALUES (?";
			for($i = 0; $i < count($cols)-1; $i++){
				$brackets += ",?"; 
			}
			$brackets += ")";
			$sql += $brackets;
			$this->stmt = $this->pdo->prepare($sql);
			$this->stmt->execute($vals);
	}

	//sql update $sql -> ex : UPDATE users SET name=?, surname=?, sex=? WHERE id=? $vals is a array of values needed to be updated
	function update($sql, $vals = []) {
			if(count($vals) == 0 || substr_count($sql,"?") != count($vals)) throw new \Exception("there should be values to update or there is invalid structure of values");
			$this->stmt= $this->pdo->prepare($sql);
			$this->stmt->execute($vals);
		

	}

	//sql update $sql -> ex : UPDATE users SET name=?, surname=?, sex=? WHERE id=? $vals is a array of values needed to be updated
	/**
	 * @array $cols only contain columns which needed to be updated
	 * @string $cond should contatin condition ex : id > ? or sallery = 1000
	 * @array $vals should contain all values to be updated and sequentially values of condition  
	 *  */ 
	function updateNew($table = '' , $cols = [], $cond = '' ,$vals = []){

		$sql = "UPDATE ".$table." SET ".$cols[0]."=?";
		for($i = 1; $i < count($cols);$i++){
			$sql += ", ".$cols[$i]."=?";
		}
		$sql += " WHERE ".$cond;
		if($table == '') throw new \Exception("table name is empty in the update string");
		if(substr_count($sql,"?") != count($vals)) throw new \Exception("update sql is wrong");
		$this->stmt= $this->pdo->prepare($sql);
		$this->stmt->execute($vals);
			
	}


}
define('DB_HOST',Config::DB_HOST);
define('DB_NAME',Config::DB_NAME);
define('DB_CHARSET',Config::DB_CHARSET);
define('DB_USER',Config::DB_USER);
define('DB_PASSWORD',Config::DB_PASSWORD);
?>