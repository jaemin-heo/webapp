$(function(){
    $("#mainTop").load("./header.html");
    $("#mainBottom").load("./footer.html");
});

function subMenuToggle(){
    if(document.getElementById("subMenu").style.right != "0px"){
        document.getElementById("subMenu").style.right = "0px";
        document.getElementById("subMenu").style.opacity ="1";
    }else{
        document.getElementById("subMenu").style.right = "-100%"
        document.getElementById("subMenu").style.opacity ="0";
    }
}