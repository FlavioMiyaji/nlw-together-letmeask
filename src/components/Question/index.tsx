import React, {
  ReactNode,
} from 'react';

import { UserInfo } from '../UserInfo';

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
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <UserInfo data={author} />
        <div>{children}</div>
      </footer>
    </div>
  );
};
