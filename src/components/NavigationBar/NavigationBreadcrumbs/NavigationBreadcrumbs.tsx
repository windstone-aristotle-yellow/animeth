import {Breadcrumbs} from "@mantine/core";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {IconChevronRight, IconHome} from "@tabler/icons-react";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import translateRouteNames from "@/utils/translateRouteNames";

export default function NavigationBreadcrumbs() {
    let titlePath: string | null
    const shikimori = client()
    const pathname = usePathname()
    const paths = pathname
        .split('/')
        .filter((path) => path)
    const isTitlePath = paths.length > 1 && paths[paths.length - 2] === 'titles'
    if (isTitlePath) {
        titlePath = paths[paths.length - 1]
    }

    const { data } = useQuery({
        queryKey: ['breadcrumbs'],
        queryFn: async () => {
            if (!titlePath) {
                return null
            }

            // titlePath format is "12345-word-word-word", sometimes with a letter in the beginning
            const shikimoriId = titlePath.split('-')[0].replace(/\D/g, '')

            return (await shikimori.animes.byId({ ids: shikimoriId })).animes
        }
    })
    const breadcrumbs = paths.map((path, index, array) => {
        const translatedPath = translateRouteNames(path)

        if (isTitlePath && array[index - 1] === 'titles') {
            return (
                <Link key={path} href={path}>
                    {data?.[0].russian ?? data?.[0].name}
                </Link>
            )
        }

        return (
            <Link key={path} href={path}>
                {translatedPath}
            </Link>
        )
    })

    return (
        <Breadcrumbs separator={<IconChevronRight size={22} stroke={1.5} />}>
            <Link href='/'>
                <IconHome size={22} stroke={1.5} />
            </Link>
            {breadcrumbs}
        </Breadcrumbs>
    )
}