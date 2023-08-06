import { Form } from "@remix-run/react";

export type InputProps = {
  input: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickInput: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  labelName?: string;
  buttonName?: string;
};

const Input: React.FC<InputProps> = ({
  input,
  onChange,
  onClickInput,
  labelName,
  buttonName,
}) => {
  return (
    <div className="input">
      <Form method="post" action="/todo">
        <label>{labelName}</label>
        <input
          value={input}
          onChange={onChange}
          type="text"
          name="todo"
        ></input>
        <button type="submit" onClick={onClickInput}>
          {buttonName}
        </button>
      </Form>
    </div>
  );
};

export default Input;
