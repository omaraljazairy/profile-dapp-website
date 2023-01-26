import { useEffect, useState } from "react";
// import { BiGitPullRequest } from "react-icons/bi";

const API_KEY = process.env.REACT_APP_VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState("");

    useEffect(() => {
            const fetchGifs = async () => {
                try {
                    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
                    // console.log("response from api => ", response);
                    const { data } = await response.json();
                    // console.log("data from api => ", data);
                    setGifUrl(data[0]?.images?.downsized_medium?.url)
                } catch(error){
                    // console.error("request error => ", error);
                    setGifUrl("https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif");
                }
            }
            if(keyword) fetchGifs();
    }, [keyword]);

    return gifUrl;
}

export default useFetch;