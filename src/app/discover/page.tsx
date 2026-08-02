import { SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CreatorCard } from "@/components/creator-card";
import { creators } from "@/lib/data";

const filters = ["All", "Rising", "Art & studio", "Wellness", "Music", "Food", "Travel", "Design"];

export const metadata = { title: "Discover" };

export default function DiscoverPage() {
  return (
    <AppShell>
      <header className="page-heading">
        <div><p className="eyebrow">Find your corner</p><h1>Discover remarkable work.</h1><p>Human-picked creators, thoughtful previews, and no pay-to-rank listings.</p></div>
        <button className="button button-outline"><SlidersHorizontal size={15} />Filters</button>
      </header>
      <div className="filter-row">{filters.map((filter, index) => <button className={`filter-chip ${index === 0 ? "active" : ""}`} key={filter}>{filter}</button>)}</div>
      <section className="creator-grid">{creators.map((creator, index) => <CreatorCard creator={creator} index={index} key={creator.id} />)}</section>
    </AppShell>
  );
}
