import { Box, ClipboardList, GraduationCap, Home, Users, type LucideIcon } from "lucide-react";

// Icon per nav route, from the design handoff's global chrome spec.
export const navIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/academics": GraduationCap,
  "/campus": Box,
  "/people": Users,
  "/admissions": ClipboardList,
};
