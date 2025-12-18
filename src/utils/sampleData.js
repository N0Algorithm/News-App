export const sampleArticles = [
    {
        article_id: "sample-1",
        title: "NASA's James Webb Telescope Discovers New Distant Galaxy",
        link: "#",
        description: "Astronomers using the James Webb Space Telescope have identified a galaxy that formed just 300 million years after the Big Bang, breaking previous records.",
        pubDate: "2025-12-18 08:00:00",
        image_url: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop",
        source_id: "cosmos_daily",
        category: ["science"],
        creator: ["Dr. Sarah Jenkins"]
    },
    {
        article_id: "sample-2",
        title: "Tech Giants Announce Unified AI Safety Protocol",
        link: "#",
        description: "Leading technology companies have agreed on a groundbreaking set of guidelines to ensure the ethical development and deployment of advanced artificial intelligence.",
        pubDate: "2025-12-18 09:30:00",
        image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        source_id: "tech_crunch",
        category: ["technology"],
        creator: ["Michael Chen"]
    },
    {
        article_id: "sample-3",
        title: "Global Markets Rally Amid Positive Economic Data",
        link: "#",
        description: "Stock markets across Asia and Europe saw significant gains today as investors reacted to lower-than-expected inflation reports from major economies.",
        pubDate: "2025-12-18 10:15:00",
        image_url: "https://images.unsplash.com/photo-1611974714024-4607a50ad7a7?q=80&w=1000&auto=format&fit=crop",
        source_id: "business_insider",
        category: ["business"],
        creator: ["Amanda Roberts"]
    },
    {
        article_id: "sample-4",
        title: "Sustainable Architecture: The Future of Urban Living",
        link: "#",
        description: "A new wave of green skyscrapers is transforming city skylines, combining luxury living with vertical forests and carbon-neutral energy systems.",
        pubDate: "2025-12-18 11:00:00",
        image_url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop",
        source_id: "design_weekly",
        category: ["environment"],
        creator: ["Liam Thorne"]
    },
    {
        article_id: "sample-5",
        title: "Breakthrough in Renewable Battery Storage Technology",
        link: "#",
        description: "Scientists have developed a new solid-state battery that can store five times more energy than current lithium-ion models, promising a revolution for EVs.",
        pubDate: "2025-12-18 12:00:00",
        image_url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop",
        source_id: "energy_news",
        category: ["technology"],
        creator: ["David Wilson"]
    }
];

export const getSampleByCategory = (category) => {
    return sampleArticles.filter(art => art.category.includes(category));
};
