import React, {
  ReactNode,
} from 'react';

import './styles.scss';

type Author = {
  name: string;
  avatar: string;
};

type Props = {
  data: Author;
  size?: number;
  children?: ReactNode;
};

export function UserInfo({ data, size }: Props) {
  const { name, avatar } = data;
  const sizeStyle = size ? { width: size, height: size } : undefined;
  return (
    <div className="user-info">
      <div
        className="avatar" style={sizeStyle}
      >
        <img src={avatar} alt={name} />
      </div>
      <span>{name}</span>
    </div>
  );
};
