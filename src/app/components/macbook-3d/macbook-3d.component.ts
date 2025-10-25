import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';
import { gsap } from 'gsap';

@Component({
  selector: 'app-macbook-3d',
  standalone: true,
  template: `<div #macbookContainer class="macbook-3d-container"></div>`,
  styles: [`
    .macbook-3d-container {
      position: fixed;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%);
      z-index: 20;
      pointer-events: none;
    }
    .macbook-3d-container canvas {
      border: none !important;
      outline: none !important;
      background: transparent !important;
      box-shadow: none !important;
    }
  `]
})
export class Macbook3DComponent implements AfterViewInit, OnDestroy {
  @ViewChild('macbookContainer') container!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private macbookGroup!: THREE.Group;
  private animationId: number | null = null;
  private isVisible = false;

  ngAfterViewInit() {
    this.initScene();
    this.createMacbook();
    this.animate();
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(300, 300);
    this.renderer.setClearColor(0x000000, 0);
    
    this.renderer.domElement.style.cssText = `
      border: none !important;
      outline: none !important;
      background: transparent !important;
      box-shadow: none !important;
      margin: 0 !important;
      padding: 0 !important;
    `;
    
    this.container.nativeElement.appendChild(this.renderer.domElement);
  }

  private createMacbook() {
    this.macbookGroup = new THREE.Group();
    
    // Base (Space Gray)
    const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2.1);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x5d5d5d,
      shininess: 30
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    
    // Pantalla marco
    const screenFrameGeometry = new THREE.BoxGeometry(2.8, 1.8, 0.15);
    const screenFrameMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const screenFrame = new THREE.Mesh(screenFrameGeometry, screenFrameMaterial);
    screenFrame.position.set(0, 0.9, -0.8);
    screenFrame.rotation.x = -0.2;
    
    // Pantalla encendida
    const displayGeometry = new THREE.PlaneGeometry(2.4, 1.5);
    const displayMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x007aff,
      emissive: 0x001a33,
      emissiveIntensity: 0.3
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, 0.9, -0.72);
    display.rotation.x = -0.2;
    
    // Logo Apple
    const logoGeometry = new THREE.CircleGeometry(0.1, 20);
    const logoMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      emissive: 0x333333,
      emissiveIntensity: 0.1
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 1.3, -0.8);
    logo.rotation.x = -0.2;
    
    // Teclado
    const keyboardBase = new THREE.BoxGeometry(2.2, 0.03, 1.4);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
    const keyboard = new THREE.Mesh(keyboardBase, keyboardMaterial);
    keyboard.position.set(0, 0.11, -0.3);
    
    // Trackpad
    const trackpadGeometry = new THREE.BoxGeometry(0.8, 0.02, 0.6);
    const trackpadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x3a3a3a,
      shininess: 50
    });
    const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
    trackpad.position.set(0, 0.12, 0.4);
    
    this.macbookGroup.add(base);
    this.macbookGroup.add(screenFrame);
    this.macbookGroup.add(display);
    this.macbookGroup.add(logo);
    this.macbookGroup.add(keyboard);
    this.macbookGroup.add(trackpad);
    
    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1);
    keyLight.position.set(3, 3, 3);
    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.3);
    fillLight.position.set(-2, 1, 2);
    
    this.scene.add(ambientLight);
    this.scene.add(keyLight);
    this.scene.add(fillLight);
    this.scene.add(this.macbookGroup);
    
    this.camera.position.set(3, 2, 4);
    this.camera.lookAt(0, 0.5, 0);
    this.isVisible = true;
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    this.macbookGroup.rotation.y += 0.01;
    this.macbookGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const sections = document.querySelectorAll('section');
    let currentSection = 0;
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection = index;
      }
    });
    
    const shouldShow = currentSection % 2 === 0;
    
    if (shouldShow !== this.isVisible) {
      this.isVisible = shouldShow;
      gsap.to(this.macbookGroup.scale, {
        duration: 0.5,
        x: shouldShow ? 1 : 0,
        y: shouldShow ? 1 : 0,
        z: shouldShow ? 1 : 0
      });
    }
  }

  ngOnDestroy() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}