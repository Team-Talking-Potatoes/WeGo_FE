'use client';

import cn from '@/utils/cn';
import {
  AUTH_LABEL,
  AUTH_ERROR_MESSAGE,
  AUTH_PLACEHOLDER,
  AUTH_MAX_LENGTH,
} from '@/constants/auth';
import TextInput from '@/components/common/input/TextInput';
import type { AuthInput } from '@/@types/auth';
import { memo } from 'react';

interface Props {
  type: 'text' | 'email' | 'tel' | 'number';
  name: keyof AuthInput;
  value: string;
  isValid: boolean | null;
  disabled?: boolean;
  size?: 'default' | 'withButton' | 'full';
  important?: boolean;
  successMailSend?: boolean | null;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  children?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthText = memo(
  ({
    type,
    name,
    value,
    isValid,
    disabled,
    size = 'full',
    important,
    successMailSend,
    className,
    classNameCondition,
    children,
    onChange,
  }: Props) => {
    return (
      <div
        className={cn('relative mb-6', {
          'mb-0': name === 'verifyNumber' || successMailSend !== undefined,
        })}
      >
        <label
          htmlFor={name}
          className={`text-sm ${name === 'verifyNumber' && 'sr-only'}`}
        >
          {AUTH_LABEL[name]}
          {important && <span className="ml-[2px] text-[#4a8af8]">*</span>}
        </label>

        <div className="flex justify-between gap-3">
          <TextInput
            type={type}
            name={name}
            disabled={disabled}
            maxLength={AUTH_MAX_LENGTH[name] ?? 25}
            placeholder={AUTH_PLACEHOLDER[name]}
            value={value}
            size={size}
            className={className}
            classNameCondition={{
              ...classNameCondition,
              'border-line-strong': isValid === true,
              'disabled:border-status-infomative':
                name === 'verifyNumber' && isValid === true,
              'border-status-error focus:border-status-error':
                successMailSend === false ||
                (Boolean(value) && isValid !== null && isValid === false),
              'mx-0': Boolean(children),
            }}
            onChange={onChange}
          />
          {children && children}
        </div>

        <p
          className={cn('mt-1 text-xs', {
            'text-status-error': successMailSend === false || isValid === false,
          })}
        >
          {name !== 'verifyNumber' && isValid === false && value
            ? AUTH_ERROR_MESSAGE[name]
            : null}
        </p>
      </div>
    );
  },
);

AuthText.displayName = 'AuthText';

export default AuthText;
