import React, { PureComponent } from 'react';
import { FieldDisplay, getFieldDisplayValues, PanelProps, VizOrientation, currentTheme, getTheme } from 'src/packages/datav-core/src';
import { DataLinksContextMenu, Gauge, VizRepeater, VizRepeaterRenderValueProps ,DataLinksContextMenuApi} from 'src/packages/datav-core/src';
import { GaugeOptions } from './types';

export class GaugePanel extends PureComponent<PanelProps<GaugeOptions>> {
  renderComponent = (
    valueProps: VizRepeaterRenderValueProps<FieldDisplay>,
    menuProps: DataLinksContextMenuApi
  ): JSX.Element => {
    const { options } = this.props;
    const { value, width, height } = valueProps;
    const { field, display } = value;
    const { openMenu, targetClassName } = menuProps;

    return (
      <Gauge
        value={display}
        width={width}
        height={height}
        field={field}
        showThresholdLabels={options.showThresholdLabels}
        showThresholdMarkers={options.showThresholdMarkers}
        theme={getTheme(currentTheme)}
        onClick={openMenu}
        className={targetClassName}
      />
    );
  };

  renderValue = (valueProps: VizRepeaterRenderValueProps<FieldDisplay>): JSX.Element => {
    const { value } = valueProps;
    const { getLinks, hasLinks } = value;

    if (!hasLinks) {
      return this.renderComponent(valueProps, {});
    }

    return (
      <DataLinksContextMenu links={getLinks}>
        {api => {
          return this.renderComponent(valueProps, api);
        }}
      </DataLinksContextMenu>
    );
  };

  getValues = (): FieldDisplay[] => {
    const { data, options, replaceVariables, fieldConfig, timeZone } = this.props;
    return getFieldDisplayValues({
      fieldConfig,
      reduceOptions: options.reduceOptions,
      replaceVariables,
      data: data.series,
      autoMinMax: true,
      timeZone,
    });
  };

  render() {
    const { height, width, data, renderCounter } = this.props;
    return (
      <VizRepeater
        getValues={this.getValues}
        renderValue={this.renderValue}
        width={width}
        height={height}
        source={data}
        autoGrid={true}
        renderCounter={renderCounter}
        orientation={VizOrientation.Auto}
      />
    );
  }
}
