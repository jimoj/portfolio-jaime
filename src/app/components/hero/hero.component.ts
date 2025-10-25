import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Macbook3DComponent } from '../macbook-3d/macbook-3d.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe, Macbook3DComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scene') sceneContainer!: ElementRef;
  @ViewChild('parallaxContainer') parallaxContainer!: ElementRef;

  scrollY = 0;
  parallaxOffset = 0;
  isModalOpen = false;
  
  technologies = [
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
    { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'ArgoCD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-original.svg' }
  ];
  


  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private geometry!: THREE.IcosahedronGeometry;
  private material!: THREE.MeshStandardMaterial;
  private mesh!: THREE.Mesh;
  private particles!: THREE.Points;
  private animationFrameId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;

  constructor() {}

  ngAfterViewInit() {
    this.initThreeJS();
    this.createParticles();
    this.animate();
    this.initParallax();
    this.initMouseMovement();

  }

  private initThreeJS() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(400, 400);
    this.renderer.setClearColor(0x000000, 0);
    this.sceneContainer.nativeElement.appendChild(this.renderer.domElement);

    // Crear geometría 3D principal
    this.geometry = new THREE.IcosahedronGeometry(1.5, 1);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    const directionalLight = new THREE.DirectionalLight(0x16a34a, 1);
    directionalLight.position.set(5, 5, 5);
    
    this.scene.add(ambientLight);
    this.scene.add(directionalLight);
    this.scene.add(this.mesh);

    this.camera.position.z = 5;
  }

  private createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x16a34a,
      transparent: true,
      opacity: 0.8
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }

  private animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Rotación del objeto principal
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.01;

    // Movimiento de partículas
    if (this.particles) {
      this.particles.rotation.x += 0.001;
      this.particles.rotation.y += 0.002;
    }

    // Efecto de mouse
    this.mesh.rotation.x += (this.mouseY * 0.0005);
    this.mesh.rotation.y += (this.mouseX * 0.0005);

    this.renderer.render(this.scene, this.camera);
  }



  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollY = window.scrollY;

    this.checkExperienceCards();
  }
  
  private checkExperienceCards() {
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;
      
      if (isVisible && !card.classList.contains('visible')) {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 200);
      }
    });
  }
  
  isCardVisible(index: number): boolean {
    if (typeof document === 'undefined') return false;
    const card = document.querySelectorAll('.experience-card')[index];
    return card ? card.classList.contains('visible') : false;
  }

  trackByTech(index: number, tech: any): string {
    return tech.name + index;
  }



  private initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      this.parallaxOffset = scrolled * -0.3;
    });
  }

  private initMouseMovement() {
    window.addEventListener('mousemove', (event) => {
      this.mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      this.mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    });
  }
  

  


  @HostListener('window:resize')
  onWindowResize() {
    if (this.camera && this.renderer) {
      this.renderer.setSize(400, 400);
    }
  }

  openImageModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeImageModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    
    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
    if (this.renderer) this.renderer.dispose();

    
    document.body.style.overflow = 'auto';
  }
}
