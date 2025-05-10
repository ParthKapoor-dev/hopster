"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  ChevronRight,
  Clock,
  Code2,
  Database,
  Download,
  Github,
  Globe,
  MapPin,
  Play,
  Shield,
  Smartphone,
  Star,
  ChevronDown,
  MenuIcon,
  X,
} from "lucide-react";
import { ToogleMode } from "@/components/ToogleMode";
import Link from "next/link";

export default function RideSharingLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Daily Commuter",
      content:
        "This ride-sharing app has completely transformed my daily commute. The app is so intuitive and rides arrive within minutes!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Business Traveler",
      content:
        "As someone who travels frequently for work, having a reliable ride service is crucial. This app has never let me down.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Weekend Explorer",
      content:
        "Love the affordable prices and friendly drivers. Perfect for exploring the city on weekends without worrying about parking.",
      rating: 4,
    },
  ];

  const features = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Lightning Fast Pickups",
      description:
        "Our advanced algorithms ensure drivers reach you in minutes, not hours.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Safety First",
      description:
        "Real-time trip monitoring and driver verification for peace of mind.",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      title: "Seamless Mobile Experience",
      description:
        "Book, track, and pay for rides with just a few taps on our intuitive app.",
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Available Everywhere",
      description: "Expanding rapidly to serve more cities across the globe.",
    },
  ];

  const techStack = [
    { name: "Microservices", icon: <Code2 className="h-5 w-5" /> },
    { name: "GoLang", icon: <Globe className="h-5 w-5" /> },
    { name: "gRPC", icon: <Database className="h-5 w-5" /> },
    { name: "Kubernetes", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Next.js", icon: <Github className="h-5 w-5" /> },
    { name: "TypeScript", icon: <Code2 className="h-5 w-5" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background dark:bg-background/90 shadow-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">Hopster</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium hover:text-primary"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium hover:text-primary"
              >
                Testimonials
              </a>
              <a
                href="#tech"
                className="text-sm font-medium hover:text-primary"
              >
                Technology
              </a>
              <ToogleMode />
              <Link href={"/auth"}>
                <Button variant="outline" className="mr-2">
                  Login
                </Button>
                <Button>Sign Up</Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background shadow-lg py-2">
            <div className="container mx-auto px-4 space-y-2">
              <a
                href="#features"
                className="block py-2 font-medium hover:text-primary"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="block py-2 font-medium hover:text-primary"
              >
                Testimonials
              </a>
              <a
                href="#tech"
                className="block py-2 font-medium hover:text-primary"
              >
                Technology
              </a>
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
                <Button className="w-full">Sign Up</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/5 py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="px-3 py-1 text-primary border-primary/30"
              >
                Redefining Urban Mobility
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Get Where You're Going,{" "}
                <span className="text-primary">Faster</span>
              </h1>
              <p className="text-lg text-gray-600">
                Experience the future of ride-sharing with our lightning-fast,
                reliable, and affordable service powered by cutting-edge
                technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="group">
                  Download App
                  <Download className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="group">
                  Learn More
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
              <div className="flex items-center space-x-4 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full bg-primary/85 border-2 border-white flex items-center justify-center text-white text-xs`}
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">10K+</span> happy riders this
                  month
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-tr from-primary/80 to-secondary/80 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto backdrop-blur-sm">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                    <p className="mt-4 font-medium">See how it works</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/30 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Core Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need in a Ride-Sharing App
            </h2>
            <p className="text-gray-600 dark:text-gray-200">
              Designed with both riders and drivers in mind, our platform offers
              a seamless experience from pickup to destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Our Riders Say
            </h2>
            <p className="text-gray-600">
              Don't just take our word for it — hear from some of our satisfied
              customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                  <p className="text-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-secondary-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Technology
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powered by Modern Technology
            </h2>
            <p className="text-gray-600">
              Our platform leverages cutting-edge technologies to ensure
              reliability, speed, and scalability.
            </p>
          </div>

          <Card className=" mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                    {tech.icon}
                  </div>
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Interested in the technical details?
            </h3>
            <p className="text-gray-600 mb-6">
              Our architecture ensures high availability, fault tolerance, and
              rapid scaling to meet demand spikes.
            </p>
            <Button variant="outline" className="group">
              Learn About Our Architecture
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Experience the Future of Ride-Sharing?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Download our app now and enjoy your first ride with a special
                discount. Available on iOS and Android.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="group">
                  Download for iOS
                  <Download className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-white group bg-secondary"
                >
                  Download for Android
                  <Download className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-5xl font-bold mb-2">10K+</div>
                <div className="text-white/80">Happy riders this month</div>
                <div className="mt-6">
                  <div className="text-5xl font-bold mb-2">95%</div>
                  <div className="text-white/80">Customer satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Hopster</h3>
              <p className="text-gray-400 mb-6">
                Redefining urban mobility with technology and convenience.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(
                  (social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-4 h-4"></div>
                    </a>
                  ),
                )}
              </div>
            </div>

            {[
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press Kit"],
              },
              {
                title: "Support",
                links: [
                  "Help Center",
                  "Safety",
                  "Contact Us",
                  "COVID-19 Resources",
                ],
              },
              {
                title: "Legal",
                links: [
                  "Terms of Service",
                  "Privacy Policy",
                  "Accessibility",
                  "Cookies",
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Hopster. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              Made with advanced technology for a better tomorrow.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
