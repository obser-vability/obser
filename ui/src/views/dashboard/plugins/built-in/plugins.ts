
// DON'T modify this file, it is automatically generated by Datav external plugin system
import { DatasourcePluginComponents, PanelPluginComponents } from "types/plugin"

import graphPanel from './panel/graph'
import alertPanel from './panel/alert'
import barPanel from './panel/bar'
import barGaugePanel from './panel/barGauge'
import echartsPanel from './panel/echarts'
import gaugePanel from './panel/gauge'
import geomapPanel from './panel/geomap'
import logPanel from './panel/log'
import nodeGraphPanel from './panel/nodeGraph'
import piePanel from './panel/pie'
import statPanel from './panel/stat'
import tablePanel from './panel/table'
import textPanel from './panel/text'
import tracePanel from './panel/trace'
import datavLogPanel from './panel/datavLog'

import prometheusDs from './datasource/prometheus'
import httpDs from './datasource/http'
import datavDs from './datasource/datav'
import jaegerDs from './datasource/jaeger'
import lokiDs from './datasource/loki'
import testdataDs from './datasource/testdata'
import vmDs from './datasource/victoriaMetrics'

export const builtinPanelPlugins: Record<string,PanelPluginComponents> = {
	[graphPanel.settings.type]: graphPanel,
    [alertPanel.settings.type]: alertPanel,
    [barPanel.settings.type]: barPanel,
    [barGaugePanel.settings.type]: barGaugePanel,
    [echartsPanel.settings.type]: echartsPanel,
    [gaugePanel.settings.type]: gaugePanel,
    [geomapPanel.settings.type]: geomapPanel,
    [logPanel.settings.type]: logPanel,
    [nodeGraphPanel.settings.type]: nodeGraphPanel,
    [piePanel.settings.type]: piePanel,
    [statPanel.settings.type]: statPanel,
    [tablePanel.settings.type]: tablePanel,
    [textPanel.settings.type]: textPanel,
    [tracePanel.settings.type]: tracePanel,
    [datavLogPanel.settings.type]: datavLogPanel
}

export const builtinDatasourcePlugins: Record<string,DatasourcePluginComponents> = {
    [prometheusDs.settings.type]: prometheusDs,
    [httpDs.settings.type]: httpDs,
    [jaegerDs.settings.type]: jaegerDs,
    [lokiDs.settings.type]: lokiDs,
    [testdataDs.settings.type]: testdataDs,
    [vmDs.settings.type]: vmDs,
    [datavDs.settings.type]: datavDs,
}