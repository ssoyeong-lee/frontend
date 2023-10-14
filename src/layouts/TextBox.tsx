import React, { useState } from "react";

interface Props {
    inputNickname: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
    placeholder?: string;
}

export default function TextBox({inputNickname, className, placeholder}: Props) {
  
  return (
      <input
        type="text"
        onInput={inputNickname}
        placeholder={`${placeholder}`}
        className={`text-black border border-solid rounded px-6 ${className}`}/>
  );
}
