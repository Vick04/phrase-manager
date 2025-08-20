import {
  TextField,
  type TextFieldProps,
  type TextFieldVariants,
} from "@mui/material";
import React, { useState } from "react";
import { z } from "zod";

const schema = z.string().refine((s) => !s.startsWith(" "), "No Spaces!");

const InputWithValidation = <Variant extends TextFieldVariants>(
  props: {
    variant?: Variant;
  } & Omit<TextFieldProps, "variant">
): React.JSX.Element => {
  const [error, setError] = useState("");
  const onPhraseChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = (e) => {
    const validate = schema.safeParse(e.target.value);
    if (validate.success && props.onChange) {
      setError("");
      props.onChange(e);
    } else if (validate.error) {
      setError(JSON.parse(validate.error.message)[0]?.message);
    }
  };

  return (
    <div>
      <TextField
        {...props}
        className={`w-full ${props.className}`}
        onChange={onPhraseChange}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default InputWithValidation;
