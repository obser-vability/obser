/* 
This panel is for demonstration purpose, it is an external plugin, auto generated by xobserve.

The origin plugin files is in https://github.com/xObserve/xobserve/tree/main/ui/external-plugins
*/

// This demo datasource is just a copy of Promtheus datasource
import { DatasourcePluginComponents } from 'types/plugin'
import DatasourceEditor from './DatasourceEditor'
import VariableEditor from './VariableEditor'
import QueryEditor from './QueryEditor'
import { DatasourceTypexobserve } from './types'
import {
  checkAndTestDatasource,
  queryxobserveVariableValues,
  query_http_alerts,
  replacexobserveQueryWithVariables,
  runQuery,
} from './query_runner'
import { $config } from 'src/data/configs/config'

const getDisabled = () => {
  return !$config.get().observability.enable
}

const components: DatasourcePluginComponents = {
  datasourceEditor: DatasourceEditor,
  variableEditor: VariableEditor,
  queryEditor: QueryEditor,

  // defined in query_runner.ts
  runQuery: runQuery,
  testDatasource: checkAndTestDatasource,
  replaceQueryWithVariables: replacexobserveQueryWithVariables,
  queryVariableValues: queryxobserveVariableValues,

  queryAlerts: query_http_alerts,

  settings: {
    type: DatasourceTypexobserve,
    icon: '/logo.svg',
    disabled: getDisabled,
  },
}

export default components