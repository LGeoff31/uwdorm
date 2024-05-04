import Navbar from "./components/Navbar"
import { Stack } from "@mui/material"
import FooterOther from "./components/footerOther"

export default function About() {
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
                <div className="bg-[rgba(225,246,255,1)]">
                    <div className="p-20 mr-40 ml-20">
                        <div className="text-3xl font-bold">Welcome to UW Rez!</div>
                
                    <br></br>
                    <h1 className="">UW Rez is a platform website for University of Waterloo incoming students and current students. 
                    You can find every on-campus residence through navigating our website!
                    
                    
                    Our goal is to help students decide where to live based off the experiences of others and ratings
                    for different campus housing.
                    </h1>
                    </div>
            
                    <div className="px-20 ml-20 font-bold text-3xl">Our Team:</div>
                    <div>
                        <div className="flex flex-row mt-2">
                            <img alt="James Yu Image"className=" px-20 py-5 ml-20 w-[20rem] h-[11rem] rounded-full" src="https://prep4collegetutors.com/wp-content/uploads/2023/07/image2-e1688790500290.png"></img>
                            <div className="flex flex-col mt-4 mr-40">
                                <h1 className="font-bold text-lg">James Yu</h1>
                                <h1 className="italic font-light">Founder - Biomedical Engineering 2028</h1>
                                <h1 className="mt-3">James can often be found playing table tennis and hitting the gym with
                                friends. He worked as a full stack developer with Geoffrey to create UW Rez.</h1>
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <div className="flex flex-row">
                            <img alt="James Yu Image"className=" px-20 py-5 ml-20 w-[20rem] h-[11rem] rounded-full" src="https://prep4collegetutors.com/wp-content/uploads/2023/07/image2-e1688790500290.png"></img>
                            <div className="flex flex-col mt-4 mr-40">
                                <h1 className="font-bold text-lg">Geoffrey Lee</h1>
                                <h1 className="italic font-light">Founder - Software Engineering 2028</h1>
                                <h1 className="mt-3">Geoffrey can often be found running marathons and doing coding pro
                                jects. He worked as a full stack developer with James to create UW Rez.</h1>
                            </div>
                        </div>
                        
                    </div>
                </div>
               
                <FooterOther/>
            

        </>
    )
}
