<?php

namespace Core;

use App\Config;
use PDO;

class DB
{


    private $pdo = null;
    private $stmt = null;

    //connect to database
    function __construct()
    {
        $this->pdo = new PDO(
            "mysql:host =" . DB_HOST . ";dbname=" . DB_NAME,
            DB_USER,
            DB_PASSWORD,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, //throw an exception an error
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"
            ]
        );
        // Throw an Exception when an error occurs
        //$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }



    //close connection
    function __destruct()
    {
        if ($this->stmt !== null) {
            $this->stmt = null;
        }
        if ($this->pdo !== null) {
            $this->pdo = null;
        }
    }

    //select execution if the result needed
    public function execute($sql)
    {
        if ($this->stmt !== null) {
            $this->stmt = null;
        }
        $this->stmt = $this->pdo->prepare($sql);
        $this->stmt->execute();
        $this->stmt->setFetchMode(PDO::FETCH_ASSOC);
        return $this->stmt;
    }

    //update and delete execution if there is no result to supply
    public function exec($sql)
    {
        return $this->pdo->exec($sql);
    }

    //sql creating methods

    //select query without condition
    public function getAll($table, $select = '*', $limit = '', $offset = 0)
    {

        // set limits
        $limit = is_int($limit) ? " LIMIT " . $offset . ", " . $limit : "";

        if (is_string($select))
            $sql = "SELECT " . $select . " FROM " . $table . $limit;
        else
            $sql = "SELECT " . implode(', ', $select) . " FROM " . $table . $limit;
        return $sql;
    }


    //select query with condition
    public function get($table, $select = '*', $condition = '', $limit = '', $offset = 0)
    {

        // set limits
        $limit = is_int($limit) ? " LIMIT " . $offset . ", " . $limit : "";
        // Set Conditon
        $condition = $condition === '' ? '' : ' WHERE ' . $condition;

        if (is_string($select))
            $sql = "SELECT " . $select . " FROM " . $table . $condition . $limit;
        else
            $sql = "SELECT " . implode(', ', $select) . " FROM " . $table . $condition . $limit;

        return $sql;
    }

    //select query with having clouse
    public function getHaving($table, $select = '*', $condition = '', $limit = '', $offset = 0)
    {

        // set limits
        $limit = is_int($limit) ? " LIMIT " . $offset . ", " . $limit : "";
        // Set Conditon
        $condition = $condition === '' ? '' : ' HAVING ' . $condition;

        if (is_string($select))
            $sql = "SELECT " . $select . " FROM " . $table . $condition . $limit;
        else
            $sql = "SELECT " . implode(', ', $select) . " FROM " . $table . $condition . $limit;

        return $sql;
    }

    public function join($table, $select = '*', $condition = '', $limit = '', $offset = 0)
    {

        // set limits
        $limit = is_int($limit) ? " LIMIT " . $offset . ", " . $limit : "";
        // Set Conditon
        $condition = $condition === '' ? '' :  $condition;

        if (is_string($select))
            $sql = "SELECT " . $select . " FROM " . $table . " " . $condition . $limit;
        else
            $sql = "SELECT " . implode(', ', $select) . " FROM " . $table . " " . $condition . $limit;

        return $sql;
    }

    public function save($table, $data)
    {

        $keys = '';
        $values = '';

        foreach ($data as $key => $value) {
            $keys .= $key . ", ";
            // $values .= ":" . $key . ", ";
            $values .= is_int($value) ? $value . ", " : "'" . $value . "', ";
        }

        $sql = "INSERT INTO " . $table  . "(" . rtrim($keys, ', ') . ") VALUES(" . rtrim($values, ', ') . ")";

        return $sql;
    }

    public function delete($table, $condition)
    {
        $sql = "DELETE FROM " . $table . " WHERE " . $condition;
        return $sql;
    }

    public function update($table, $columns, $condition)
    {
        $sql = "UPDATE " . $table . " SET ";

        foreach ($columns as $key => $value) {
            if (is_int($value))
                $sql .= $key . "= " . $value . " ";
            else
                $sql .= $key . "= '" . $value . "', ";
        }
        $sql = rtrim($sql, ", "); //remove last comma seperator
        $sql .= $condition === '' ? '' : ' WHERE ' . $condition;

        return $sql;
    }
}


define('DB_HOST', Config::DB_HOST);
define('DB_NAME', Config::DB_NAME);
//define('DB_CHARSET', Config::DB_CHARSET);
define('DB_USER', Config::DB_USER);
define('DB_PASSWORD', Config::DB_PASSWORD);