import Button from "@/app/_components/Button/Button";
import TextArea from "@/app/_components/TextArea/TextArea";
import { FormEventHandler, useEffect, useState } from "react";
import generateCtas, { CtasList } from "./generateCtas";

interface PromptInputProps {
  isLoading: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: (value: string) => void;
  value: string;
}

const PromptForm: React.FC<PromptInputProps> = ({
  value,
  isLoading,
  onChange,
  onSubmit,
}) => {
  const [ctas, setCtas] = useState<CtasList>();

  // prevents hydration error.
  useEffect(() => {
    setCtas(generateCtas());
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col mt-4 w-full px-8 min-h-[220px]">
        <TextArea
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder="E.g: I want burgers, but I am lactose intolerant"
        />

        <div className="flex w-full md:justify-end mt-4">
          {ctas && (
            <Button
              disabled={isLoading}
              className="w-full min-w-[200px] md:w-auto"
            >
              {ctas.buttonCta}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PromptForm;
