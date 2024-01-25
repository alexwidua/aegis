/**
 * @file Main app file that collects all views.
 *
 * This app consist of multiple views, each of which corresponds to the current game view. Conceptually, the views are similar to routes.
 */

import game from "game/";
import useStore from "store/";
import { useEffect } from "react";
import { useGameState, useEffectOnce, useLocalStorage, useKeyboardLayout } from "hooks/";
import { TitleScreenView, BeforeFirstGame, GameView, GameEndView, OptionsView, ShowWarningOnMobileView } from "views";
import ModalWindow from "./components/layout/Modal";
import Modal from "react-modal";
import { LOCAL_STORAGE_KEY, KEYBOARD_DEFAULT_LAYOUTS } from "store/constants";
import styles from "./app.module.scss";

Modal.setAppElement("#root");

const App = () => {
  /**
   * 1. Set up game and get game states to delegate views.
   */
  game();
  const {
    optionsModalOpen,
    setOptionsModalOpen,
    isPlaying,
    endResult,
    showBeforeFirstGame,
    defaultGameOptions,
    updateGameSettingsFromLocalStorage,
    setEntireKeyboardLayout,
  } = useStore((state) => ({
    optionsModalOpen: state.optionsModalOpen,
    setOptionsModalOpen: state.setOptionsModalOpen,
    isPlaying: state.isPlaying,
    endResult: state.endResult,
    showBeforeFirstGame: state.showBeforeFirstGame,
    defaultGameOptions: {
      scoreLimit: state.scoreLimit,
      buildingFilter: state.buildingFilter,
      showLabeledKeys: state.showLabeledKeys,
      keyboardLayout: state.keyboardLayout,
      iconDisplayStyle: state.iconDisplayStyle,
    },
    updateGameSettingsFromLocalStorage: state.updateGameSettingsFromLocalStorage,
    setEntireKeyboardLayout: state.setEntireKeyboardLayout,
  }));
  const { gameEnded } = useGameState();

  /**
   * 2. Check if local storage has been set.
   *    If yes, update game settings from local storage.
   *    If not, populate local storage with default game options.
   */
  const [localStorageOptions, setLocalStorageOptions] = useLocalStorage(LOCAL_STORAGE_KEY, "");
  useEffectOnce(() => {
    if (!localStorageOptions) {
      setLocalStorageOptions(defaultGameOptions);
    } else {
      updateGameSettingsFromLocalStorage(localStorageOptions);
    }
  });

  /**
   * Automatically detect and set keyboard layout, if function is supported
   */
  const detectedKeyboardLayout = useKeyboardLayout();
  useEffect(() => {
    if (showBeforeFirstGame && detectedKeyboardLayout) {
      // Naively check current keyboard layout
      const isQWERT = ["q", "w", "e", "r", "t"];
      const isAZERT = ["a", "z", "e", "r", "t"];

      const keys = [
        detectedKeyboardLayout.get("KeyQ"),
        detectedKeyboardLayout.get("KeyW"),
        detectedKeyboardLayout.get("KeyE"),
        detectedKeyboardLayout.get("KeyR"),
        detectedKeyboardLayout.get("KeyT"),
      ];
      const keyZ = detectedKeyboardLayout.get("KeyZ");

      if (keys.every((key, i) => key === isQWERT[i])) {
        if (keyZ === "z") {
          setEntireKeyboardLayout(KEYBOARD_DEFAULT_LAYOUTS().QWERTY);
        } else {
          setEntireKeyboardLayout(KEYBOARD_DEFAULT_LAYOUTS().QWERTZ);
        }
      } else if (keys.every((key, i) => key === isAZERT[i]) && keyZ === "y") {
        setEntireKeyboardLayout(KEYBOARD_DEFAULT_LAYOUTS().AZERTY);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectedKeyboardLayout]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {isPlaying && !gameEnded ? (
          showBeforeFirstGame ? (
            <BeforeFirstGame />
          ) : (
            <GameView />
          )
        ) : !isPlaying && gameEnded ? (
          <GameEndView />
        ) : endResult ? (
          <GameEndView />
        ) : (
          <TitleScreenView />
        )}
      </div>

      {/* Conditional modal windows that are detached from page */}
      <ModalWindow isOpen={optionsModalOpen} onRequestClose={() => setOptionsModalOpen(false)}>
        <OptionsView />
      </ModalWindow>
      <ShowWarningOnMobileView />
    </div>
  );
};

export default App;
