import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import type { Creator } from "@/lib/data";
import { Avatar } from "./avatar";

export function CreatorCard({ creator, index = 0 }: { creator: Creator; index?: number }) {
  const gradients = [
    "linear-gradient(135deg, #efc3a5, #9c5a59 45%, #3a3152)",
    "linear-gradient(135deg, #bcd7cc, #4c7976 52%, #173742)",
    "linear-gradient(135deg, #dbc7ef, #8a62b7 50%, #433063)",
    "linear-gradient(135deg, #f3d9a7, #d08a3e 52%, #654034)",
    "linear-gradient(135deg, #f1c3d1, #be557a 50%, #55293b)",
    "linear-gradient(135deg, #c9dbef, #557db2 50%, #263a59)",
  ];
  return (
    <Link href={`/creator/${creator.handle}`} className="creator-card">
      <div className="creator-card-cover" style={{ background: gradients[index % gradients.length] }}>
        <span className="media-noise" />
        <span className="cover-orbit orbit-one" /><span className="cover-orbit orbit-two" />
        <span className="category-chip">{creator.category}</span>
        <span className="card-arrow"><ArrowUpRight size={19} /></span>
      </div>
      <div className="creator-card-body">
        <Avatar creator={creator} size="lg" />
        <div className="creator-card-title"><h3>{creator.name}</h3>{creator.verified && <ShieldCheck size={15} fill="currentColor" />}</div>
        <p>@{creator.handle} · {creator.followers} followers</p>
        <span className="creator-card-bio">{creator.bio}</span>
        <div className="creator-card-foot"><strong>${creator.price}<small>/month</small></strong><span>View creator</span></div>
      </div>
    </Link>
  );
}
