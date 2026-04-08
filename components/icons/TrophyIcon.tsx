import React from "react";

const TrophyIcon = ({
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

    // path content spans roughly x:1–14, y:1–15 — tight viewBox so it renders at full size
    const viewBox = `${1 - padding} ${1 - padding} ${13 + padding * 2} ${14 + padding * 2}`;

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
                fillRule="evenodd"
                d="M12 1.69a.494.494 0 0 0-.438-.494a32.4 32.4 0 0 0-7.124 0A.494.494 0 0 0 4 1.689v.567q-1.216.157-2.403.406a.75.75 0 0 0-.595.714L1 3.5a4.5 4.5 0 0 0 4.351 4.498A4 4 0 0 0 7 8.874V10H6a1 1 0 0 0-1 1v2h-.667C3.597 13 3 13.597 3 14.333c0 .368.298.667.667.667h8.666a.667.667 0 0 0 .667-.667c0-.736-.597-1.333-1.333-1.333H11v-2a1 1 0 0 0-1-1H9V8.874a4 4 0 0 0 1.649-.876a4.5 4.5 0 0 0 4.35-4.622a.75.75 0 0 0-.596-.714A31 31 0 0 0 12 2.256zM4 3.768q-.735.1-1.458.235a3 3 0 0 0 1.64 2.192A4 4 0 0 1 4 5zm8 0q.735.1 1.458.235a3 3 0 0 1-1.64 2.192C11.936 5.818 12 5.416 12 5z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export default TrophyIcon;
