import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiGit,
  SiDocker,
  SiLinux,
  SiPython,
  SiPhp,
  SiLaravel,
  SiFlutter,
  SiDart,
  SiFigma,
} from "react-icons/si";

import { FaCode } from "react-icons/fa";

export const skillIcons = {
  nextdotjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  prisma: SiPrisma,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  tailwindcss: SiTailwindcss,
  html5: SiHtml5,
  css: SiCss,
  git: SiGit,
  docker: SiDocker,
  linux: SiLinux,
  python: SiPython,
  php: SiPhp,
  laravel: SiLaravel,
  flutter: SiFlutter,
  dart: SiDart,
  figma: SiFigma,
} as const;

export type SkillIconName = keyof typeof skillIcons;

export function getSkillIcon(name: string | null) {
  if (!name) return FaCode;

  return skillIcons[name as SkillIconName] ?? FaCode;
}

export const skillIconOptions = [
  { value: "nextdotjs", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "nodedotjs", label: "Node.js" },
  { value: "express", label: "Express" },
  { value: "prisma", label: "Prisma" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "tailwindcss", label: "Tailwind CSS" },
  { value: "html5", label: "HTML5" },
  { value: "css", label: "CSS" },
  { value: "git", label: "Git" },
  { value: "docker", label: "Docker" },
  { value: "linux", label: "Linux" },
  { value: "python", label: "Python" },
  { value: "php", label: "PHP" },
  { value: "laravel", label: "Laravel" },
  { value: "flutter", label: "Flutter" },
  { value: "dart", label: "Dart" },
  { value: "figma", label: "Figma" },
];
