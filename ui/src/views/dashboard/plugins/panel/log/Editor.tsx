// Copyright 2023 Datav.io Team
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { Box, Button, Flex, HStack, Switch, Text, Textarea, VStack } from "@chakra-ui/react"
import { EditorInputItem, EditorNumberItem } from "components/editor/EditorItem"
import RadionButtons from "components/RadioButtons"
import PanelAccordion from "src/views/dashboard/edit-panel/Accordion"
import PanelEditItem from "src/views/dashboard/edit-panel/PanelEditItem"
import { Panel, PanelEditorProps } from "types/dashboard"
import React, { memo, useMemo, useState } from "react";
import { useStore } from "@nanostores/react"
import { commonMsg, componentsMsg } from "src/i18n/locales/en"
import { LogSeries, LogThreshold } from "types/plugins/log"
import { Select } from "antd"
import { LayoutOrientation } from "types/layout"
import { ColorPicker } from "components/ColorPicker"
import { ThresholdsConfig } from "types/threshold"
import { isEmpty } from "utils/validate"
import { palettes } from "utils/colors"
import { cloneDeep } from "lodash"
import { FaTimes } from "react-icons/fa"

const LogPanelEditor = memo((props: PanelEditorProps) => {
    const { panel, onChange } = props
    const data: LogSeries[] = props.data?.flat() ?? []
    const labels = useMemo(() => {
        const labels = new Set<string>()
        data.forEach(series => {
            Object.keys(series.labels).forEach(k => {
                labels.add(k)
            })
        })
        return Array.from(labels).sort()
    }, [props.data])

    const t = useStore(commonMsg)
    return (<>
        <PanelAccordion title={t.basicSetting}>
            <PanelEditItem title="Show time">
                <Switch isChecked={panel.plugins.log.showTime} onChange={(e) => onChange((panel: Panel) => {
                    panel.plugins.log.showTime = e.target.checked
                })} />
            </PanelEditItem>
            <PanelEditItem title="Timestamp column width" desc="In css pixels">
                <EditorNumberItem min={0} max={500} step={5} value={panel.plugins.log.timeColumnWidth} onChange={(v) => onChange((panel: Panel) => {
                    panel.plugins.log.timeColumnWidth = v
                })} placeholder="auto" />
            </PanelEditItem>
        </PanelAccordion>
        <PanelAccordion title="Labels">
            <PanelEditItem title="Display labels">
                <Select mode="multiple" value={panel.plugins.log.labels.display} options={labels.map(l => ({ label: l, value: l }))} onChange={(v) => onChange((panel: Panel) => {
                    panel.plugins.log.labels.display = v
                })} popupMatchSelectWidth={false} style={{ width: '100%' }} placeholder="select labels.." allowClear showSearch />
            </PanelEditItem>
            <PanelEditItem title="Label column width" desc="In css pixels">
                <EditorNumberItem min={0} max={1000} step={5} value={panel.plugins.log.labels.width} onChange={(v) => onChange((panel: Panel) => {
                    panel.plugins.log.labels.width = v
                })} placeholder="auto" />
            </PanelEditItem>
            <PanelEditItem title="Layout orientation">
                <RadionButtons options={[{ label: LayoutOrientation.Horizontal, value: LayoutOrientation.Horizontal }, { label: LayoutOrientation.Vertical, value: LayoutOrientation.Vertical }]} value={panel.plugins.log.labels.layout} onChange={v => onChange((panel: Panel) => {
                    panel.plugins.log.labels.layout = v
                })} />
            </PanelEditItem>
        </PanelAccordion>
        <PanelAccordion title={t.styles}>
            <PanelEditItem title="Label name color">
                <ColorPicker color={panel.plugins.log.styles.labelColor} onChange={(v) => onChange((panel: Panel) => {
                    panel.plugins.log.styles.labelColor = v
                })} />
            </PanelEditItem>
            <PanelEditItem title="Label value color">
                <ColorPicker color={panel.plugins.log.styles.labelValueColor} onChange={(v) => onChange((panel: Panel) => {
                    panel.plugins.log.styles.labelValueColor = v
                })} />
            </PanelEditItem>
            <PanelEditItem title="Content color">
                <ColorPicker color={panel.plugins.log.styles.contentColor} onChange={(v) => onChange((panel: Panel) => {
                    panel.plugins.log.styles.contentColor = v
                })} />
            </PanelEditItem>
            <PanelEditItem title="Font size" desc="Css style font-size">
                <EditorInputItem value={panel.plugins.log.styles.fontSize} onChange={(v) => onChange((panel: Panel) => {
                    panel.plugins.log.styles.fontSize = v
                })} placeholder="e.g 1rem, 16px" />
            </PanelEditItem>
            <PanelEditItem title="Wrap line" desc="Css style word-break">
                <RadionButtons options={[{ label: "Break All", value: "break-all" }, { label: "Break Word", value: 'break-word' }]} value={panel.plugins.log.styles.wordBreak} onChange={v => onChange((panel: Panel) => {
                    panel.plugins.log.styles.wordBreak = v
                })} />
            </PanelEditItem>
        </PanelAccordion>
        <PanelAccordion title="Thresholds">
            <ThresholdEditor labels={labels} value={panel.plugins.log.thresholds} onChange={(v) => onChange((panel: Panel) => {
                panel.plugins.log.thresholds = v
            })} />
        </PanelAccordion>
    </>
    )
})

export default LogPanelEditor



interface Props {
    labels: string[]
    value: LogThreshold[]
    onChange: any
}


const ThresholdEditor = (props: Props) => {
    const t1 = useStore(componentsMsg)
    const [value, setValue] = useState(props.value)
    if (isEmpty(value)) {
        const v = []
        // add base threshold
        const color = 'inherit'
        v.push({
            color,
            value: null,
            type: null,
        })
        setValue(v)
        return
    }

    const addThreshod = () => {
        const color = palettes[value.length % palettes.length]
        value.unshift({
            type: "label",
            key: null,
            value: null,
            color: color
        })
        changeValue(value)
    }

    const removeThreshold = (i) => {
        value.splice(i, 1)
        changeValue(value)
    }



    const changeValue = v => {
        const v1 = cloneDeep(v)

        setValue(v1)
        props.onChange(v1)
    }

    return (<Box>
        <Button onClick={addThreshod} width="100%" size="sm" colorScheme="gray">+ {t1.addThreshold}</Button>
        <Text fontSize="0.8rem" textStyle="annotation" mt="2">When target is matched, color of Timestamp will change</Text>
        <VStack alignItems="left" mt="2">
            {value?.map((threshold, i) =>
                <Flex key={threshold.color + threshold.key + threshold.type + threshold.value + i} justifyContent="space-between" alignItems="center">
                    <HStack spacing={1}>
                        <ColorPicker color={threshold.color} onChange={v => {
                            value[i].color = v
                            changeValue(value)
                        }} circlePicker />
                        {threshold.type !== null && <Select value={threshold.type} onChange={v => {
                            value[i].type = v
                            changeValue(value)
                        }} style={{ width: '100px' }} showSearch options={[{ label: "Label", value: "label" },{ label: "Content", value: "content" }]} popupMatchSelectWidth={false}/>}
                          {threshold.type == "label" && <Select value={threshold.key} onChange={v => {
                            value[i].key = v
                            changeValue(value)
                        }} style={{ width: '120px' }} showSearch options={props.labels.map(l => ({ label: l, value: l }))} placeholder="select label"  popupMatchSelectWidth={false}/>}
                        {threshold.type !== null && <EditorInputItem value={threshold.value} onChange={v => {
                            value[i].value = v
                            changeValue(value)
                        }} placeholder="match value.."/>}
                        {threshold.type === null && <Text pl="1" fontSize="0.95rem">Base</Text>}
                    </HStack>
                    {threshold.type !== null && <FaTimes opacity={0.6} fontSize="0.8rem" onClick={() => removeThreshold(i)} />}
                </Flex>)}
        </VStack>
    </Box>)
}