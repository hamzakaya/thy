import HomeButton from "../home-button";

export default function Error({ text }: { text: string }) {
  return (
    <>
      <div className="pb-6 mb-6 border-b border-solid border-zinc-200">
        <div className="text-2xl leading-9 xl:text-2xl">
          <span className="mr-6 font-bold float-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-red-500 align-middle -mt-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                className=""
              ></path>
            </svg>
          </span>
          {text}
        </div>
      </div>
      <HomeButton />
    </>
  );
}
