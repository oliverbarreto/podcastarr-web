import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 space-x-4">
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
