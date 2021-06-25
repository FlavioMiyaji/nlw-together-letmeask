import React, {
  ButtonHTMLAttributes,
} from 'react';
import classnames from 'classnames';

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
  return (
    <button
      {...rest}
      className={classnames(
        classes,
        { outlined: isOutlined },
      )}
    />
  );
};
