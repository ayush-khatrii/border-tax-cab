import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-12 bg-primary/10">
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-white rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Pay Entry Tax Online
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mb-6">
          Skip long queues and complete your Border tax in minutes—hassle free and secure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button className='w-full' asChild>
            <Link href="#book">
              Start Payment
            </Link>
          </Button>
          <Button className='w-full' asChild variant="outline">
            <Link href="/about">
              Know more
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
