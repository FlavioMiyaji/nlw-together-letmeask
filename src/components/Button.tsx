import React, { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: Props) {
  const { className, ...rest } = props;
  let classes = 'button';
  if (className?.trim().length) {
    classes += ` ${className}`;
  }
  return (
    <button
      {...rest}
      className={classes}
    />
  );
};
