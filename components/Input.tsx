import React from 'react';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import { Inputs } from './NewRecipeForm';

type InputName = 'title' | 'directions' | 'ingredient' | 'quantity' | 'unit';

interface InputProps {
  error?: FieldError | undefined;
  isDisabled?: boolean;
  InputTag?: 'input' | 'textarea';
  isRequired?: boolean;
  name: any; // TODO: Set a more specific type
  label: string;
  register: UseFormRegister<Inputs>;
  style?: {};
  type?: 'email' | 'password' | 'text';
}

export function Input({
  error = undefined,
  isDisabled = false,
  InputTag = 'input',
  isRequired = true,
  label,
  name,
  register,
  style,
  type = 'text'
}: InputProps) {
  return (
    <div className='mb-4' style={style && style}>
      <label className='flex flex-col items-start '>
        <span className={'block'}>{`${label}${isRequired ? '*' : ''}`}</span>
        <InputTag
          className={`appearance-none w-full py-2 px-3 mt-1 leading-tight border border-bottom bg-yellow outline-none focus:shadow-outline ${
            error && 'border-red-500'
          }`}
          disabled={isDisabled}
          type={type}
          {...register(name, {
            required: { value: isRequired, message: 'This field is required' }
          })}
        />
      </label>
      {error && (
        <div className='mt-1 text-red-500 text-xs'>{error.message}</div>
      )}
    </div>
  );
}
