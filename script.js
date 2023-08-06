//Fonction qui génère l'affichage de la page: formulaire vers table de jeu
function changeScreen(){
    form = document.querySelector("form");    
    principale = document.getElementById("principale");
    tableau = document.getElementById("tableau");
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        //récupérer les noms des joueurs 
        joueur1=document.getElementById("joueur1").value;
        joueur2= document.getElementById("joueur2").value;

        //Vérifier si les champs sont complétés comme il le faut
        if(joueur1!=""&&joueur2!=""){
            //cacher la div qui contient le formulaire
            principale.style.display= "none";
            //Afficher celui qui contient la table de jeu
            tableau.style.display="block";

            //Gestion de la table des scores
            score1= document.getElementById("Score1");
            score1.innerHTML=0;
            score2= document.getElementById("Score2");
            score2.innerHTML=0;

            //Dialogue d'informations pour les joueurs
            document.getElementById("j1").innerHTML=joueur1;
            document.getElementById("j2").innerHTML=joueur2;
            alert(joueur1+", vous êtes le premier à jouer, vos pions sont des ronds blancs.\nPar contre, "+joueur2+", vos pions sont des croix gris");    
        }
        else alert("Veuillez compléter la formulaire d'abord s'il vous plaît!");
    })
}
//Fonction qui génère l'affichage de la page: table de jeu vers formulaire
function changeScreen1(){
        tableau.style.display= "none";
        principale.style.display="block";
}

//Fonction qui récupère la ligne dont laquelle se positionne un bouton
function getLigne(bouton){
    identifiant = bouton.id;
    intermediaire = identifiant.split('l');
    intermediaire = intermediaire[1].split('c') ;
    ligne = intermediaire[0];
    return parseInt(ligne);            
}

//Fonction qui récupère la colonne dont laquelle se positionne un bouton
function getColonne(bouton){
    identifiant = bouton.id;
    intermediaire = identifiant.split('l');
    intermediaire = intermediaire[1].split('c') ;
    colonne = intermediaire[1];
    return parseInt(colonne);           
}

//Fonction qui crée la table de jeu
function createTableJeu(){
    table=  document.getElementById("table");
    for(i=1; i<=3; i++){
        tr = document.createElement("tr");
        for(j=1; j<=3; j++){
            td= document.createElement("td");
            bouton = document.createElement("button");
            bouton.className="btn";
            bouton.id= "l"+i+"c"+j;
            bouton.style.width= "100%";
            bouton.style.height= "100%";
            bouton.style.borderRadius="5px";
            bouton.style.border=" 2px solid white";
            td.appendChild(bouton);
            tr.appendChild(td);
        }    
        table.appendChild(tr);
    }
}

//Fonction qui réinitialise les grilles
function resetGrille(boutons){
    for(i=0;i<9;i++)
        boutons[i].innerHTML="";
}

//Fonction qui permet de jouer
function dessiner(cpt){
    var result;
    boutons= document.querySelectorAll(".btn");
    boutons.forEach(element => {
        element.addEventListener('click',(e)=>{
            cpt+=1;
            ligne= getLigne(element);
            colonne = getColonne(element);
            if((element.innerHTML=='')&&(cpt%2!=0)){
                element.innerHTML= "O";
                element.style.color="white";
                result=testGagnant(ligne,colonne,joueur1);
                if(result){
                    score1 = parseInt(document.getElementById("Score1").innerHTML);
                    document.getElementById("Score1").innerHTML=(score1+1);

                    //Réinitialiser la grille
                    resetGrille(boutons);
                }
                else{ 
                    if(boutons[0].innerHTML!=""&&boutons[1].innerHTML!=""&&boutons[2].innerHTML!=""&&boutons[3].innerHTML!=""&&boutons[4].innerHTML!=""&&boutons[5].innerHTML!=""&&boutons[6].innerHTML!=""&&boutons[7].innerHTML!=""&&boutons[8].innerHTML!="")
                    {
                        alert("Match nuuuuuuuuuul");    
                        resetGrille(boutons);
                    }
                }
            }
            else if((element.innerHTML=='')&&(cpt%2==0)){
                element.innerHTML= "X";
                element.style.color="grey";
                result=testGagnant(ligne,colonne,joueur2);
                if(result){
                    score2 = parseInt(document.getElementById("Score2").innerHTML);
                    document.getElementById("Score2").innerHTML=(score2+1);
                    //Réinitialiser la grille
                    resetGrille(boutons);
                }
                else{ 
                    if(boutons[0].innerHTML!=""&&boutons[1].innerHTML!=""&&boutons[2].innerHTML!=""&&boutons[3].innerHTML!=""&&boutons[4].innerHTML!=""&&boutons[5].innerHTML!=""&&boutons[6].innerHTML!=""&&boutons[7].innerHTML!=""&&boutons[8].innerHTML!="")
                    {
                        alert("Match nuuuuuuuuuul");    
                        resetGrille(boutons);
                    }
                }
            }
        })
    });
}

//Fonction qui teste s'il y a un potentiel gagnant
function testGagnant(ligne,colonne,joueur){
    var result= false;
    if(ligne==1) initial=0;
    else if (ligne==2) initial=3;
    else if(ligne==3) initial =6;

    if(colonne==1) cl=0;
    else if (colonne==2) cl=1;
    else if(colonne==3) cl =2;

    if (((boutons[initial].innerHTML==boutons[initial+1].innerHTML)&&(boutons[initial+2].innerHTML==boutons[initial+1].innerHTML))||((boutons[cl].innerHTML==boutons[cl+3].innerHTML)&&(boutons[cl+3].innerHTML==boutons[cl+6].innerHTML)))
    {    
        alert("Bravoo "+joueur+", vous avez gagné");   
        result=true; 
        //changeScreen1();
    }
    if((boutons[0].innerHTML=="O"||boutons[0].innerHTML=="X")||(boutons[4].innerHTML=="O"||boutons[4].innerHTML=="X")||(boutons[8].innerHTML=="O"||boutons[8].innerHTML=="X"))
        if(((boutons[0].innerHTML==boutons[4].innerHTML)&&(boutons[4].innerHTML==boutons[8].innerHTML)))
        {    
            alert("Bravoo "+joueur+", vous avez gagné"); 
            result=true;   
            //changeScreen1();
        }
        
    if((boutons[2].innerHTML=="O"||boutons[2].innerHTML=="X")||(boutons[4].innerHTML=="O"||boutons[4].innerHTML=="X")||(boutons[6].innerHTML=="O"||boutons[6].innerHTML=="X"))
        if(((boutons[2].innerHTML==boutons[4].innerHTML)&&(boutons[4].innerHTML==boutons[6].innerHTML)))
        {    
            alert("Bravoo "+joueur+", vous avez gagné"); 
            result=true;   
            //changeScreen1();
        }
    return result;
}

//Principale
window.addEventListener('load',(e)=>{
    e.preventDefault();
    changeScreen();
    createTableJeu();
    //Le refa mikitika anle bouton amzay
    cpt=0;
    dessiner(cpt);
    
    recommencer= document.getElementById("Recommencer");
    recommencer.addEventListener('click',(e)=>{
        changeScreen1();
    })
})