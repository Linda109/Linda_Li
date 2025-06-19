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

document.addEventListener('mousemove', function(e) {
    // 1. 創建一個新的 div 元素
    const dot = document.createElement('div');
    dot.classList.add('mouse-trail-dot');
    document.body.appendChild(dot);

    // 2. 設定點的初始位置為滑鼠當前位置
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';

    // 3. 設定一個延時，讓點在一段時間後開始消失
    // 我們讓它在短暫顯示後，再將不透明度設為 0，觸發 CSS 的 transition 效果
    setTimeout(() => {
        dot.style.opacity = 0; // 開始淡出
        // 選擇性：讓點在消失時稍微縮小，增加動態感
        dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }, 50); // 這裡設定 50 毫秒後開始淡出

    // 4. 當淡出動畫結束後，將元素從 DOM 中移除，避免累積過多元素影響性能
    dot.addEventListener('transitionend', () => {
        dot.remove();
    });
});