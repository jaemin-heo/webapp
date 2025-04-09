const secretKey = "jaeminAesKey";

$(function(){
    $("#login").click(function(){
        accountManagement("login");
    });

    $("#join").click(function(){
        accountManagement("join");
    });

    $("#unsubscribe").click(function(){
        accountManagement("unsubscribe");
    });

    $("#joinPop input").on("keyup",function(key){
        if(key.keyCode==13){ 
            accountLogin($("#joinPop input[name=id]").val(),$("#joinPop input[name=pw]").val());
        }
    });
});


function accountPopToggle(){
    if ( $("#joinPop").css("z-index") == '2'){
        $("#joinPop").css({"opacity":"0","z-index":"-2"});
    }else{
        $("#joinPop").css({"opacity":"1","z-index":"2"});
    }
}

function accountManagement(type){
    id = $("#joinPop input[name=id]").val().trim();
    pw = $("#joinPop input[name=pw]").val().trim();
    let decryptId = null, decryptPw = null;
    try {
        decryptId = CryptoJS.AES.decrypt($.cookie('id'), secretKey).toString(CryptoJS.enc.Utf8);
        decryptPw = CryptoJS.AES.decrypt($.cookie('pw'), secretKey).toString(CryptoJS.enc.Utf8);
    } catch (error) {
    }

    switch (type){
        case "login":
            accountLogin(id,pw,decryptId,decryptPw);
            break;
        case "join":
            accountJoin(id,pw,decryptId);
            break;
        case "unsubscribe":
            accountUnSubscribe(id,pw,decryptId,decryptPw);
            break;
        default:
            console.log(type+"이 틀렸습니다.")
    }
    
}

function accountLogin(id,pw,decryptId,decryptPw){
    if (decryptId != null){
        if (id != decryptId){
            alert('아이디가 틀립니다');
        }else if(pw != decryptPw){
            alert('비밀번호가 틀립니다');
        }else{
            alert('안녕하세요! '+decryptId+'님');
            accountPopToggle();
        }
    }else{
        alert('아이디가 없습니다.');
    }
}

function accountJoin(id,pw,decryptId){
    id = CryptoJS.AES.encrypt($("#joinPop input[name=id]").val(), secretKey).toString();
    pw = CryptoJS.AES.encrypt($("#joinPop input[name=pw]").val(), secretKey).toString();
    if (decryptId == null){
        $.cookie('id', id, {expires: 1});
        $.cookie('pw', pw, {expires: 1});
        alert('안녕하세요! '+CryptoJS.AES.decrypt($.cookie('id'), secretKey).toString(CryptoJS.enc.Utf8)+'님');
        accountPopToggle();
    } else{
        alert('이미 아이디가 있습니다.');
    }
}

function accountUnSubscribe(id,pw,decryptId,decryptPw){
    if (decryptId != null){
        if (id != decryptId){
            alert('아이디가 틀립니다');
        }else if(pw != decryptPw){
            alert('비밀번호가 틀립니다');
        }else{
            alert('아이디가 삭제되었습니다.');
            $.removeCookie('id'); 
            $.removeCookie('pw'); 
            accountPopToggle();
        }
    }else{
        alert('아이디가 없습니다.');
    }
}