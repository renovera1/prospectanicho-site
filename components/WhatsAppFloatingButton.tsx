"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  const href = buildWhatsAppUrl(defaultWhatsAppMessage);

  return (
    <a
      className="whatsapp-float whatsapp-floating"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      data-test-id="whatsapp-floating-button"
    >
      <MessageCircle aria-hidden="true" />
      <span className="whatsapp-float__tooltip">Falar no WhatsApp</span>
    </a>
  );
}
