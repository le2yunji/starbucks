const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top'); 


// 윈도우 객체. 윈도우 창. 우리가 보고있는 화면 자체
// 화면이 스크롤되면 핸들러를 실행하겠다.
// 화면을 스크롤하면 함수가 수십 개가 한 번에 실행되는데 화면이 무거워지면 부하가 걸리면서 화면이 버벅거리게됨. 
// 이를 막기 위해 throttle 이라는 로데시에서 제공하는 특정한 기능을 통해 0.3초 단위로 부하를 줌. 함수가 일정시간에 한 번만 실행되도록 하는 것. 스크롤 이벤트를 통해 작업을 할 때 많이 사용됨.
// _.throttle(함수, 시간)
window.addEventListener('scroll', _.throttle(function(){
    console.log(window.scrollY);
    if (window.scrollY > 500){
        // 배지 숨기기
        // gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0 ,
            display: 'none'
        });
        // 위로 올라가기 버튼 보이기
        gsap.to('#to-top', .2, {     // 변수에 요소를 찾아서 넣어도 되지만, css 선택자를 바로 입력해도 찾아줌.
            x: 0
        }); 
    } else {
        // 배지 보이기
        gsap.to(badgeEl, .6, {
            opacity: 1 , 
            display: 'block'
        });
         // 위로 올라가기 버튼 숨기기
        gsap.to(toTopEl, .2, {       // 아래 코드 때문에 toTopEl 요소를 찾았기 때문에 선택자로 써서 또 찾게 하는 건 비효율적임.
            x: 100
        }); 
    }
},300));

toTopEl.addEventListener('click', function(){
    gsap.to(window, .7, {
        scrollTo: 0  // 화면의 위치를 0.7초 동안 0 픽셀 지점으로 옮겨주겠다. html파일에 플러그인 연결해야 쓸 수 있음.
    });
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl , index){
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index+1) * .7 , // 0.7 , 1.4, 2.1, 2.7
        opacity: 1
    });
});

// new Swiper(선택자, 옵션);
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical' , 
    autoplay: true ,
    loop: true 
});

// direction: 'horizontal'  기본값으로 들어있음.
new Swiper('.promotion .swiper-container', {
    slidesPerView: 3 , // 한 번에 보여줄 슬라이드 개수
    spaceBetween: 10 ,  // 슬라이드 사이 여백
    centeredSlides: true, //1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination' , // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    } 
});
new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
});



const promotionEl = document.querySelector('.promotion'); // promotion 이라는 클래스를 가진 요소를 찾아서 promotionEl라는 변수에 할당
const promotionToggleBtn = document.querySelector('.toogle-promotion'); // toogle-promotion이라는 클래스를 가진 요소를 찾아서 promotionToggleBtn 이라는 변수에 할당
let isHidePromotion = false; // promotion 영역이 숨겨졌니? 라는 이름을 가진 변수가 false이므로 처음엔 안 숨겨져 있음.
promotionToggleBtn.addEventListener('click', function () {  // promotionToggleBtn 버튼을 클릭하면 함수가 실행 됨.
    isHidePromotion = !isHidePromotion // isHidePromotion에 반대값을 할당
    if (isHidePromotion) {
        // 숨김처리
        promotionEl.classList.add('hide');  // promotionEl에 hide 라는 클래스 추가 -> css 에서 hide 키워드로 제어해주면 됨.
    }else{
        // 보임처리
        promotionEl.classList.remove('hide'); // promotionEl에 hide 라는 클래스 삭제
    }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }
function floatingObject(selector,delay, size) {
    //gsap.to(요소, 시간, 옵션);
    gsap.to(
        selector, // 선택자
        random(1.5, 2.5), // 애니메이션 동작 시간
        { // 옵션
            y: size,   // 요소가 위에서 아래로 내려옴
            repeat: -1, // 무한반복
            yoyo: true, // 위아래로 반복
            ease:Power1.easeInOut,
            delay: random(0, delay)
        }
    );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating1', .5, 15);
floatingObject('.floating1', 1.5, 20);


const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, // 보여짐의 여부를 감시할 요소를 지정
            triggerHook: .8 // 뷰포트의 처음 0 부터 끝 1 . 0.8지점에 걸려서 아래 메소드 실행
        })
        .setClassToggle(spyEl,'show')
        .addTo(new ScrollMagic.Controller());
});

