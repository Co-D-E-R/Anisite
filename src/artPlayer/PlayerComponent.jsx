import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import Hls from "hls.js";
import { icons } from "./Overlay";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import ArtPlayer from "./ArtPlayer";

function PlayerComponent({ epid, epnum, provider, subtype, nextEp, eptitle, server }) {
    const { animeData, player, setPlayer, anifybanner } = useContext(DataContext);
    const [Loading, setLoading] = useState(true);
    const [epSource, setEpSource] = useState(null);
    const [uri, setUri] = useState("");
    const [subtitle, setSubtitle] = useState("");
   
    const navigate = useNavigate();


    // console.log(server === "2");

    const getSource = async () => {
        setLoading(true);
        window.scrollTo(0, 0); //Scroll to Top when page is loaded again
        try {
            let sourceData;
          
            if (server === "1") {
                const response = await axios.get(
                    `https://api.anify.tv/sources?providerId=${provider}&watchId=${encodeURIComponent(epid)}
                &episodeNumber=${epnum}&id=${animeData.id}&subType=${subtype}`
                );
                sourceData = response.data;
                setEpSource(sourceData);
            }else if(server === "2"){
                const response  = await axios.get(
                    `${import.meta.env.VITE_URL}/anime/gogoanime/watch/${epid}`
                );
                sourceData = response.data;
                // console.log(sourceData);
                setEpSource(sourceData);
            }
            sourceData.sources.map((i) => {
                if (i.quality === "720p") {
                    setUri(i.url);
                }
            });
            if (sourceData && sourceData.subtitles.length > 0) {
                const englishSubtitle = sourceData.subtitles.find((subtitle) => subtitle.lang === "English");
                if (englishSubtitle) {
                    setSubtitle(englishSubtitle.url);
                }
            } else {
                setSubtitle("");
            }

        } catch (error) {
            return { 
                error: error.message, 
                status: error.response ? error.response.status : 'No response'
             };
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getSource();
    }, [epid, epnum, provider, subtype]);

    //for artplayer instance
    // console.log(epSource);



    function getInstance(art) {
        art.on("ready", () => {
            const autoplay = localStorage.getItem("autoplay_video") || false;
            const isMobile = window.matchMedia("(max-width: 768px)").matches;

            // if (isMobile) {
            //     art.controls.remove("fast-rewind");
            // }
            if (autoplay === "true" || autoplay === true) {
                if (player.currentTime === 0) {
                    art.play();
                } else {
                    if (player.isPlaying) {
                        art.play();
                    } else {
                        art.pause();
                    }
                }
                if (player.isPlaying) {
                    art.play();
                } else {
                    art.pause();
                }
            }
            art.seek = player.currentTime;
        })

        art.on("play", () => {
            art.notice.show = "";
            setPlayer({ ...player, isPlaying: true });
        });
        art.on("pause", () => {
            art.notice.show = "";
            setPlayer({ ...player, isPlaying: false });
        });


        art.on("video:playing", () => {
            const interval = setInterval(async () => {
                art.storage.set(animeData.id, {
                    id: String(animeData.id),
                    epid: epid,
                    title: eptitle,
                    aniTitle: animeData.title?.english || info.title?.romaji,
                    image: anifybanner || null,
                    episode: epnum,
                    duration: art.duration,
                    timeWatched: art.currentTime,
                    provider: provider,
                    nextId: nextEp?.nextEpid || null,
                    nextNumber: nextEp?.nextEpNumber || null,
                    subtype: subtype,
                    createdAt: new Date().toISOString(),
                });
            }, 5000);
            art.on("video:pause", () => {
                clearInterval(interval);
            });

            art.on("video:ended", () => {
                clearInterval(interval);
            });

            art.on("destroy", () => {
                clearInterval(interval);
            });
        });


        art.on("video:ended", () => {
            if (!nextEp?.nextEpNumber) return;
            if (localStorage.getItem("autoplay") === "true") {
                art.controls.add({
                    name: "next-button",
                    position: "top",
                    html: '<div class="vid-con"><button class="next-button progress"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ltr-4z3qvp e1svuwfo1" data-name="Play" aria-hidden="true"><path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path></svg>Watch Next</button></div>',
                    click: function (...args) {
                        6
                        if (nextEp?.nextEpNumber) {
                            navigate(`/anime/${animeData.id}/${provider}/${encodeURIComponent(nextEp.nextEpid)}/${nextEp.nextEpNumber}/${subtype}`);
                        }
                    },
                });
            }
            const button = document.querySelector(".next-button");

            function stopTimeout() {
                clearTimeout(timeoutId);
                button.classList.remove("progress");
            }

            let timeoutId = setTimeout(() => {
                art.controls.remove("next-button");
                if (nextEp?.nextEpNumber) {
                    navigate(`/anime/${animeData.id}/${provider}/${encodeURIComponent(nextEp.nextEpid)}/${nextEp.nextEpNumber}/${subtype}`);
                }
            }, 7000);
            button.addEventListener("mouseover", stopTimeout);
        });


    }
    const option = {
        container: '.artplayer-app',
        url: uri,

        customType: {
            m3u8: function playM3u8(video, url, art) {
                if (Hls.isSupported()) {
                    if (art.hls) art.hls.destroy();
                    const hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(video);
                    art.hls = hls;
                    art.on('destroy', () => hls.destroy());
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = url;
                } else {
                    art.notice.show = 'Unsupported playback format: m3u8';
                }
            }
        },
        title: animeData.title?.english || animeData.title?.romaji,
        poster: anifybanner,
        autoplay: false,
        isLive: false,
        volume: 1,
        autoOrientation: true,
        pip: true,
        autoSize: false,
        autoMini: false,
        screenshot: true,
        setting: true,
        loop: false,
        Lock: true,
        muted: false,
        icons: icons,
        playbackRate: true,
        fullscreen: true,
        subtitleOffset: false,
        miniProgressBar: false,
        mutex: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: true,
        whitelist: ["*"],
        quality:
            epSource && epSource.sources
                ? epSource.sources.map((i) => ({
                    default: i.quality === "720p" || i.quality === "auto",
                    html: i.quality,
                    url: i.url,
                }))
                : [],
        subtitle: {
            url: subtitle,
            encoding: "utf-8",
        }
    }

    return (
        !Loading ? (
            <ArtPlayer option={option}
                style={{ width: "100%", height: "100%", aspectRatio: `16/9`, }}
                getInstance={getInstance} />
        ) : null
    );
}
export default PlayerComponent;
