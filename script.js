/**
 * Royal Telugu Wedding Invitation Microsite Logic
 * Couple: Krishna Deepak & Sindhu Sri
 * Target Date: June 28, 2026, 8:49 AM
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Persistent Audio & Temple Doors Opening
       ========================================== */
    const divineStartBtn = document.getElementById('divineStartBtn');
    const divineStartContainer = document.getElementById('divineStartContainer');
    const walkingLordWrapper = document.getElementById('walkingLordWrapper');
    const divineSpeechBubble = document.getElementById('divineSpeechBubble');
    const doorsWrapper = document.getElementById('templeDoorsWrapper');
    const mainContent = document.getElementById('mainScrollContainer');
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggleBtn');
    const musicText = musicBtn.querySelector('.music-text');
    let isMusicPlaying = false;
    let audioCtx = null;

    // A beautiful brass temple bell sound synthesizer using Web Audio API
    const playTempleBellSound = () => {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const frequencies = [300, 440, 550, 770, 920];
            const now = audioCtx.currentTime;
            
            frequencies.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                
                gainNode.gain.setValueAtTime(idx === 0 ? 0.35 : 0.15, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 3.5 - (idx * 0.4));
                
                osc.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                osc.start(now);
                osc.stop(now + 3.5);
            });
        } catch (e) {
            console.warn("Web Audio API not supported or blocked:", e);
        }
    };

    // Open Door Action Sequence
    const runDivineIntroSequence = () => {
        // 1. Hide Start Button
        if (divineStartContainer) {
            divineStartContainer.style.opacity = '0';
            divineStartContainer.style.pointerEvents = 'none';
        }
        
        // 2. Play background music
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.add('playing');
            musicText.innerText = "Pause Music";
        }).catch(err => {
            console.log("Autoplay policy restriction:", err);
        });

        // 3. Start Lord Venkateswara walking (after button fades slightly)
        setTimeout(() => {
            if (walkingLordWrapper) {
                walkingLordWrapper.classList.add('walking');
            }
        }, 500);

        // 4. walkingLordWrapper completes walking at 3.5s -> play bells and show announcement bubble
        setTimeout(() => {
            playTempleBellSound();
            if (divineSpeechBubble) {
                divineSpeechBubble.classList.add('bubble-active');
            }
        }, 4000);

        // 5. Hide bubble, fade out lord, and slide open the temple doors at 7.5s
        setTimeout(() => {
            if (divineSpeechBubble) {
                divineSpeechBubble.classList.remove('bubble-active');
            }
            if (walkingLordWrapper) {
                walkingLordWrapper.style.opacity = '0';
                walkingLordWrapper.style.transform = 'translate(-50%, -45%) scale(0.6)';
            }
            
            // Slide open doors
            doorsWrapper.classList.add('open');
            mainContent.classList.remove('hidden-content');
            mainContent.classList.add('visible-content');

            // Fade in Hero content
            setTimeout(() => {
                const heroReveals = document.querySelectorAll('.hero-content .scroll-reveal');
                heroReveals.forEach(element => {
                    element.classList.add('visible');
                });
            }, 300);
        }, 7500);

        // 6. Completely hide doors wrapper at 9.7s
        setTimeout(() => {
            doorsWrapper.style.display = 'none';
        }, 9700);
    };

    if (divineStartBtn) {
        divineStartBtn.addEventListener('click', runDivineIntroSequence);
    }

    musicBtn.addEventListener('click', () => {
        if (!isMusicPlaying) {
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicBtn.classList.add('playing');
                musicText.innerText = "Pause Music";
            }).catch(err => {
                console.warn("Audio play failed:", err);
            });
        } else {
            bgMusic.pause();
            isMusicPlaying = false;
            musicBtn.classList.remove('playing');
            musicText.innerText = "Play Music";
        }
    });


    /* ==========================================
       2. Floating Countdown Pill & Scroll Observer
       ========================================== */
    const countdownPill = document.getElementById('floatingCountdownPill');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            countdownPill.classList.add('visible');
        } else {
            countdownPill.classList.remove('visible');
        }
    });

    countdownPill.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ==========================================
       3. Live Countdown Timers (Universal ISO Format)
       ========================================== */
    // Target date set in standard ISO 8601 format to support Safari/iOS fully in real time
    const targetDate = new Date('2026-06-28T08:49:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const dVal = document.getElementById('days');
        const hVal = document.getElementById('hours');
        const mVal = document.getElementById('minutes');
        const sVal = document.getElementById('seconds');

        const fdVal = document.getElementById('f-days');
        const fhVal = document.getElementById('f-hours');
        const fmVal = document.getElementById('f-minutes');
        const fsVal = document.getElementById('f-seconds');

        const pillText = document.getElementById('pillCountdownText');

        if (difference < 0) {
            const zero = "00";
            if (dVal) dVal.innerText = zero;
            if (hVal) hVal.innerText = zero;
            if (mVal) mVal.innerText = zero;
            if (sVal) sVal.innerText = zero;
            
            if (fdVal) fdVal.innerText = zero;
            if (fhVal) fhVal.innerText = zero;
            if (fmVal) fmVal.innerText = zero;
            if (fsVal) fsVal.innerText = zero;

            if (pillText) pillText.innerText = "Just Married! ❤️";
            document.querySelector('.hero-quote').innerText = "Congratulations to the royal couple Krishna & Sindhu!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const padZero = (num) => num < 10 ? `0${num}` : num;

        if (dVal) dVal.innerText = padZero(days);
        if (hVal) hVal.innerText = padZero(hours);
        if (mVal) mVal.innerText = padZero(minutes);
        if (sVal) sVal.innerText = padZero(seconds);

        if (fdVal) fdVal.innerText = padZero(days);
        if (fhVal) fhVal.innerText = padZero(hours);
        if (fmVal) fmVal.innerText = padZero(minutes);
        if (fsVal) fsVal.innerText = padZero(seconds);

        if (pillText) {
            if (days > 0) {
                pillText.innerText = `${days} Days Left ⏳`;
            } else if (hours > 0) {
                pillText.innerText = `${hours} Hours Left ⏳`;
            } else {
                pillText.innerText = "Sumuhurtam Today! ⏳";
            }
        }
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    document.getElementById('openInvitationBtn').addEventListener('click', () => {
        document.getElementById('couple').scrollIntoView({ behavior: 'smooth' });
    });

    const scrollIndicator = document.getElementById('scrollDownIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('couple').scrollIntoView({ behavior: 'smooth' });
        });
    }


    /* ==========================================
       4. Visual Scroll-Triggered Reveal System
       ========================================== */
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const jeelakarraBlock = document.querySelector('.jeelakarra-merge-animation');
    const sumuhurtamCard = document.getElementById('sumuhurtamDivineSection');
    let hasPlayedSumuhurtamBell = false;
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.12)) {
                displayScrollElement(el);
            }
        });

        if (jeelakarraBlock && elementInView(jeelakarraBlock, 1.2)) {
            jeelakarraBlock.classList.add('merged');
        }

        if (sumuhurtamCard && elementInView(sumuhurtamCard, 1.15)) {
            sumuhurtamCard.classList.add('divine-active');
            if (!hasPlayedSumuhurtamBell) {
                hasPlayedSumuhurtamBell = true;
                playTempleBellSound();
            }
        }
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();


    /* ==========================================
       5. Auto-Reveal Scratch Card Engine (Google Pay Style)
       ========================================== */
    const initScratchCards = () => {
        for (let i = 1; i <= 3; i++) {
            const canvas = document.getElementById(`scratchCanvas${i}`);
            if (!canvas) continue;
            
            const ctx = canvas.getContext('2d');
            let isRevealed = false;
            
            const resizeCanvas = () => {
                const parent = canvas.parentElement;
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                drawFoil();
            };
            
            const drawFoil = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                grad.addColorStop(0, '#BF953F');
                grad.addColorStop(0.25, '#FCF6BA');
                grad.addColorStop(0.5, '#B38728');
                grad.addColorStop(0.75, '#FBF5B7');
                grad.addColorStop(1, '#AA771C');
                
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.lineWidth = 2;
                ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
                
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
                ctx.lineWidth = 1;
                ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
                
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, 45, 0, Math.PI * 2);
                ctx.stroke();

                ctx.font = 'bold 0.8rem "Cinzel", serif';
                ctx.fillStyle = '#4A0010';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
                ctx.shadowBlur = 4;
                ctx.fillText('TAP TO REVEAL', canvas.width / 2, canvas.height / 2);
                
                ctx.shadowBlur = 0;
            };
            
            const triggerAutoReveal = () => {
                if (isRevealed) return;
                isRevealed = true;
                
                canvas.style.opacity = '0';
                canvas.style.transform = 'scale(1.06)';
                
                setTimeout(() => {
                    canvas.style.display = 'none';
                }, 800);
            };
            
            canvas.addEventListener('mousedown', triggerAutoReveal);
            canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                triggerAutoReveal();
            }, { passive: false });
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
        }
    };
    
    initScratchCards();


    /* ==========================================
       6. Falling Flower Petals & Gold Dust Canvas
       ========================================== */
    const particleCanvas = document.getElementById('particleCanvas');
    const pCtx = particleCanvas.getContext('2d');
    
    let pList = [];
    const maxParticles = window.innerWidth < 768 ? 40 : 90; 

    const resizeParticleCanvas = () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeParticleCanvas);
    resizeParticleCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * particleCanvas.width;
            this.type = Math.random() < 0.4 ? 'gold' : 'petal';
            
            if (this.type === 'gold') {
                this.y = particleCanvas.height + Math.random() * 40;
                this.size = Math.random() * 2 + 0.5;
                this.speedY = -(Math.random() * 0.6 + 0.2);
                this.speedX = Math.random() * 0.4 - 0.2;
                this.alpha = Math.random() * 0.6 + 0.15;
            } else {
                this.y = -Math.random() * 40;
                this.size = Math.random() * 7 + 4;
                this.speedY = Math.random() * 0.8 + 0.4;
                this.speedX = Math.random() * 0.6 - 0.3;
                this.alpha = Math.random() * 0.7 + 0.3;
                this.rotation = Math.random() * 360;
                this.rotSpeed = Math.random() * 2 - 1;
                this.petalColor = Math.random() < 0.65 ? 'marigold' : 'rose';
            }

            this.swayAngle = Math.random() * Math.PI * 2;
            this.swaySpeed = Math.random() * 0.015 + 0.005;
        }

        update() {
            this.swayAngle += this.swaySpeed;
            
            if (this.type === 'gold') {
                this.y += this.speedY;
                this.x += Math.sin(this.swayAngle) * 0.25 + this.speedX;
                if (this.y < 120) this.alpha -= 0.008;
            } else {
                this.y += this.speedY;
                this.x += Math.sin(this.swayAngle) * 0.4 + this.speedX;
                this.rotation += this.rotSpeed;
                if (this.y > particleCanvas.height - 120) this.alpha -= 0.008;
            }

            if (this.alpha <= 0 || this.y < -30 || this.y > particleCanvas.height + 30 || this.x < -20 || this.x > particleCanvas.width + 20) {
                this.reset();
            }
        }

        draw() {
            pCtx.save();
            pCtx.globalAlpha = this.alpha;
            
            if (this.type === 'gold') {
                pCtx.beginPath();
                pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                pCtx.fillStyle = '#D4AF37';
                pCtx.shadowBlur = this.size * 2.5;
                pCtx.shadowColor = '#FCF6BA';
                pCtx.fill();
            } else {
                pCtx.translate(this.x, this.y);
                pCtx.rotate((this.rotation * Math.PI) / 180);
                pCtx.beginPath();
                pCtx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
                
                if (this.petalColor === 'marigold') {
                    pCtx.fillStyle = '#F4B400';
                    pCtx.strokeStyle = '#D4AF37';
                } else {
                    pCtx.fillStyle = '#C2185B';
                    pCtx.strokeStyle = '#880E4F';
                }
                
                pCtx.lineWidth = 0.5;
                pCtx.fill();
                pCtx.stroke();
            }
            
            pCtx.restore();
        }
    }

    for (let k = 0; k < maxParticles; k++) {
        const pNode = new Particle();
        pNode.y = Math.random() * particleCanvas.height;
        pList.push(pNode);
    }

    const runParticleLoop = () => {
        pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        pList.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(runParticleLoop);
    };

    runParticleLoop();


    /* ==========================================
       7. Dynamic WhatsApp RSVP Link & Share Generation
       ========================================== */
    const destinationPhone = '919346074685';
    const rsvpBtn = document.getElementById('whatsappRsvpBtn');
    if (rsvpBtn) {
        const rsvpMessage = "Namaskaram Krishna Deepak & Sindhu Sri, I have received your royal wedding invitation. I am happy to confirm my presence! 🌸✨\n\nName: [Your Name]\nNo. of Guests: [Number of Guests]\nEvents attending: [All / Wedding / Sangeet / Haldi]";
        const rsvpEncoded = encodeURIComponent(rsvpMessage);
        rsvpBtn.setAttribute('href', `https://api.whatsapp.com/send?phone=${destinationPhone}&text=${rsvpEncoded}`);
    }

    const shareBtn = document.getElementById('shareInvitationBtn');
    if (shareBtn) {
        const currentUrl = window.location.href;
        const shareMessage = "Namaskaram! 🌸\nWe cordially invite you to celebrate the royal union of Krishna Deepak & Sindhu Sri. Please find our wedding invitation microsite below to view the details and confirm your presence:\n\n" + currentUrl;
        const shareEncoded = encodeURIComponent(shareMessage);
        shareBtn.setAttribute('href', `https://api.whatsapp.com/send?text=${shareEncoded}`);
    }

});
