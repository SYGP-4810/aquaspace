<?php

namespace Core;

use App\Config;
use PDO;

/***
 * base model
 */

class Model
{



    private $stmt = null;

    //connect to database
    protected static function connect()
    {

        $connection = new PDO(
            "mysql:host =" . DB_HOST . ";dbname=" . DB_NAME,
            DB_USER,
            DB_PASSWORD,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, //set attributes
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"
            ]
        );
        // Throw an Exception when an error occurs
        //$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $connection;
    }



    protected static function close($connection)
    {
        $connection = null;
    }

    /**
     * sql execution if result neede (common uses : select)
     * @param string $sql sql for the execution
     * @return object result of the execution
     */

    public function execute($sql)
    {
        $this->stmt = self::connect()->prepare($sql);
        $this->stmt->execute();
        return $this->stmt;
    }

    /**
     * sql execution if result not needed (common uses : update , delete)
     * @param string $sql sql for the execution
     * @return  void
     */

    //update and delete execution if there is no result to supply
    public function exec($sql)
    {
        return self::connect()->exec($sql);
    }

    //sql creating methods

    /***
     * select all query results without condition
     * @param string $table table of the sql
     * @param string $select field of the sql
     * @param int limit $limit limit of the sql
     * @param int $offset offset of the sql
     * @return string complete sql 
     */

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


    /***
     * select all query results with condition (WHERE)
     * @param string $table table of the sql
     * @param string $select field of the sql
     * @param string condition condition of the sql
     * @param int limit $limit limit of the sql
     * @param int $offset offset of the sql
     * @return string complete sql 
     */

    public function get($table, $select = "*", $condition = '', $limit = '', $offset = 0)
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

    /***
     * select all query results with condition (HAVING)
     * @param string $table table of the sql
     * @param string $select field of the sql
     * @param string condition condition of the sql
     * @param int limit $limit limit of the sql
     * @param int $offset offset of the sql
     * @return string complete sql 
     */
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

    /**
     * joining sql 
     *
     * @param [string] $table array of table names of sql
     * @param string $select field of sql
     * @param string $condition condition of sql join condition
     * @param int $limit  limit of the sql    
     * @param integer $offset of set of the sql
     * @return string completed string
     */
    public function join($table, $select = '*', $condition = '', $limit = '', $offset = 0)
    {

        // set limits
        $limit = is_int($limit) ? " LIMIT " . $offset . ", " . $limit : "";
        // Set Conditon
        $condition = $condition === '' ? '' :  $condition;

        if (is_string($select))
            $sql = "SELECT " . $select . " FROM " . $table . " WHERE " . $condition . $limit;
        else
            $sql = "SELECT " . implode(', ', $select) . " FROM " . $table . " WHERE " . $condition . $limit;

        return $sql;
    }

    /**
     * insert query sql
     * @param string $table table name of the sql
     * @param [string => string] $data data to insert key : field , value : data
     * @return string completed sql query
     * 
     */

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

    /**
     * delete sql query with a condition (where)
     *
     * @param string $table table name of the sql
     * @param string $condition $condition to sql
     * @return string completed sql
     */
    public function delete($table, $condition)
    {
        $sql = "DELETE FROM " . $table . " WHERE " . $condition;
        return $sql;
    }

    /**
     * update sql query condition (WHERE)
     * @param string $table table name of the sql
     * @param [string => string] $colomns values and data of the sql [field => value]
     * @param string $condition condition to the sql
     * @return string completed sql
     */

    public function update($table, $columns, $condition)
    {
        $sql = "UPDATE " . $table . " SET ";

        foreach ($columns as $key => $value) {
            if (is_int($value))
                $sql .= $key . "= " . $value . " ,";
            else
                $sql .= $key . "= '" . $value . "', ";
        }
        $sql = rtrim($sql, ", "); //remove last comma seperator
        $sql .= $condition === '' ? '' : ' WHERE ' . $condition;

        return $sql;
    }
}

//db configuration defined here

define('DB_HOST', Config::DB_HOST);
define('DB_NAME', Config::DB_NAME);
//define('DB_CHARSET', Config::DB_CHARSET);
define('DB_USER', Config::DB_USER);
define('DB_PASSWORD', Config::DB_PASSWORD);