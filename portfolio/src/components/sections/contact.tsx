'use client';

import { useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  Loader2,
  MapPin,
  MessageCircle,
  Mail,
  Send,
} from 'lucide-react';

import profile from '@/data/profile.json';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { getIcon } from '@/lib/icon-map';

type Status = 'idle' | 'submitting' | 'success';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [showMessage, setShowMessage] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (status !== 'idle') return;

  setStatus('submitting');

  const form = e.currentTarget;

  const formData = new FormData(form);

  try {
    const response = await fetch(
      'https://formspree.io/f/xzdlyloy',
      {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (response.ok) {
      setStatus('success');
      setShowMessage(true);

      form.reset();

      // Reset button after 1 second
      setTimeout(() => {
        setStatus('idle');
      }, 1000);

      // Hide popup after 10 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 10000);
    } else {
      alert('Something went wrong. Please try again.');
      setStatus('idle');
    }
  } catch {
    alert('Network error. Please try again.');
    setStatus('idle');
  }
}

  return (
    <section id="contact" className="section-container py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk risk, compliance, or opportunities"
        description="Open to fresher GRC / cybersecurity roles, internships, and collaboration."
      />

      <div className="grid gap-6 lg:grid-cols-5 items-stretch">

        {/* LEFT PANEL */}
        <Reveal className="lg:col-span-2 h-full">
          <div className="card-surface flex h-full flex-col justify-between p-8">

            <div className="space-y-7">

              {/* LOCATION */}
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <MapPin className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-sm font-semibold">Location</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.location}
                  </p>
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <MessageCircle className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-sm font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground select-text">
                    +91 82945 71848
                  </p>
                </div>
              </div>

              {/* LINKEDIN */}
              {profile.socials
                .filter((social) => social.label === 'LinkedIn')
                .map((social) => {
                  const Icon = getIcon(social.icon);

                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring flex items-start gap-4 rounded-lg transition-colors hover:text-accent"
                    >
                      <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Icon className="h-5 w-5" />
                      </span>

                      <div>
                        <p className="text-sm font-semibold">LinkedIn</p>
                        <p className="text-sm text-muted-foreground">
                          Abhishek Raj
                        </p>
                      </div>
                    </a>
                  );
                })}

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Mail className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground break-all select-text">
                    abhishekraj.grad@gmail.com
                  </p>
                </div>
              </div>

            </div>

            {/* STATUS BOX */}
            <div className="mt-10 rounded-xl bg-surface-muted p-5">
              <p className="font-semibold text-success">
                {profile.availability}
              </p>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Open to internships, GRC analyst roles
              </p>
            </div>

          </div>
        </Reveal>

        {/* RIGHT PANEL */}
        <Reveal delay={0.1} className="lg:col-span-3">
          <form
            action="https://formspree.io/f/xzdlyloy"
            method="POST"
            onSubmit={handleSubmit}
            className="card-surface relative space-y-4 p-8"
          >            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                required
                placeholder="Your name"
                className="focus-ring w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm"
              />

              <input
                name="email"
                required
                type="email"
                placeholder="you@example.com"
                className="focus-ring w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm"
              />
            </div>

            <input
              name="subject"
              required
              placeholder="What's this about?"
              className="focus-ring w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm"
            />

            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me a bit about the opportunity or question..."
              className="focus-ring w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm"
            />

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              {status === 'idle' && (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}

              {status === 'submitting' && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              )}

              {status === 'success' && (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Sent — thank you!
                </>
              )}
            </button>
            {showMessage && (
  <div className="pointer-events-none absolute bottom-10 right-6 rounded-full bg-surface-muted px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
    I usually respond within 24–48 hours.
  </div>
)}

          </form>
        </Reveal>

      </div>
    </section>
  );
}