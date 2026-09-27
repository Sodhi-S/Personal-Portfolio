"use client"
import Image from "next/image";

import { Button } from "@/components/ui/button"

const EMAIL = "sssodhi@uwaterloo.ca"

// Pixel envelope, sized like the LinkedIn / GitHub logos.
function Envelope() {
  return (
    <svg viewBox="0 0 16 12" width={32} height={24} shapeRendering="crispEdges" aria-hidden="true" className="inline align-middle">
      <rect x="0" y="0" width="16" height="12" fill="#000" />
      <rect x="1" y="1" width="14" height="10" fill="#fff" />
      <path d="M1 1h2v1h2v1h2v1h2V3h2V2h2V1h2v2h-2v1h-2v1h-2v1H7V5H5V4H3V3H1z" fill="#000" />
    </svg>
  )
}

export function ContactSection() {
  const contactMethods = [
    {
      icon: "/linkedin.png",
      label: "LINKEDIN",
      value: "/in/sahejsinghsodhi",
      action: "CONNECT",
      link: "https://www.linkedin.com/in/sahejsinghsodhi/",
    },
    {
      icon: "/github.png",
      label: "GITHUB",
      value: "/Sodhi-S",
      action: "VIEW PAGE",
      link: "https://github.com/Sodhi-S",
    },
    {
      icon: null,
      label: "EMAIL",
      value: EMAIL,
      action: "SEND MESSAGE",
      link: `mailto:${EMAIL}`,
    },
  ]

  return (
    <section className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-bold tracking-wider mb-2 eyebrow">&gt; WARP ZONE...</div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">CONNECT & COLLABORATE</h2>
          <p className="text-white max-w-2xl mx-auto">
            Ready the next level? Let's team up and build something super! Don't worry, crossplay is enabled
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="flex flex-col p-6 text-center bg-yellow-400 border-4 border-orange-500 hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {method.icon ? (
                  <Image src={method.icon} alt={method.label} width={32} height={32} style={{ display: 'inline', verticalAlign: 'middle' }} />
                ) : (
                  <Envelope />
                )}
              </div>
              <h3 className="text-sm md:text-base font-bold text-black mb-2">{method.label}</h3>
              <p className="text-black text-sm mb-4 font-medium break-all">{method.value}</p>
              <Button
                size="sm"
                className="mt-auto w-full font-bold text-xs tracking-wider bg-orange-500 hover:bg-orange-600 text-black border-2 border-black"
                asChild={!!method.link}
              >
              {method.link.startsWith("mailto:") ? (
                <a href={method.link}>{method.action}</a>
              ) : (
                <a href={method.link} target="_blank" rel="noopener noreferrer">{method.action}</a>
              )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
