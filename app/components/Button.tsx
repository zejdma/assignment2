import { MouseEventHandler } from "react";
import { ButtonVariant } from "~/enums/buttonVariant";

export default function Button({
  variant,
  title,
  onClick,
}: {
  variant: ButtonVariant;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  if (variant === ButtonVariant.primary) {
    return (
      <button
        className="
        focus:outline-none
        mt-5
        bg-fontPrimary
        px-4
        py-3
        text-background
        w-full
        text-lg
        font-medium"
        onClick={onClick}
        type="submit"
      >
        {title}
      </button>
    );
  }
  if (variant === ButtonVariant.secondary) {
    return (
      <button
        className="
    focus:outline-none
    mt-5
    bg-background
    px-4
    py-3
    text-fontPrimary
    w-full
    text-lg
    font-medium
    border-2
    border-fontPrimary
    "
        onClick={onClick}
        type="submit"
      >
        {title}
      </button>
    );
  }
  return <button onClick={onClick}>{title}</button>;
}
