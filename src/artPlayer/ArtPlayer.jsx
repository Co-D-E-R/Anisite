import React ,{ useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

export default function ArtPlayer({ option, getInstance, ...rest }) {
    const artRef = useRef();

    useEffect(() => {
        const art = new Artplayer({
            ...option,
            container: artRef.current,
            settings :[
                {
                    html : "Auto Play",
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M4.05 16.975q-.5.35-1.025.05t-.525-.9v-8.25q0-.6.525-.888t1.025.038l6.2 4.15q.45.3.45.825t-.45.825l-6.2 4.15Zm10 0q-.5.35-1.025.05t-.525-.9v-8.25q0-.6.525-.888t1.025.038l6.2 4.15q.45.3.45.825t-.45.825l-6.2 4.15Z"></path></svg>',
                    tooltip:"ON/OFF",
                    switch : localStorage.getItem("autoplay") === "true" ? true : false,
                    onSwitch: function (item) {
                        localStorage.setItem("autoplay", !item.switch);
                        return !item.switch;
                    }
                }
            ].filter(Boolean),
            controls :[
                {
                    index:1,
                    name:"fast-rewind",
                    position:"left",
                    html:'<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/></svg>',
                    tooltip:"Backward 5s",
                    click:function(){
                        art.backward = 5;
                    }
                },
                {
                    index:2,
                    name:"fast-forward",
                    position:"left",
                    html:'<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/></svg>',
                    tooltip:"Forward 5s",
                    click:function(){
                        art.forward = 5;
                    }
                }
    
            ]
          
        });
       
        if (getInstance && typeof getInstance === 'function') {
            getInstance(art);
        }

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, []);

    return <div ref={artRef} {...rest}></div>;
}