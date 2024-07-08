'use client'
import Link from 'next/link'
import Typography from '../ui/typography'

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full border-t md:flex-row md:items-center md:justify-center">
      <div className="w-full max-w-[1280px] md:px-8 px-4 flex place-content-center">
        <div className="gap-x-11 md:flex flex-1 hidden">
          <Link
            href="/"
            className="pointer flex items-center"
          >
            <img src="/hackletterlogo.jpg" className="mr-3 w-5" />
            <Typography className="!text-white !text-base font-medium ">
              HackLetter
            </Typography>
          </Link>
        </div>
        <div className="flex max-w-fit items-center gap-x-4">
          {/* <Link
            href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
            target="_blank"
            className="pointer block w-fit flex-1"
          >
            <Typography variant="p" className="w-max">
              Book a demo
            </Typography>
          </Link> */}
          <Link
            href="/terms-of-service"
            className="pointer block w-fit flex-1"
          >
            <Typography variant="p" className="w-max">
              Terms of service
            </Typography>
          </Link>
          <Link
            href="/privacy-policy"
            className="pointer block w-fit"
          >
            <Typography variant="p">
              Privacy Policy
            </Typography>
          </Link>
        </div>
      </div>
    </footer>
  )
}
