import { useState, useEffect } from "react";
import type { Lobby } from "boardgame.io/react";

type Props = Parameters<
  NonNullable<ConstructorParameters<typeof Lobby>[0]["renderer"]>
>[0];

const enum LobbyStage {
  nameSelect,
  gameSelect,
  showCredits,
}

function LobbyWrapper({
  children,
}: {
  children: Array<JSX.Element> | JSX.Element;
}) {
  return (
    <div className="min-h-screen w-screen justify-center items-center flex bg-justusbg">
      <div className="md:flex flex-col items-center h-full hidden">
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
      <div className="flex flex-col items-center h-full md:hidden">
        <div
          className="leading-none text-justusfont mt-20"
          style={{
            fontSize: "50pt",
            fontFamily: "Bebas Neue",
          }}
        >
          DAS SPIEL DES
        </div>
        <div
          className="leading-none text-justusfont"
          style={{
            fontSize: "95pt",
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

function CreditsPage({
  setLobbyStage,
}: {
  setLobbyStage: React.Dispatch<React.SetStateAction<LobbyStage>>;
}) {
  useEffect(() => {
    window.history.pushState("", "", "/credits");
    return () => window.history.pushState("", "", "/");
  }, []);
  return (
    <div className="text-center text-white space-y-2">
      <p>
        <button
          onClick={() => setLobbyStage(LobbyStage.nameSelect)}
          className="bg-lButton hover:bg-lButtonH rounded-2xl duration-150 transition text-white p-3"
        >
          Zurück
        </button>
      </p>
      <p>Grafiken:</p>
      <p>
        Kanal: <a href="http://www.freepik.com">Designed by brgfx / Freepik</a>
      </p>
      <p>
        Bahnstation:
        <a href="http://www.freepik.com">Designed by macrovector / Freepik</a>
      </p>
      <p>
        Industriegebäude:{" "}
        <a href="https://www.freepik.com/vectors/industry">
          Industry vector created by macrovector - www.freepik.com
        </a>
      </p>
      <p>
        Jet: <a href="http://www.freepik.com">Designed by sentavio / Freepik</a>
      </p>
      <p>
        Militärhelikopter:{" "}
        <a href="https://www.freepik.com/vectors/military">
          Military vector created by brgfx - www.freepik.com
        </a>
      </p>
      <p>
        Skyscaper:{" "}
        <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
      </p>
      <p>
        Clouds:{" "}
        <a href="https://www.freepik.com/vectors/cloud-illustration">
          Cloud illustration vector created by freepik - www.freepik.com
        </a>
      </p>
      <p>
        Grass:{" "}
        <a href="https://www.freepik.com/vectors/camp">
          Camp vector created by pch.vector - www.freepik.com
        </a>
      </p>
      <p>
        Avatars:
        <a href="http://www.freepik.com">Designed by studiogstock / Freepik</a>
      </p>
      <p>
        Cityscape:{" "}
        <a href="http://www.freepik.com">Designed by tartila / Freepik</a>
      </p>
      <p>
        Dollarcoin:{" "}
        <a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a>
      </p>
      <p>
        Slum:{" "}
        <a href="http://www.freepik.com">Designed by macrovector / Freepik</a>
      </p>
      <p>
        Metro:{" "}
        <a href="http://www.freepik.com">Designed by upklyak / Freepik</a>
      </p>
      <p>Audio:</p>
      <p>
        Applause:{" "}
        <a
          href="https://bigsoundbank.com/detail-2363-applause-1.html
"
        >
          Applause / bigsoundbank
        </a>
      </p>
      <p>
        Gravel:{" "}
        <a
          href="https://bigsoundbank.com/detail-1588-gavel-1-blow.html
"
        >
          Gravel / bigsoundbank
        </a>
      </p>
      <p>
        Operation:{" "}
        <a
          href="https://bigsoundbank.com/detail-1684-operation-game-3.html
"
        >
          Operation / bigsoundbank
        </a>
      </p>
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
          className="bg-transparent text-white font-medium placeholder:text-gray-100 placeholder:font-normal border border-white rounded-xl px-4 py-3 outline-none caret-white"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(event) => handleNameChange(event.target.value)}
          onKeyDown={(ev) => ev.key == "Enter" && submit()}
          autoFocus
        />
        <button
          className="text-white ml-4 bg-lButton px-3 rounded-xl font-normal hover:bg-lButtonH transition duration-150 disabled:bg-lButtonD"
          onClick={submit}
          disabled={!name.trim()}
        >
          Zur Lobby
        </button>
      </div>
      <button
        onClick={() => props.setLobbyStage(LobbyStage.showCredits)}
        className="bg-lButton hover:bg-lButtonH rounded-xl duration-150 transition text-white p-1.5 text-sm absolute md:bottom-6 right-6 md:block fixed top-0 md:top-auto mt-6 md:mt-auto"
      >
        Credits
      </button>
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
  const [playerCount, setPlayerCount] = useState(2);
  const [createdMatch, setCreatedMatch] = useState(false);

  const match = props.matches.find((match) => match.matchID == matchID);

  // auto-leave lobby on tab close
  useEffect(() => {
    function handleClose() {
      props.handleLeaveMatch("justus", matchID!).catch();
      return "Still in a lobby";
    }
    window.onbeforeunload = handleClose;
    return () => {
      window.onbeforeunload = null;
    };
  }, [matchID]);

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

  // auto join self-created match
  useEffect(() => {
    if (createdMatch) {
      const match = props.matches.at(-1);
      if (!match) return;
      props.handleJoinMatch("justus", match.matchID, "0");
      setPlayerID("0");
      setMatchID(match.matchID);
      setCreatedMatch(false);
    }
  });

  return (
    <div className="flex flex-col items-center">
      {props.matches.filter((match) => !match.gameover).length >= 1 && (
        <div className="border border-white p-4 rounded-2xl text-white w-72 max-h-full">
          {props.matches
            .filter((match) => !match.gameover)
            .map((match, i) => {
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
                      {match.players.filter((player) => player.name).length !=
                      match.players.length ? (
                        <>
                          {!matchID && (
                            <button
                              className="px-2 bg-lButton rounded-md ml-2 hover:bg-lButtonH transition duration-150"
                              onClick={async () => {
                                const seat = match.players.find(
                                  (player) => !player.name
                                );
                                const pID = seat
                                  ? seat.id.toString()
                                  : undefined;
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
                        </>
                      ) : (
                        <button
                          disabled
                          className="px-2 bg-lBred rounded-md ml-2 hover:bg-lBredH transition duration-150"
                        >
                          Voll
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
        <div className="text-white space-x-2">
          <select
            defaultValue="2"
            onChange={(event) => setPlayerCount(parseInt(event.target.value))}
            className="bg-lButton hover:bg-lButtonH transition duration-150 rounded-2xl p-3.5 mt-4 outline-none"
            style={{ borderRight: "16px solid transparent" }}
          >
            {[2, 3, 4, 5, 6].map((count) => (
              <option key={count}>{count} Spieler</option>
            ))}
          </select>
          <button
            onClick={async () => {
              await props.handleCreateMatch("justus", playerCount);
              setCreatedMatch(true);
            }}
            className="bg-lButton hover:bg-lButtonH transition duration-150 rounded-2xl p-3 mt-4"
          >
            Lobby erstellen
          </button>
        </div>
      )}
    </div>
  );
}

export default function GameLobby(props: Props) {
  const showCreditsByRoute = window.location.pathname == "/credits";

  const [lobbyStage, setLobbyStage] = useState<LobbyStage>(
    showCreditsByRoute ? LobbyStage.showCredits : LobbyStage.nameSelect
  );

  return (
    <LobbyWrapper>
      {lobbyStage == LobbyStage.nameSelect ? (
        <NameSelect {...props} setLobbyStage={setLobbyStage} />
      ) : lobbyStage == LobbyStage.gameSelect ? (
        <GameSelect {...props} setLobbyStage={setLobbyStage} />
      ) : (
        <CreditsPage setLobbyStage={setLobbyStage} />
      )}
    </LobbyWrapper>
  );
}
