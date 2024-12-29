export const services = {
  salon: [
    {
      name: "Women's Haircut & Style",
      price: 80,
      description: "Professional cut and style tailored to your preferences.",
      duration: "60 min",
      image: "/images/womens-haircut.jpg",
      reviews: [
        { rating: 5, comment: "Absolutely loved my new hairstyle!" },
        { rating: 4, comment: "Great service, will definitely come back." },
      ],
    },
    {
      name: "Men's Haircut",
      price: 50,
      description: "Precision cut and styling for the modern gentleman.",
      duration: "45 min",
      image: "/images/mens-haircut.jpg",
      reviews: [
        { rating: 5, comment: "Best haircut I've had in years." },
        { rating: 5, comment: "Very professional and attentive to detail." },
      ],
    },
    // ... Add similar data for other salon services
  ],
  spa: [
    {
      name: "Swedish Massage",
      price: 100,
      description:
        "Relaxing full-body massage to ease tension and promote wellness.",
      duration: "60 min",
      image: "/images/swedish-massage.jpg",
      reviews: [
        {
          rating: 5,
          comment: "So relaxing, I fell asleep during the massage!",
        },
        { rating: 4, comment: "Great technique, felt much better afterwards." },
      ],
    },
    {
      name: "Deep Tissue Massage",
      price: 120,
      description:
        "Intensive massage targeting deep-seated tension and muscle knots.",
      duration: "60 min",
      image: "/images/deep-tissue-massage.jpg",
      reviews: [
        { rating: 5, comment: "Exactly what I needed for my back pain." },
        {
          rating: 4,
          comment: "Intense but effective. Felt great the next day.",
        },
      ],
    },
    // ... Add similar data for other spa services
  ],
  lounge: [
    {
      name: "Premium Cocktail Experience",
      price: 25,
      description:
        "Enjoy our signature cocktails crafted by expert mixologists.",
      duration: "N/A",
      image: "/images/cocktail-experience.jpg",
      reviews: [
        { rating: 5, comment: "The cocktails were amazing and unique!" },
        { rating: 4, comment: "Great atmosphere and service." },
      ],
    },
    {
      name: "Wine Tasting Flight",
      price: 35,
      description:
        "Sample a curated selection of fine wines from around the world.",
      duration: "45 min",
      image: "/images/wine-tasting.jpg",
      reviews: [
        {
          rating: 5,
          comment: "Excellent selection of wines, very informative.",
        },
        { rating: 5, comment: "A delightful experience for wine lovers." },
      ],
    },
    // ... Add similar data for other lounge services
  ],
};
