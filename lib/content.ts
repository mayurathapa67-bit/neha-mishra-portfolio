import content from "@/content.json";

export type NavLink = { label: string; href: string };

export type Nav = {
  logo: string;
  tagline: string;
  links: NavLink[];
};

export type Cta = { label: string; href: string };

export type HeroStat = { value: string; label: string };

export type Hero = {
  title: string;
  subtitle: string;
  cta_primary: Cta;
  cta_secondary: Cta;
  image: string;
  stats: HeroStat[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type About = {
  headline: string;
  bio: string[];
  philosophy: string;
  expertise: string[];
  experience: Experience[];
  certifications: string[];
  image: string;
};

export type Service = {
  title: string;
  description: string;
  icon: string;
  price?: string;
};

export type PortfolioCategory =
  | "SEO"
  | "Blog"
  | "Copywriting"
  | "Technical"
  | "Creative";

export type PortfolioItem = {
  title: string;
  category: PortfolioCategory;
  excerpt: string;
  client?: string;
  published_date: string;
  read_time: number;
  featured_image: string;
  content: string;
};

export type BlogPost = {
  title: string;
  excerpt: string;
  published_date: string;
  read_time: number;
  featured_image: string;
  category: string;
  content: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
};

export type Social = { label: string; href: string; icon: string };

export type Contact = {
  email: string;
  phone: string;
  location: string;
  socials: Social[];
};

export type Content = {
  nav: Nav;
  hero: Hero;
  about: About;
  services: Service[];
  portfolio: PortfolioItem[];
  blog: BlogPost[];
  testimonials: Testimonial[];
  contact: Contact;
};

export const site = content as Content;

export const portfolioCategories: PortfolioCategory[] = [
  "SEO",
  "Blog",
  "Copywriting",
  "Technical",
  "Creative",
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getBlogSlug(post: BlogPost): string {
  return slugify(post.title);
}

export function getPortfolioSlug(item: PortfolioItem): string {
  return slugify(item.title);
}
