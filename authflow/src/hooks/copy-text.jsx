import { useState } from "react";

const CopyText = ({ text }) => {
  const [copied, set_copied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text).then(set_copied(true));
    setTimeout(() => {
      set_copied(false);
    }, 3000);
  };

  return (
    <div className=" w-full flex justify-between">
      <span>{text}</span>
      <span className="w-10">{!copied ? (
        <svg
          class="h-5 w-5 text-slate-500 mt-1 mx-auto cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          onClick={handleCopy}
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      ) : (
        <span className="text-sm mt-1 ml-2">copied</span>
      )}</span>
    </div>
  );
};

export default CopyText;
