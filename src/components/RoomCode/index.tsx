import React from 'react';

import { Images } from '../../assets';

import './styles.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps) {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
  };
  return (
    <button
      className="room-code"
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={Images.copy} alt="Copy room code" />
      </div>
      <span>Sala {code}</span>
    </button>
  );
};
