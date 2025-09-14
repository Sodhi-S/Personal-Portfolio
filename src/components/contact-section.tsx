"use client"
import Image from "next/image";

import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import emailjs from "emailjs-com"

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
  ]

  const [playerName, setPlayerName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          playerName,
          email,
          message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("Message sent successfully!");
      setPlayerName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-bold tracking-wider mb-2">&gt; WARP ZONE...</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">CONNECT & COLLABORATE</h2>
          <p className="text-white max-w-2xl mx-auto">
            Ready the next level? Let's team up and build something super! Don't worry, crossplay is enabled
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="p-6 text-center bg-yellow-400 border-4 border-orange-500 hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Image src={method.icon} alt={method.label} width={32} height={32} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">{method.label}</h3>
              <p className="text-black text-sm mb-4 font-medium">{method.value}</p>
              <Button
                size="sm"
                className="w-full font-bold text-xs tracking-wider bg-orange-500 hover:bg-orange-600 text-black border-2 border-black"
                asChild={!!method.link}
              >
              <a href={method.link} target="_blank" rel="noopener noreferrer">{method.action}</a>
              </Button>
            </div>
          ))}
        </div>

        <div className="p-8 bg-yellow-400 border-4 border-orange-500">
          <h3 className="text-xl font-bold text-black mb-6 text-center">MESSAGE BLOCK</h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">PLAYER NAME</label>
                <input
                  type="text"
                  className="w-full p-3 bg-white border-2 border-black text-black font-mono text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="In case it wasn't obvious, name goes here"
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">EMAIL ADDRESS</label>
                <input
                  type="email"
                  className="w-full p-3 bg-white border-2 border-black text-black font-mono text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="yep, email goes here"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">MESSAGE</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-white border-2 border-black text-black font-mono text-sm focus:border-orange-500 focus:outline-none resize-none"
                placeholder=" Message ! "
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
            </div>

            <Button
              size="lg"
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold tracking-wider border-2 border-black"
              type="submit"
            >
              🚀 SEND MESSAGE
            </Button>
            {status && (
              <div className="text-center text-black font-bold mt-2">{status}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
