// 리스트 페이지 검색창 포커스 스크립트
// .search_wr 요소와 그 내부의 input 요소 선택
const searchWrapper = document.querySelector('.search_wr');
const searchInput = searchWrapper.querySelector('input');

// input에 포커스가 올라가면 .search_wr에 act 클래스 추가
searchInput.addEventListener('focus', function() {
    searchWrapper.classList.add('act');
});

// input에서 포커스가 빠져나가면 .search_wr의 act 클래스 제거
searchInput.addEventListener('blur', function() {
    searchWrapper.classList.remove('act');
});


// 리스트 토글
// 현재 활성화된 행을 저장
let currentActiveRow = null;

// 클릭 이벤트를 전체 테이블에 위임하여 설정
document.querySelectorAll(".list_detail tbody tr").forEach(row => {
    row.addEventListener("click", function(event) {
        // 클릭한 요소가 특정 td (tb_article 또는 tb_btn)인지 확인
        const classesToCheck = ["btn_wr", "tb_manager"];
        if (classesToCheck.some(cls => event.target.classList.contains(cls) || event.target.closest(`.${cls}`))) {
            return; // 특정 셀 및 그 내부 요소 클릭 시 함수 종료
        }

        // 활성화 상태에 따라 act 클래스 추가/제거
        const isActive = row.classList.contains("act");
        row.classList.toggle("act");
    });
});


// 팝업 열기
const popOpenButtons = document.querySelectorAll('.arti_btn');

for (let i = 0; i < popOpenButtons.length; i++) {
    popOpenButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        const popupId = this.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        
        if (popup) {
            popup.style.display = 'block';
            popup.classList.add('act');
            popup.closest('.popup_wr').classList.add('on');
            document.querySelector('body').classList.add('scrollLock');
        }
    });
}


// 팝업 닫기
const popCloseButtons = document.querySelectorAll('.pop_close, .popup_wr');
for (let j = 0; j < popCloseButtons.length; j++) {
    popCloseButtons[j].addEventListener('click', function () {

        const popupContainer = this.closest('.pop_cont');

        if (popupContainer) {
            popupContainer.style.display = 'none';
            popupContainer.classList.remove('act');
            popupContainer.closest('.popup_wr').classList.remove('on');
            document.querySelector('body').classList.remove('scrollLock');
        }
    });
}


// 모든 커스텀 셀렉트 박스를 설정
document.querySelectorAll('.sel_box').forEach(function(selectBox) {
    const selected = selectBox.querySelector('.sel_selected');
    const optionsContainer = selectBox.querySelector('.sel_options');
    const options = selectBox.querySelectorAll('.sel_option');

    // 셀렉트 박스 클릭 시 옵션 표시/숨김
    selected.addEventListener('click', function(event) {
        event.stopPropagation(); // 이벤트 버블링 방지
        closeAllSelectBoxes(selectBox); // 다른 셀렉트 박스 닫기
        selectBox.classList.toggle('active'); // 현재 셀렉트 박스 열기/닫기
        adjustDropdownPosition(selectBox); // 드롭다운 방향 조정
    });

    // 옵션 클릭 시 선택 처리
    options.forEach(function(option) {
        option.addEventListener('click', function() {
            selected.innerHTML = option.innerHTML;
            selected.setAttribute('data-selected-value', option.getAttribute('data-value'));
            selectBox.classList.remove('active'); // 드롭다운 닫기
        });
    });

    // 드롭다운 방향 조정 함수
    function adjustDropdownPosition(selectBox) {
        // 셀렉트 박스의 가장 가까운 스크롤 컨테이너를 기준으로 계산
        const container = selectBox.closest('.cont_inner'); // 가장 가까운 부모 컨테이너 찾기
        const containerRect = container.getBoundingClientRect();
        const selectBoxRect = selectBox.getBoundingClientRect();
        const dropdownHeight = optionsContainer.offsetHeight;

        // 상단, 하단 여유 공간 계산
        const spaceBelow = containerRect.bottom - selectBoxRect.bottom; // 아래 여유 공간
        const spaceAbove = selectBoxRect.top - containerRect.top;       // 위 여유 공간

        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
            // 아래 공간 부족하고 위 공간 충분하면 위로 열기
            optionsContainer.style.top = `-${dropdownHeight}px`;
        } else {
            // 기본: 아래로 열기
            optionsContainer.style.top = '100%';
        }
    }
});

// 다른 셀렉트 박스를 닫는 함수
function closeAllSelectBoxes(currentBox) {
    document.querySelectorAll('.sel_box').forEach(function(selectBox) {
        if (selectBox !== currentBox) {
            selectBox.classList.remove('active');
        }
    });
}

// 페이지의 다른 영역을 클릭하면 모든 드롭다운이 닫히도록 설정
document.addEventListener('click', function() {
    closeAllSelectBoxes();
});


 // 신규 프로젝트 등록 폼 스크립트
 document.querySelectorAll('.input_wr input').forEach(input => {
    input.addEventListener('click', function() {
        // 'input_wr' 요소에 'act' 클래스 추가
        this.closest('.input_wr').classList.add('act');
    });
});

if(document.querySelector('.ddi_list_wr')){
    document.getElementById('openFormBtn').addEventListener('click', function() {
        document.getElementById('projectForm').classList.add('visible');
        document.getElementById('overlay').classList.add('visible');
    
        // 2초 후에 'act' 클래스를 추가
        setTimeout(function() {
            document.getElementById('projectForm').classList.add('act');
        }, 2000);
    });
    
    document.getElementById('closeFormBtn').addEventListener('click', function() {
        document.getElementById('projectForm').classList.remove('act');
        document.getElementById('projectForm').classList.remove('visible');
        document.getElementById('overlay').classList.remove('visible');
    });
    
    // 등록 폼 내에 첨부파일 
    const fileList = document.getElementById('fileList');
    const fileInput = document.getElementById('fileInput');
    
    fileInput.addEventListener('change', function() {
        Array.from(this.files).forEach(file => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-file-name', file.name);
    
            const fileNameSpan = document.createElement('span');
            fileNameSpan.textContent = file.name;
            fileNameSpan.classList.add('file-name');
    
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-file');
            removeButton.onclick = () => listItem.remove();
    
            listItem.appendChild(fileNameSpan);
            listItem.appendChild(removeButton);
            fileList.appendChild(listItem);
        });
    
        // Clear the input to allow re-uploading of the same file if needed
        this.value = '';
    });
}



// 의견 말풍선 아이콘 인터렉션
document.querySelectorAll('.coment_btn .icon_chat').forEach(function(iconChat) {
    iconChat.addEventListener('click', function(event) {
        event.preventDefault();

        this.closest('.coment_btn').classList.add('act');
    });
});

document.querySelectorAll('.coment_btn .icon_send').forEach(function(iconSend) {
    iconSend.addEventListener('click', function(event) {
        event.preventDefault();

        this.closest('.coment_btn').classList.remove('act');
    });
});

// 좋아요 싫어요 버튼 활성화
document.querySelectorAll('button.emoji_btn').forEach(button => {
    button.addEventListener('click', () => {
        // 클릭된 버튼에 'act' 클래스가 있으면 제거, 없으면 추가
        button.classList.toggle('act');
    });
});


// 리스트 솔팅 스크립트
document.querySelectorAll('.btn_wr .t_box button, .btn_wr .b_box button').forEach(function(button) {
    button.addEventListener('click', function() {
        const table = document.querySelector('.project_tb');
        const columnIndex = Array.from(this.closest('tr').children).indexOf(this.closest('th'));

        let isAscending = false;

        // 모든 버튼에서 'act' 클래스 제거 후 현재 버튼에 추가
        document.querySelectorAll('.btn_wr button').forEach(btn => btn.classList.remove('act'));
        this.classList.add('act');

        if (this.closest('.t_box')) {
            isAscending = false;
            this.classList.add('desc');
            this.closest('.btn_wr').querySelectorAll('.b_box button').forEach(btn => btn.classList.remove('asc', 'desc'));
        } else {
            isAscending = true;
            this.classList.add('asc');
            this.closest('.btn_wr').querySelectorAll('.t_box button').forEach(btn => btn.classList.remove('asc', 'desc'));
        }

        sortTable(table, columnIndex, isAscending);
    });
});
function sortTable(table, columnIndex, ascending) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        const valA = isNaN(cellA) ? cellA : parseFloat(cellA);
        const valB = isNaN(cellB) ? cellB : parseFloat(cellB);

        const comparison = typeof valA === 'string' || typeof valB === 'string'
        ? valA.localeCompare(valB)
        : (valA - valB);

        return ascending ? comparison : -comparison;
    });

    rows.forEach(row => tbody.appendChild(row));
}