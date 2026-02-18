import LayoutWrapper from "@/components/common/LayoutWrapper";
import "../public/scss/main.scss";
import Login from "@/components/modals/Login";
import BacktoTop from "@/components/common/BacktoTop";
import Register from "@/components/modals/Register";
import { AuthProvider } from "@/contexts/AuthContext";
import { headers } from "next/headers";
import ContextProvider from "@/context";
import { ReduxProviders } from "@/store/Providers";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Home || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default async function RootLayout({ children }) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");
  return (
    <html lang="en">
      <body className="body popup-loader counter-scroll">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .goog-te-banner-frame.skiptranslate { display: none !important; }
          body { top: 0px !important; }
        `,
          }}
        />
        {/* <AuthProvider> */}
        <div id="wrapper">
          <LayoutWrapper>
            <ContextProvider cookies={cookies}>
              <ReduxProviders>{children} </ReduxProviders>
              <Register />
            </ContextProvider>
            <BacktoTop />
          </LayoutWrapper>
        </div>
        {/* <Login /> */}
        {/* </AuthProvider> */}
        <ToastContainer
          autoClose={3000}
          theme="colored"
          style={{ zIndex: 99999 }}
        />
      </body>
    </html>
  );
}
