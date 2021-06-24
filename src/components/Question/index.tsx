import React, { ReactNode } from 'react';

import './styles.scss';

type Author = {
  name: string;
  avatar: string;
};

type QuestionProps = {
  content: string;
  author: Author;
};

type Props = {
  data: QuestionProps;
  children?: ReactNode;
};

export function Question(props: Props) {
  const { data, children } = props;
  const { content, author } = data;
  const { name, avatar } = author;
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={avatar} alt={name} />
          <span>{name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};
