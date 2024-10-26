
//----------------------------------------------------------------------------------------
// 채팅 히스토리 영역 스크립트 - 수정, 수정 완료 버튼
document.querySelectorAll('.edit_btn').forEach(function(editButton) {
    editButton.addEventListener('click', function() {
        const parent = this.closest('.chat_cont');
        const titleLink = parent.querySelector('.tit');
        const currentText = titleLink.textContent.trim();
        const editButton = parent.querySelector('.edit_btn');
        const btnBox = parent.querySelector('.btn_box');

        // tit, date를 숨기고 <input> 요소를 생성
        parent.classList.add("act")

        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.value = currentText;
        inputBox.className = 'title_input';
        
        // 수정 버튼을 숨기고 저장 버튼 생성
        editButton.classList.add('dis-no');

        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.textContent = '저장';
        saveButton.className = 'save_btn';

        // 저장 버튼을 수정 버튼 자리에 삽입
        btnBox.insertBefore(saveButton, editButton);

        // 저장 버튼 클릭 시 실행
        saveButton.addEventListener('click', function() {
            const newText = inputBox.value;
            if(newText == ""){
                alert("내용을 적어주세요.")
            } else{
                titleLink.textContent = newText;

                // <input>과 저장 버튼을 제거하고, tit, date 다시 표시
                inputBox.remove();
                saveButton.remove();
                parent.classList.remove("act")

                // 수정 버튼 다시 표시
                editButton.classList.remove('dis-no');
            }
        });

        // <input> 박스를 <a> 위치에 삽입
        titleLink.parentElement.insertBefore(inputBox, titleLink);
    });
});

//----------------------------------------------------------------------------------------
// 채팅 히스토리 영역 스크립트 - 스크롤 관련 스크립트
const content = document.querySelector('.chat_history .cont_wr');
const contentCont = document.querySelectorAll('.chat_history .cont_wr .chat_cont');
const scrollbar = document.querySelector('.nav_custom-scrollbar');
const thumb = document.querySelector('.nav_custom-scrollbar .scroll-thumb');

// 스크롤 thumb의 높이 조정 (콘텐츠의 비율에 따라)
const updateThumbHeight = () => {
  const contentHeight = content.scrollHeight;
  const containerHeight = content.clientHeight;
  const scrollRatio = containerHeight / contentHeight;

  // 스크롤바가 필요한지 확인 (스크롤이 생기는 경우만)
  if (contentHeight > containerHeight) {
    thumb.style.height = `${scrollRatio * 100}%`;
    scrollbar.style.display = 'block'; // 스크롤바 표시
  } else {
    scrollbar.style.display = 'none';  // 스크롤바 숨기기
  }
};

// 스크롤바 동작을 콘텐츠와 동기화
const syncScroll = (event) => {
  const thumbTop = parseInt(thumb.style.top, 10) || 0;
  const scrollRatio = content.scrollHeight / content.clientHeight;
  content.scrollTop = thumbTop * scrollRatio;
};

// 콘텐츠 스크롤 동작을 스크롤바와 동기화
const syncContentScroll = () => {
  const scrollRatio = content.clientHeight / content.scrollHeight;
  thumb.style.top = `${content.scrollTop * scrollRatio}px`;
};

// thumb 드래그 기능
thumb.addEventListener('mousedown', (event) => {
  const startY = event.pageY;
  const startTop = parseInt(thumb.style.top, 10) || 0;
  
  const onMouseMove = (moveEvent) => {
    const deltaY = moveEvent.pageY - startY;
    const newTop = Math.min(scrollbar.clientHeight - thumb.clientHeight, Math.max(0, startTop + deltaY));
    thumb.style.top = `${newTop}px`;
    syncScroll();
  };
  
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// 콘텐츠 스크롤 시 동기화
content.addEventListener('scroll', syncContentScroll);

// 초기 thumb 높이 설정
updateThumbHeight();

// 윈도우 리사이즈 시 thumb 높이 갱신
window.addEventListener('resize', updateThumbHeight);


//----------------------------------------------------------------------------------------
// 채팅 시작 영역 스크립트 - 체크박스 스트립트
// 모든 체크리스트 컨테이너를 선택
const checklistContainers = document.querySelectorAll('.sel_box');

// 각 컨테이너에 대해 독립적인 로직 적용
checklistContainers.forEach(container => {
    const checkAllBox = container.querySelector('.chk_all');
    const checkboxes = container.querySelectorAll('.chk_cont');

    // 전체 선택 기능
    checkAllBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;

        checkboxes.forEach((box) => {
            box.checked = isChecked; // 전체 선택 시 체크 상태 업데이트
            const li = box.closest('li');

            if (isChecked) {
                li.classList.add('checked'); // 체크 시 클래스 추가
                li.classList.add('type02');  // type02 클래스 추가
            } else {
                li.classList.remove('checked'); // 해제 시 클래스 제거
                li.classList.remove('type02');  // type02 클래스 제거
            }
        });

        // 전체 선택 li에 클래스 추가/제거
        const allLi = checkAllBox.closest('li');
        if (isChecked) {
            allLi.classList.add('checked'); // 전체 선택 체크 시 클래스 추가
        } else {
            allLi.classList.remove('checked'); // 전체 선택 해제 시 클래스 제거
        }
    });

    // 각각의 항목 체크 시 전체 선택 박스 및 클래스 업데이트
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const li = checkbox.closest('li');

            if (checkbox.checked) {
                li.classList.add('checked'); // 체크 시 클래스 추가
                li.classList.remove('type02'); // type02 클래스 제거
            } else {
                li.classList.remove('checked'); // 해제 시 클래스 제거
                li.classList.add('type02'); // type02 클래스 추가 (체크 해제시)
            }

            // 전체 선택 박스 상태 업데이트
            checkAllBox.checked = [...checkboxes].every(box => box.checked);

            // 전체 선택 체크박스가 체크된 경우
            if (checkAllBox.checked) {
                const allLi = checkAllBox.closest('li');
                allLi.classList.add('checked'); // 전체 선택 li에 클래스 추가
                checkboxes.forEach((box) => {
                    const li = box.closest('li');
                    li.classList.add('type02'); // 모든 나머지 li에 type02 추가
                });
            } else {
                const allLi = checkAllBox.closest('li');
                allLi.classList.remove('checked'); // 전체 선택 li에서 클래스 제거
            }

            // 전체 체크박스가 체크 해제될 경우 나머지 체크박스의 상태에 따라 class 업데이트
            checkboxes.forEach((box) => {
                const li = box.closest('li');
                if (!checkAllBox.checked) {
                    li.classList.remove('type02'); // 전체 체크가 아닌 경우 type02 제거
                    if (box.checked) {
                        li.classList.add('checked'); // 개별 체크박스가 체크된 경우 checked 추가
                    }
                }
            });
        });
    });
});
//----------------------------------------------------------------------------------------
// 채팅 영역 하단 채팅 입력 인풋 스타일 스크립트
const chatInput = document.querySelector('input[name="chat_send"]');
const sendBox = document.querySelector('.send_box');

chatInput.addEventListener('focus', () => {
    sendBox.classList.add('act');
});

chatInput.addEventListener('blur', () => {
    sendBox.classList.remove('act');
});
//----------------------------------------------------------------------------------------
// 채팅 영역 햄버거 메뉴 스크립트
const hamburgerMenu = document.querySelector('.ham_menu');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    
    document.body.classList.toggle('ham_act');
});
//----------------------------------------------------------------------------------------
// pdf 영역 관련 스크립트
const pdf_section = document.querySelector('section.chat_pdf');
if(pdf_section){
    document.querySelectorAll('.link_box .pdf_btn').forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
    
            pdf_section.classList.add('active');
            document.querySelector('body').classList.add('act_pdf');
        });
    });
    
    document.querySelector('.close_btn').addEventListener('click', function(event) {
        event.preventDefault();
    
        document.querySelector('section.chat_pdf').classList.remove('active');
        document.querySelector('body').classList.remove('act_pdf');
    });
}
//----------------------------------------------------------------------------------------
// 채팅 의견 말풍선 아이콘 인터렉션
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
//----------------------------------------------------------------------------------------
// 챗봇 팀 및 프로젝트 카운트 드롭박스
document.querySelectorAll('.chat_onchat .chat_hd .cont_wr .count_wr .count_box').forEach(function(countBox) {
    countBox.addEventListener('click', function(event) {
        event.preventDefault();

        this.closest('.count_wr').classList.toggle('act');
    });
});