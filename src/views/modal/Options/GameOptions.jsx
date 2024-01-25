import { useCallback } from "react";
import useStore from "store";
import Checkbox from "components/common/Checkbox";
import { WrapSegmentedInputComponent, WrapCheckboxComponent } from "./shared";
import styles from "./gameOptions.module.scss";

// Assets
import IconGeneric from "assets/icons/flags/generic.png";
import IconMongol from "assets/icons/flags/mongol.png";
import IconRus from "assets/icons/flags/rus.png";
import IconChinese from "assets/icons/flags/chinese.png";
import IconDelhi from "assets/icons/flags/delhi.png";
import IconAbbasid from "assets/icons/flags/abbasid.png";
import IconMalians from "assets/icons/flags/malians.png";
import IconOttomans from "assets/icons/flags/ottomans.png";
import IconByzantines from "assets/icons/flags/byzantines.png";
import IconJapanese from "assets/icons/flags/japanese.png";

import SingleIcon from "assets/icons/ui/single.svg";
import GridIcon from "assets/icons/ui/grid.svg";

const GameOptions = () => {
  /**
   * Get all option values and setters from Zustand
   */
  const {
    scoreLimit,
    setScoreLimit,
    showLabeledKeys,
    setShowLabeledKeys,
    iconDisplayStyle,
    handleSetIconDisplayStyle,
    buildingFilter,
    setBuildingFilter,
  } = useStore((state) => ({
    scoreLimit: state.scoreLimit,
    setScoreLimit: state.setScoreLimit,
    showLabeledKeys: state.showLabeledKeys,
    setShowLabeledKeys: state.setShowLabeledKeys,
    iconDisplayStyle: state.iconDisplayStyle,
    handleSetIconDisplayStyle: state.handleSetIconDisplayStyle,
    buildingFilter: state.buildingFilter,
    setBuildingFilter: state.setBuildingFilter,
  }));
  const { ages, types, group } = buildingFilter;

  /**
   * Handle building filter
   */
  const handleFilter = useCallback(
    (category, key, isCheckbox) => {
      const obj = buildingFilter;
      if (isCheckbox) obj[category][key] = !obj[category][key];
      else obj[category] = key;
      setBuildingFilter(obj);
    },
    [buildingFilter, setBuildingFilter]
  );

  return (
    <div className={styles.container}>
      <h2>Options</h2>
      <h3>Building options</h3>
      <WrapSegmentedInputComponent
        name={`buildings`}
        label={`Number of buildings each game`}
        value={scoreLimit}
        onValueChange={(value) => setScoreLimit(value)}
        options={[{ value: 25 }, { value: 50 }, { value: 100 }]}
      />
      <WrapSegmentedInputComponent
        name={`civ`}
        label={`Civilization`}
        value={group}
        onValueChange={(value) => handleFilter("group", value)}
        options={[
          {
            icon: IconGeneric,
            value: "GENERIC",
          },
          {
            icon: IconAbbasid,
            value: "ABBASID",
          },
          {
            icon: IconChinese,
            value: "CHINESE",
          },
          {
            icon: IconMongol,
            value: "MONGOL",
          },
          {
            icon: IconRus,
            value: "RUS",
          },
          {
            icon: IconDelhi,
            value: "DELHI",
          },
          {
            icon: IconMalians,
            value: "MALIANS",
          },
          {
            icon: IconOttomans,
            value: "OTTOMANS",
          },
          {
            icon: IconJapanese,
            value: "JAPANESE",
          },
          {
            icon: IconByzantines,
            value: "BYZANTINES",
          },
        ]}
      />
      <WrapCheckboxComponent label={`Building ages`} id="ages">
        {Object.keys(ages).map((el, i) => (
          <Checkbox value={ages[el]} onChange={() => handleFilter("ages", el, true)} key={i}>
            Age
            <span
              style={{
                textTransform: "uppercase",
                marginLeft: "0.25em",
              }}
            >
              {el}
            </span>
          </Checkbox>
        ))}
      </WrapCheckboxComponent>
      <WrapCheckboxComponent label={`Building types`}>
        {Object.keys(types).map((el, i) => (
          <Checkbox value={types[el]} onChange={() => handleFilter("types", el, true)} key={i}>
            {el}
          </Checkbox>
        ))}
      </WrapCheckboxComponent>
      {/*
       * Display
       */}
      <h3>Display options</h3>
      <WrapSegmentedInputComponent
        name={`showLabels`}
        label={`Show labelled or blank key caps`}
        value={showLabeledKeys}
        onValueChange={(value) => setShowLabeledKeys(value)}
        options={[
          {
            children: "Labelled keys",
            value: "SHOW",
            icon: <span className={styles.iconKey}>Q</span>,
          },
          {
            children: "Slowly fade in labels",
            value: "FADE_IN",
            icon: (
              <span className={styles.iconKey}>
                <span className={styles.fade}>Q</span>
              </span>
            ),
          },
          {
            children: "Blank keys",
            value: "HIDE",
            icon: (
              <span className={styles.iconKey}>
                <span className={styles.blank}>Q</span>
              </span>
            ),
          },
        ]}
      />
      <WrapSegmentedInputComponent
        name={`iconDisplayStyle`}
        label={`Icon style`}
        value={iconDisplayStyle}
        onValueChange={(value) => handleSetIconDisplayStyle(value)}
        options={[
          {
            children: "Icon + Name",
            value: "SINGLE",
            icon: SingleIcon,
          },
          { children: "Icon in grid", value: "GRID", icon: GridIcon },
          {
            children: "Name only",
            value: "NAME",
            icon: <span className={styles.iconName}>House</span>,
          },
        ]}
      />
    </div>
  );
};

export default GameOptions;
