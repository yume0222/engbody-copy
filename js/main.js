// フェードイン
// 監視対象が範囲内に現れたら実行する動作
const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          translate: ['0 40px', 0],
        },
        {
          duration: 800,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      obs.unobserve(entry.target);
    }
  });
};
// 監視ロボットの設定
const options = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0,
};
const fadeObserver = new IntersectionObserver(animateFade, options);
// 監視するように指示
const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});

// Header
const header = document.querySelector('#header');
const btn = document.querySelector('.btn.header__btn');
window.addEventListener('scroll', () => {
  if(window.scrollY > 200) {
    header.classList.add('active');
    btn.classList.add('active');
  } else {
    header.classList.remove('active');
    btn.classList.remove('active');
  }
});

// Mainvisual
const checkTrigger = (selector, className) => {
  const triggers = document.querySelectorAll(selector);
  const scroll = window.scrollY;
  const windowHeight = window.innerHeight;
  triggers.forEach(trigger => {
    const elemPos = trigger.getBoundingClientRect().top + scroll - 50;
    if (scroll >= elemPos - windowHeight) {
      trigger.classList.add(className);
    } else {
      trigger.classList.remove(className);
    }
  });
};
// イベントハンドラ
const handleScrollOrLoad = () => {
  checkTrigger('.bgLRextendTrigger', 'bgLRextend');
  checkTrigger('.bgappearTrigger', 'bgappear');
};
// スクロール時、読み込み時
window.addEventListener('scroll', handleScrollOrLoad);
window.addEventListener('load', handleScrollOrLoad);

// タブメニュー
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabs__item');
  const bodies = document.querySelectorAll('.tabs__body');
  tabs.forEach(function(tab, index) {
    tab.addEventListener('click', () => {
      // タブのアクティブ切り替え
      document.querySelector('.tabs__item.is-active').classList.remove('is-active');
      tab.classList.add('is-active');
      // コンテンツの表示切り替え
      document.querySelector('.tabs__body.is-display').classList.remove('is-display');
      bodies[index].classList.add('is-display');
      bodies[index].animate(
        {
          opacity: [0, 1],
          translate: ['0 40px', 0],
        },
        {
          duration: 800,
          easing: 'ease',
          fill: 'forwards',
        }
      );
    });
  });
});

// Swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  // ぺジネーションとナビゲーション
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// スクロール
const priceList = document.querySelector('.price__list');
const priceScroll = document.querySelector('.price__scroll');
priceList.addEventListener('scroll', () => {
  if (priceList.scrollLeft > 20) {
    priceScroll.style.transition = 'opacity .3s ease';
    priceScroll.style.opacity = '0';
    setTimeout(() => {
      priceScroll.style.display = 'none';
    }, 300);
  }
});

// アコーディオンメニュー
const questions = document.querySelectorAll('.faq__question');
const PADDING_BOTTOM = 15;
// 高さを設定
function setAnswerHeight(answer) {
  const inner = answer.querySelector('.faq__answer-inner');
  answer.style.height = inner.scrollHeight + PADDING_BOTTOM + 'px';
}
// 閉じる
function closeAnswer(answer) {
  answer.style.height = answer.scrollHeight + 'px';
  requestAnimationFrame(() => {
    answer.style.height = '0';
  });
}
// クリックイベント
questions.forEach((question) => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isActive = answer.classList.contains('active');
    if (!isActive) {
      setAnswerHeight(answer);
      answer.classList.add('active');
      question.classList.add('active');
    } else {
      closeAnswer(answer);
      answer.classList.remove('active');
      question.classList.remove('active');
    }
  });
});
// 読み込み時
window.addEventListener('resize', () => {
  questions.forEach((question) => {
    const answer = question.nextElementSibling;
    if (answer.classList.contains('active')) {
      setAnswerHeight(answer);
    }
  });
});

// トップへ戻る
const toTop = document.querySelector('#to-top');
window.addEventListener('scroll', () => {
  if(window.scrollY > 300) {
    toTop.classList.add('show');
  } else {
    toTop.classList.remove('show');
  }
});