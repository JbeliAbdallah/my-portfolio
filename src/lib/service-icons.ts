import {
  FaCode,
  FaGlobe,
  FaDatabase,
  FaServer,
  FaMobileAlt,
  FaPaintBrush,
  FaCloud,
  FaLaptopCode,
} from "react-icons/fa";
import { IconType } from "react-icons";

export const serviceIconOptions = [
  { value: "FaCode", label: "Code", icon: FaCode },
  { value: "FaGlobe", label: "Globe", icon: FaGlobe },
  { value: "FaDatabase", label: "Database", icon: FaDatabase },
  { value: "FaServer", label: "Server", icon: FaServer },
  { value: "FaMobileAlt", label: "Mobile", icon: FaMobileAlt },
  { value: "FaPaintBrush", label: "Design", icon: FaPaintBrush },
  { value: "FaCloud", label: "Cloud", icon: FaCloud },
  { value: "FaLaptopCode", label: "Development", icon: FaLaptopCode },
];

export const serviceIcons: Record<string, IconType> = Object.fromEntries(
  serviceIconOptions.map(({ value, icon }) => [value, icon]),
);
