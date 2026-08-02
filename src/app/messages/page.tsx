"use client";

import { Image as ImageIcon, LockKeyhole, MoreHorizontal, Search, Send, ShieldCheck, Smile } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Avatar } from "@/components/avatar";
import { creators } from "@/lib/data";

export default function MessagesPage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  return (
    <AppShell compact>
      <section className="messages-shell">
        <aside className="conversation-list">
          <div className="messages-title"><div><p className="eyebrow">Your circle</p><h1>Messages</h1></div><button className="icon-button"><MoreHorizontal size={19} /></button></div>
          <div className="conversation-search"><Search size={15} /><input placeholder="Search conversations" /></div>
          {creators.slice(0,5).map((creator,index) => <button className={`conversation-row ${index === 0 ? "active" : ""}`} key={creator.id}><Avatar creator={creator} /><span><strong>{creator.name}</strong><small>{index === 0 ? "The archive is live ✦" : ["Sent a new post", "Thank you!", "Live tomorrow at 6", "Shared a collection"][index-1]}</small></span><time>{["12m","1h","Tue","Sun","Fri"][index]}</time></button>)}
        </aside>
        <div className="chat-panel">
          <header className="chat-header"><Avatar creator={creators[0]} /><span><strong>Maya Chen <ShieldCheck size={13} fill="currentColor" /></strong><small>Usually replies within a day</small></span><button className="icon-button"><MoreHorizontal size={19} /></button></header>
          <div className="chat-messages"><span className="day-marker">Today</span><div className="message incoming">The glaze archive is finally live. I added notes on what changed between every firing.</div><div className="locked-message"><span className="locked-message-art"><LockKeyhole size={20} /></span><span><strong>Studio archive · 18 images</strong><small>Included with your membership</small></span><button className="button button-light button-small">Open</button></div><div className="message outgoing">This is exactly the process detail I was hoping for—thank you.</div>{sent.map((item,index) => <div className="message outgoing" key={`${item}-${index}`}>{item}</div>)}</div>
          <form className="message-composer" onSubmit={(event) => { event.preventDefault(); if (message.trim()) { setSent([...sent,message.trim()]); setMessage(""); } }}><button type="button" className="icon-button"><ImageIcon size={18} /></button><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a message…" aria-label="Message" /><button type="button" className="icon-button"><Smile size={18} /></button><button className="send-button" aria-label="Send"><Send size={16} /></button></form>
        </div>
      </section>
    </AppShell>
  );
}
