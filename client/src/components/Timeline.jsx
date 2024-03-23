import React from "react";
import UpdateTimelineModal from "./channel/UpdateTimelineModal";

const Timeline = () => {
  return (
    <>
      <h3 className="mb-6 ms-3 text-2xl font-bold text-neutral-700 dark:text-neutral-300">
        Project Timeline
      </h3>
      {/* <!--First item--> */}

      <ol className="border-s-2 border-info-100">
        <li>
          <div className="flex-start md:flex">
            <div className="-ms-[13px] flex h-[25px] w-[25px] items-center justify-center rounded-full bg-info-100 text-info-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mb-10 ms-6 block max-w-md rounded-lg bg-neutral-50 p-6 shadow-md shadow-black/5 dark:bg-neutral-700 dark:shadow-black/10">
              <div className="mb-4 flex justify-between">
                <a
                  href="#!"
                  className="text-sm text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700"
                >
                  New Web Design
                </a>
                <a
                  href="#!"
                  className="text-sm text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700"
                >
                  04 / 02 / 2022
                </a>
              </div>
              <p className="mb-6 text-neutral-700 dark:text-neutral-200">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                scelerisque diam non nisi semper, et elementum lorem ornare.
                Maecenas placerat facilisis mollis. Duis sagittis ligula in
                sodales vehicula.
              </p>
              <UpdateTimelineModal />
              <button
                type="button"
                className="timeline-delete-btn inline-block rounded ml-3 p-3 py-1 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-twe-ripple-init
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      </ol>
    </>
  );
};

export default Timeline;
