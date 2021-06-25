import React, {
  ReactNode,
} from 'react';
import classnames from 'classnames';

import { UserInfo } from '../UserInfo';

import './styles.scss';

type Author = {
  name: string;
  avatar: string;
};

type QuestionProps = {
  content: string;
  author: Author;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

type Props = {
  data: QuestionProps;
  children?: ReactNode;
};

export function Question(props: Props) {
  const { data, children } = props;
  const {
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
  } = data;
  return (
    <div
      className={classnames(
        'question',
        { answered: isAnswered },
        { highlighted: (!isAnswered && isHighlighted) },
      )}
    >
      <p>{content}</p>
      <footer>
        <UserInfo data={author} />
        <div className="actions">{children}</div>
      </footer>
    </div>
  );
};
