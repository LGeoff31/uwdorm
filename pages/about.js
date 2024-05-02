import Navbar from "./components/Navbar"
import { Stack } from "@mui/material"
import Footer from '../pages/components/footer'
export default function contact() {
    return (
        <>
            <Navbar />
            <div
                style={{
                    background: `url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat center center fixed`,
                    backgroundSize: "cover",
                    height: "25vh",
                    display: "flex",
                
                }}
            >
                <Stack margin="" >
                    <span className="text-4xl p-20 ml-20 text-blue-300">
                        About UW Rez
                    </span>
                </Stack>
            </div>
                
                <div className="p-20 mr-40 ml-20"><div className="text-3xl font-bold">Welcome to UW Rez!:</div>
            
                <br></br>
                <h1 className="">UW Rez is a platform website for University of Waterloo incoming students and current students. 
                You can find every on-campus residence through navigating our website!
                
                
                Our goal is to help students decide where to live based off the experiences of others and ratings
                for different campus housing.
                </h1>
                </div>
                <div>
                    <div className="px-20 ml-20 font-bold text-3xl">Our Team:</div>
                    <img alt="James Yu Image"className=" px-20 py-5 ml-20 w-[22rem] h-[11rem] rounded-full" src="https://prep4collegetutors.com/wp-content/uploads/2023/07/image2-e1688790500290.png"></img>
                    <h1 className="font-bold text-lg px-20 ml-20">James Yu</h1>
                    <h1 className="px-20 ml-20">Founder - Biomedical Engineering 2028</h1>
                    <h1 className="px-20 py-4 ml-20"> James can often be found playing table tennis and at the gym. He coded some backend of the website, but most designed frontend components and code</h1>
                    <img alt="Geoffrey Lee Image"></img>
                    <h1 className="font-bold text-lg px-20 ml-20">Geoffrey Lee</h1>
                    <h1 className="px-20 ml-20">Founder - Software Engineering 2028</h1>
                    <h1 className="px-20 py-4 ml-20"> ...</h1>            
                </div>
                <Footer/>
            

        </>
    )
}
