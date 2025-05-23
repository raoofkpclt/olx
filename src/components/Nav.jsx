import { useState,useContext } from "react";
import {Search,ChevronDown,Heart} from "lucide-react"
import {UserContext} from "../context/UserContext"
import {SearchContext} from "../context/SearchContext"
import {useNavigate} from "react-router-dom"
import OlxLogo from "../assets/OlxLogo";

const Navbar = () => {
  const [location, setLocation] = useState('East Hill, Kozhikode');
  const userContext = useContext(UserContext);
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate()
  if(!searchContext) return;
  if(!userContext) return;
  const {user,logout} = userContext;
  const {searchQuery,setSearchQuery} = searchContext;
  const categories = [
    'Cars', 'Motorcycles', 'Mobile Phones', 
    'For Sale: Houses & Apartments', 'Scooters',
    'Commercial & Other Vehicles', 'For Rent: Houses & Apartments'
  ];

  const handleLogin = ()=>{
    if(user){
      logout();
    }else{
      navigate('/login')
    }
  }
  
  const handleSell = ()=>{
    if(user){
      navigate('/create')
    }else{
      navigate('/login')
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">
              <OlxLogo />
            </div>

            <div className="flex items-center border rounded px-2 py-1 min-w-[200px]">
              <Search className="h-4 w-4 text-gray-500" />
              <input 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="ml-2 outline-none text-sm"
                placeholder="Search location"
              />
              <ChevronDown className="h-4 w-4 text-gray-500 ml-auto" />
            </div>

            <div className="flex flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                placeholder="Search 'Properties'"
                className="w-full px-4 py-2 border rounded-l outline-none"
              />
              <button className="bg-teal-900 px-8 rounded-r">
                <Search className="h-5 w-5 text-white" />
              </button>
            </div>

            <select className="border-none outline-none text-sm font-semibold">
              <option>ENGLISH</option>
              <option>MALAYALAM</option>
            </select>

            <button className="hover:text-teal-900">
              <Heart className="h-5 w-5" />
            </button>

            {
              
            }
            <button onClick={handleLogin}  className="text-sm font-semibold hover:text-teal-900">
              {user?'Logout':'Login'}
            </button>

            <button onClick={handleSell} className="px-6 py-2 rounded-full border-2 border-teal-900 text-sm font-semibold hover:bg-teal-50">
              + SELL
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 py-2">
            <button className="flex items-center gap-1 text-sm font-semibold">
              ALL CATEGORIES
              <ChevronDown className="h-4 w-4" />
            </button>
            {categories.map((category) => (
              <button 
                key={category}
                className="text-sm text-gray-700 whitespace-nowrap hover:text-teal-900"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;