import { useState } from "react"
import Header from "../header/Header"
import ClipCard from "./clips/ClipCard"
import ClipItInput from "./ytb/ClipItInput"

export default function Dashboard({userDetail}: Record<string, any>) {
    const [oembed, setOembed] = useState<Record<string, any> | null>();

    return ( 
        <div className="grid grid-cols-12 h-screen">

            <div className="col-span-12 grid grid-rows-[auto_1fr]">
                <Header userInfo={userDetail}></Header>

                <main>
                    <div className="p-4 mt-[3em] container mx-auto  max-w-4xl">

                        <div className="flex p-2">
                            <div className="w-full">
                                <h1 className="text-2xl font-bold text-zinc-700 font-sans">Generate New Clips</h1>
                            </div>
                        </div>
                        <div className="flex mt-2 justify-around">
                            <div className="w-full max-w-md px-4">
                                <ClipItInput setOembed={setOembed}></ClipItInput>
                            </div>
                            <div>
                                <img 
                                src="https://dqu1p08d61fh.cloudfront.net/static/images/short-button.jpg" 
                                alt="short-button" 
                                className="w-full max-w-sm sm:max-w-xs h-auto object-cover"/>
                            </div>
                        </div>


                        <div className="mt-[3em] md:mt-5 p-2 rounded-lg flex flex-col md:flex-row gap-4 justify-center">
                            <div>
                                <img className="md:h-44 md:w-56 rounded-lg" alt="thumbnail" src="https://i.ytimg.com/vi/LzKtLDRyzu8/hqdefault.jpg"/>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div>01</div>
                                <div>09</div>
                            </div>
                        </div>

                        {/* {
                            oembed && oembed !== null && (
                                <div className="bg-gray-100 mt-5 p-2 rounded-lg shadow-sm">
                                                                            
                                    <img className="h-32 w-50 rounded-lg" 
                                            src={oembed.thumbnail_url} 
                                            alt="thumbnail"/>
                                </div>
                            )
                        } */}

                        <div className="flex p-2 mt-5">
                            <h1 className="text-2xl font-bold text-zinc-700 font-sans">Clips</h1>
                        </div>
                        <div className="p-2 mt-5">
                            <div className="flex gap-4 w-full justify-center"> 
                                <p className="text-zinc-700">Sort By : Newest</p>
                                <p>filter1</p>
                                <p>filter1</p>
                                <p>filter1</p>
                            </div>
                            <div className="p-2">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {
                                        new Array(6).fill(6).map( (e, index) => {
                                            return ( 
                                                <ClipCard i={index} key={index}></ClipCard>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </main>

            </div>
        </div>
    )
}