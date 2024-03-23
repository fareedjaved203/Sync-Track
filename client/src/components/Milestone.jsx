import React from "react";
import UpdateMilestoneModal from "./channel/UpdateMilestoneModal";

const Milestone = () => {
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-8 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-gray-700">
                  CATEGORY
                </span>
                <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p className="leading-relaxed mb-4">
                  Glossier echo park pug, church-key sartorial biodiesel
                  vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf
                  moon party messenger bag selfies, poke vaporware kombucha
                  lumbersexual pork belly polaroid hoodie portland craft beer.
                </p>
                <UpdateMilestoneModal />
                <button
                  type="button"
                  className="timeline-delete-btn inline-block rounded ml-3 p-3 py-1 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  data-twe-ripple-init
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Milestone;
