import { ReactElement } from "react";
import { Theme } from "~/src/theme";

export interface SkeletonProps {
    count?: number;
    itemSpacing?: keyof Theme['spacing'];
    color?: keyof Theme['colors'];
    renderSkeleton?: ReactElement;
}