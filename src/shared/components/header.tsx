import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { Github, Globe, Heart, Menu, Search } from "lucide-react";

const navLinks = [
  { label: "Countries", to: "/country" },
  { label: "By Region", to: "#" },
  { label: "Statistics", to: "#" },
  { label: "Resources", to: "#" },
  { label: "About", to: "#" },
];

const actionButtons = [
  {
    icon: Heart,
    label: "Favorites",
    badge: "3",
    to: "#",
  },
  {
    icon: Github,
    label: "GitHub",
    to: "https://github.com",
  },
];

export default function Header() {
  return (
    <nav className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 max-w-screen-xl mx-auto w-full">
        {/* Left: Mobile Menu & Nav */}
        <div className="flex items-center gap-4">
          <MobileMenu />
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Globe className="h-5 w-5 text-primary" />
            WorldExplorer
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-4">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-sm font-medium hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block w-64 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search countries..." className="pl-8" />
          </div>
          <div className="hidden md:flex items-center gap-2">
            {actionButtons.map(({ icon: Icon, label, badge, to }) => (
              <Button
                asChild
                key={label}
                variant="ghost"
                size="sm"
              >
                <a href={to} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {badge && (
                    <Badge variant="secondary" className="ml-1">{badge}</Badge>
                  )}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <div className="mb-4 flex items-center gap-2 font-bold text-lg">
            <Globe className="h-5 w-5 text-primary" />
            WorldExplorer
          </div>
          <div className="space-y-2">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="block text-sm font-medium px-2 py-2 rounded hover:bg-accent"
              >
                {label}
              </Link>
            ))}
            {actionButtons.map(({ icon: Icon, label, badge, to }) => (
              <a
                key={label}
                href={to}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-sm font-medium px-2 py-2 rounded hover:bg-accent"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                {badge && <Badge variant="secondary">{badge}</Badge>}
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
