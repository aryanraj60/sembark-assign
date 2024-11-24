import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

interface GoBackButtonProps {
  label?: string;
  className?: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({
  label = "Back",
  className = "px-4 flex items-center gap-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300",
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // Navigate to the previous page
      className={className}
    >
      <IoIosArrowBack />
      {label}
    </button>
  );
};

export default GoBackButton;
