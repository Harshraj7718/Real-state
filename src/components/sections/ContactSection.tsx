"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ScatterText from "@/components/ScatterText";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  message: z.string().min(10, "Tell us a little more"),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "mt-2 rounded-none border-x-0 border-t-0 border-b border-black/20 px-0 focus-visible:border-black focus-visible:ring-0";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.log("HASH contact form submission", values);
    setSubmitted(true);
    reset();
  }

  return (
    <section id="contact" className="relative bg-white px-6 py-24 text-black sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow="Let's talk" title="Contact" />
          <ScatterText
            as="p"
            text="Whether you're an investor, a homebuyer, or a partner — our team responds within one business day."
            splitType="words"
            className="mt-8 max-w-md font-body text-sm text-black/60 sm:text-base"
          />
          <div className="mt-10 space-y-4 border-t border-black/10 pt-8 font-body text-sm text-black/70">
            <p>hello@hash.estate</p>
            <p>+1 (415) 555-0148</p>
            <p>One Harbor Point, Suite 4400</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" {...register("name")} className={fieldClass} />
            {errors.name && <p className="mt-1 text-xs text-black/60">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} className={fieldClass} />
            {errors.email && <p className="mt-1 text-xs text-black/60">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} className={fieldClass} />
            {errors.phone && <p className="mt-1 text-xs text-black/60">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={4} {...register("message")} className={fieldClass} />
            {errors.message && (
              <p className="mt-1 text-xs text-black/60">{errors.message.message}</p>
            )}
          </div>
          <MagneticButton
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-3 font-display text-lg tracking-widest uppercase disabled:opacity-50"
          >
            {submitted ? "Sent — Thank you" : isSubmitting ? "Sending…" : "Send Message"}
            <span className="h-px w-10 bg-black transition-all duration-300 group-hover:w-16" />
          </MagneticButton>
        </form>
      </div>
    </section>
  );
}
