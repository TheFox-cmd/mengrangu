import { useEffect } from 'react'

const BASE_TITLE = 'Mengran — Concept Art & Illustration'

export default function usePageTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} — Mengran` : BASE_TITLE
        return () => { document.title = BASE_TITLE }
    }, [title])
}
