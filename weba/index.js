const inputText = document.querySelector('input[name=inputText]');
const inputCategory = document.querySelector('#category');
const inputArr = [];
const textBox = document.querySelector('#textBox');

function addText(){
    const result = {
        category : inputCategory.value,
        text : inputText.value
    }
    inputArr.push(result);
    alert(inputText.value +'\n'+ inputCategory.value +'\n 내용이 추가되었습니다.');
    inputText.value = '';
    //객체에 담아서 배열에 넣기
}

function insertText(){
    console.log(inputArr);
    const jsonStr = JSON.stringify(inputArr);
    localStorage.setItem('memo',jsonStr);
    alert('저장되었습니다.');
}

function selectText(){
    textBox.innerHTML = '';
    const data =  JSON.parse(localStorage.getItem('memo'));
    for(let obj of data){
     const span = document.createElement('span');
     span.innerText = obj.category+' : '+obj.text+'\n';
     textBox.appendChild(span);
    }
}

function deleteText() {
    const spans = textBox.querySelectorAll('span');
    if (spans.length > 0) {
        spans[spans.length - 1].remove();
    }

    const data = JSON.parse(localStorage.getItem('memo'));
    if (data.length > 0) {
        data.pop();
        localStorage.setItem('memo', JSON.stringify(data));
    }
    
     if (inputArr.length > 0) {
        inputArr.pop();
    }
}