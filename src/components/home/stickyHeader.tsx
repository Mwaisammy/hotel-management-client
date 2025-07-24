// components/layout/StickyHeader.tsx

import Header from "../layout/Header";

const StickyHeader = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-md shadow">
      <Header />
    </div>
  );
};

export default StickyHeader;
