import React from 'react';

import { AppLink as Link } from '../AppLink';
import { ThemeToggle } from '.';

export function Footer({ children: links, landing }) {
  const copyright = (
    <p>2023 HelixML, Inc.</p>
  );

  const disclaimer = (
    <span className="disclaimer">
      This site was{' '}
      <a href="" className="live-edit">
        built using Markdoc
      </a>
      <style jsx>
        {`
          .disclaimer {
            color: rgba(24, 24, 27, 0.5);
            padding-left: 2rem;
            font-size: 15px;
            font-weight: 400;
            line-height: 27px;
          }

          .disclaimer button {
            display: inline-block;
            padding: 0;
            color: inherit;
            text-decoration: underline;
            font-weight: regular;
          }

          :global(body.dark) .disclaimer {
            color: var(--white);
          }

          @media screen and (max-width: 1000px) {
            .disclaimer {
              display: none;
            }
          }
        `}
      </style>
    </span>
  );

  const toggle = <ThemeToggle />;

  const fancyLinks = landing ? (
    <>
      <h3 className="jumbo">
        {React.Children.toArray(links).map((l, i, a) => (
          <span className="main-link" key={i}>
            {l}
            {i !== a.length - 1 ? ', ' : ''}
          </span>
        ))}
        <span className="try-link">
          <Link href="https://app.tryhelix.ai">Try Helix</Link>
        </span>
      </h3>
      <hr />
      <style jsx>
        {`
          h3 {
            margin: 0;
            display: flex;
            flex-wrap: wrap;
          }

          h3 :global(.main-link:nth-child(n + 2)) {
            margin-left: 10px;
            display: inline-block;
            min-height: 0px;
          }

          h3 :global(.main-link a) {
            text-decoration: none;
          }

          hr {
            margin: 2rem auto;
            display: block;
            width: 100%;
            border: none;
            border-bottom: 1px solid var(--dark);
          }

          .try-link {
            margin-left: auto;
          }

          @media screen and (max-width: 1000px) {
            h3 {
              font-size: 35px;
              line-height: 46px;
            }
          }

          @media screen and (max-width: 780px) {
            .try-link {
              display: none;
            }
          }

          @media screen and (max-width: 600px) {
            hr {
              margin: 0 auto;
            }
            h3 {
              font-size: 24px;
              line-height: 33px;
              text-align: center;
              flex-wrap: wrap;
              justify-content: center;
              padding: 0 2rem;
            }
          }
        `}
      </style>
    </>
  ) : null;

  return (
    <>
      <footer className="desktop">
        {fancyLinks}
        <div className="flex">
          <div className="left gap">{copyright}</div>
          <div className="right gap">
            {disclaimer}
            {toggle}
          </div>
        </div>
      </footer>
      <footer className="mobile gap">
        {fancyLinks}
        {copyright}
        {toggle}
        {disclaimer}
      </footer>
      <style jsx>
        {`
          :global(.gap) {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }

          footer {
            position: relative;
            display: flex;
            z-index: 100;
            width: 100%;
            color: var(--dark);
            padding: 1rem 0;
          }

          footer.desktop {
            flex-direction: column;
          }

          footer.mobile {
            display: none;
            flex-direction: column;
            padding: 0;
          }

          .right {
            margin-left: auto;
          }

          @media screen and (max-width: 600px) {
            footer.mobile {
              display: flex;
            }
            footer.desktop {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
}
