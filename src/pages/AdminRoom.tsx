import React, {
  FormEvent,
  useCallback,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button, Question, RoomCode } from '../components';

import logoSvg from '../assets/images/logo.svg';
import deleteSvg from '../assets/images/delete.svg';
import answerSvg from '../assets/images/answer.svg';
import checkSvg from '../assets/images/check.svg';

import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { database } from '../services/firebase';

type AdminRoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<AdminRoomParams>();
  const { id: roomId } = params;
  const { title, questions } = useRoom(roomId);

  let spanQuestions = '';
  if (questions.length === 1) {
    spanQuestions = '1 pergunta';
  } else if (questions.length > 1) {
    spanQuestions = `${questions.length} perguntas`;
  }
  const handleEndRoom = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });
    history.push('/');
  }, [roomId, history]);
  const handleCheckQuestionAsAnswered = useCallback(async (event: FormEvent, questionId: string) => {
    event.preventDefault();
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }, [roomId]);
  const handleHighlightQuestion = useCallback(async (event: FormEvent, questionId: string) => {
    event.preventDefault();
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }, [roomId]);
  const handleDeleteQuestion = useCallback(async (event: FormEvent, questionId: string) => {
    event.preventDefault();
    if (!window.confirm('Tem certeza que você deseja excluir esta pergunta?')) return;
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }, [roomId]);
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoSvg} alt="LetMeAsk" />
          <div >
            <RoomCode code={roomId} />
            <Button
              isOutlined
              onClick={e => handleEndRoom(e)}
            >
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>{`Sala ${title}`}</h1>
          {(spanQuestions.trim().length > 0) && (<span>{spanQuestions}</span>)}
        </div>
        {(questions && questions.length > 0) && (
          <div className="question-list">
            {questions.map((question) => (
              <Question
                key={question.id}
                data={question}
              >
                {(!question.isAnswered) && (
                  <>
                    <button
                      type="button"
                      onClick={e => handleCheckQuestionAsAnswered(e, question.id)}
                    >
                      <img src={checkSvg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={e => handleHighlightQuestion(e, question.id)}
                    >
                      <img src={answerSvg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={e => handleDeleteQuestion(e, question.id)}
                >
                  <img src={deleteSvg} alt="Remover pergunta" />
                </button>
              </Question>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
