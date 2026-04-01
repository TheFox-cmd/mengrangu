import { guestImagesByFolder, projectImagesByFolder } from './imageLoader'

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

const colors = [
  '#C7B299', '#8B9EAE', '#B0A898', '#A0B098',
  '#98A8B0', '#A89890', '#9BB5A0', '#B8A08A',
  '#A89B8C', '#C0A8B0', '#B8A898', '#A8B8A0',
]

function folderToSlug(folder: string): string {
  return folder
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function folderToTitle(folder: string): string {
  return folder
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function buildProjects(
  imagesByFolder: Record<string, string[]>,
  guestOnly: boolean,
  startId: number,
): Project[] {
  return Object.entries(imagesByFolder).map(([folder, images], index) => ({
    id: String(startId + index),
    title: folderToTitle(folder),
    brief: '',
    slug: folderToSlug(folder),
    color: colors[(startId + index - 1) % colors.length],
    description: '',
    images,
    ...(guestOnly ? { guestOnly: true } : {}),
  } as Project))
}

const publicProjectList = buildProjects(projectImagesByFolder, false, 1)
const guestProjectList = buildProjects(guestImagesByFolder, true, publicProjectList.length + 1)

export const projects: Project[] = [...publicProjectList, ...guestProjectList]
export const publicProjects = publicProjectList
export const guestProjects = guestProjectList
