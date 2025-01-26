export default function ClipCard ({i}: {i:number}) {
    return ( 
        <div>
            <div className="min-h-48 p-3 rounded-lg cursor-pointer hover:shadow-sm hover:bg-gray-100 transition-colors duration-300 ease-in-out">
                <div className="relative">
                    <img
                    className="rounded-lg shadow-lg" 
                    src="https://i.ytimg.com/vi/GgRX_UDLht8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBbVQq1JKF7ArKdpD4rwOAUM1lG8g"/>

                    { 
                        i % 2 === 0 ?
                        (
                            <>
                                <div>
                                    <div className="absolute top-1 left-1 text-white backdrop-blur-sm bg-black/0 text-sm text-rigth rounded-lg">
                                        <p>14 clips</p>
                                    </div>
                                    <div className="absolute bottom-[40%] right-1 text-white backdrop-blur-sm bg-black/30 text-sm text-rigth rounded-lg">
                                        <p>1:35:47</p>
                                    </div>
                                </div>
                                <div className="mt-1 ml-2">
                                    <div className="text-md mb-1 text-zinc-700">
                                        <p>My Ttitle ere</p>
                                    </div>
                                    <div className="text-sm text-zinc-400">
                                        <p>date</p>
                                    </div>
                                </div>
                            </>
 
                        ) : 
                        (
                            <div>
                                <div className="absolute top-0 left-0 text-white bg-cyan-600/80 text-sm text-rigth rounded-lg h-full w-full">
                                </div>
                                <div className="absolute top-[40%] left-[30%] text-black font-bold text-sm text-rigth rounded-lg h-full w-full">
                                    {/* <p>ETA {Math.floor(Math.random()*200)}mins</p> WILL CAUSE ISSUE here for SSR*/} 
                                </div>
                            </div>
                        )
                    }



                </div>



            </div>
        </div>
    )
}