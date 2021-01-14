import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.css';

const ProgressBar = props => {
    const [offset, setOffset] = useState(0);
    const [center, setCenter] = useState(0);
    const [radius, setRadius] = useState(0);
    const [circumference, setCircumference] = useState(0);
    const circleRef = useRef(null);
    const {
        size,
        progress,
        strokeWidth,
        circleOneStroke,
        circleTwoStroke,
    } = props;

    useEffect(()=>{
        if(size !== undefined) {
            setCenter(size / 2)
            setRadius(size / 2 - strokeWidth / 2)
        }
    },[size])

    useEffect(() => {
        setCircumference(2 * Math.PI *radius)
        const progressOffset = ((100 - progress) / 100) * circumference;
        setOffset(progressOffset);
        circleRef.current.style = 'transition: stroke-dashoffset 100ms ease-in-out';

    }, [progress, circumference, offset, radius]);

    return (
        <>
            <svg
                className="svg"
                width={size}
                height={size}
            >
                <circle
                    className="svg-circle-bg"
                    stroke={circleOneStroke}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="svg-circle"
                    ref={circleRef}
                    stroke={circleTwoStroke}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
                <text 
                    x={`${center}`} 
                    y={`${center}`} 
                    className="svg-circle-text">
                        {progress}%
                </text>
            </svg>
        </>
    );
}

export default ProgressBar;
