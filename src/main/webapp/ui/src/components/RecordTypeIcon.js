// @flow strict

import React, { type Node } from "react";
import CustomTooltip from "./CustomTooltip";
import { toTitleCase } from "../util/Util";
import { useTheme } from "@mui/material/styles";
import BenchIcon from "../assets/graphics/RecordTypeGraphics/Icons/Bench";
import TemplateIcon from "../assets/graphics/RecordTypeGraphics/Icons/Template";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFlask,
  faVials,
  faBox,
  faQuestionCircle,
  faLayerGroup,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faFile,
  faFlask,
  faVials,
  faBox,
  faQuestionCircle,
  faLayerGroup,
  faPaperclip
);
import { type RecordIconData } from "../stores/definitions/BaseRecord";

type RecordTypeIconArgs = {|
  record: RecordIconData,
  color?: ?string,
  "aria-hidden"?: boolean,
  style?: { ... },
|};

export default function RecordTypeIcon({
  record,
  color, // Empty string signifies default styling
  ["aria-hidden"]: ariaHidden,
  style,
}: RecordTypeIconArgs): Node {
  const theme = useTheme();

  let icon;
  switch (record.iconName) {
    case "bench":
      icon = <BenchIcon color={color ?? theme.palette.record.container.fg} />;
      break;
    case "container":
      icon = (
        <FontAwesomeIcon
          size="1x"
          icon="box"
          color={color ?? theme.palette.record.container.fg}
          style={style}
        />
      );
      break;
    case "sample":
      icon = (
        <FontAwesomeIcon
          size="1x"
          icon="flask"
          color={color ?? theme.palette.record.sample.fg}
          style={style}
        />
      );
      break;
    case "subsample":
      icon = (
        <FontAwesomeIcon
          size="1x"
          icon="vials"
          color={color ?? theme.palette.record.subSample.fg}
          style={style}
        />
      );
      break;
    case "template":
      icon = (
        <TemplateIcon
          color={color ?? theme.palette.record.sampleTemplate.fg}
          style={style}
        />
      );
      break;
    case "attachment":
      icon = (
        <FontAwesomeIcon
          size="1x"
          icon="paperclip"
          color={color ?? theme.palette.record.attachment.fg}
          style={style}
        />
      );
      break;
    case "document":
      icon = (
        <FontAwesomeIcon
          size="1x"
          icon="file"
          color={color ?? theme.palette.record.document.fg}
        />
      );
      break;
    default:
      throw new Error("Unknown icon " + record.iconName);
  }

  if (record.recordTypeLabel === "") return icon;
  return (
    <CustomTooltip
      title={toTitleCase(record.recordTypeLabel)}
      aria-hidden={ariaHidden}
    >
      {icon}
    </CustomTooltip>
  );
}
