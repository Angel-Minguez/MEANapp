<?php
class tabla {
	var $table;
	function __construct($num){
		$table=new array;
		for($i =0; $i<10; $i++) $table = array_push($num*$i);
	}
	function showTable(){
		for ($i =0; $i<10; $i++) echo this->table[1]."X".$i."=".this->table[$i]."<br>";
	}	
}
?>