import React from "react";
import  { useEffect, useState } from 'react';
import axios from 'axios';
import frame from '../Assests/Frame.png';
import frame1 from '../Assests/Frame 1116601921 (1).png';
import frame2 from '../Assests/Frame 1116601921.png';
import frame3 from '../Assests/Rectangle 11947.png';
import frame4 from '../Assests/Rectangle 11947 (2).png';
import team from '../Assests/sandeep.png';
import team1 from '../Assests/sandeep (1).png';
import team2 from '../Assests/sandeep (2).png';


const MainContent = ()=> {
  const [priceData, setPriceData] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceError, setPriceError] = useState(null);
  const [coinsError, setCoinsError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7D');
  const [selectedNav, setSelectedNav] = useState('Overview');


  // Fetch Bitcoin price data on component mount
  useEffect(() => {
  const fetchBitcoinPrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd,inr',
          include_24hr_change: true,
        },
      });

      const bitcoinData = response.data.bitcoin;

      // Ensuring the price change values are numbers or fallback to 0 if undefined
      const usd_24h_change = bitcoinData.usd_24h_change !== undefined ? Number(bitcoinData.usd_24h_change) : 0; // Convert to number
      const inr_24h_change = bitcoinData.inr_24h_change !== undefined ? Number(bitcoinData.inr_24h_change) : 0; // Convert to number

      // Determine the arrow and color for USD and INR
      const usdChange = usd_24h_change !== 0 ? `${usd_24h_change > 0 ? '▲' : '▼'} ${Math.abs(usd_24h_change).toFixed(2)}%` : 'N/A';
      const inrChange = inr_24h_change !== 0 ? `${inr_24h_change > 0 ? '▲' : '▼'} ${Math.abs(inr_24h_change).toFixed(2)}%` : 'N/A';

      const usdColor = usd_24h_change > 0 ? 'text-green-500' : usd_24h_change < 0 ? 'text-red-500' : '';
      const inrColor = inr_24h_change > 0 ? 'text-green-500' : inr_24h_change < 0 ? 'text-red-500' : '';

      setPriceData({
        usd: bitcoinData.usd,
        inr: bitcoinData.inr,
        usd_24h_change: usdChange,
        inr_24h_change: inrChange,
        usdColor,
        inrColor
      });

    } catch (err) {
      setPriceError('Failed to fetch price data');
    }
  };

  fetchBitcoinPrice();
}, []);

  // Fetch trending coins data on component mount
 useEffect(() => {
  const fetchTrendingCoins = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
      console.log('API Response:', response.data); // Log full API response

      const topCoins = response.data.coins.slice(0, 3).map((coin, index) => {
        const { name, large } = coin.item; // Extract the name and logo
        const priceChangeData = coin.item.data?.price_change_percentage_24h?.usd; // Extract USD price change

        // Log extracted change data
        console.log(`Coin #${index + 1} - Name: ${name}, Change Data (USD): ${priceChangeData}`);

        // Handle missing price change data
        let change = 'No data';
        let color = 'text-gray-500';
        if (priceChangeData !== undefined) {
          change = `${priceChangeData > 0 ? '▲' : '▼'} ${Math.abs(priceChangeData).toFixed(2)}%`;
          color = priceChangeData > 0 ? 'text-green-500' : 'text-red-500';
        }

        return {
          name,
          logo: large,
          change,
          color,
        };
      });

      setCoins(topCoins); // Update state with top 3 coins
    } catch (err) {
      console.error('Error fetching trending coins:', err); // Log errors
      setCoinsError('Failed to fetch trending coins');
    } finally {
      setLoading(false);
    }
  };

  fetchTrendingCoins();
}, []);

  // Handle errors and loading state
  if (priceError) return <div className="text-red-500">{priceError}</div>;
  if (coinsError) return <div className="text-red-500">{coinsError}</div>;
  if (loading || !priceData) return <div>Loading...</div>;

  // Price and 24h change values
  const { usd, inr, usd_24h_change, inr_24h_change } = priceData;
   const teamMembers = [
    {
      name: "John Smith",
      designation: "Designation here",
      image: team,
      description:
        "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu.",
    },
    {
      name: "Elina Williams",
      designation: "Designation here",
      image: team1,
      description:
        "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu.",
    },
    {
      name: "John Smith",
      designation: "Designation here",
      image: team2,
      description:
        "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu.",
    },
  ];
  // State to track the selected time frame 
  const handleTimeframeClick = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };
  
    const handleNavClick = (nav) => {
    setSelectedNav(nav);
  };
  return (
    <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Left Section */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
              <a href="#" className="hover:underline">Cryptocurrencies</a> &gt; <a href="#" className="hover:underline">Bitcoin</a>
            </div>

            {/* Crypto Info */}
            <div className="space-y-6">
      {/* Title and Rank */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center">
          <img src="https://placehold.co/30x30" alt="Bitcoin Logo" className="mr-2" /> Bitcoin BTC
        </h1>
        <div className="bg-gray-200 px-3 py-1 rounded-md text-sm font-semibold">Rank #1</div>
      </div>

      {/* Price Info */}
      <div className="mb-6">
  <div className="flex items-center w-full">
    <button className="">
      <i className="fas fa-chevron-left"></i>
    </button>

    <div className="flex items-center space-x-4">
      <h2 className="text-3xl font-bold">${priceData.usd}</h2>

      <div className="flex items-center space-x-2">
        <span className={`font-semibold ${priceData.usdColor}`}>
          {priceData.usd_24h_change !== 'N/A' ? (
            <i
              className={`fas fa-arrow-${priceData.usd_24h_change.includes('▲') ? 'up' : 'down'} mr-1`}
            ></i>
          ) : null}
          {priceData.usd_24h_change}
        </span>
      </div>
      <span className="font-semibold text-gray">(24H)</span>
    </div>

    <button className="">
      <i className="fas fa-chevron-right"></i>
    </button>
  </div>

  <div className="text-sm text-gray-600">₹ {priceData.inr.toLocaleString()}</div>
  
</div>



      {/* Chart 
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Bitcoin Price Chart (USD)</h3>
        <TradingViewWidget
          symbol="BTCUSD"
          width="100%"
          height="400"
          interval="60"
          theme="light"
          locale="en"
        />
      </div>
      
      */}
      
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        {/* Timeframe Tabs */}
       <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold">Bitcoin Price Chart (USD)</h3>
      <div className="flex space-x-2 mb-6">
        {['1H', '24H', '7D', '1M', '3M', '6M', '1Y', 'ALL'].map((timeframe, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-full font-medium 
              ${selectedTimeframe === timeframe ? 'bg-gray-200 text-blue-600' : 'hover:bg-gray-200 hover:text-blue-600'}`}
            onClick={() => handleTimeframeClick(timeframe)} // Set selected timeframe
          >
            {timeframe}
          </button>
        ))}
      </div>
    </div>
        <iframe
          src="https://www.tradingview.com/widgetembed/?frameElementId=tradingview_8b43a&symbol=BTCUSD&interval=60&hidesidetoolbar=1&theme=light&style=1&toolbarbg=F1F3F4&saveimage=0&studies=RSI%40tv-basicstudies&autosize=1"
          width="100%"
          height="400"
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
          title="Bitcoin Price Chart"
        ></iframe>
      </div>
    </div>

            {/* Performance & Fundamentals (Merged) */}
            <div className="bg-gray-100 mt-4 font-sans">
      <div className=" mx-auto mb-6 ">
        {/* Navbar */}
        <div className="flex border-b pb-2 mb-4">
      {['Overview', 'Fundamentals', 'News Insights', 'Sentiments', 'Team', 'Technicals', 'Tokenomics'].map((nav, index) => (
        <a
          key={index}
          href="#"
          className={`text-lg font-medium mr-6 whitespace-nowrap 
            ${selectedNav === nav ? 'text-blue-600  border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600 hover:underline'}`}
          onClick={() => handleNavClick(nav)} // Set selected nav
        >
          {nav}
        </a>
      ))}
    </div>
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Performance</h1>
      
      {/* Today's Low/High */}
       <div className="flex justify-between items-center mb-6">
          <div className="text-left">
            <p className="text-gray-600">Today's Low</p>
            <p className="text-gray-600 font-semibold">46,930.22</p>
          </div>

           <div className="flex-1 mx-4">
  <div className="relative h-2 rounded-full">
    {/* Gradient with multiple colors */}
    <div className="absolute left-0 top-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full w-full"></div>
    {/* Triangle marker at 90% position */}
    <div className="absolute top-0 left-[80%] transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black  border-transparent border-t-black rounded-full">
    <p className="  mt-2">$48,637.83</p>
    </div>
  </div>
</div>
          <div className="text-right">
            <p className="text-gray-600">Today's High</p>
            <p className="text-gray-600 font-semibold">49,343.83</p>
          </div>
        </div>

        {/* 52W Low/High */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-left">
            <p className="text-gray-600">52W Low</p>
            <p className="text-gray-600 font-semibold">16,930.22</p>
          </div>
          <div className="flex-1 mx-4">
            <div className="relative h-2 rounded-full">
              {/* Gradient with a single color (Green in this case) */}
              <div className="absolute left-0 top-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full w-full"></div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-600">52W High</p>
            <p className="text-gray-600 font-semibold">49,743.83</p>
          </div>
        </div>

      {/* Fundamentals */}
      <h2 className="text-lg text-gray-600 font-semibold mb-4">Fundamentals <i className="fas fa-info-circle text-gray-400"></i></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between">
            <p className="text-gray-600">Bitcoin Price</p>
            <p className="font-semibold">$16,815.46</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-gray-600">24h Low / 24h High</p>
            <p className="font-semibold">$16,382.07 / $16,874.12</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-gray-600">7d Low / 7d High</p>
            <p className="font-semibold">$16,382.07 / $16,874.12</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-gray-600">Trading Volume</p>
            <p className="font-semibold">$23,249,202,782</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-gray-600">Market Cap Rank</p>
            <p className="font-semibold">#1</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <p className="text-gray-600">Market Cap</p>
            <p className="font-semibold">$323,507,290,047</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-gray-600">Market Cap Dominance</p>
            <p className="font-semibold">38.343%</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-gray-600">Volume / Market Cap</p>
            <p className="font-semibold">0.0718</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-gray-600">All-Time High</p>
            <p className="font-semibold">$69,044.77 <span className="text-red-500">-75.6%</span></p>
          </div>
          <p className="text-gray-400 text-right">Nov 10, 2021 (about 1 year)</p>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-gray-600">All-Time Low</p>
            <p className="font-semibold">$67.81 <span className="text-green-500">24729.1%</span></p>
          </div>
          <p className="text-gray-400 text-right">Jul 06, 2013 (over 9 years)</p>
        </div>
      </div>
    </div>
        
      </div>
           </div>
           {/* Sentiment Analysis */}
             <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sentiment</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Key Events
          <i className="fas fa-info-circle text-gray-400"></i>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-blue-50 p-6 rounded-lg flex">
    {/* Image aligned at the top */}
    <div className="flex-shrink-0">
      <img alt="Event icon" className="w-24 h-24 object-cover rounded-md" src={frame2} />
    </div>
    {/* Text beside the image */}
    <div className="ml-4">
      <h4 className="font-semibold text-lg">
        Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.
      </h4>
      <p className="text-sm text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet
        sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae
        sit nisi viverra natoque lacinia libero enim.
      </p>
    </div>
  </div>
  
  <div className="bg-green-50 p-6 rounded-lg flex">
    {/* Image aligned at the top */}
    <div className="flex-shrink-0">
      <img alt="Event icon" className="w-24 h-24 object-cover rounded-md" src={frame1} />
    </div>
    {/* Text beside the image */}
    <div className="ml-4">
      <h4 className="font-semibold text-lg">
        Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.
      </h4>
      <p className="text-sm text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien
        quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi
        viverra in a adipiscing metus quis del.
      </p>
    </div>
  </div>
</div>


      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">
          Analyst Estimates
          <i className="fas fa-info-circle text-gray-400"></i>
        </h3>
        <div className="flex items-center">
          {/* Reduced size of the circle to make it smaller */}
          <div className="bg-green-50 rounded-full w-24 h-24 flex items-center justify-center text-green-600 text-2xl font-bold mr-6">
            76%
          </div>
          <div className="flex-1">
  {/* Buy */}
  <div className="flex items-center mb-2">
    <span className="w-16 text-gray-600 font-semibold">Buy</span>
    <div className="flex-1 max-w-md bg-gray-200 h-1.5 rounded-full overflow-hidden">
      <div className="bg-green-500 h-full "></div>
    </div>
    <span className="ml-2">76%</span>
  </div>

  {/* Hold */}
  <div className="flex items-center mb-2">
    <span className="w-16 text-gray-600 font-semibold">Hold</span>
    <div className="flex-1 max-w-xs bg-gray-200 h-1.5 rounded-full overflow-hidden">
      <div className="bg-gray-400 h-full "></div>
    </div>
    <span className="ml-2">8%</span>
  </div>

  {/* Sell */}
  <div className="flex items-center">
    <span className="w-16 text-gray-600 font-semibold">Sell</span>
    <div className="flex-1 max-w-sm bg-gray-200 h-1.5 rounded-full overflow-hidden">
      <div className="bg-red-500 h-full "></div>
    </div>
    <span className="ml-2">16%</span>
  </div>
</div>
        </div>
      </div>
           </div>
           {/* About Bitcoin */}
           <div className="bg-gray-100 mt-6  flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* About Bitcoin Section */}
        <h1 className="text-2xl font-bold mb-6">About Bitcoin</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">What is Bitcoin?</h2>
          <p className="text-gray-700">
            Bitcoin’s price today is US$16,951.82, with a 24-hour trading volume of $19.14 B. BTC is +0.36% in the last
            24 hours. It is currently -7.70% from its 7-day all-time high of $18,366.66, and 3.40% from its 7-day
            all-time low of $16,394.75. BTC has a circulating supply of 19.24 M BTC and a max supply of 21 M BTC.
          </p>
        </div>
        <hr className="border-gray-300 mb-6" />

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Lorem ipsum dolor sit amet</h2>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus
            urna et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque
            fermentum sapien morbi sodales odio sed rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed.
            Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus.
          </p>
          <p className="text-gray-700 mb-4">
            Diam praesent massa dapibus magna aliquam a dictumst volutpat. Egestas vitae pellentesque auctor amet. Nunc
            sagittis libero adipiscing cursus felis pellentesque interdum. Odio cursus phasellus velit in senectus enim
            dui. Turpis tristique placerat interdum sed volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris
            faucibus diam mi nunc praesent massa turpis a. Integer dignissim augue viverra nulla et quis lobortis
            phasellus. Integer pellentesque enim convallis ultricies at.
          </p>
          <p className="text-gray-700">
            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi
            adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum
            fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui
          </p>
        </div>
        <hr />

        {/* Already Holding Bitcoin Section */}
        <h2 className="text-2xl font-bold mb-6">Already Holding Bitcoin?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Profit Calculator Card */}
  <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg flex flex-row items-center">
    <img
      src={frame3}
      alt="Person holding a phone showing investment profits"
      className="w-30 h-40 object-cover rounded-lg mr-6"
    />
    <div>
      <h3 className="text-white text-xl font-bold mb-2">Calculate your Profits</h3>
      <a
        href="#"
        className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg flex items-center"
      >
        Check Now
        <i className="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </div>

  {/* Tax Liability Calculator Card */}
  <div className="bg-gradient-to-r from-orange-400 to-red-500 p-6 rounded-lg flex flex-row items-center">
    <img
      src={frame4}
      alt="Person holding a phone showing tax liability"
      className="w-30 h-40 object-cover rounded-lg mr-6"
    />
    <div>
      <h3 className="text-white text-xl font-bold mb-2">Calculate your tax liability</h3>
      <a
        href="#"
        className="bg-white text-red-500 font-semibold py-2 px-4 rounded-lg flex items-center"
      >
        Check Now
        <i className="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </div>
</div>


        <div className="mt-6 border-t pt-6">
          <p className="text-gray-600">
            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi
            adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum
            fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui
          </p>
        </div>
      </div>
           </div>
          { /* Tokenomics */}
           <div className="bg-gray-100 mt-6 flex items-center justify-center ">
      <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md">
        {/* Title Section */}
        <h2 className="text-2xl font-bold mb-4">Tokenomics</h2>
        <h3 className="text-xl font-semibold mb-4">Initial Distribution</h3>

        {/* Distribution Section */}
       <div className="flex items-center mb-6">
  {/* Circular Progress Chart */}
  <svg
    className="w-32 h-32 mr-6" /* Bigger size */
    viewBox="0 0 36 36"
    aria-labelledby="chartTitle"
    role="img"
  >
    <title id="chartTitle">
      Pie chart showing distribution: 80% Crowdsale investors, 20% Foundation
    </title>
    {/* Background Circle */}
    <circle
      cx="18"
      cy="18"
      r="15.915"
      fill="transparent"
      stroke="#e5e7eb"
      strokeWidth="4"
    />
    {/* Blue segment for 80% */}
    <circle
      cx="18"
      cy="18"
      r="15.915"
      fill="transparent"
      stroke="#3b82f6" 
      strokeWidth="4"
      strokeDasharray="80 20"
      strokeDashoffset="0"
      transform="rotate(-90 18 18)"
    />
    {/* Yellow segment for 20% */}
    <circle
      cx="18"
      cy="18"
      r="15.915"
      fill="transparent"
      stroke="#facc15" 
      strokeWidth="4"
      strokeDasharray="20 80"
      strokeDashoffset="-80"
      transform="rotate(-90 18 18)"
    />
  </svg>

  {/* Legend */}
  <div>
    <p className="flex items-center mb-2 text-lg">
      <span className="w-4 h-4 bg-blue-800 rounded-full inline-block mr-2"></span>
      Crowdsale investors: 80%
    </p>
    <p className="flex items-center text-lg">
      <span className="w-4 h-4 bg-yellow-400 rounded-full inline-block mr-2"></span>
      Foundation: 20%
    </p>
  </div>
</div>



        {/* Description Section */}
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc dignissim vel consequat.
          Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce
          adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis augue. Gravida aliquam fermentum augue
          eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur
          sem posuere facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac
          risus.
        </p>
      </div>
         </div>
         <div className="bg-gray-100 mt-6 flex items-center justify-center">
      <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-800 mb-4">Team</h1>
  <p className="text-gray-600 mb-8">
    Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu nibh. Eget mattis in mi integer sit
    egestas. Proin tempor id pretium quam. Facilisis purus convallis quam augue.
  </p>
  <div className="space-y-6">
    {teamMembers.map((member, index) => (
      <div key={index} className="bg-blue-50 p-6 rounded-lg flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={member.image}
            alt={`Portrait of ${member.name}`}
            className="w-32 h-32 rounded-md object-cover" 
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 mt-2">{member.name}</h2>
          <p className="text-gray-500">{member.designation}</p>
          <p className="text-gray-600">{member.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    

          </div>
        

          {/* Right Section */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            {/* Get Started Section */}
            <div className="bg-blue-600 text-white rounded-lg shadow p-6 text-center mb-8">
              <h2 className="text-xl font-semibold mb-4">Get Started with KoinX for FREE</h2>
              <p className="text-sm mb-6">
                With our range of features that you can equip for free, KoinX allows you to be more educated and aware of your tax reports.
              </p>
              <img
                src={frame}
                alt="Illustration of KoinX on a mobile device"
                className="mx-auto mb-4"
              />
              <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-200">
                Get Started for FREE
              </button>
            </div>

            {/* Trending Coins */}
           <div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-lg font-semibold mb-4">Trending Coins (24h)</h2>
  {coins.map((coin, index) => (
    <div key={index} className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <img src={coin.logo} alt={coin.name} className="mr-2 rounded-full w-8 h-8" />
        <span className="font-medium text-gray-800">{coin.name}</span>
      </div>
      <span className={`${coin.color} font-semibold`}>{coin.change}</span>
    </div>
  ))}
</div>
          </div>
        </div>
      </div>
  )
};
export default MainContent;





    