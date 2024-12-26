import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="pb-12">
        <div className="py-2 text-lg text-center text-primary-500">
          Follow me !!
        </div>
        <div className="flex justify-center items-center gap-2">
          <a
            href="https://x.com/ema_0505"
            target="_blank"
            rel="noreferrer"
            className="mx-2 p-4 bg-white rounded-full"
          >
            <img src="./images/x.png" alt="x logo" />
          </a>
          <a
            href="https://instagram.com/ema_0505"
            target="_blank"
            rel="noreferrer"
            className="mx-2 p-4 bg-white rounded-full"
          >
            <img src="./images/instagram.png" alt="instagram logo" />
          </a>
        </div>
      </div>
      <div className="flex justify-center">
        <img src="./images/ema.png" alt="ema logo" />
      </div>
      <p className="text-center text-primary-500">&copy; ema</p>
    </footer>
  );
};

const MemoizedFooter = React.memo(Footer);
export { MemoizedFooter as Footer };
