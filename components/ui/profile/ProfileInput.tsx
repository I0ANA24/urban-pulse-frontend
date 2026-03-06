interface ProfileInputProps {
  title: "Name" | "Bio";
}

export default function ProfileInput({
  title,
  ...props
}: ProfileInputProps &
  (
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>
  )) {
  return (
    <>
      {title === "Name" && (
        <input
          type="text"
          placeholder="Your Name..."
          className="text-sm outline-none"
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {title === "Bio" && (
        <textarea
          placeholder="Tell us something about you..."
          className="outline-none resize-none h-30"
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )}
    </>
  );
}
