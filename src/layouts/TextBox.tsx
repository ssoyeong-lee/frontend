interface Props {
    size: string;
    className?: string;
    placeholder?: string;
}

export default function TextBox({size, className, placeholder}: Props) {
  return (
    <form className={`${size}`}>
      <input
        type="text"
        placeholder={`${placeholder}`}
        className={`w-full h-full border border-solid rounded px-6 ${className}`}/>
    </form>
  );
}
