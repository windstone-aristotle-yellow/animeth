"use client"

import {Button} from "@mantine/core";
import useRipple from "use-ripple-hook";
import classes from './DecoratedButton.module.css';
import {DecoratedButtonInterface} from "@/types/DecoratedButton/DecoratedButton.interface";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import {useLocalStorage} from "@mantine/hooks";
import defaultTheme from "@/configs/defaultTheme.json";
import {variables} from "@/configs/variables";

export default function DecoratedButton({ children, onClick, rippleColor, ...props }: DecoratedButtonInterface) {
    const [theme] = useLocalStorage<ThemeType>({
        key: 'settings',
        defaultValue: {
            color: defaultTheme.primaryColor,
            breadcrumb: true
        },
    })
    const [rippleRef, rippleEvent] = useRipple({
        color: rippleColor ?? variables.rippleColor.color
    });

    return (
        <>
            <Button
                {...props}
                color={theme.color}
                classNames={{
                    root: classes.root,
                    label: classes.label,
                    inner: classes.inner
                }}
                ref={rippleRef}
                onPointerDown={rippleEvent}
                onClick={onClick}
            >
                {children}
            </Button>
        </>
    )
}