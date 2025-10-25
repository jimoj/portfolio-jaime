import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleI18nService {
  private currentLang = new BehaviorSubject<string>('es');
  currentLang$ = this.currentLang.asObservable();

  private translations = {
    es: {
      'nav.home': 'Inicio',
      'nav.services': 'Servicios',
      'nav.technologies': 'Tecnologías',
      'nav.experience': 'Experiencia',
      'nav.contact': 'Contacto',
      'contact.back': 'Volver al inicio',
      'contact.title': 'Contacto',
      'contact.subtitle': '¿Tienes un proyecto en mente? ¡Hablemos y hagámoslo realidad!',
      'contact.form.title': 'Envíame un mensaje',
      'contact.form.name': 'Nombre',
      'contact.form.namePlaceholder': 'Tu nombre',
      'contact.form.email': 'Email',
      'contact.form.emailPlaceholder': 'tu@email.com',
      'contact.form.subject': 'Asunto',
      'contact.form.subjectPlaceholder': 'Asunto del mensaje',
      'contact.form.message': 'Mensaje',
      'contact.form.messagePlaceholder': 'Cuéntame sobre tu proyecto...',
      'contact.form.submit': 'Enviar Mensaje',
      'contact.form.sending': 'Enviando...',
      'contact.info.email': 'Email',
      'contact.info.location': 'Ubicación',
      'contact.info.locationValue': 'Madrid, España',
      'contact.info.availability': 'Disponibilidad',
      'contact.info.availabilityValue': 'Lun - Vie, 9:00 - 18:00',
      'contact.social.title': 'Sígueme en',
      'hero.title': 'Full Stack Developer',
      'hero.description': 'Creando experiencias digitales extraordinarias con tecnologías modernas y diseño innovador.',
      'hero.viewProjects': 'Ver Proyectos',
      'hero.contact': 'Contactar',
      'hero.scroll': 'Scroll',
      'services.title': 'Servicios',
      'services.subtitle': 'Soluciones tecnológicas innovadoras',
      'services.frontend.title': 'Frontend',
      'services.frontend.description': 'Interfaces modernas y responsivas con las últimas tecnologías.',
      'services.backend.title': 'Backend',
      'services.backend.description': 'APIs robustas y escalables para aplicaciones empresariales.',
      'services.devops.title': 'DevOps',
      'services.devops.description': 'Despliegue y mantenimiento de aplicaciones en la nube.',
      'technologies.title': 'Tecnologías',
      'technologies.subtitle': 'Stack tecnológico moderno',
      'experience.title': 'Experiencia',
      'experience.subtitle': 'Trayectoria profesional',
      'experience.senior.title': 'Senior Full Stack Developer',
      'experience.senior.period': '2022 - Presente',
      'experience.senior.description': 'Liderando equipos de desarrollo en proyectos de gran escala, implementando arquitecturas escalables y mentorizando desarrolladores junior.',
      'experience.fullstack.title': 'Full Stack Developer',
      'experience.fullstack.period': '2020 - 2022',
      'experience.fullstack.description': 'Desarrollo de aplicaciones web completas con tecnologías modernas como React, Angular y Node.js.',
      'experience.frontend.title': 'Frontend Developer',
      'experience.frontend.period': '2019 - 2020',
      'experience.frontend.description': 'Especialización en interfaces de usuario modernas y responsivas, trabajando con frameworks como Vue.js y Angular.',
      'experience.junior.title': 'Junior Developer',
      'experience.junior.period': '2018 - 2019',
      'experience.junior.description': 'Inicio en el desarrollo web, aprendiendo las bases de HTML, CSS, JavaScript y primeros pasos con frameworks modernos.',
      'experience.freelance.title': 'Freelance Web Developer',
      'experience.freelance.period': '2017 - 2018',
      'experience.freelance.description': 'Proyectos independientes desarrollando sitios web para pequeñas empresas y emprendedores locales.',
      'modal.title': 'Jaime Jiménez',
      'modal.subtitle': 'Full Stack Developer',
      'modal.description': 'Apasionado por crear soluciones tecnológicas innovadoras con más de 5 años de experiencia en desarrollo web.'
    },
    en: {
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.technologies': 'Technologies',
      'nav.experience': 'Experience',
      'nav.contact': 'Contact',
      'contact.back': 'Back to home',
      'contact.title': 'Contact',
      'contact.subtitle': 'Have a project in mind? Let\'s talk and make it happen!',
      'contact.form.title': 'Send me a message',
      'contact.form.name': 'Name',
      'contact.form.namePlaceholder': 'Your name',
      'contact.form.email': 'Email',
      'contact.form.emailPlaceholder': 'your@email.com',
      'contact.form.subject': 'Subject',
      'contact.form.subjectPlaceholder': 'Message subject',
      'contact.form.message': 'Message',
      'contact.form.messagePlaceholder': 'Tell me about your project...',
      'contact.form.submit': 'Send Message',
      'contact.form.sending': 'Sending...',
      'contact.info.email': 'Email',
      'contact.info.location': 'Location',
      'contact.info.locationValue': 'Madrid, Spain',
      'contact.info.availability': 'Availability',
      'contact.info.availabilityValue': 'Mon - Fri, 9:00 - 18:00',
      'contact.social.title': 'Follow me on',
      'hero.title': 'Full Stack Developer',
      'hero.description': 'Creating extraordinary digital experiences with modern technologies and innovative design.',
      'hero.viewProjects': 'View Projects',
      'hero.contact': 'Contact',
      'hero.scroll': 'Scroll',
      'services.title': 'Services',
      'services.subtitle': 'Innovative technological solutions',
      'services.frontend.title': 'Frontend',
      'services.frontend.description': 'Modern and responsive interfaces with the latest technologies.',
      'services.backend.title': 'Backend',
      'services.backend.description': 'Robust and scalable APIs for enterprise applications.',
      'services.devops.title': 'DevOps',
      'services.devops.description': 'Deployment and maintenance of cloud applications.',
      'technologies.title': 'Technologies',
      'technologies.subtitle': 'Modern technology stack',
      'experience.title': 'Experience',
      'experience.subtitle': 'Professional career',
      'experience.senior.title': 'Senior Full Stack Developer',
      'experience.senior.period': '2022 - Present',
      'experience.senior.description': 'Leading development teams on large-scale projects, implementing scalable architectures and mentoring junior developers.',
      'experience.fullstack.title': 'Full Stack Developer',
      'experience.fullstack.period': '2020 - 2022',
      'experience.fullstack.description': 'Full web application development with modern technologies like React, Angular and Node.js.',
      'experience.frontend.title': 'Frontend Developer',
      'experience.frontend.period': '2019 - 2020',
      'experience.frontend.description': 'Specializing in modern and responsive user interfaces, working with frameworks like Vue.js and Angular.',
      'experience.junior.title': 'Junior Developer',
      'experience.junior.period': '2018 - 2019',
      'experience.junior.description': 'Starting in web development, learning the basics of HTML, CSS, JavaScript and first steps with modern frameworks.',
      'experience.freelance.title': 'Freelance Web Developer',
      'experience.freelance.period': '2017 - 2018',
      'experience.freelance.description': 'Independent projects developing websites for small businesses and local entrepreneurs.',
      'modal.title': 'Jaime Jiménez',
      'modal.subtitle': 'Full Stack Developer',
      'modal.description': 'Passionate about creating innovative technological solutions with over 5 years of experience in web development.'
    }
  };

  constructor() {
    const savedLang = localStorage.getItem('language') || 'es';
    this.currentLang.next(savedLang);
  }

  setLanguage(lang: string) {
    this.currentLang.next(lang);
    localStorage.setItem('language', lang);
  }

  translate(key: string): string {
    const lang = this.currentLang.value;
    return this.translations[lang as keyof typeof this.translations]?.[key as keyof typeof this.translations.es] || key;
  }

  get currentLanguage(): string {
    return this.currentLang.value;
  }
}