let currentIndex = 0;
const images = document.querySelectorAll('.carousel-images img');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const carouselImages = document.querySelector('.carousel-images');

// 用来控制播放的方向，默认正向播放
let isReversed = false;
let loopCount = 0;  // 用来记录轮播的次数

// 切换到指定图片
function updateCarousel() {
  // 更新轮播图位置
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;

  // 更新圆点
  dots.forEach(dot => dot.classList.remove('active-dot'));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add('active-dot');
  }
}

// 上一张图片
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  updateCarousel();
});

// 下一张图片
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

// 点击小圆点
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

// 自动播放轮播图
function autoPlay() {
  setInterval(() => {
    // 如果是反向播放，currentIndex递减
    if (isReversed) {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    } else {
      // 正向播放
      currentIndex = (currentIndex + 1) % images.length;
    }

    // 更新轮播
    updateCarousel();

    // 增加轮播次数
    loopCount++;

    // 每三次轮播后，反转播放方向
    if (loopCount >=2) {
      isReversed = !isReversed; // 反向播放
      loopCount = 0; // 重置计数器，开始下一轮
    }
  }, 3000); // 每3秒切换一次图片
}

// 初始化自动播放
autoPlay();

// 添加过渡动画效果
carouselImages.style.transition = 'transform 0.5s ease'; // 设置平滑过渡效果
