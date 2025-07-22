import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div>
      <div>
        <button>
          <Link to="/dashboard">Dashboard</Link>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
