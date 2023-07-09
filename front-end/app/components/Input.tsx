export type InputProps = {
  input: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  labelName?: string;
  buttonName?: string;
};

const Input: React.FC<InputProps> = ({
  input,
  onChange,
  onClick,
  labelName,
  buttonName,
}) => {
  return (
    <div>
      <label>{labelName}</label>
      <input value={input} onChange={onChange}></input>
      <button onClick={onClick}>{buttonName}</button>
    </div>
  );
};

export default Input;
