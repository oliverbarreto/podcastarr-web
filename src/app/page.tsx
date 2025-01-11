import { buttonVariants } from "@/components/ui/button"

import Image from "next/image"
import Link from "next/link"

const Home = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="https://oliverbarreto.com"
          target="_blank"
        >
          Oliver Barreto
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/profile"
        >
          Profile
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://oliverbarreto.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Made with ❤️ by Oliver Barreto
        </a>
      </footer>
    </div>
  )
}

export default Home
