function loadPage() {
  const url = "http://127.0.0.1:8080/api/book";
  let str = "";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const tbody = document.querySelector("tbody");

      console.log(data);
      for (const ele of data) {
        str += `<tr onclick="modalToggle(${ele.id});">
        <th scope="row">${ele.id}</th>
        <td>${ele.name}</td>
        <td>${ele.description}</td>
      </tr>`;
      }
      tbody.innerHTML = str;
    })
    .catch((err) => {
      console.log(err);
    });
}
loadPage();

function modalToggle(num) {
  document.querySelector(".modal").classList.toggle("active");
  const modalId = document.querySelector("#modalId");
  const modalName = document.querySelector("#modalName");
  const modalDescription = document.querySelector("#modalDescription");

  modalId.innerText = "";
  modalName.value = "";
  modalDescription.value = "";
  if (num == null) {
    modalId.innerText = "자동증가";
    const btnList = document.querySelector("#btnList");
    btnList.innerHTML = `<button onclick="fn_insert();">저장</button>
          <button id="btnClose" onclick="modalToggle();">닫기</button>`;
  } else {
    const btnList = document.querySelector("#btnList");
    btnList.innerHTML = `<button onclick="fn_update();">수정</button>
          <button onclick="fn_delete();">삭제</button>
          <button id="btnClose" onclick="modalToggle();">닫기</button>`;
    const url = `http://127.0.0.1:8080/api/book/${num}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        modalId.innerHTML = data.id;
        modalName.value = data.name;
        modalDescription.value = data.description;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function fn_insert() {
  if (!(await promptAlert("저장"))) {
    return;
  }

  const modalName = document.querySelector("#modalName").value;
  const modalDescription = document.querySelector("#modalDescription").value;
  const url = `http://127.0.0.1:8080/api/book`;
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: modalName,
      description: modalDescription,
    }),
  };

  fetch(url, option)
    .then((resp) => resp.text())
    .then((data) => {
      showAlert("책 등록 성공!");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function fn_update() {
  if (!(await promptAlert("수정"))) {
    return;
  }

  const modalId = document.querySelector("#modalId").innerText;
  const modalName = document.querySelector("#modalName").value;
  const modalDescription = document.querySelector("#modalDescription").value;
  const url = `http://127.0.0.1:8080/api/book`;
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: modalId,
      name: modalName,
      description: modalDescription,
    }),
  };

  fetch(url, option)
    .then((resp) => resp.text())
    .then((data) => {
      showAlert("책 수정 성공!");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function fn_delete() {
  if (!(await promptAlert("삭제"))) {
    return;
  }

  const modalId = document.querySelector("#modalId").innerText;
  const url = `http://127.0.0.1:8080/api/book`;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: modalId,
    }),
  };

  fetch(url, option)
    .then((resp) => resp.text())
    .then((data) => {
      showAlert("책 수정 성공!");
    })
    .catch((err) => {
      console.log(err);
    });
}

function promptAlert(str) {
  return Swal.fire({
    title: `${str}하시겠습니까?`,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `${str}`,
    denyButtonText: `안 ${str}`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
      return true;
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      return false;
    }
    return null; // 취소 버튼 등 기타 경우
  });
}
function showAlert(str) {
  Swal.fire({
    title: str,
    text: "You clicked the button!",
    icon: "success",
  });
  location.reload();
}
