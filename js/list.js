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