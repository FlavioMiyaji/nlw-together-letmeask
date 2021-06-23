import React, { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import illistrationSvg from '../assets/images/illustration.svg';
import logoSvg from '../assets/images/logo.svg';
import googleIconSvg from '../assets/images/google-icon.svg';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import '../styles/auth.scss'

export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth();

  const handleCreateRoom = async () => {
    if (!user) {
      await singInWithGoogle();
    }
    history.push('/rooms/new');
  };
  const handleEnterRoom = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div id="page-auth">
      <aside>
        <img src={illistrationSvg} alt="Ilustração simbolizando perguntas e resposta" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoSvg} alt="LetMeAsk" />
          <Button
            className="create-room"
            onClick={handleCreateRoom}
          >
            <img src={googleIconSvg} alt="Logo do Google" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">ou entre em sua sala</div>
          <form onSubmit={handleEnterRoom}>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
