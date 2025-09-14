"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import RetroRacecarGame from "@/components/RaceCarGame"

interface RaceCarGameModalProps {
  triggerLabel?: string
}

export default function RaceCarGameModal({ triggerLabel = "START GAME" }: RaceCarGameModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 border-4 border-orange-500 hover:text-black"
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl w-full">
        <DialogTitle>Career Journey Game</DialogTitle>
        <RetroRacecarGame />
      </DialogContent>
    </Dialog>
  )
}


