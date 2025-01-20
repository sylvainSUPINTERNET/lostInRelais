export default function ClipCard () {
    return ( 
        <div>
            <div className="p-3 rounded-lg">

                <div className="relative">
                    <img
                    className="rounded-lg" 
                    src="https://i.ytimg.com/vi/GgRX_UDLht8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBbVQq1JKF7ArKdpD4rwOAUM1lG8g"/>
                        <div className="absolute top-1 left-1 text-white backdrop-blur-sm bg-black/0 text-sm text-rigth rounded-lg">
                            <p>14 clips</p>
                        </div>
                        <div className="absolute bottom-1 right-1 text-white backdrop-blur-sm bg-black/30 text-sm text-rigth rounded-lg">
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
            </div>
        </div>
    )
}