import { getGuestImages, getProjectImages } from './imageLoader'

export interface Project {
  id: string
  title: string
  brief: string
  slug: string
  color: string
  description: string
  images: string[]
  guestOnly?: boolean
}

interface ProjectConfig {
  title: string
  brief: string
  slug: string
  folder?: string
  color: string
  description: string
  guestOnly?: boolean
}

const configs: ProjectConfig[] = [
  {
    title: 'Arcana Gwen',
    brief: 'Character concept art & skin design',
    slug: 'arcana-gwen',
    color: '#C7B299',
    description:
      'Concept explorations and final renders for the Arcana Gwen skin. Focused on thumbnail ideation, iterative passes, and a polished final deliverable.',
  },
  {
    title: 'Bloodmoon Liliah',
    brief: 'Bloodmoon-themed champion concept design',
    slug: 'bloodmoon-liliah',
    color: '#8B9EAE',
    description:
      'A Bloodmoon skin concept for Lillia — from initial concept edit through skill shot explorations and final renders.',
  },
  {
    title: 'Character Art (Bitcraft)',
    brief: 'Profession-themed character art for Bitcraft',
    slug: 'character-art-bitcraft',
    folder: 'character-art (bitcraft)',
    color: '#B0A898',
    description:
      'Character art designs spanning various in-game professions — carpentry, foraging, hunting, mining, smithing, and tailoring.',
  },
  {
    title: 'Creature Design (Bitcraft)',
    brief: 'Creature concepts & color variations for Bitcraft',
    slug: 'creature-design-bitcraft',
    folder: 'creature-design (bitcraft)',
    color: '#A0B098',
    description:
      'Creature design work for Bitcraft including animal templates, color variations, and presentation sheets.',
  },
  {
    title: 'Illustration (Bitcraft)',
    brief: 'Promotional illustration for Bitcraft',
    slug: 'illustration-bitcraft',
    folder: 'illustration (bitcraft)',
    color: '#98A8B0',
    description:
      'Banner illustration and promotional artwork created for the Bitcraft project.',
  },
  {
    title: 'NPC Design (Bitcraft)',
    brief: 'NPC character designs for Bitcraft',
    slug: 'npc-design-bitcraft',
    folder: 'NPC design (bitcraft)',
    color: '#A89890',
    description:
      'NPC character designs for Bitcraft — including Brico, Ramparte, and Varu and Laru with exploration sheets and presentation templates.',
  },
  {
    title: 'Zeronis NFT',
    brief: 'Stylized character illustrations',
    slug: 'zeronis-nft',
    color: '#9BB5A0',
    description:
      'Stylized character illustrations created for the Zeronis NFT collection, featuring expressive poses and vibrant rendering.',
  },
  {
    title: 'Zyla',
    brief: 'Original character design & presentation',
    slug: 'zyla',
    color: '#B8A08A',
    description:
      'Original character design for Zyla — from early ideation and expression sheets through to a polished presentation.',
  },
  {
    title: 'Wild Sky',
    brief: 'Character skins, props & banner art for Wild Sky',
    slug: 'wild-sky',
    color: '#A89B8C',
    guestOnly: true,
    description:
      'A collection of character skin designs, prop concepts, and promotional banner art created for the Wild Sky project. Includes awaken skins, Halloween variants, and hero concept art.',
  },
]

export const projects: Project[] = configs.map((config, index) => ({
  id: String(index + 1),
  title: config.title,
  brief: config.brief,
  slug: config.slug,
  color: config.color,
  description: config.description,
  guestOnly: config.guestOnly,
  images: config.guestOnly
    ? getGuestImages(config.folder ?? config.slug)
    : getProjectImages(config.folder ?? config.slug),
}))

export const publicProjects = projects.filter((p) => !p.guestOnly)
export const guestProjects = projects.filter((p) => p.guestOnly)
