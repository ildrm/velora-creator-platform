import Link from "next/link";
import { notFound } from "next/navigation";
import { Bell, Check, Heart, MessageCircle, MoreHorizontal, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Avatar } from "@/components/avatar";
import { PostCard } from "@/components/post-card";
import { creators, posts } from "@/lib/data";

export async function generateStaticParams() { return creators.map(({ handle }) => ({ handle })); }

export default async function CreatorPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const creator = creators.find((item) => item.handle === handle);
  if (!creator) notFound();
  const creatorPosts = posts.filter((post) => post.creator.id === creator.id);
  const fallbackPosts = creatorPosts.length ? creatorPosts : posts.slice(0, 2).map((post, index) => ({ ...post, id: `${creator.id}-${index}`, creator }));

  return (
    <AppShell compact>
      <section className="profile-hero">
        <div className="profile-cover" style={{ background: `linear-gradient(135deg, ${creator.accent}33, ${creator.accent}, #252332)` }}><span className="media-noise" /><span className="profile-cover-shape shape-a" /><span className="profile-cover-shape shape-b" /></div>
        <div className="profile-body">
          <div className="profile-avatar-wrap"><Avatar creator={creator} size="xl" /></div>
          <div className="profile-actions"><button className="icon-button bordered"><Bell size={18} /></button><button className="icon-button bordered"><MoreHorizontal size={19} /></button><Link href="/verify" className="button button-primary">Subscribe · ${creator.price}/mo</Link></div>
          <div className="profile-copy">
            <h1>{creator.name} <ShieldCheck size={19} fill="currentColor" /></h1>
            <p className="profile-handle">@{creator.handle}</p>
            <p className="profile-bio">{creator.bio}</p>
            <div className="profile-stats"><span><strong>{creator.followers}</strong> followers</span><span><strong>214</strong> posts</span><span><strong>4.9</strong> member rating</span></div>
          </div>
        </div>
      </section>
      <section className="membership-card">
        <div><p className="eyebrow">Membership</p><h2>Come behind the work.</h2><p>Full archive, new releases, studio notes, and member-only conversations.</p></div>
        <ul><li><Check size={14} />Complete members feed</li><li><Check size={14} />Monthly live session</li><li><Check size={14} />Cancel whenever you like</li></ul>
        <div className="membership-price"><strong>${creator.price}</strong><span>per month</span><Link href="/verify" className="button button-dark">Join the circle</Link></div>
      </section>
      <div className="profile-tabs"><button className="active">Posts</button><button>Collections</button><button>About</button></div>
      <div className="feed-list profile-feed">{fallbackPosts.map((post) => <PostCard post={post} key={post.id} />)}</div>
      <div className="profile-side-summary"><Heart size={16} /><strong>Built for genuine connection.</strong><span>Creator-owned audience. Clear pricing. Private payments.</span><MessageCircle size={16} /></div>
    </AppShell>
  );
}
