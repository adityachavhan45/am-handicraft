import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-[#fbf7ef] pt-32">
      <div className="container-am grid gap-10 pb-20 lg:grid-cols-[1fr_0.8fr]">
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#a15d38]">Contact</p>
          <h1 className="mt-3 font-serif text-[2.6rem] font-semibold leading-tight sm:text-6xl">Let’s shape a handcrafted storefront.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#5f574f] sm:text-lg sm:leading-8">
            This is a demo contact experience for AM Handicrafts. Real business information can be added when the client is ready.
          </p>
          <form className="mt-8 grid gap-4 rounded-[8px] border border-[#e5dac8] bg-white p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" />
              <Field label="Email" />
              <Field label="Phone" />
              <Field label="Subject" />
            </div>
            <label>
              <span className="text-sm font-semibold">Message</span>
              <textarea rows={6} className="mt-2 w-full rounded-[8px] border border-[#d8c6ad] bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#315448]" />
            </label>
            <button type="button" className="w-full rounded-full bg-[#315448] px-7 py-4 text-sm font-bold text-white sm:w-max">
              Send Demo Message
            </button>
          </form>
        </section>
        <aside className="h-max rounded-[8px] border border-[#e5dac8] bg-white p-6 shadow-sm lg:sticky lg:top-32">
          <h2 className="font-serif text-[1.9rem] font-semibold sm:text-3xl">Business Information</h2>
          <div className="mt-6 grid gap-4 text-sm">
            <Info icon={<MapPin size={18} />} title="Address" text="Business address will be added here." />
            <Info icon={<Phone size={18} />} title="Phone" text="Business phone number will be added here." />
            <Info icon={<Mail size={18} />} title="Email" text="Business email address will be added here." />
          </div>
          <div className="mt-6 rounded-[8px] bg-[#fbf7ef] p-4 text-sm leading-6 text-[#6e665c]">
            Demo note: contact submissions are not stored or sent. This page is frontend-only.
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label }: { label: string }) {
  const placeholders: Record<string, string> = {
    Name: "Enter your full name",
    Email: "Enter your email address",
    Phone: "Enter your phone number",
    Subject: "What is this about?",
  };

  return (
    <label>
      <span className="text-sm font-semibold">{label}</span>
      <input placeholder={placeholders[label]} className="mt-2 h-12 w-full rounded-[8px] border border-[#d8c6ad] bg-[#fffaf2] px-4 outline-none placeholder:text-[#9b9287] focus:border-[#315448]" />
    </label>
  );
}

function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-[8px] border border-[#eadfce] p-4">
      <span className="mt-1 text-[#315448]">{icon}</span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-[#7f7468]">{text}</p>
      </div>
    </div>
  );
}
