document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    initParticleEffect();
    initConfessionButton();
    initMusicPlayer();
});

function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const heartSymbols = ['❤️', '💕', '💗', '💖', '💓', '💝', '💘', '💞'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingHeart(container, heartSymbols);
        }, i * 400);
    }
    
    setInterval(() => {
        createFloatingHeart(container, heartSymbols);
    }, 2000);
}

function createFloatingHeart(container, symbols) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-100px';
    heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
    heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
    heart.style.animationDelay = '0s';
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

function initParticleEffect() {
    const container = document.getElementById('particleContainer');
    
    document.addEventListener('click', function(e) {
        createParticleHeart(e.clientX, e.clientY, container);
    });
}

function createParticleHeart(x, y, container) {
    const count = 15;
    const colors = ['#ff6b9d', '#ff8a80', '#ff4081', '#c2185b', '#f06292', '#ec407a', '#e91e63'];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-heart';
        particle.innerHTML = '❤️';
        
        const size = Math.random() * 20 + 10;
        const angle = (Math.PI * 2 / count) * i;
        const velocity = Math.random() * 150 + 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = size + 'px';
        particle.style.color = color;
        particle.style.transform = 'translate(-50%, -50%)';
        
        container.appendChild(particle);
        
        let startTime = null;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let posX = x;
        let posY = y;
        let opacity = 1;
        let rotation = 0;
        const gravity = 200;
        const friction = 0.98;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = (currentTime - startTime) / 1000;
            
            vy += gravity * elapsed;
            vx *= friction;
            vy *= friction;
            posX += vx * elapsed;
            posY += vy * elapsed;
            opacity -= elapsed * 0.5;
            rotation += elapsed * 360;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = Math.max(0, opacity);
            particle.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }
}

function initConfessionButton() {
    const btn = document.getElementById('confessionBtn');
    const messageContainer = document.getElementById('messageContainer');
    const confessionText = document.getElementById('confessionText');
    const fullscreenHeart = document.getElementById('fullscreenHeart');
    let isRevealed = false;
    
    btn.addEventListener('click', function() {
        if (!isRevealed) {
            isRevealed = true;
            
            btn.classList.add('hidden');
            messageContainer.classList.remove('hidden');
            
            confessionText.style.opacity = '1';
            confessionText.style.filter = 'blur(0px)';
            
            fullscreenHeart.classList.add('active');
            
            setTimeout(() => {
                fullscreenHeart.classList.remove('active');
            }, 3000);
        } else {
            fullscreenHeart.classList.add('active');
            
            setTimeout(() => {
                fullscreenHeart.classList.remove('active');
            }, 3000);
        }
    });
}

function initMusicPlayer() {
    const musicBtn = document.getElementById('musicBtn');
    const musicText = musicBtn.querySelector('.music-text');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    let hasAttemptedAutoPlay = false;
    
    // 尝试自动播放
    function tryAutoPlay() {
        if (!hasAttemptedAutoPlay) {
            hasAttemptedAutoPlay = true;
            // 先静音播放，提高成功率
            bgMusic.muted = true;
            bgMusic.volume = 1;
            bgMusic.play().then(() => {
                // 播放成功后取消静音
                setTimeout(() => {
                    bgMusic.muted = false;
                }, 100);
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicText.textContent = '暂停';
            }).catch(e => {
                console.log('自动播放被阻止，等待用户交互');
                bgMusic.muted = false;
            });
        }
    }
    
    // 页面加载后立即尝试
    window.addEventListener('load', tryAutoPlay);
    
    // 监听所有可能的用户交互事件
    const events = ['click', 'touchstart', 'mousedown', 'keydown', 'scroll'];
    events.forEach(event => {
        document.addEventListener(event, function() {
            if (!isPlaying && !hasAttemptedAutoPlay) {
                tryAutoPlay();
            } else if (!isPlaying && hasAttemptedAutoPlay) {
                // 如果之前失败了，再次尝试
                bgMusic.play().then(() => {
                    isPlaying = true;
                    musicBtn.classList.add('playing');
                    musicText.textContent = '暂停';
                }).catch(e => {});
            }
        }, { once: false, passive: true });
    });
    
    musicBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!isPlaying) {
            bgMusic.play().catch(e => console.log('播放失败:', e));
            isPlaying = true;
            musicBtn.classList.add('playing');
            musicText.textContent = '暂停';
        } else {
            bgMusic.pause();
            isPlaying = false;
            musicBtn.classList.remove('playing');
            musicText.textContent = '告白气球';
        }
    });
}