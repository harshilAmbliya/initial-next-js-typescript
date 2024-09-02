import React from 'react'
import { MutatingDots, RotatingLines, ThreeCircles } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div id="cover-spin" className='loading_card flex justify-center items-center'>
            <RotatingLines
                visible={true}
                height="40"
                width="40"
                color="#001F3D"
                strokeColor='#001F3D'
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{
                }}
                wrapperClass="bg-transparent"
            />
        </div >
    )
}

export const IconLoading = ({ height, width }) => {
    return (<div id="cover-spin" className=''>

        <ThreeCircles
            visible={true}
            height={height}
            width={width}
            strokeColor="white"
            animationDuration="0.75"
            color="white"
            ariaLabel="three-circles-loading"
            wrapperStyle={{
                backgroundColor: "transparent"
            }}
            wrapperClass="bg-transparent"
        />


    </div>)
}

export default Loading