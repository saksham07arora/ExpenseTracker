import styles from './landingpage.module.css';
import dashboardImage from '../../img/landing-1.png'
import { MdOutlineDashboard } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { TbTransactionRupee } from "react-icons/tb";
import Footer from './Footer';
import Navbar from './Navbar';
import { useAuth } from './useAuth';
// 
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const { isAuthenticated, login, logout, isLoggingIn } = useAuth();
    return (
        <>
        <Navbar />
        <div className={`${styles.landing_bg}`}>
            <div className={`flex flex-col justify-center items-center lg:w-[70%] md:w-[70%] m-auto`}>
                <p className="uppercase mb-3 text-purple-700 tracking-wide mt-[120px]">Track Your Expenses</p>
                <h1 className="capitalize text-5xl font-bold text-center mt-5 mb-5">track your expenses to save more</h1>
                <p className="text-sm leading-5 mb-5 mt-5 tracking-wide text-center text-gray-500">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                </p>
                <button onClick={login}>
                <Link className="hidden lg:inline-block text-white font-medium bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-md px-5 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"> Try Now </Link>
                </button>
                <img src={dashboardImage} className="my-[100px] max-h-[520px] px-5" alt="landing-img-1" />
            </div>
            <div className='flex flex-wrap justify-center items-center lg:w-[70%] md:w-[70%] m-auto'>
                <div className='w-[400px] bg-white rounded p-5 shadow-sm m-5'>
                    <p className='text-3xl flex mb-4'>
                        <MdOutlineDashboard />
                        <span className='font-bold ml-5'>Dashboard</span>
                        </p>
                    <p className='leading-7 text-justify'>Track and manage your expenses effortlessly with our intuitive dashboard. Get real-time insights into your spending patterns with customizable charts and detailed reports. Stay on top of your budget with easy-to-use tools designed to simplify your financial life.</p>
                </div>
                <div className='w-[400px] bg-white rounded p-5 shadow-sm m-5'>
                    <p className='text-3xl flex mb-4'>
                        <TbTransactionRupee />
                        <span className='font-bold ml-5'>Transactions</span>
                        </p>
                    <p className='leading-7 text-justify'>Effortlessly create and update transactions to keep your expenses organized and accurate. Our user-friendly interface allows you to quickly log income and expenses, categorize them, and make adjustments as needed. Stay in control of your finances with seamless transaction management.</p>
                </div>
                <div className='w-[400px] bg-white rounded p-5 shadow-sm m-5'>
                    <p className='text-3xl flex mb-4'>
                        <VscGraph />
                        <span className='font-bold ml-5'>Compare</span>
                        </p>
                    <p className='leading-7 text-justify'>Compare your spending habits over time with advanced features in our expense tracker. Easily view side-by-side comparisons of your monthly or yearly expenses, helping you identify trends and areas for improvement. Make smarter financial decisions with clear, detailed insights at your fingertips.</p>
                </div>
            </div>

            <Footer />
        </div>
        </>
    );
}

export default LandingPage;
