<?php
include "bdd.class.php";
include "discussion.class.php";
include "message.class.php";
//var_dump($_GET, $_POST);

/**
 * On vérifie que l'URL contienne l'action à effectuer.
 * en fonction de cette action, le code diffère
 * Toutes les données retournées sont encodées en JSON de façon à pouvoir être interprétées et manipulées par le JS
 */
if(array_key_exists("action", $_GET)){
    $action = $_GET["action"];
    
    switch($action){
        case "getDiscussionName":
            /**
             * Récupère le nom d'une discussion en fonction de son ID
             */
                $disc = new Discussion();
                $result = $disc->getName($id);
                echo json_encode(["discussion" => $result["Name"]]);
            
            break;
        case "create":
            /**
             * Crée une nouvelle discussion
             * Passe le nom de la discussion en majuscule et s'il contient des espaces, les remplace par un "-"
             */
                $disc = new Discussion();
                $name = $_GET["name"];
                if ($disc->exists($name)){
                    echo json_encode(["discussion" => false]);
                } else {
                    $disc->create($name);
                    echo json_encode(["discussion" => true]);
                }
            
            break;
        case "join":
            /**
             * Vérifie qu'une discussion existe
             * Si elle existe, retourne son id, sinon retourne false
             */
                $disc = new Discussion();
                $name = $_GET["name"];
                if ($disc->exists($name)){
                    $id = $disc->getId($name);
                    echo json_encode(["discussion" => $id]);
                } else {
                    echo json_encode(["discussion" => false]);
                }
                // if(array_key_exists("name", $_POST)){
                //     $disc = new Discussion();
                //     $name = $_POST["name"];
                //     if ($disc->exists($name)){
                //         $id = $disc->getId($name);
                //         echo json_encode(["discussion" => $id]);
                //     } else {
                //         echo json_encode(["discussion" => false]);
                //     }
                // }
            
            break;
        case "addMessage":
            /**
             * Ajoute un message à une discussion
             */
                $message = new Message();
                $id = $_GET["id"];
                $content = $_GET["msg"];
                echo $content;
                $pseudo = $_GET["pseudo"];
                $message->add($id, $content, $pseudo);
                echo json_encode(["message" => $content]);
            
            break;
        case "getMessages":
            /**
             * Récupère tous les messages d'une discussion
             * Evolution possible : ne récupérer qu'un certain nombre de messages et créer un scroll infini dans l'interface
             */
            // if(array_key_exists("id", $_POST)){
                // $id = trim($_POST["id"]);
                $id = $_GET["id"];
                $message = new Message();
                $result = $message->get($id);
                echo json_encode($result);
            // }
            break;
        case "getLastMessages":
            /**
             * Récupère les derniers messages arrivés après l'ID d'un message renseigné
             */
           
                echo json_encode($result);
            
            break;
    }
}