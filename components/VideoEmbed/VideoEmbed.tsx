'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

interface VideoEmbedProps {
    player: {
        host: string;
        list: {
            episode: string;
            hls: {
                fhd?: string;
                hd?: string;
                sd?: string;
            }
        }[]
    };
    preview: string;
}

export default function VideoEmbed({ player, preview }: VideoEmbedProps) {
    return (
        <>
            <VideoPlayer player={player} preview={preview} />
        </>
    );
}
