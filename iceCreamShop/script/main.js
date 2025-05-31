window.onload = () =>{
new Glide('.glide', {
    type: 'carousel',
    autoplay: 3000
}).mount();

//로컬스토리지에서 주문내역 가져와 textboX에 넣기
insertBox();
}

function icecreamOrder(){
    event.preventDefault();
    if(isLogin){
        alert('주문 되었습니다.');
        let decryptId = null
        try {
            decryptId = CryptoJS.AES.decrypt($.cookie('id'), secretKey).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.log("error" + error);
            
        }
        //객체 생성
        const order = {
            orderMenu : document.querySelector("#iceOrder form select[name=orderMenu]").value,
            orderCount : $('#iceOrder form input[name=orderCount]').val(),
            decryptId : decryptId
        }
        //객체를 배열에 넣기
        // localStorage에서 'orders'를 배열로 가져오기
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        //localStorage에 저장
        localStorage.setItem('orders',JSON.stringify(orders));
        insertBox();
        
    }else{
        alert("로그인중이 아닙니다.");
    }
}

function insertBox() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    $('#textBox > div:nth-of-type(2)').empty();

    $.each(orders, function (index, item) {
        const $container = $('<div>');
        let orderMenu = null;
        switch (item.orderMenu) {
            case "1": orderMenu = "딸기"; break;
            case "2": orderMenu = "민트"; break;
            case "3": orderMenu = "바닐라"; break;
            case "4": orderMenu = "수박"; break;
            case "5": orderMenu = "오렌지"; break;
            case "6": orderMenu = "체리"; break;
            case "7": orderMenu = "초코"; break;
            case "8": orderMenu = "카라멜"; break;
            case "9": orderMenu = "키위"; break;
            case "10": orderMenu = "우유"; break;
            case "11": orderMenu = "마늘"; break;
            case "12": orderMenu = "쌀"; break;
            default: orderMenu = "알 수 없음";
        }

        const $span = $('<span>').text(`${index + 1}. 종류 : ${orderMenu} 수량 : ${item.orderCount}개 주문자 : ${item.decryptId}`);

        const $button = $('<button>')
            .text('삭제')
            .on('click', function () {
                deleteOrder(index);
            });

        $container.append($span).append($button);
        $('#textBox > div:nth-of-type(2)').append($container);
    });
}


function deleteOrder(index){
    //주문취소
    //로컬스토리지에서 객체배열가져오기
    //textbox에서 해당 span 삭제
    //localStorage에서 해당 주문 삭제
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    insertBox();
}