import {IconCaretUpFilled} from "@tabler/icons-react";
import {ActionIcon} from "@mantine/core";

export function LikeComment({ uuid, likes, sendComment }: { uuid: string, likes: unknown[] | null, sendComment: (likes: string[]) => void }) {
    const handleLike = async () => {

    }

    return (
        <ActionIcon>
            <IconCaretUpFilled />
        </ActionIcon>
    )
}