import { useEffect } from 'react'

const BASE_TITLE = 'Mengrangu — Concept Art & Illustration'

export default function usePageTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} — Mengrangu` : BASE_TITLE
        return () => { document.title = BASE_TITLE }
    }, [title])
}
