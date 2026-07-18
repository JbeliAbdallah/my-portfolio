import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa6";
import { IconType } from "react-icons";

export const socialIconOptions = [
  { value: "GitHub", icon: FaGithub },
  { value: "LinkedIn", icon: FaLinkedin },
  { value: "Facebook", icon: FaFacebook },
  { value: "Instagram", icon: FaInstagram },
  { value: "X", icon: FaXTwitter },
  { value: "YouTube", icon: FaYoutube },
  { value: "Discord", icon: FaDiscord },
  { value: "Telegram", icon: FaTelegram },
];

export const socialIcons: Record<string, IconType> = Object.fromEntries(
  socialIconOptions.map(({ value, icon }) => [value, icon]),
);

export function getSocialIcon(platform: string) {
  return socialIcons[platform] ?? FaGlobe;
}
