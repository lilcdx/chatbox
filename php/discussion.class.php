<?php

class Discussion {
    private $bdd;

    public function __construct (){
        $this->bdd = new BDD();
    }

    //vérifie qu'une discussion existe déjà dans la BDD et return true or false
    public function exists($name){
        $sql = 'SELECT * FROM `discussion` WHERE `Name` = "'.$name.'"';
        $result = $this->bdd->selectAll($sql);
        if(count($result)>0){
            return true;
        } else {
            return false;
        }
    }

    //crée une discussion
    // Pensez à tester si elle existe ou non
    public function create($name){
        $sql = 'INSERT INTO `discussion`(`Name`) VALUES ("'.$name.'")';
        $this->bdd->execute($sql);
    }

    //récupère l'ID d'une discussion à partir de son name
    public function getId($name){
        $sql = 'SELECT `Id` FROM `discussion` WHERE `Name` = "'.$name.'"';
        $result = $this->bdd->selectOne($sql);
        return $result["Id"];
    }

    //récupère le nom d'une discussion à partir de son ID
    public function getName($id){
        $sql = 'SELECT `Name` FROM `discussion` WHERE `Id` = '.$id.'';
        $result = $this->bdd->selectOne($sql);
        return $result;
    }

}