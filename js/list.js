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
        const classesToCheck = ["tb_article", "btn_wr", "tb_manager"];
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
        }
    });
}