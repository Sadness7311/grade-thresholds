import { Code, ExternalLink } from "lucide-react"

function Nav() {
    return (
        <div className="flex items-center justify-end gap-8 px-4 w-full py-7 border-b-1 border-accent sm:px-12">
            <p className="flex gap-2">Donate <ExternalLink /></p>
            <p className="flex gap-2">API <Code /></p>
        </div>
    )
}

export default Nav