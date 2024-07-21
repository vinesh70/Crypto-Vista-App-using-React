import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Crypto() {
    const [info, setInfo] = useState([]);
    const [coin, setCoin] = useState("");

    const hCoin = (event) => {
        setCoin(event.target.value);
    };

    const finfo = info.filter(c => c.name.toLowerCase().includes(coin.toLowerCase()));

    useEffect(() => {
        let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";
        axios.get(url)
            .then(res => setInfo(res.data))
            .catch(err => alert("Issue " + err));
    }, []);

    return (
        <>
            <center>
                <h1>CryptoVista App by Vinesh Ryapak</h1>
                <form>
                    <input
                        type="text"
                        placeholder="Enter coin name"
                        value={coin}
                        onChange={hCoin}
                    />
                </form>
                <br />
                <table border="5">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Icon</th>
                            <th>Price</th>
                            <th>ATH</th>
                            <th>ATL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {finfo.map(e => (
                            <tr key={e.id}>
                                <td>{e.name}</td>
                                <td>{e.symbol}</td>
                                <td><img src={e.image} alt={e.name} width="50" height="50" /></td>
                                <td>₹{e.current_price}</td>
                                <td>₹{e.ath}</td>
                                <td>₹{e.atl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </>
    );
}
