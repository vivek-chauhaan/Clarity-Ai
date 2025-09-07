import Navbar from "./components/Header/Navbar";
import TextSummarize from "./components/TextSummarize/TextSummarize";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <TextSummarize />

        <span>
          pending the all the login and signup system using redux after the
          login make user the signup use aii chat and the trandslate and the{" "}
        </span>
      </div>
    </>
  );
}