import {Group, rem, Stack} from "@mantine/core";
import getShikimoriId from "@/utils/Misc/getShikimoriId";
import {client} from "@/lib/shikimori/client";
import {Metadata} from "next";

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
    const shikimori = client();
    const shikimoriId = getShikimoriId(params.code);

    const anime = (
        await shikimori
            .animes
            .byId({
                ids: shikimoriId
            })
    ).animes[0];

    const placeholderTitle = 'Просмотр аниме на Animeth';
    const placeholderDescription = 'На сайте Animeth можно бесплатно и без рекламы смотреть аниме с субтитрами или озвучкой, которая выбирается в плеере';

    if (!anime) {
        return {
            title: placeholderTitle,
            description: placeholderDescription,
            openGraph: {
                siteName: 'Animeth',
                type: "website",
                title: placeholderTitle,
                description: placeholderDescription,
            }
        };
    }

    return {
        title: anime.russian,
        description: anime.description,
        openGraph: {
            siteName: 'Animeth',
            type: "website",
            title: anime.russian ?? placeholderTitle,
            description: anime.description ?? placeholderDescription,
        }
    };
}

export default function Page({ params }: { params: { code: string } }) {
    const shikimoriId = getShikimoriId(params.code);

    return (
        <>
            <Group
                gap={rem(16)}
            >
                <Stack
                    flex={2}
                >
                    <div>1</div>
                </Stack>
                <Stack flex={1}>
                    <div>2</div>
                </Stack>
            </Group>
        </>
    );
}