export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Game Logo T-Shirt",
    description: "Show your love for the game with this awesome t-shirt",
    price: 0.01,
    image: "/product-1.webp",
  },
  {
    id: "2",
    name: "Character Figurine",
    description: "Collect your favorite game character",
    price: 0.1,
    image: "/product-2.webp",
  },
  {
    id: "3",
    name: "Game Soundtrack",
    description: "Listen to the epic game music anytime",
    price: 0.05,
    image: "/product-3.webp",
  },
];
