// components/WalletConnectCard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WalletConnectCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleConnect = async () => {
    console.log("Submitted:", { name, email, password });

    try {
      const isConnected = await window.aptos.isConnected();
      if (!isConnected) {
        await window.aptos.connect();
      }

      const account = await window.aptos.account();
      console.log("Wallet connected:", account.address);
      navigate("/disconnect");
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg w-[350px] space-y-6 text-white">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email ID"
          className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          onClick={handleConnect}
          className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition"
        >
          Connect Petra Wallet
        </button>

        <div className="flex justify-between text-sm text-gray-300 mt-2">
          <label>
            <input type="checkbox" className="mr-1" />
            Remember me
          </label>
          <button className="hover:underline">Forgot Password?</button>
        </div>
      </div>
    </div>
  );
}
