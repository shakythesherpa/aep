import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
// import ReactTooltip from 'react-tooltip';
import { themeVal, glsp, truncated } from '@devseed-ui/theme-provider';
import { AccordionFold } from '@devseed-ui/accordion';
import { Button } from '@devseed-ui/button';

import Prose from '../../styles/typography/prose';
// import LayerLegend from './layer-legend';

const LayerSelf = styled(AccordionFold)`
  position: relative;
  box-shadow: 0 1px 0 0 ${themeVal('color.baseAlphaB')};
`;

const LayerHeader = styled.header`
  display: grid;
  grid-auto-columns: 1fr min-content;
  padding: ${glsp(0.5)} ${glsp()};
  grid-gap: ${glsp(0.5)};
`;

const LayerHeadline = styled.div`
  grid-row: 1;
  min-width: 0px;
`;

const LayerTitle = styled.h1`
  ${truncated()}
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0;

  sub {
    bottom: 0;
  }
`;

const LayerToolbar = styled.div`
  grid-row: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;

  > * {
    margin-top: -0.125rem;
  }

  > *:not(:first-child) {
    margin-left: ${glsp(0.25)};
  }
`;

const LayerBodyInner = styled(Prose)`
  position: relative;
  z-index: 8;
  box-shadow: inset 0 1px 0 0 ${themeVal('color.baseAlphaB')};
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.875rem;
  line-height: 1.25rem;
  backdrop-filter: saturate(48%);
  padding: ${glsp()};

  /* stylelint-disable-next-line no-descending-specificity */
  > * {
    margin-bottom: ${glsp(0.75)};
  }
`;

function PanelLayer(props) {
  const {
    label,
    disabled,
    active,
    info,
    onToggleClick,
    dataOrder,
    legend,
    isExpanded,
    setExpanded
  } = props;

  return (
    <LayerSelf
      forwardedAs='article'
      isFoldExpanded={isExpanded}
      setFoldExpanded={setExpanded}
      renderHeader={({ isFoldExpanded, setFoldExpanded }) => (
        <LayerHeader>
          <LayerHeadline>
            <LayerTitle title={label}>{label}</LayerTitle>
          </LayerHeadline>
          <LayerToolbar>
            <Button
              variation='base-plain'
              size='small'
              useIcon='circle-information'
              title='Show/hide layer info'
              hideText
              disabled={!info}
              active={isFoldExpanded}
              onClick={() => setFoldExpanded(!isFoldExpanded)}
            >
              <span>Info</span>
            </Button>
            <Button
              variation='base-plain'
              size='small'
              useIcon='eye'
              title='Enable/disable layer'
              hideText
            >
              Enable layer
            </Button>
          </LayerToolbar>
          {/* <LayerLegend
            dataOrder={dataOrder}
            legend={legend}
            knobPos={knobPos}
            onLegendKnobChange={onLegendKnobChange}
            id={id}
          /> */}
        </LayerHeader>
      )}
      renderBody={() => (
        <LayerBodyInner>
          {info || <p>No info available for this layer.</p>}
        </LayerBodyInner>
      )}
    />
  );
}

PanelLayer.propTypes = {
  label: T.string,
  disabled: T.bool,
  active: T.bool,
  dataOrder: T.string,
  info: T.node,
  legend: T.object,
  onToggleClick: T.func,
  isExpanded: T.bool,
  setExpanded: T.func
};

export default PanelLayer;
