<?php

class Message {
    private $bdd;

    public function __construct (){
        $this->bdd = new BDD();
    }

    /**
     * Ajoute un message dans la BDD et return le dernier ID
     */
    public function add($id, $msg, $pseudo){
        $sql = 'INSERT INTO `message`(`Contenu`, `Pseudo`, `Id_Discussion`) VALUES ("'.$msg.'","'.$pseudo.'","'.$id.'")';
        $this->bdd->execute($sql);
        //return $result;
    }

    /**
     * Récupère une liste de messages
     * Par défaut, tous les messages d'une conversation
     * Si le 2eme paramètre est renseigné, alors elle le récupère que les messages étant arrivé après le dernier dont l'ID est passé en paramètre
     */
    public function get($idDiscussion, $lastIdMsg = false){
        $sql = 'SELECT * FROM `message` WHERE `Id_Discussion` = "'.$idDiscussion.'"';
        return $this->bdd->selectAll($sql);
        // return $this->bdd->selectAll($sql, $param);
    }
}