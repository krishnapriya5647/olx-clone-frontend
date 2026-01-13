// src/data/products.js

export const CATEGORIES = [
  "Cars",
  "Mobiles",
  "Electronics",
  "Bikes",
  "Furniture",
  "Fashion",
  "Jobs",
  "Real Estate",
];

/**
 * Put YOUR OWN image links later.
 * For now, each product uses ONLY 1 image.
 * (Details page gallery still works with 1 image.)
 *
 * Tip: Use direct image URLs:
 *  - https://.../image.jpg  OR  /images/iphone-1.jpg (if stored in public/images)
 */

export const BASE_PRODUCTS = [
  {
    id: "101",
    title: "iPhone 12 - 128GB (Good condition)",
    price: 35999,
    category: "Mobiles",
    location: "Kochi",
    postedAt: "2025-12-28",
    images: ["https://i.ytimg.com/vi/uraR-QBN2vs/maxresdefault.jpg"],
    description: "Battery good. No major scratches. Box available.",
    seller: { name: "Arun", phone: "9XXXXXXXXX" },
  },
  {
    id: "102",
    title: "Royal Enfield Classic 350 - 2019",
    price: 145000,
    category: "Bikes",
    location: "Trivandrum",
    postedAt: "2025-12-20",
    images: ["https://images.carandbike.com/cms/articles/2023/10/3209900/Royal_Enfield_Classic_350_m1_59c1d9bdea.jpg"],
    description: "Well maintained. New tyres. Documents clear.",
    seller: { name: "Nithin", phone: "9XXXXXXXXX" },
  },
  {
    id: "103",
    title: "Sofa set 3+1+1 (Almost new)",
    price: 19000,
    category: "Furniture",
    location: "Bangalore",
    postedAt: "2025-12-10",
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/9/340288690/PM/JD/NN/163344506/rich-sofa-set-1000x1000.jpeg"],
    description: "Comfortable. No stains. Pickup only.",
    seller: { name: "Meera", phone: "9XXXXXXXXX" },
  },
  {
    id: "104",
    title: "Honda City 2016 - Petrol - Single owner",
    price: 530000,
    category: "Cars",
    location: "Chennai",
    postedAt: "2025-11-30",
    images: ["https://media.karousell.com/media/photos/products/2020/6/24/2016_honda_city_vx_navi_auto_1592977170_4bb4419d_progressive.jpg"],
    description: "Service record available. Insurance active.",
    seller: { name: "Suresh", phone: "9XXXXXXXXX" },
  },
  {
    id: "105",
    title: "Gaming Laptop i5 + GTX (8GB/512SSD)",
    price: 44999,
    category: "Electronics",
    location: "Hyderabad",
    postedAt: "2025-12-25",
    images: ["https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6503/6503849_rd.jpg"],
    description: "Runs games smoothly. Charger included.",
    seller: { name: "Faiz", phone: "9XXXXXXXXX" },
  },
  {
    id: "106",
    title: "2BHK Flat for Rent - Near Metro",
    price: 18000,
    category: "Real Estate",
    location: "Delhi",
    postedAt: "2025-12-15",
    images: ["https://thearchitectsdiary.com/wp-content/uploads/2024/04/2BHK-flat-in-bangalore-13-1024x682.webp"],
    description: "Family preferred. Water 24x7. Balcony.",
    seller: { name: "Rohit", phone: "9XXXXXXXXX" },
  },
];
