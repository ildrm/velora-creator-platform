import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Avatar } from "@/components/avatar";
import { HomeIntro } from "@/components/home-intro";
import { PostCard } from "@/components/post-card";
import { creators, posts } from "@/lib/data";

export default function HomePage() {
  return (
    <AppShell>
      <HomeIntro />

      <section className="story-row" aria-label="Creator updates">
        {creators.slice(0, 5).map((creator, index) => (
          <Link href={`/creator/${creator.handle}`} className="story-item" key={creator.id}>
            <span className={`story-ring ${index < 3 ? "unseen" : ""}`}><Avatar creator={creator} size="lg" /></span>
            <span>{creator.name.split(" ")[0]}</span>
          </Link>
        ))}
        <Link href="/discover" className="story-more"><span><ChevronRight size={19} /></span><small>More</small></Link>
      </section>

      <div className="feed-tabs"><button className="active">For you</button><button>Following</button><button>New releases</button></div>
      <div className="feed-list">{posts.map((post) => <PostCard post={post} key={post.id} />)}</div>
    </AppShell>
  );
}
