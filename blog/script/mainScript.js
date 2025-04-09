$(function(){
    mainTagLoad();
});

function inquirySumbit(){
    event.preventDefault();
    var inquiryText = $("textarea[name='inquiryText']").val();
    $.cookie('inquiryText', inquiryText, {expires: 1});
}

function mainTagLoad(){
    $("textarea[name='inquiryText']").val($.cookie('inquiryText'));
    //위 내용은 main.html에서 생성됬으므로 main.html내에 mainScript.js를 통해서만 pageLoad가 가능함
    //이 js에서 pageLoad했을 경우 이미 index.html 생성된 값만 수정 가능
}