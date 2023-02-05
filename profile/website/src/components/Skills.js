import { SiSolidity } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { SiDocker } from "react-icons/si";
import { SiAmazonaws } from "react-icons/si";


const ServiceCard = ( { color, title, icon, subtitle } ) => (
        <div className="flex flex-row items-start justify-start p-3 m-2 cursor-pointer white-glassmorphism hover:shadow-xl bg-[#496cec]">
            <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
                {icon}
            </div>
            <div className="flex flex-col flex-1 ml-5">
                <h1 className="mt-2 text-lg text-white">{title}</h1>
                <p className="mt-2 text-sm text-white md:w-9/12">{subtitle}</p>
            </div>
        </div>
)

const Services = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full md:flex-row gradient-bg-services">
            <div className="flex flex-col items-center justify-start flex-1 ">
                <ServiceCard 
                    color="bg-[#F84550]"
                    title="Solidity"
                    icon={<SiSolidity fontSize={21} className="text-white" />}
                    subtitle="Smart Contracts on the Ethereum network based on the user's requirements."
                />
                <ServiceCard 
                    color="bg-[#2952E3]"
                    title="Python"
                    icon={<SiPython fontSize={21} className="text-white" />}
                    subtitle="Python Backend APIs using Django RestFramework / FastAPI and PostgreSQL."
                />
                <ServiceCard 
                    color="bg-[#8945F8]"
                    title="ReactJS / ReactNative"
                    icon={<SiReact fontSize={21} className="text-white" />}
                    subtitle="Website and mobile App for Backend APIs and Smart Contracts on Ethereum."
                />
                <ServiceCard 
                    color="bg-[#8945F8]"
                    title="AWS Cloud"
                    icon={<SiAmazonaws fontSize={21} className="text-white" />}
                    subtitle="Host websites, API, use Lambda & RDS AWS Cloud Services + monitoring tools "
                />
                <ServiceCard 
                    color="bg-[#8945F8]"
                    title="Dockers"
                    icon={<SiDocker fontSize={21} className="text-white" />}
                    subtitle="Containerized all services, deploy and run them on any environment and OS."
                />
            </div>
        </div>
    );
}

export default Services;