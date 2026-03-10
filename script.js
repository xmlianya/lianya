/**
 * 厦门联雅广告官网 - 主交互脚本
 * 功能：灰色粒子背景、导航、表单、滚动动画
 */

// 页面加载完成后执行
window.onload = function() {

    // ==================== 1. 初始化灰色粒子背景 ====================
    function initParticles() {
        if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 70, "density": { "enable": true, "value_area": 1000 } },
                    "color": { "value": "#888888" }, // 灰色粒子
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.4, "random": true },
                    "size": { "value": 2.5, "random": true },
                    "line_linked": {
                        "enable": true,
                        "distance": 130,
                        "color": "#666666", // 灰色连接线
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": { "enable": true, "speed": 4, "direction": "none", "out_mode": "out" }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": { "enable": true, "mode": "repulse" },
                        "onclick": { "enable": true, "mode": "push" },
                        "resize": true
                    }
                },
                "retina_detect": true
            });
            console.log('灰色粒子背景初始化成功。');
        } else {
            console.warn('粒子背景库未加载，将显示纯色背景。');
        }
    }

    // ==================== 2. 移动端导航菜单切换 ====================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
        // 点击菜单项后关闭菜单
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ==================== 3. 导航栏滚动效果 ====================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.backdropFilter = 'blur(15px)';
                navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
            } else {
                navbar.style.background = 'rgba(18, 18, 18, 0.92)';
                navbar.style.backdropFilter = 'blur(12px)';
                navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
            }
        }
    });

    // ==================== 4. 表单提交处理 ====================
    const consultForm = document.getElementById('consultForm');
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#name').value.trim();
            const phone = this.querySelector('#phone').value.trim();
            const message = this.querySelector('#message').value.trim();

            if (!name || !phone || !message) {
                alert('请填写所有带 * 的必填字段！');
                return;
            }

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('咨询请求发送成功！\n\n感谢您的信任，我们的品牌顾问将在24小时内通过您留下的联系方式与您沟通。');
                consultForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ==================== 5. 滚动动画 - 元素进入视口时淡入 ====================
    const observerOptions = { threshold: 0.08, rootMargin: '0px 0px -60px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    // 观察需要动画的元素
    document.querySelectorAll('.service-card, .portfolio-item, .about-text, .about-poster, .contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });

    // ==================== 6. 更新页脚版权年份 (同步修改起始年份) ====================
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // ==================== 执行初始化函数 ====================
    initParticles();
    console.log('网站脚本加载完成。');
};

// 为CSS滚动动画添加一个简单的类
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .service-card, .portfolio-item, .about-text, .about-poster, .contact-info, .contact-form {
        opacity: 0;
    }
`;
document.head.appendChild(style);