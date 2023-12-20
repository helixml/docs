import React from 'react';

const TYPE_DURATION = 30;

function Type({ text, onEnd }) {
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    if (state < text.length) {
      const timeout = setTimeout(() => setState((s) => s + 1), TYPE_DURATION);
      return () => clearTimeout(timeout);
    } else {
      onEnd();
    }
  }, [text, state, onEnd]);

  return text.substring(0, state);
}

const text =
  'Helix is Open AI in a box. Your box. Use chat or API. Deploy anywhere.';

export function Typewriter() {
  const [state, setState] = React.useState(0);
  const [done, setDone] = React.useState(false);
  // placate compiler
  console.log(state, setDone)

  const next = React.useCallback(() => setState((s) => s + 1), []);

  return (
    <h1 className="jumbo" aria-label={text} style={{maxWidth:"900px"}}>
      <span className="prefers-no-animation">{text}</span>
      <span className="prefers-animation">
          <Type text={text} onEnd={next} />
      </span>
        <span className="cursor-container">
          <div className="cursor" />
        </span>
      <style jsx>
        {`
          .prefers-no-animation {
            display: none;
          }
          h1 {
            // Prevent page jump
            height: calc(var(--line-height-jumbo) * 3);
            overflow: hidden;
          }
          .cursor-container {
            position: relative;
            display: inline-block;
          }
          .cursor {
            position: absolute;
            display: inline-block;
            top: -0.82em;
            left: 12px;
            width: 8px;
            height: 0.96em;
            background: var(--theme);
            ${done ? 'display: none;' : ''}
          }
          @media screen and (max-width: 660px) {
            h1 {
              height: unset;
              overflow: initial;
            }
            .prefers-animation {
              display: none;
            }
            .prefers-no-animation {
              display: inline;
            }
          }
        `}
      </style>
    </h1>
  );
}
