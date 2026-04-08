import React from "react";

const LeaderboardRoundedIcon = ({
    size = undefined,
    color = "#000000",
    strokeWidth = 0,
    background = "transparent",
    opacity = 1,
    rotation = 0,
    shadow = 0,
    flipHorizontal = false,
    flipVertical = false,
    padding = 0,
    className = "",
}) => {
    const transforms = [];
    if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
    if (flipHorizontal) transforms.push("scaleX(-1)");
    if (flipVertical) transforms.push("scaleY(-1)");

    const viewBoxSize = 24 + padding * 2;
    const viewBoxOffset = -padding;
    const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            width={size}
            height={size}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={{
                opacity,
                transform: transforms.join(" ") || undefined,
                filter:
                    shadow > 0
                        ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))`
                        : undefined,
                backgroundColor:
                    background !== "transparent" ? background : undefined,
            }}
        >
            <path
                fill="currentColor"
                d="M3 21q-.425 0-.712-.288T2 20V10q0-.425.288-.712T3 9h3.5q.425 0 .713.288T7.5 10v10q0 .425-.288.713T6.5 21zm7.25 0q-.425 0-.712-.288T9.25 20V4q0-.425.288-.712T10.25 3h3.5q.425 0 .713.288T14.75 4v16q0 .425-.288.713T13.75 21zm7.25 0q-.425 0-.712-.288T16.5 20v-8q0-.425.288-.712T17.5 11H21q.425 0 .713.288T22 12v8q0 .425-.288.713T21 21z"
            />
        </svg>
    );
};

export default LeaderboardRoundedIcon;
