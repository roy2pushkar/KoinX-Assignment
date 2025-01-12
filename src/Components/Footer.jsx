import React, { useState, useEffect } from "react";

const Footer = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [popularCoins, setPopularCoins] = useState([]);
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0); // Index for sliding trending cards
  const [currentPopularIndex, setCurrentPopularIndex] = useState(0); // Index for sliding "You May Also Like" cards

  // Fetch trending coins data from CoinGecko API
  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/search/trending");
        const data = await response.json();

        // Map the API response to include required fields
        const coins = data.coins.map((coin) => ({
          name: coin.item.name, // Display full name
          symbol: coin.item.symbol,
          price: "$" + coin.item.market_cap_rank, // Placeholder price (or adjust for real price if needed)
          change: "+0.00%", // Placeholder change value
          img: coin.item.small,
          chartSymbol: coin.item.symbol.toUpperCase(),
          isPositive: Math.random() > 0.5, // Random placeholder for positive/negative change
        }));

        setTrendingCoins(coins);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };

    // Fetch popular coins from CoinGecko API (Top 5 coins by market cap)
    const fetchPopularCoins = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1");
        const data = await response.json();
        setPopularCoins(data);
      } catch (error) {
        console.error("Error fetching popular coins:", error);
      }
    };

    fetchTrendingCoins();
    fetchPopularCoins();
  }, []);

  // Main Card Component for displaying each coin's info
  const MainCard = ({ name, price, change, img, isPositive }) => (
    <div className="bg-white rounded-lg shadow p-4 w-60">
      <div className="flex items-center mb-2">
        <img src={img} alt={`${name} logo`} className="w-6 h-6 mr-2" />
        <span className="font-bold">{name}</span>
        <span className={`ml-2 ${isPositive ? "text-green-500" : "text-red-500"}`}>{change}</span>
      </div>
      <div className="text-xl font-bold mb-2">{price}</div>
    </div>
  );

  // Nested Card Component (only for the graph)
  const NestedCard = ({ symbol }) => (
    <div className="bg-white rounded-lg shadow p-4 w-60">
      {/* Mini Chart Widget for displaying line chart */}
      <iframe
        title={`${symbol} mini chart`}
        width="100%"
        height="120"
        src={`https://s.tradingview.com/widgetembed/?symbol=BINANCE:${symbol}USDT&interval=15&theme=light&style=1`}
        style={{ border: "none" }}
      ></iframe>
    </div>
  );

  // Handlers for sliding the cards
  const slideLeftTrending = () => {
    setCurrentTrendingIndex((prev) => Math.max(prev - 1, 0)); // Prevent going below 0
  };

  const slideRightTrending = () => {
    setCurrentTrendingIndex((prev) => Math.min(prev + 1, trendingCoins.length - 5)); // Prevent going beyond the last set of 5
  };

  const slideLeftPopular = () => {
    setCurrentPopularIndex((prev) => Math.max(prev - 1, 0)); // Prevent going below 0
  };

  const slideRightPopular = () => {
    setCurrentPopularIndex((prev) => Math.min(prev + 1, popularCoins.length - 5)); // Prevent going beyond the last set of 5
  };

  return (
    <div className="w-full p-6">
      {/* "You May Also Like" Section */}
      <div className="you-may-also-like">
        <h3 className="text-xl font-bold mb-4">You May Also Like</h3>
        <div className="flex items-center space-x-4">
          {/* Left Arrow for Popular Coins */}
          <button
            onClick={slideLeftPopular}
            className="p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition-all disabled:opacity-50"
            disabled={currentPopularIndex === 0}
          >
            <i className="fas fa-chevron-left text-black"></i> {/* FontAwesome Left Arrow */}
          </button>

          {/* Cards for popular coins */}
          <div className="flex overflow-hidden w-full space-x-4">
            {popularCoins.slice(currentPopularIndex, currentPopularIndex + 5).map((coin) => (
              <div className="w-60" key={coin.id}>
                <MainCard name={coin.name} price={`$${coin.current_price}`} change={"+0.00%"} img={coin.image} isPositive={true} />
                <NestedCard symbol={coin.symbol} />
              </div>
            ))}
          </div>

          {/* Right Arrow for Popular Coins */}
          <button
            onClick={slideRightPopular}
            className="p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition-all disabled:opacity-50"
            disabled={currentPopularIndex >= popularCoins.length - 5}
          >
            <i className="fas fa-chevron-right text-black"></i> {/* FontAwesome Right Arrow */}
          </button>
        </div>
      </div>

      {/* Trending Coins Section */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Trending Coins</h2>
      <div className="flex items-center space-x-4">
        {/* Left Arrow for Trending Coins */}
        <button
          onClick={slideLeftTrending}
          className="p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition-all disabled:opacity-50"
          disabled={currentTrendingIndex === 0}
        >
          <i className="fas fa-chevron-left text-black"></i> {/* FontAwesome Left Arrow */}
        </button>

        {/* Cards for trending coins */}
        <div className="flex overflow-hidden w-full space-x-4">
          {trendingCoins.slice(currentTrendingIndex, currentTrendingIndex + 5).map((item, index) => (
            <div className="w-60" key={index}>
              <MainCard name={item.name} price={item.price} change={item.change} img={item.img} isPositive={item.isPositive} />
              <NestedCard symbol={item.chartSymbol} />
            </div>
          ))}
        </div>

        {/* Right Arrow for Trending Coins */}
        <button
          onClick={slideRightTrending}
          className="p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition-all disabled:opacity-50"
          disabled={currentTrendingIndex >= trendingCoins.length - 5}
        >
          <i className="fas fa-chevron-right text-black"></i> {/* FontAwesome Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default Footer;
