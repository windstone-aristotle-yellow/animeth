import {useQuery} from "@tanstack/react-query";
import {AspectRatio, Skeleton} from "@mantine/core";
import {getKodikPlayer} from "@/lib/actions";
import classes from './KodikVideo.module.css';
import VideoNotFound from "@/components/Video/VideoNotFound";

export default function KodikVideo({ id }: { id: string }) {
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'kodik', id],
        queryFn: async () => getKodikData(),
    });

    async function getKodikData() {
        const kodikData = await getKodikPlayer({ shikimoriId: id });

        if (!kodikData) {
            return null;
        }

        return kodikData;
    }

    if (isPending) {
        return (
            <AspectRatio ratio={16 / 9}>
                <Skeleton
                    height="100%"
                    width="100%"
                    radius="md"
                />
            </AspectRatio>
        );
    }

    if (error) {
        return <>Ошибка: {error.message}</>;
    }

    if (!isPending && !data) {
        return <VideoNotFound />;
    }

    return (
        <AspectRatio ratio={16 / 9}>
            <iframe
                className={classes.frame}
                src={data?.link}
                allow="autoplay *; fullscreen *"
            />
        </AspectRatio>
    );
}