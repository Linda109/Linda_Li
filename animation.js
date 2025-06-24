function toggleMenu() {
    const menu = document.getElementById('selectname');
    menu.classList.toggle('active2');
}
/* top按鈕*/
window.onscroll = function () {
  const top = document.getElementById("top");
  if (window.scrollY > 200) {
    top.classList.add("show");
  } else {
    top.classList.remove("show");
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
/* 選單*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
/* 滑鼠效果*/
document.addEventListener('mousemove', function(e) {

    const dot = document.createElement('div');
    dot.classList.add('mouse-trail-dot');
    document.body.appendChild(dot);

    //滑鼠初始位置
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';

    //一段時間後開始消失
    //我們讓它在短暫顯示後，再將不透明度設為0，觸發transition 效果
    setTimeout(() => {
        dot.style.opacity = 0; //淡出
        //選擇性：讓點在消失時稍微縮小，增加動態感
        dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }, 50); // 這裡設定 50 毫秒後開始淡出

    //當淡出動畫結束後，將元素從DOM中移除，避免累積過多元素影響性能
    dot.addEventListener('transitionend', () => {
        dot.remove();
    });
});
/* eduation動畫*/
document.addEventListener('DOMContentLoaded', () => {
    const eduTableCells = document.querySelectorAll('.edu-table td');
    const thesisSection = document.querySelector('.Thesis');
    if(eduTableCells.length > 0 ){
        const observerOptions = {
          root: null, //觀察整個視窗(viewport)
          rootMargin: '0px',
          threshold: 0.5 //當元素有10%進入視窗時觸發
      };

      const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('active');
                  observer.unobserve(entry.target);
              }
          });
      }, observerOptions);

      //觀察每一個 .edu-table td 元素
      eduTableCells.forEach(cell => {
          observer.observe(cell);
      });
    }
    if(thesisSection){
      const thesisObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
      };
      const thesisObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, thesisObserverOptions);
        thesisObserver.observe(thesisSection);
    }
});

/*投影片效果 */
let slideIndexes = {
    "slideshow1": 1,
    "slideshow2": 1,
    "slideshow3": 1,
    "slideshow4": 1,
    "slideshow5": 1,
};

//儲存每個自動播放計時器的ID，以便我們可以控制它們(例如暫停或停止)
let autoPlayIntervals = {};

//初始化顯示所有投影片容器的第一張投影片，並自動播放
document.addEventListener('DOMContentLoaded', () => {
    for (let id in slideIndexes) {
        showSlides(id, slideIndexes[id]);
    }

    // 啟動自動播放
    startAutoSlideshow("slideshow1", 4000);
    startAutoSlideshow("slideshow2", 5000);
    startAutoSlideshow("slideshow3", 4500);
    startAutoSlideshow("slideshow4", 5500);
    startAutoSlideshow("slideshow5", 5200);
    //投影片內圖片的點擊事件監聽器，實現放大效果
    const allSlideImages = document.querySelectorAll('.mySlides img');
    allSlideImages.forEach(img => {
        img.addEventListener('click', function() {
            openFullscreen(this.src); // 點擊圖片時呼叫 openFullscreen 函數
        });
    });
});
/**
 * 處理投影片的切換（上一張/下一張）
 * @param {string} slideshowId - 要操作的投影片容器的ID
 * @param {number} n - 1 表示下一張，-1 表示上一張
 */
function plusSlides(slideshowId, n) {
    slideIndexes[slideshowId] += n;
    showSlides(slideshowId, slideIndexes[slideshowId]);
}
/**
 * 處理圓點導航，直接跳轉到指定投影片
 * @param {string} slideshowId - 要操作的投影片容器的ID
 * @param {number} n - 要跳轉到的投影片索引 (從 1 開始)
 */
function currentSlide(slideshowId, n) {
    slideIndexes[slideshowId] = n;
    showSlides(slideshowId, slideIndexes[slideshowId]);
}
/**
 * 顯示指定投影片容器的特定投影片
 * @param {string} slideshowId - 要操作的投影片容器的ID
 * @param {number} n - 要顯示的投影片索引 (從 1 開始)
 */
function showSlides(slideshowId, n) {
    let i;
    let slideshowContainer = document.getElementById(slideshowId);
    if (!slideshowContainer) return; //如果容器不存在，則退出

    let slides = slideshowContainer.getElementsByClassName("mySlides");
    let dotsContainer = slideshowContainer.querySelector(".dot-container");
    let dots = dotsContainer ? dotsContainer.getElementsByClassName("dot") : [];

    if (n > slides.length) {
        slideIndexes[slideshowId] = 1;
    }
    if (n < 1) {
        slideIndexes[slideshowId] = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active1", "");
    }

    slides[slideIndexes[slideshowId]-1].style.display = "block";
    if (dots[slideIndexes[slideshowId]-1]) {
        dots[slideIndexes[slideshowId]-1].className += " active1";
    }
}
/**
 * 啟動指定投影片容器的自動播放功能
 * @param {string} slideshowId - 要自動播放的投影片容器的ID
 * @param {number} intervalTime - 自動切換的時間間隔 (毫秒)
 */
function startAutoSlideshow(slideshowId, intervalTime = 3000) {
    // 如果已經有計時器，先清除，防止重複啟動
    if (autoPlayIntervals[slideshowId]) {
        clearInterval(autoPlayIntervals[slideshowId]);
    }
    autoPlayIntervals[slideshowId] = setInterval(function() {
        plusSlides(slideshowId, 1);
    }, intervalTime);
}

/**
 * **打開全螢幕疊加層並顯示放大的圖片**
 * @param {string} imgSrc - 要顯示的圖片的src屬性
 */
function openFullscreen(imgSrc) {
    const overlay = document.getElementById('fullscreenOverlay');
    const fullscreenImage = document.getElementById('fullscreenImage');

    fullscreenImage.src = imgSrc; // 設定圖片來源
    overlay.style.display = 'flex'; // 顯示疊加層 (CSS 會讓它居中)
    // 給予一個小延遲來觸發 CSS 過渡動畫，讓圖片有縮放進來的效果
    setTimeout(() => {
        overlay.classList.add('active3');
    }, 10);
}

/**
 * **關閉全螢幕疊加層**
 */
function closeFullscreen() {
    const overlay = document.getElementById('fullscreenOverlay');
    overlay.classList.remove('active3');

    // 等待動畫完成後再真正隱藏疊加層，避免動畫被截斷
    setTimeout(() => {
        overlay.style.display = 'none';
        const fullscreenImage = document.getElementById('fullscreenImage');
        fullscreenImage.src = '';
    }, 300);// 這裡的時間應與 CSS 的 transition-duration (0.3s) 相匹配
}