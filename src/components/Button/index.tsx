import React, { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button(props: Props) {
  const {
    isOutlined = false,
    className,
    ...rest
  } = props;
  let classes = 'button';
  if (className?.trim().length) {
    classes += ` ${className}`;
  }
  if (isOutlined) {
    classes += ' outlined';
  }
  return (
    <button
      {...rest}
      className={classes}
    />
  );
};
