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
                    // console.log("image array length => ", data.length);
                    // if the keyword doesn't get any image, show a defualt success image.
                    data.length !== 0 ? 
                        setGifUrl(data[0]?.images?.downsized_medium?.url)
                    :
                        setGifUrl("https://media4.giphy.com/media/26xBIygOcC3bAWg3S/giphy_s.gif?cid=5df6a890a8bh4p2q3qfa9q9h8w6hi3ya2j3oj2rtoqyohrew&rid=giphy_s.gif&ct=g")
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