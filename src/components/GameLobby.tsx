import { useState, useEffect } from "react";
import type { Lobby } from "boardgame.io/react";
import { Icon } from "@iconify/react";

type Props = Parameters<
  NonNullable<ConstructorParameters<typeof Lobby>[0]["renderer"]>
>[0];

const enum LobbyStage {
  nameSelect,
  gameSelect,
}

function LobbyWrapper({
  children,
}: {
  children: Array<JSX.Element> | JSX.Element;
}) {
  return (
    <div className="min-h-screen w-screen justify-center items-center flex bg-justusbg">
      <div className="flex flex-col items-center h-full">
        <div
          className="leading-none text-justusfont mt-20"
          style={{
            fontSize: "80pt",
            fontFamily: "Bebas Neue",
          }}
        >
          DAS SPIEL DES
        </div>
        <div
          className="leading-none text-justusfont"
          style={{
            fontSize: "157pt",
            fontFamily: "Bebas Neue",
          }}
        >
          JUSTUS
        </div>
        <div className="mt-20">{children}</div>
      </div>
    </div>
  );
}

function NameSelect(
  props: Props & {
    setLobbyStage: React.Dispatch<React.SetStateAction<LobbyStage>>;
  }
) {
  const [name, setName] = useState("");

  function handleNameChange(newName: string) {
    if (newName.length > 20) return;
    setName(newName);
  }

  function submit() {
    props.handleEnterLobby(name.trim());
    props.setLobbyStage(LobbyStage.gameSelect);
  }

  return (
    <div className="text-center">
      <div className="flex">
        <input
          className="bg-transparent text-white font-medium placeholder:text-gray-100 placeholder:font-normal border border-white rounded-xl px-4 py-3 select-none outline-none caret-white"
          placeholder="Name"
          type="input"
          value={name}
          onChange={(event) => handleNameChange(event.target.value)}
          onKeyDown={(ev) => ev.key == "Enter" && submit()}
        />
        <button
          className="text-white ml-4 bg-lButton px-3 rounded-xl font-normal hover:bg-lButtonH transition duration-150 disabled:bg-lButtonD"
          onClick={submit}
          disabled={!name.trim()}
        >
          Zur Lobby
        </button>
      </div>
    </div>
  );
}

function GameSelect(
  props: Props & {
    setLobbyStage: React.Dispatch<React.SetStateAction<LobbyStage>>;
  }
) {
  const [matchID, setMatchID] = useState<string>();
  const [playerID, setPlayerID] = useState<string>();

  const match = props.matches.find((match) => match.matchID == matchID);

  // auto-start match if lobby is full
  useEffect(() => {
    if (
      match &&
      playerID &&
      match.players.filter((player) => player.name).length ==
        match.players.length
    ) {
      props.handleStartMatch("justus", {
        matchID: match.matchID,
        playerID,
        numPlayers: match.players.length,
      });
    }
  }, [match]);

  return (
    <div className="flex flex-col items-center">
      {props.matches.length >= 1 && (
        <div className="border border-white p-4 rounded-2xl text-white w-72 max-h-full">
          {props.matches.map((match, i) => {
            return (
              <div key={match.matchID}>
                {!(i === 0) && (
                  <div className="h-px w-ful mt-4 mb-4 bg-white" />
                )}
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="text-xl">
                      Match {i + 1} (
                      {match.players.filter((player) => player.name).length}/
                      {match.players.length} Spieler)
                    </div>
                    {!matchID && (
                      <button
                        className="px-2 bg-lButton rounded-md ml-2 hover:bg-lButtonH transition duration-150"
                        onClick={async () => {
                          const seat = match.players.find(
                            (player) => !player.name
                          );
                          const pID = seat ? seat.id.toString() : undefined;
                          if (pID)
                            await props.handleJoinMatch(
                              "justus",
                              match.matchID,
                              pID
                            );
                          setPlayerID(pID);
                          setMatchID(match.matchID);
                        }}
                      >
                        Join
                      </button>
                    )}
                    {matchID == match.matchID && (
                      <button
                        className="px-2 bg-lBred rounded-md ml-2 hover:bg-lBredH transition duration-150"
                        onClick={() => {
                          if (matchID) {
                            props.handleLeaveMatch("justus", matchID);
                            setMatchID(undefined);
                          }
                        }}
                      >
                        Leave
                      </button>
                    )}
                  </div>
                  <div className="mt-2 flex">
                    {match.players.filter((player) => player.name).length < 1
                      ? "Keine Spieler"
                      : match.players
                          .filter((player) => player.name)
                          .map((player) => player.name)
                          .join(", ")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {match ? (
        <button
          onClick={() =>
            props.handleStartMatch("justus", {
              matchID: match.matchID,
              numPlayers: match.players.length,
              playerID,
            })
          }
          disabled={
            match.players.filter((player) => player.name).length !=
            match.players.length
          }
          className="bg-lButton hover:bg-lButtonH transition duration-150 rounded-xl p-3 mt-4 text-white"
        >
          {match.players.filter((player) => player.name).length !=
          match.players.length
            ? "Warte auf Spieler..."
            : "Match Starten!"}
        </button>
      ) : (
        <button
          onClick={() => props.handleCreateMatch("justus", 2)}
          className="bg-lButton hover:bg-lButtonH transition duration-150 rounded-2xl p-3 mt-4"
        >
          <Icon icon="akar-icons:plus" color="#f8f8f8" height="40" />
        </button>
      )}
    </div>
  );
}

export default function GameLobby(props: Props) {
  const [lobbyStage, setLobbyStage] = useState<LobbyStage>(
    LobbyStage.nameSelect
  );

  return (
    <LobbyWrapper>
      {lobbyStage == LobbyStage.nameSelect ? (
        <NameSelect {...props} setLobbyStage={setLobbyStage} />
      ) : (
        <GameSelect {...props} setLobbyStage={setLobbyStage} />
      )}
    </LobbyWrapper>
  );
}
