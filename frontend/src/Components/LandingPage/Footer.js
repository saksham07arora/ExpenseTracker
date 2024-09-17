import { TiSocialTwitter, TiSocialYoutube, TiSocialFacebook } from "react-icons/ti";

const Footer = () => {
    return (
        <footer className="bg-white" aria-labelledby="footerHeading">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
              <div className="flex space-x-6 md:order-2">
        				<div className="items-center flex">
                        <p className="text-4xl hover:text-indigo-500 mr-2">
                            <TiSocialTwitter />
                        </p>
                        <p className="text-4xl hover:text-red-500 mr-2">
                            <TiSocialYoutube />
                        </p>
                        <p className="text-4xl hover:text-blue-500">
                            <TiSocialFacebook />
                        </p>    
        				</div>
              </div>
              <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                © 2024 Expense Tracker, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
    )
}

export default Footer