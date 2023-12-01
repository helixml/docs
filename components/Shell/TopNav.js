import React from 'react';
import { DocSearch } from '@docsearch/react';

import { AppLink as Link } from '../AppLink';

function Search() {
  return (
    <DocSearch
      appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
      apiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY}
      indexName="markdoc"
    />
  );
}

export function TopNav({ children }) {
  const [showMobileNav, setShowMobileNav] = React.useState(false);
  return (
    <div className="nav-bar">
      <nav>
        <div className="flex top-row">
          <div style={{marginTop:5}}>
            <Link href="/" className="flex">
            <svg role="img" viewBox="0 0 47 68" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height: 30}}>
              <path d="M15.9268 3.41382L15.7675 21.2642L15.5102 52.1134V58.1779C15.4898 58.7861 15.631 59.3888 15.9194 59.9247C16.2078 60.4606 16.6331 60.9105 17.1519 61.2285L24.1843 65.296L25.6299 66.1291C27.7314 67.3481 30.1162 67.9938 32.5456 68.0014C34.975 68.009 37.3638 67.3783 39.4729 66.1724C41.5819 64.9666 43.3372 63.2278 44.563 61.1303C45.7888 59.0328 46.442 56.65 46.4574 54.2206L46.7147 23.3837V17.258C46.7207 16.6458 46.564 16.0429 46.2604 15.5112C45.9569 14.9795 45.5175 14.538 44.9873 14.2319L39.7559 11.218L36.5337 9.36804L21.0602 0.436718C20.5374 0.146102 19.9481 -0.00382494 19.3501 0.00160738C18.752 0.0070397 18.1655 0.167645 17.6482 0.467709C17.1308 0.767772 16.7001 1.19701 16.3984 1.71343C16.0967 2.22985 15.9342 2.81576 15.9268 3.41382Z" fill="#16C3E4" fillOpacity="0.8"/>
              <g style={{mixBlendMode:"hard-light"}}>
              <path d="M31.3986 35.0108L31.1636 63.0174C31.1434 63.6524 30.9604 64.2716 30.6322 64.8156C30.304 65.3596 29.8415 65.8101 29.2892 66.1241C28.7368 66.4381 28.1131 66.605 27.4777 66.6088C26.8423 66.6126 26.2166 66.4532 25.6605 66.1458L1.80552 52.1981C1.25401 51.8682 0.797643 51.4008 0.481139 50.8416C0.164634 50.2823 -0.00115693 49.6505 6.0768e-06 49.0079L0.23497 21.1867C0.25531 20.5542 0.437144 19.9374 0.763178 19.395C1.08921 18.8526 1.5486 18.4026 2.09766 18.0879C2.64672 17.7731 3.26719 17.604 3.90005 17.5967C4.53292 17.5894 5.15714 17.744 5.71334 18.046L29.5684 31.8082C30.1263 32.1361 30.5887 32.6041 30.9098 33.1659C31.2309 33.7277 31.3994 34.3637 31.3986 35.0108Z" fill="#C43BBB"/>
              </g>
            </svg>
            <div style={{marginLeft: 20, fontSize:"x-large"}}>Helix Docs</div>
            </Link>
          </div>
          <button
            className="hamburger"
            onClick={() => setShowMobileNav((o) => !o)}
          >
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="16" height="2" fill="var(--black)" />
              <rect y="4" width="16" height="2" fill="var(--black)" />
              <rect y="8" width="16" height="2" fill="var(--black)" />
            </svg>
          </button>
        </div>
        <section className={showMobileNav ? 'active' : ''}>
          {children}
          <Search />
        </section>
      </nav>
      <style jsx>
        {`
          .nav-bar {
            top: 0;
            position: fixed;
            z-index: 100;
            display: flex;
            width: 100%;
            background: var(--light);
          }
          nav {
            display: flex;
            gap: 1rem;
            width: 100%;
            margin: 0 auto;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--dark);
            padding: 1rem 2rem 1.1rem;
            font-size: 15px;
            font-family: var(--sans);
          }
          nav :global(a) {
            text-decoration: none;
          }
          nav :global(.DocSearch-Button) {
            background: var(--code-background);
            height: 32px;
            border-radius: 32px;
          }
          nav :global(.DocSearch-Button:hover) {
            box-shadow: none;
            background: #e8eef3;
          }
          :global(.dark) nav :global(.DocSearch-Button:hover) {
            background: #424248;
          }
          nav :global(.DocSearch-Search-Icon) {
            color: var(--dark);
            width: 16px;
          }
          nav :global(.DocSearch-Button-Placeholder),
          nav :global(.DocSearch-Button-Keys) {
            display: none;
          }
          section {
            display: flex;
            align-items: center;
            gap: 1.3rem;
            padding: 0;
          }
          button {
            display: none;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 32px;
            background: var(--gray-light);
            border-radius: 30px;
          }
          .top-row {
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          @media screen and (max-width: 600px) {
            .nav-bar {
              border-bottom: 1px solid var(--dark);
            }
            nav {
              flex-direction: column;
              align-items: flex-start;
              border-bottom: none;
            }
            section {
              display: none;
              font-size: 15px;
            }
            section.active {
              display: flex;
            }
            button {
              display: flex;
            }
          }
        `}
      </style>
    </div>
  );
}
