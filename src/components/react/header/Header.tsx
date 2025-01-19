import Logo from "../Logo";



export default function Header({userInfo}:Record<string, any>) {  
    return ( 
        <header className="p-4 bg-youtube">
            <div className="flex justify-between items-center">
                <div className="flex gap-1">
                    {/* <Logo></Logo> */}
                    <h1 className="text-2xl font-extrabold font-mono text-white" >
                        Autoshorts
                    </h1>
                </div>
                <div className="flex">
                    <img src={userInfo.picture} alt="user" className="w-10 h-10 rounded-full shadow-lg border-2 border-white cursor-pointer"/>
                </div>
            </div>
        </header>
    )
    
}