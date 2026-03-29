import arcanaGwenFinal from '../assets/projects/arcana-gwen/final.jpg'
import arcanaGwenPass2 from '../assets/projects/arcana-gwen/pass-2.jpg'
import arcanaGwenThumbnails from '../assets/projects/arcana-gwen/thumbnail-explorations.jpg'
import arcanaGwenWeek4 from '../assets/projects/arcana-gwen/week-4.jpg'

import bloodmoonConcept from '../assets/projects/bloodmoon-liliah/concept-edit.jpg'
import bloodmoonRenders1 from '../assets/projects/bloodmoon-liliah/renders-1.jpg'
import bloodmoonRenders2 from '../assets/projects/bloodmoon-liliah/renders-2.jpg'
import bloodmoonRenders3 from '../assets/projects/bloodmoon-liliah/renders-3.jpg'
import bloodmoonSkillShots from '../assets/projects/bloodmoon-liliah/skill-shots.jpg'

import wildSkyAwakenFinal from '../assets/projects/wild-sky/awaken-skin-final.jpg'
import wildSkyFireJesterRender from '../assets/projects/wild-sky/banner-design/fire-jester-render.jpg'
import wildSkyLightHeroKatt from '../assets/projects/wild-sky/banner-design/light-hero-katt.jpg'
import wildSkyMedusa from '../assets/projects/wild-sky/banner-design/medusa.jpg'
import wildSkyCentaurFinal from '../assets/projects/wild-sky/centaur-skin-final.jpg'
import wildSkyJesterAwaken from '../assets/projects/wild-sky/jester-awaken-final.jpg'
import wildSkyJesterFireHero from '../assets/projects/wild-sky/jester-fire-hero-concept.jpg'
import wildSkyJesterHalloween from '../assets/projects/wild-sky/jester-halloween.jpg'
import wildSkyJesterProp from '../assets/projects/wild-sky/jester-prop.jpg'

import zeronisNftFoxy from '../assets/projects/zeronis-nft/foxy.jpg'
import zeronisNftTaeyeon from '../assets/projects/zeronis-nft/taeyeon.jpg'

import zylaExpression from '../assets/projects/zyla/expression.jpg'
import zylaIdeation from '../assets/projects/zyla/ideation.jpg'
import zylaPresentation from '../assets/projects/zyla/presentation.jpg'

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

export const projects: Project[] = [
  {
    id: '1',
    title: 'Arcana Gwen',
    brief: 'Character concept art & skin design',
    slug: 'arcana-gwen',
    color: '#C7B299',
    description:
      'Concept explorations and final renders for the Arcana Gwen skin. Focused on thumbnail ideation, iterative passes, and a polished final deliverable.',
    images: [
      arcanaGwenFinal,
      arcanaGwenPass2,
      arcanaGwenThumbnails,
      arcanaGwenWeek4,
    ],
  },
  {
    id: '2',
    title: 'Bloodmoon Liliah',
    brief: 'Bloodmoon-themed champion concept design',
    slug: 'bloodmoon-liliah',
    color: '#8B9EAE',
    description:
      'A Bloodmoon skin concept for Lillia — from initial concept edit through skill shot explorations and final renders.',
    images: [
      bloodmoonConcept,
      bloodmoonSkillShots,
      bloodmoonRenders1,
      bloodmoonRenders2,
      bloodmoonRenders3,
    ],
  },
  {
    id: '3',
    title: 'Wild Sky',
    brief: 'Character skins, props & banner art for Wild Sky',
    slug: 'wild-sky',
    color: '#A89B8C',
    guestOnly: true,
    description:
      'A collection of character skin designs, prop concepts, and promotional banner art created for the Wild Sky project. Includes awaken skins, Halloween variants, and hero concept art.',
    images: [
      wildSkyAwakenFinal,
      wildSkyCentaurFinal,
      wildSkyJesterAwaken,
      wildSkyJesterHalloween,
      wildSkyJesterProp,
      wildSkyJesterFireHero,
      wildSkyFireJesterRender,
      wildSkyLightHeroKatt,
      wildSkyMedusa,
    ],
  },
  {
    id: '4',
    title: 'Zeronis NFT',
    brief: 'Stylized character illustrations',
    slug: 'zeronis-nft',
    color: '#9BB5A0',
    description:
      'Stylized character illustrations created for the Zeronis NFT collection, featuring expressive poses and vibrant rendering.',
    images: [
      zeronisNftFoxy,
      zeronisNftTaeyeon,
    ],
  },
  {
    id: '5',
    title: 'Zyla',
    brief: 'Original character design & presentation',
    slug: 'zyla',
    color: '#B8A08A',
    description:
      'Original character design for Zyla — from early ideation and expression sheets through to a polished presentation.',
    images: [
      zylaExpression,
      zylaIdeation,
      zylaPresentation,
    ],
  },
]

export const publicProjects = projects.filter((p) => !p.guestOnly)
export const guestProjects = projects.filter((p) => p.guestOnly)
