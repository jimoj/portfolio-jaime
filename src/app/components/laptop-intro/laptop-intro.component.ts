import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laptop-intro',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="intro-overlay" [class.fade-out]="isComplete">
      <div class="laptop-animation">
        <div class="laptop" [class.step1]="step >= 1" [class.step2]="step >= 2" [class.step3]="step >= 3">
          <div class="laptop-base"></div>
          <div class="laptop-screen">
            <div class="screen-glow" [class.active]="step >= 3"></div>
            <div class="screen-content" [class.show]="step >= 3">
              <div class="logo">JJ</div>
              <div class="loading-bar">
                <div class="progress" [class.animate]="step >= 3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="intro-text" [class.show]="step >= 4">
        <h1>JAIME JIMÉNEZ</h1>
        <p>Full Stack Developer</p>
      </div>
    </div>
  `,
  styles: [`
    .intro-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle at center, #1a1a1a, #000);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 1.5s ease-out;
    }
    
    .fade-out {
      opacity: 0;
      pointer-events: none;
    }
    
    .laptop-animation {
      perspective: 1000px;
      margin-bottom: 3rem;
    }
    
    .laptop {
      position: relative;
      width: 300px;
      height: 200px;
      transform: scale(0.5) rotateX(20deg);
      transition: transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .laptop.step1 {
      transform: scale(0.8) rotateX(10deg);
    }
    
    .laptop.step2 {
      transform: scale(1) rotateX(0deg);
    }
    
    .laptop-base {
      width: 300px;
      height: 20px;
      background: linear-gradient(145deg, #e0e0e0, #a0a0a0);
      border-radius: 0 0 15px 15px;
      position: absolute;
      bottom: 0;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    .laptop-screen {
      width: 280px;
      height: 175px;
      background: #1a1a1a;
      border: 10px solid #2a2a2a;
      border-radius: 8px;
      position: absolute;
      top: 0;
      left: 10px;
      overflow: hidden;
      transform-origin: bottom center;
      transform: rotateX(-90deg);
      transition: transform 1.5s ease-out 1s;
    }
    
    .laptop.step2 .laptop-screen {
      transform: rotateX(0deg);
    }
    
    .screen-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle, rgba(34,197,94,0.1), transparent);
      opacity: 0;
      transition: opacity 1s ease-in;
    }
    
    .screen-glow.active {
      opacity: 1;
    }
    
    .screen-content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 1s ease-in;
    }
    
    .screen-content.show {
      opacity: 1;
    }
    
    .logo {
      font-size: 2.5rem;
      font-weight: bold;
      color: #16a34a;
      margin-bottom: 1rem;
      text-shadow: 0 0 20px rgba(34,197,94,0.5);
      animation: pulse 2s ease-in-out infinite;
    }
    
    .loading-bar {
      width: 150px;
      height: 4px;
      background: rgba(255,255,255,0.2);
      border-radius: 2px;
      overflow: hidden;
    }
    
    .progress {
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #16a34a, #22c55e);
      transition: width 2s ease-out;
    }
    
    .progress.animate {
      width: 100%;
    }
    
    .intro-text {
      text-align: center;
      color: white;
      opacity: 0;
      transform: translateY(20px);
      transition: all 1s ease-out;
    }
    
    .intro-text.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .intro-text h1 {
      font-size: 3rem;
      color: #16a34a;
      margin-bottom: 0.5rem;
      text-shadow: 0 0 30px rgba(34,197,94,0.3);
    }
    
    .intro-text p {
      font-size: 1.2rem;
      color: #888;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }
  `]
})
export class LaptopIntroComponent implements OnInit {
  @Output() animationComplete = new EventEmitter<void>();
  
  step = 0;
  isComplete = false;

  ngOnInit() {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      this.skipAnimation();
      return;
    }
    
    this.startAnimation();
  }

  private startAnimation() {
    setTimeout(() => this.step = 1, 500);
    setTimeout(() => this.step = 2, 1500);
    setTimeout(() => this.step = 3, 3000);
    setTimeout(() => this.step = 4, 4000);
    setTimeout(() => this.completeAnimation(), 6000);
  }

  private completeAnimation() {
    this.isComplete = true;
    localStorage.setItem('hasSeenIntro', 'true');
    
    setTimeout(() => {
      this.animationComplete.emit();
    }, 1000);
  }

  private skipAnimation() {
    this.animationComplete.emit();
  }
}