import HeartIcon2 from "@/components/icons/HeartIcon2";
import UsersIcon from "@/components/icons/UsersIcon";
import CarIcon from "@/components/icons/CarIcon";
import SparklesIcon from "@/components/icons/SparklesIcon";
import BuildingIcon from "@/components/icons/BuildingIcon";
import UserPlusIcon from "@/components/icons/UserPlusIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import TestimonialIcon from "@/components/icons/TestimonialIcon";
import StarIcon from "@/components/icons/StarIcon";
import TargetIcon from "@/components/icons/TargetIcon";
import BrainIcon from "@/components/icons/BrainIcon";
import HouseIcon from "@/components/icons/HouseIcon";
import VolunteerIcon from "@/components/icons/VolunteerIcon";
import AndreaNunesIcon from "@/components/icons/AndreaNunesIcon";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string;
  description: string;
  href: string;
  Icon: React.FC<{ className?: string }>;
  mobile?: boolean;
}

interface NavItemDef {
  id: string;
  label: string;
  href?: string;
  mobile?: boolean;
  dropdown?: DropdownItem[];
}

export const navItems: NavItemDef[] = [
  {
    id: "inicio",
    label: "Início",
    href: "/",
    mobile: true,
    dropdown: [
      {
        label: "Sobre",
        description: "Informações sobre a instituição e programas",
        href: "/#sobre",
        Icon: InfoIcon,
        mobile: true,
      },
      {
        label: "Programas",
        description: "Como nós impactamos a sociedade",
        href: "/#programas",
        Icon: TargetIcon,
        mobile: true,
      },
      {
        label: "Empresas Parceiras",
        description: "Junte sua empresa à nossa causa",
        href: "/#ajudar",
        Icon: BuildingIcon,
        mobile: true,
      },
      {
        label: "Apoiadores",
        description: "Celebridades que apoiam nossa causa",
        href: "/#apoiadores",
        Icon: StarIcon,
        mobile: true,
      },
      {
        label: "Depoimentos",
        description: "Relatos de quem ajudamos com nossos programas",
        href: "/#programas",
        Icon: TestimonialIcon,
        mobile: true,
      },
      {
        label: "Como Ajudar?",
        description: "Contribua com a causa e transforme vidas",
        href: "/#ajudar",
        Icon: HeartIcon2,
        mobile: true,
      },
    ],
  },
  {
    id: "sobre",
    label: "Sobre",
    href: "/#sobre",
    mobile: true,
    dropdown: [
      {
        label: "Sobre",
        description: "Informações sobre a instituição e programas",
        href: "/#sobre",
        Icon: InfoIcon,
        mobile: true,
      },
      {
        label: "Andrea Nunes",
        description: "A história da nossa fundadora",
        href: "/andrea-nunes",
        Icon: AndreaNunesIcon,
        mobile: true,
      },
    ],
  },
  {
    id: "programas",
    label: "Programas",
    mobile: true,
    dropdown: [
      {
        label: "Apoio Psicológico",
        description: "Suporte emocional para pacientes e famílias",
        href: "/#programas",
        Icon: BrainIcon,
        mobile: true,
      },
      {
        label: "Assistência Social",
        description: "Auxílio em necessidades do dia a dia",
        href: "/#programas",
        Icon: UsersIcon,
        mobile: true,
      },
      {
        label: "Visitas Domiciliares",
        description: "Acompanhamento personalizado no domicílio para pacientes",
        href: "/#programas",
        Icon: HouseIcon,
        mobile: true,
      },
      {
        label: "Atividades Terapêuticas",
        description: "Bem-estar e qualidade de vida",
        href: "/#programas",
        Icon: SparklesIcon,
        mobile: true,
      },
    ],
  },
  {
    id: "ajudar",
    label: "Ajudar",
    mobile: true,
    dropdown: [
      {
        label: "Doe Agora",
        description: "Faça uma doação e transforme vidas",
        href: "/apoie",
        Icon: HeartIcon2,
        mobile: true,
      },
      {
        label: "Seja Voluntário",
        description: "Contribua com seu tempo e talento",
        href: "/#ajudar",
        Icon: VolunteerIcon,
        mobile: true,
      },
      {
        label: "Empresas Parceiras",
        description: "Junte sua empresa à nossa causa",
        href: "/#ajudar",
        Icon: BuildingIcon,
        mobile: true,
      },
      {
        label: "Indique um Paciente",
        description: "Ajude quem precisa de cuidado",
        href: "/#ajudar",
        Icon: UserPlusIcon,
        mobile: true,
      },
    ],
  },
  { id: "blog", label: "Blog", href: "/blog", mobile: true },
  { id: "contato", label: "Contato", href: "/#contato", mobile: true },
];
