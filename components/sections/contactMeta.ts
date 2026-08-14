import {
  BriefcaseBusiness,
  Handshake,
  Headset,
  Users,
  MailOpen,
  ClipboardCheck,
  MessagesSquare,
  Send,
  type LucideIcon,
} from "lucide-react";
import type { ContactTypeId, ProcessId } from "@/lib/content";

/** Inquiry-type → lucide icon (shared by hero visual, info list, form radios). */
export const typeIcons: Record<ContactTypeId, LucideIcon> = {
  business: BriefcaseBusiness,
  partnership: Handshake,
  consultation: Headset,
  recruitment: Users,
};

/** Process-step → lucide icon. */
export const processIcons: Record<ProcessId, LucideIcon> = {
  inquiry: MailOpen,
  review: ClipboardCheck,
  discussion: MessagesSquare,
  response: Send,
};
