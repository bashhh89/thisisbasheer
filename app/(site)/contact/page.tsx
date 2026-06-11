import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a conversation about a custom internal system, platform, or operational tool.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="pt-44 md:pt-56 pb-16">
        <Container>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-12">
            <span className="text-accent">●</span>
            <span className="h-px w-10 bg-ink-700" />
            <span>Contact</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-ink-50 max-w-5xl">
            Start a project.
            <br />
            <span className="text-ink-500">Tell me about it.</span>
          </h1>
          <p className="mt-12 max-w-2xl text-lg text-ink-300 leading-relaxed">
            The more concrete you can be about the system, the operation, and
            what's not working today — the better the first reply will be.
          </p>
        </Container>
      </section>

      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-8">
                Direct
              </div>
              <ul className="space-y-6">
                <li>
                  <div className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 mb-2">
                    Email
                  </div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-ink-100 text-lg hover:text-accent transition-colors duration-300"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <div className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 mb-2">
                    Availability
                  </div>
                  <p className="text-ink-100 text-lg">
                    Currently open to a small number of new engagements.
                  </p>
                </li>
                <li>
                  <div className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 mb-2">
                    Response
                  </div>
                  <p className="text-ink-100 text-lg">
                    Typically within two business days.
                  </p>
                </li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-8 md:pl-12">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
