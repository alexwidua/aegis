/**
 * @file The options view handles all game settings.
 * It's divided into a GameOptions component, which deals with all game-related settings,
 * and a KeyboardOptions component, which deals with the keyboard mapping etc.
 */

import useStore from "store";
import { useEffect } from "react";
import { useLocalStorage } from "hooks";
import GameOptions from "./GameOptions";
import KeyboardOptions from "./KeyboardOptions";
import { LOCAL_STORAGE_KEY } from "store/constants";
import styles from "./index.module.scss";

const OptionsView = () => {
  /**
   * Let's get all option values and option setters from our useStore hook.
   */
  const { showBeforeFirstGame, keyboardLayout, scoreLimit, showLabeledKeys, iconDisplayStyle, buildingFilter } =
    useStore((state) => ({
      optionsModalOpen: state.optionsModalOpen,
      showBeforeFirstGame: state.showBeforeFirstGame,
      setShowBeforeFirstGame: state.setShowBeforeFirstGame,
      isPlaying: state.isPlaying,
      keyboardLayout: state.keyboardLayout,
      scoreLimit: state.scoreLimit,
      showLabeledKeys: state.showLabeledKeys,
      iconDisplayStyle: state.iconDisplayStyle,
      buildingFilter: state.buildingFilter,
    }));
  const { ages, types, group } = buildingFilter;

  /**
   * Update local storage when options change.
   */
  // eslint-disable-next-line no-unused-vars
  const [localStorageOptions, setLocalStorageOptions] = useLocalStorage(LOCAL_STORAGE_KEY);
  const gameOptions = {
    showBeforeFirstGame,
    scoreLimit,
    buildingFilter,
    showLabeledKeys,
    keyboardLayout,
    iconDisplayStyle,
  };

  // Update local store when game option changes
  useEffect(() => {
    setLocalStorageOptions(gameOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    keyboardLayout,
    scoreLimit,
    showLabeledKeys,
    iconDisplayStyle,
    group,
    ages.I,
    ages.II,
    ages.III,
    ages.IV,
    types.economic,
    types.military,
    types.fortified,
    types.research,
  ]);

  return (
    <div className={styles.container}>
      <GameOptions />
      <KeyboardOptions />
    </div>
  );
};

export default OptionsView;
