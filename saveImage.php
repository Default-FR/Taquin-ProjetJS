<?php 
    if(isset($_POST['submit'])){
        $name       = $_FILES['file']['name'];  
        $temp_name  = $_FILES['file']['tmp_name'];  
        if(isset($name)){

            if(!empty($name)){      
                $Location = 'ressources/upLoadUser/';   
                $MAX_FILE_SIZE = 1000000000;   
                
                // On vérifie l'extension
                $extension = explode(".",$name)[1];
                if(!(strcmp($extension, '.png') || strcmp($extension, '.gif') || 
                                    strcmp($extension, '.jpg') || strcmp($extension, '.jpeg'))){
                    header("Location:mainPage.html");
                }
                // On vérifie la taille
                else if(filesize($_FILES['file']['tmp_name'])>$MAX_FILE_SIZE){
                    header("Location:mainPage.html");
                }
                // Si toutes les verifs sont passées on envoie
                else if(move_uploaded_file($temp_name, $Location.$name)){
                    header("Location:mainPage.html");
                }
            }       
        }  
        else {
            header("Location: mainPage.html");
        }
    }
?>