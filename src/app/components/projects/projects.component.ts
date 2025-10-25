import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  scrollY = 0;
  
  projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Plataforma completa de comercio electrónico con Angular, Node.js y MongoDB. Incluye sistema de pagos, gestión de inventario y panel administrativo.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Aplicación de gestión de tareas con funcionalidades avanzadas como colaboración en tiempo real, notificaciones y análisis de productividad.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Dashboard interactivo del clima con visualizaciones 3D, mapas interactivos y predicciones avanzadas usando APIs meteorológicas.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'Three.js', 'Chart.js', 'OpenWeather API'],
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Portfolio 3D',
      description: 'Portfolio personal con efectos 3D avanzados, animaciones parallax y experiencias interactivas inmersivas.',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop',
      technologies: ['Angular', 'Three.js', 'GSAP', 'Tailwind CSS'],
      github: '#',
      demo: '#',
      featured: false
    }
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollY = window.scrollY;
  }

  ngOnInit() {}

  get featuredProjects() {
    return this.projects.filter(p => p.featured);
  }

  get otherProjects() {
    return this.projects.filter(p => !p.featured);
  }
}