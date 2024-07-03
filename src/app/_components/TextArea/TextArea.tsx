type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`textarea textarea-secondary w-full min-h-[220px] text-lg ${className}`}
  ></textarea>
);

export default TextArea;
