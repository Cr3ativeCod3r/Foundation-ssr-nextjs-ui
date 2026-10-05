import React from 'react';

export default function YoutubeEmbed({
    ytLink
}: {
    ytLink: string
}) {

    const getYoutubeVideoId = (url: string) => {        
        const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?\/]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };
    
    const videoId = getYoutubeVideoId(ytLink);
    
    if (!videoId) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
                Invalid YouTube URL. Please provide a valid YouTube link.
            </div>
        );
    }
    
    return (
        <div className="w-full h-full aspect-video overflow-hidden rounded-lg shadow-lg">
            <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}