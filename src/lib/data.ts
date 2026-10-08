// Mock data for the Sahyog front-end. Replace with API calls later.
import medical from "@/assets/f-medical.jpg";
import animals from "@/assets/f-animals.jpg";
import education from "@/assets/f-education.jpg";
import community from "@/assets/f-community.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero2 from "@/assets/hero-2.jpg";

export const BRAND = "Sahyog";

export const CATEGORIES = [
  "Medical",
  "Memorial",
  "Education",
  "Animals",
  "Emergency",
  "Community",
  "Sports",
  "Charity",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type Fundraiser = {
  id: string;
  title: string;
  location: string;
  category: Category;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  organizer: string;
  story: string;
};

const imgFor: Record<Category, string> = {
  Medical: medical,
  Memorial: hero2,
  Education: education,
  Animals: animals,
  Emergency: community,
  Community: hero3,
  Sports: education,
  Charity: hero3,
};

const raw: [string, string, Category, number, number, string][] = [
  ["Help Maya beat leukaemia", "Bristol, UK", "Medical", 41250, 60000, "Sarah Lin"],
  [
    "Rebuild the Eastside community garden",
    "Austin, TX",
    "Community",
    8900,
    15000,
    "Green City Crew",
  ],
  ["Second chances for shelter pups", "Portland, OR", "Animals", 12600, 20000, "Paws Haven"],
  ["Books and desks for Sunrise School", "Pune, India", "Education", 5400, 9000, "Anita Rao"],
  ["In loving memory of Grandpa Joe", "Leeds, UK", "Memorial", 7300, 8000, "The Miller Family"],
  [
    "Flood relief for Riverside families",
    "Kerala, India",
    "Emergency",
    23100,
    40000,
    "Riverside Aid",
  ],
  ["Send our under-14s to nationals", "Dublin, IE", "Sports", 3200, 6000, "Coach Brennan"],
  ["Warm meals for the winter", "Toronto, CA", "Charity", 15800, 25000, "Hope Kitchen"],
  ["Physio for Leo after his accident", "Melbourne, AU", "Medical", 18400, 22000, "Emma Walsh"],
  ["Scholarships for first-gen students", "Lagos, NG", "Education", 9700, 30000, "Bright Futures"],
  ["Surgery for Bella the rescue cat", "Cardiff, UK", "Animals", 1450, 2500, "Tom Hughes"],
  [
    "Rebuild after the Hill Road fire",
    "Denver, CO",
    "Emergency",
    31000,
    50000,
    "Hill Road Neighbours",
  ],
];

export const FUNDRAISERS: Fundraiser[] = raw.map(
  ([title, location, category, raised, goal, organizer], i) => ({
    id: String(i + 1),
    title,
    location,
    category,
    image: imgFor[category],
    raised,
    goal,
    organizer,
    donors: Math.round(raised / 48),
    story: `${organizer} started this fundraiser because every bit of support matters. Funds raised will go directly toward "${title.toLowerCase()}". We'll share regular updates so you can see exactly where your donation goes. Thank you for being part of this story — whether you give or share, you're helping us get there.`,
  }),
);

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export type MenuItem = { title: string; desc: string; to: string; search?: Record<string, string> };

export const MENUS: { label: string; items: MenuItem[] }[] = [
  {
    label: "Donate",
    items: CATEGORIES.map((c) => ({
      title: c,
      desc: `Support ${c.toLowerCase()} fundraisers`,
      to: "/discover",
      search: { category: c },
    })),
  },
  {
    label: "Fundraise",
    items: [
      {
        title: "How to start a fundraiser",
        desc: "Step-by-step guide to launching",
        to: "/how-it-works",
      },
      {
        title: "Fundraising categories",
        desc: "Find the right fit for your cause",
        to: "/discover",
      },
      { title: "Team fundraising", desc: "Raise more together", to: "/how-it-works" },
      { title: "Fundraising blog", desc: "Stories, news and inspiration", to: "/how-it-works" },
      {
        title: "Fundraising tips",
        desc: "Practical advice to reach your goal",
        to: "/how-it-works",
      },
      { title: "Fundraising ideas", desc: "Creative ways to get started", to: "/how-it-works" },
      { title: "Charity fundraising", desc: "Raise money for a registered charity", to: "/start" },
      { title: "Sign up as a charity", desc: "Accept donations on Sahyog", to: "/signin" },
    ],
  },
  {
    label: "About",
    items: [
      {
        title: "How Sahyog works",
        desc: "The simple path from idea to impact",
        to: "/how-it-works",
      },
      { title: "Giving Guarantee", desc: "Your donation is protected", to: "/how-it-works" },
      { title: "Supported countries", desc: "Where you can fundraise", to: "/how-it-works" },
      { title: "Pricing", desc: "No fee to start", to: "/pricing" },
      { title: "Help Centre", desc: "Answers to common questions", to: "/how-it-works" },
      { title: "About us", desc: "Our mission and team", to: "/how-it-works" },
      { title: "Press", desc: "News and media resources", to: "/how-it-works" },
      { title: "Careers", desc: "Join the team", to: "/how-it-works" },
    ],
  },
];

export const TOPICS = [
  {
    name: "Memorial & funeral",
    desc: "Honour a loved one and cover final expenses with support from your community.",
    image: hero2,
  },
  {
    name: "Medical",
    desc: "Get help with treatment, surgery, recovery and medical bills.",
    image: medical,
  },
  {
    name: "Charity",
    desc: "Raise money for a nonprofit you care about — funds go straight to them.",
    image: hero3,
  },
  {
    name: "Team",
    desc: "Invite friends to fundraise with you and multiply your reach.",
    image: community,
  },
  {
    name: "Education",
    desc: "Fund tuition, school supplies, trips and scholarships.",
    image: education,
  },
];

export const BLOG = [
  { title: "10 ways to share your fundraiser that actually work", tag: "Tips", image: community },
  { title: "How one classroom raised $9,000 in a month", tag: "Success stories", image: education },
  { title: "Writing a fundraiser story that moves people", tag: "Guides", image: medical },
];
