import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  scrollY = 0;
  
  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  socialLinks = [
    { name: 'GitHub', url: '#', icon: 'github' },
    { name: 'LinkedIn', url: '#', icon: 'linkedin' },
    { name: 'Twitter', url: '#', icon: 'twitter' },
    { name: 'Email', url: 'mailto:jaime@example.com', icon: 'email' }
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollY = window.scrollY;
  }

  ngOnInit() {}

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // Aquí implementarías el envío del formulario
    alert('¡Mensaje enviado! Te contactaré pronto.');
    this.resetForm();
  }

  private resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}