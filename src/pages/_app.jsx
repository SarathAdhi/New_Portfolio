import { useEffect, useState } from "react";
import { ContextProvider } from "../common/components/context/Context";
import dynamic from "next/dynamic";
// const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
//   ssr: false,
// });
import "../styles/globals.css";
import PopupModal from "../common/components/PopupModal";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#fdfdfd]">
        <img className="w-96" src="/assets/loading.gif" />
      </div>
    );
  return (
    <ContextProvider>
      <Component {...pageProps} />

      <PopupModal
        title="Check out my New Portfolio 2023"
        open={isModelOpen}
        setOpen={setIsModelOpen}
      >
        <div className="flex flex-col items-center gap-4">
          <img
            className="w-full h-full rounded-md"
            src="/assets/new-portfolio.png"
          />

          <Link href="https://www.sarathadhi.me/">
            <span className="text-blue-700 underline text-center !text-xl font-semibold">
              Portfolio 2023
            </span>
          </Link>
        </div>
      </PopupModal>
    </ContextProvider>
  );
}

export default MyApp;
