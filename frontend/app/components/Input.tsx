export type InputProps = {
  input: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickInput: () => void;
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
    <div>
      <label>{labelName}</label>
      <input value={input} onChange={onChange}></input>
      <button onClick={onClickInput}>{buttonName}</button>
    </div>
  );
};

export default Input;
