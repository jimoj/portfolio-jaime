import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laptop-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laptop-intro.component.html',
  styleUrl: './laptop-intro.component.scss'
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
    setTimeout(() => this.step = 5, 5500);
    setTimeout(() => this.completeAnimation(), 7500);
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