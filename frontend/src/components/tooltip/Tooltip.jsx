import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({ explanation, style }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      {hasMounted && (
        <>
          <img
            src="/images/svg/icons8-info.svg"
            style={{ display: 'inline' }}
            alt={`Tooltip to explain ${explanation}`}
            data-tip={explanation}
            style={style}
          />

          <ReactTooltip backgroundColor="#222" textColor="white" />
        </>
      )}
    </>
  );
};

export default Tooltip;

/**
 * https://stackoverflow.com/questions/64079321/react-tooltip-and-next-js-ssr-issue
 * if the component is rendered before mount throws long warning about setting innerHTML on first paint.
 */
