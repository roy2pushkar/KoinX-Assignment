import React from "react";
const Footer = () => {
    // Sample data for "You May Also Like" and "Trending Coins"
  const youMayAlsoLike = [
    { name: "BNB", price: "$319.34", change: "+0.52%", img: "https://placehold.co/20x20", chart: "https://placehold.co/150x50", isPositive: true },
    { name: "SOL", price: "$109.33", change: "-2.89%", img: "https://placehold.co/20x20", chart: "https://placehold.co/150x50", isPositive: false },
    { name: "XRP", price: "$0.634810", change: "+0.78%", img: "https://placehold.co/20x20", chart: "https://placehold.co/150x50", isPositive: true },
    { name: "ADA", price: "$0.614869", change: "-1.57%", img: "https://placehold.co/20x20", chart: "https://placehold.co/150x50", isPositive: false },
    { name: "AVAX", price: "$41.05", change: "-3.78%", img: "https://placehold.co/20x20", chart: "https://placehold.co/150x50", isPositive: false },
  ];
  // Component for rendering cards
  const Card = ({ name, price, change, img, chart, isPositive }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <img src={img} alt={`${name} logo`} className="w-5 h-5 mr-2" />
        <span className="font-bold">{name}</span>
        <span className={`ml-2 ${isPositive ? "text-green-500" : "text-red-500"}`}>{change}</span>
      </div>
      <div className="text-xl font-bold mb-2">{price}</div>
      <img src={chart} alt={`${name} chart`} className="w-full" />
    </div>
  );
   return (
    <div className="w-full p-6"> {/* Main div with full width */}
  {/* Section: You May Also Like */}
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
    <div className="flex items-center space-x-4 w-full">
      <button className="p-2 bg-white rounded-full shadow">
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="flex space-x-4 overflow-x-auto w-full justify-evenly"> {/* Use justify-evenly here */}
        {youMayAlsoLike.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
      <button className="p-2 bg-white rounded-full shadow">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>

  {/* Section: Trending Coins */}
  <div>
    <h2 className="text-2xl font-bold mb-4">Trending Coins</h2>
    <div className="flex items-center space-x-4 w-full">
      <button className="p-2 bg-white rounded-full shadow">
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="flex space-x-4 overflow-x-auto w-full justify-evenly"> {/* Use justify-evenly here */}
        {youMayAlsoLike.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
      <button className="p-2 bg-white rounded-full shadow">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
    </div>
   )
}
export default Footer;