import React, { useState, useEffect } from "react";
import { Input, InputProps } from "antd";

interface NumericInputProps extends InputProps {
  value?: string | number;
  locale?: "id" | "en";
}

const InputCurrency: React.FC<NumericInputProps> = ({
  locale = "id",
  value,
  onChange,
  ...rest
}) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      setDisplayValue(currencyFormatter(value.toString()));
    } else {
      setDisplayValue("");
    }
  }, [value, locale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const rawValue = inputValue.replace(/[^0-9]/g, "");
    setDisplayValue(currencyFormatter(rawValue));
    if (onChange) {
      onChange(e);
    }
  };

  const currencyFormatter = (value: string) => {
    if (!value) return "";
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  return <Input {...rest} value={displayValue} onChange={handleChange} />;
};

export default InputCurrency;
