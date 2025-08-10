import React, { useEffect } from "react";
import InputField from "@/components/Common/InputField";
import { X } from "lucide-react";
import Button from "@/components/Common/Button";

interface AddressModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AddressModal = ({ isOpen, closeModal }: AddressModalProps) => {
  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  return (
    <div
      className={`fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5 ${
        isOpen ? "block z-99999" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center ">
        <div
          x-show="addressModal"
          className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content"
        >
          <Button
            onClick={closeModal}
            ariaLabel="button for close modal"
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 sm:top-3 sm:right-3 text-body hover:text-dark"
          >
            <X className="w-6 h-6" />
          </Button>

          <div>
            <form>
              <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                <div className="w-full">
                  <InputField
                    label="Name"
                    id="name"
                    type="text"
                    defaultValue="James Septimus"
                    className="py-2.5"
                  />
                </div>

                <div className="w-full">
                  <InputField
                    label="Email"
                    id="email"
                    type="email"
                    defaultValue="jamse@example.com"
                    className="py-2.5"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                <div className="w-full">
                  <InputField
                    label="Phone"
                    id="phone"
                    type="text"
                    defaultValue="1234 567890"
                    className="py-2.5"
                  />
                </div>

                <div className="w-full">
                  <InputField
                    label="Address"
                    id="address"
                    type="text"
                    defaultValue="7398 Smoke Ranch RoadLas Vegas, Nevada 89128"
                    className="py-2.5"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="px-7">
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
