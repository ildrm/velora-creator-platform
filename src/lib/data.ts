export type Creator = {
  id: string;
  name: string;
  handle: string;
  category: string;
  bio: string;
  followers: string;
  price: number;
  verified: boolean;
  accent: string;
  avatar: string;
  initials: string;
};

export type Post = {
  id: string;
  creator: Creator;
  caption: string;
  postedAt: string;
  likes: number;
  comments: number;
  locked: boolean;
  price?: number;
  mediaLabel: string;
  gradient: string;
};

export const creators: Creator[] = [
  {
    id: "c1",
    name: "Maya Chen",
    handle: "mayamakes",
    category: "Studio & craft",
    bio: "Slow-made ceramics, studio notes, and monthly collector drops.",
    followers: "48.2K",
    price: 8,
    verified: true,
    accent: "#ff7657",
    avatar: "linear-gradient(145deg, #ffd7a8, #e86f51 55%, #623a6d)",
    initials: "MC",
  },
  {
    id: "c2",
    name: "Jon Bell",
    handle: "fieldnotes",
    category: "Travel films",
    bio: "Unhurried films and field recordings from places worth staying awhile.",
    followers: "31.7K",
    price: 6,
    verified: true,
    accent: "#396b67",
    avatar: "linear-gradient(145deg, #b8dccf, #396b67 58%, #132d32)",
    initials: "JB",
  },
  {
    id: "c3",
    name: "Nia Rivers",
    handle: "niarivers",
    category: "Movement",
    bio: "Strength, mobility, and realistic routines for creative people.",
    followers: "92.4K",
    price: 12,
    verified: true,
    accent: "#8158c8",
    avatar: "linear-gradient(145deg, #e0cafb, #8158c8 58%, #2d1b55)",
    initials: "NR",
  },
  {
    id: "c4",
    name: "Theo Sunday",
    handle: "theosunday",
    category: "Food & culture",
    bio: "Recipes with a story, weekend tables, and the occasional beautiful mess.",
    followers: "25.9K",
    price: 5,
    verified: true,
    accent: "#cf8d27",
    avatar: "linear-gradient(145deg, #ffe0a1, #cf8d27 58%, #5a3425)",
    initials: "TS",
  },
  {
    id: "c5",
    name: "Lena Ortiz",
    handle: "lenalate",
    category: "Music",
    bio: "Demos, writing sessions, and songs before they become songs.",
    followers: "64.1K",
    price: 9,
    verified: true,
    accent: "#d24d76",
    avatar: "linear-gradient(145deg, #ffc6d5, #d24d76 58%, #50223a)",
    initials: "LO",
  },
  {
    id: "c6",
    name: "Arun Vale",
    handle: "arunbuilds",
    category: "Design",
    bio: "Objects, systems, prototypes, and honest notes from the middle of the work.",
    followers: "18.6K",
    price: 7,
    verified: true,
    accent: "#3f6fb5",
    avatar: "linear-gradient(145deg, #c4ddff, #3f6fb5 58%, #182a53)",
    initials: "AV",
  },
];

export const posts: Post[] = [
  {
    id: "p1",
    creator: creators[0],
    caption: "A first look at the glaze tests for next month’s collector drop. The two quietest colors won.",
    postedAt: "18 min",
    likes: 1248,
    comments: 84,
    locked: false,
    mediaLabel: "Glaze study · No. 14",
    gradient: "linear-gradient(135deg, #f2d7b5 0%, #d98b6d 35%, #7e8a73 65%, #302c35 100%)",
  },
  {
    id: "p2",
    creator: creators[2],
    caption: "The complete 24-minute mobility reset is ready. Save this one for the days your desk wins.",
    postedAt: "2 hr",
    likes: 932,
    comments: 51,
    locked: true,
    price: 7,
    mediaLabel: "Members-only video · 24:08",
    gradient: "linear-gradient(140deg, #2a2044, #7d5ab0 42%, #dd9baa 72%, #f3caa9)",
  },
  {
    id: "p3",
    creator: creators[1],
    caption: "Morning tide, one fixed lens, no narration. A small film from the northern edge of Skye.",
    postedAt: "Yesterday",
    likes: 2174,
    comments: 129,
    locked: false,
    mediaLabel: "Field film · Isle of Skye",
    gradient: "linear-gradient(145deg, #b5c7c5, #607e7a 40%, #29464d 70%, #12262c)",
  },
];

export const topics = ["Studio visits", "Movement", "Indie music", "Slow travel", "Food stories"];
