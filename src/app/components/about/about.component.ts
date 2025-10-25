import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  scrollY = 0;
  
  skills = [
    { name: 'Angular', level: 90, color: 'from-red-500 to-red-600' },
    { name: 'React', level: 85, color: 'from-blue-500 to-blue-600' },
    { name: 'Node.js', level: 88, color: 'from-green-500 to-green-600' },
    { name: 'TypeScript', level: 92, color: 'from-blue-400 to-blue-500' },
    { name: 'Python', level: 80, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Three.js', level: 75, color: 'from-purple-500 to-purple-600' }
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollY = window.scrollY;
  }

  ngOnInit() {}
}