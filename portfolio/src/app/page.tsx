import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { SkillsDashboard } from '@/components/sections/skills-dashboard';
import { Experience } from '@/components/sections/experience';
import { Education } from '@/components/sections/education';
import { ProjectsGallery } from '@/components/projects/projects-gallery';
import { CertificationsGallery } from '@/components/certifications/certifications-gallery';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <CertificationsGallery />
      <ProjectsGallery />
      <SkillsDashboard />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
}