import { useEffect, useState } from "react";

export const CustomToggle: React.FC<{
  onChange?: (state: boolean) => void;
  defaultValue?: boolean;
}> = ({ onChange, defaultValue = false }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    onChange?.(!isOn);
  };

  useEffect(() => {
    setIsOn(defaultValue);
  }, [defaultValue]);

  return (
    <div
      className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
        isOn ? "bg-primary" : "bg-[#95959B]"
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-6" : "-translate-x-[1.8px]"
        }`}
      ></div>
    </div>
  );
};
