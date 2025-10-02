// 갤러리 이미지 데이터
const galleryImages = [
    {
        src: "./1.jpg",
        alt: "커플 사진"
    },
    {
        src: "./2.jpg",
        alt: "커플 사진"
    },
    {
        src: "./3.jpg",
        alt: "커플 사진"
    },
    {
        src: "./4.jpg",
        alt: "커플 사진"
    },
    {
        src: "./5.jpg",
        alt: "커플 사진"
    },
    {
        src: "./6.jpg",
        alt: "커플 사진"
    }
];

let currentImageIndex = 0;

// 결혼식 날짜 설정
const weddingDate = new Date('2024-12-25T14:00:00');

// 카운트다운 업데이트 함수
function updateCountdown() {
    const now = new Date();
    const difference = weddingDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        // 결혼식이 지난 경우
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
    }
}

// 갤러리 모달 열기
function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCounter = document.getElementById('modalCounter');

    modalImage.src = galleryImages[index].src;
    modalImage.alt = galleryImages[index].alt;
    modalTitle.textContent = galleryImages[index].alt;
    modalCounter.textContent = `${index + 1} / ${galleryImages.length}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 갤러리 모달 닫기
function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 다음 이미지
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openModal(currentImageIndex);
}

// 이전 이미지
function prevImage() {
    currentImageIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    openModal(currentImageIndex);
}

// 계좌번호 복사
function copyAccount(accountNumber, name) {
    navigator.clipboard.writeText(accountNumber).then(() => {
        showToast(`${name} 계좌번호가 복사되었습니다! 💝`);
    }).catch(() => {
        // 클립보드 API가 지원되지 않는 경우 대체 방법
        const textArea = document.createElement('textarea');
        textArea.value = accountNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`${name} 계좌번호가 복사되었습니다! 💝`);
    });
}

// 토스트 알림 표시
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 키보드 이벤트 처리
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('photoModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// 스크롤 애니메이션
function animateOnScroll() {
    const elements = document.querySelectorAll('.gallery-item, .account-item, .countdown-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 카운트다운 시작
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // 스크롤 애니메이션 초기화
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 초기 실행
    
    // 갤러리 아이템에 지연 애니메이션 추가
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // 계좌 아이템에 지연 애니메이션 추가
    const accountItems = document.querySelectorAll('.account-item');
    accountItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// 터치 스와이프 지원 (모바일)
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('photoModal').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('photoModal').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 왼쪽으로 스와이프 - 다음 이미지
            nextImage();
        } else {
            // 오른쪽으로 스와이프 - 이전 이미지
            prevImage();
        }
    }
}
