export const faqs = [
  { q: "What platforms do you edit videos for?", a: "We primarily edit for YouTube, TikTok, Instagram Reels, and LinkedIn. However, we can adapt our edits to any platform's specifications." },
  { q: "How does the Few Pixels editing process work?", a: "Once you partner with Few Pixels, you'll get access to a dedicated client portal. You upload your raw footage, submit a brief, and our team gets to work. We deliver the first draft within 2-4 days, and you can request revisions until you're happy." },
  { q: "Can you add captions, music, and effects?", a: "Absolutely! All our packages include professional captions, royalty-free music, sound effects, motion graphics, and color grading to make your videos pop." },
  { q: "What if I'm not happy with the first edit?", a: "We offer unlimited revisions on most of our packages. We'll keep tweaking the edit until it perfectly matches your vision and brand." }
];

export const workflow = [
  { title: "Discovery Call", desc: "Schedule a free consultation to share your vision, goals, and assets." },
  { title: "File Upload", desc: "Send raw recordings via Google Drive, Dropbox, or Frame.io." },
  { title: "Editing Begins", desc: "The Few Pixels team starts editing within 24-48 hours. We match your style, branding, and voice." },
  { title: "Review & Feedback", desc: "You'll receive a draft via Frame.io for easy, timestamped notes. We offer unlimited revisions on most packages." },
  { title: "Delivery", desc: "Final files are provided in all necessary specs for YouTube, podcast platforms, and social media." }
];

export const testimonials = Array(6).fill({
  text: "Few Pixels completely transformed my channel. I send raw clips, and they come back looking like they were made for TV. Super quick turnaround and always nails the vibe.",
  name: "James Richardson",
  subs: "18.6K"
}).map((t, i) => ({ ...t, avatar: `https://i.pravatar.cc/150?img=${i + 30}` }));
