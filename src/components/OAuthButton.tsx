import React from "react";

interface OAuthButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  loading: boolean;
  bgColor: string;
  hoverColor: string;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({
  onClick,
  icon,
  label,
  loading,
  bgColor,
  hoverColor,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${bgColor} text-white rounded ${hoverColor} transition-colors duration-200 disabled:opacity-60`}
    >
      {icon}
      {loading ? "Logging in..." : label}
    </button>
  );
};

export default OAuthButton;
