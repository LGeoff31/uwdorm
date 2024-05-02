import Navbar from "./components/Navbar"
import { Stack } from "@mui/material"
import Footer from "./components/footer"

export default function Privacy(){
    return(
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
                        UW Rez Privacy
                    </span>
                </Stack>
            </div>
            <div className="p-20 mr-40 ml-20"><div className="text-3xl font-bold">Privacy Policy:</div>
            
                <br></br>
                <h1 className="">
                We only collect data concerning your email address and logs of comments written. By using our website
                , you hereby consent to our privacy policy and agree to its Terms and Conditions.
                </h1>
                </div>
                
                <Footer/>
        </>
    )
}