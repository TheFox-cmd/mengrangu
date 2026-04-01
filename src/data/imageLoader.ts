const projectModules = import.meta.glob<string>(
  '../assets/projects/**/*.{jpg,jpeg,png,webp,gif}',
  { eager: true, import: 'default' },
)

const guestModules = import.meta.glob<string>(
  '../assets/guests/**/*.{jpg,jpeg,png,webp,gif}',
  { eager: true, import: 'default' },
)

function groupByFolder(
  modules: Record<string, string>,
  base: string,
): Record<string, string[]> {
  const groups: Record<string, string[]> = {}
  for (const [path, url] of Object.entries(modules)) {
    const relative = path.slice(base.length)
    const folder = relative.split('/')[0]
    ;(groups[folder] ??= []).push(url)
  }
  return groups
}

export const projectImagesByFolder = groupByFolder(projectModules, '../assets/projects/')
export const guestImagesByFolder = groupByFolder(guestModules, '../assets/guests/')
