import React, {
  useState,
  FormEvent,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';

import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { Button } from '../components/Button';

import logoSvg from '../assets/images/logo.svg';

import { useRoom } from '../hooks/useRoom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const { id: roomId } = params;
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const { title, questions } = useRoom(roomId);

  const handleSendQuestion = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    if (!newQuestion.trim().length) return;
    if (!user) throw new Error('Você precisa estar logado!');
    const question = {
      content: newQuestion.trim(),
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };
    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }, [roomId, user, newQuestion]);

  let spanQuestions = '';
  if (questions.length === 1) {
    spanQuestions = '1 pergunta';
  } else if (questions.length > 1) {
    spanQuestions = `${questions.length} perguntas`;
  }
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoSvg} alt="LetMeAsk" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>{`Sala ${title}`}</h1>
          {(spanQuestions.trim().length > 0) && (<span>{spanQuestions}</span>)}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          />
          <div className="form-footer">
            {(!user) ? (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            ) : (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            )}
            <Button
              type="submit"
              disabled={!user}
            >
              Enviar pergunta
            </Button>
          </div>
        </form>
        {(questions && questions.length) && (
          <div className="question-list">
            {questions.map((question) => (
              <Question
                key={question.id}
                data={question}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
