import React, {useState, useEffect} from 'react';

function getWindowDimensions(){
    const { innerWidth: width } = window;
    return {
        width
    };
}
export default function WindowDimensions(){
    const [windowDimenstion,setWindowDimension] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleChange(){
            setWindowDimension(getWindowDimensions())
        }

        window.addEventListener("resize",handleChange);
        return () => window.removeEventListener("resize",handleChange);

    },[]);

    return windowDimenstion;
}