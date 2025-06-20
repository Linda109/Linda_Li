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
    //div容器
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
          root: null, //觀察整個視窗 (viewport)
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