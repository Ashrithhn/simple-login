/**
 * Home page with animated city traffic scene.
 */

import cityImage from "../assets/city.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home-hero">
      <div className="home-hero__overlay" />

      <div className="home-hero__content">
        <div className="home-hero__intro">
          <h1>Welcome to City Information Portal</h1>
          <p>
            Real‑time inspired city insights: traffic, quality of life, and
            stories from around the world.
          </p>

          {!user && (
            <div className="home-hero__actions">
              <button onClick={() => navigate("/login")}>Login</button>
              <button
                className="home-hero__secondary"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          )}
        </div>

        <div className="home-hero__scene">
          <div className="route-dots route-dots--arc" />
          <div className="route-dots route-dots--diagonal" />

          <div className="pedestrian pedestrian--one">
            <span className="pedestrian__body" />
          </div>
          <div className="pedestrian pedestrian--two">
            <span className="pedestrian__body" />
          </div>

          <div className="traffic-signal">
            <div className="traffic-signal__head">
              <div className="traffic-signal__light traffic-signal__light--red" />
              <div className="traffic-signal__light traffic-signal__light--yellow" />
              <div className="traffic-signal__light traffic-signal__light--green" />
            </div>
            <div className="traffic-signal__pole" />
          </div>

          <div className="road">
            <div className="road__lane road__lane--top" />
            <div className="road__lane road__lane--bottom" />
            <div className="car car--primary">
              <div className="car__body">
                <div className="car__window" />
                <div className="car__window car__window--back" />
              </div>
              <div className="car__wheels">
                <span />
                <span />
              </div>
            </div>
            <div className="car car--secondary">
              <div className="car__body">
                <div className="car__window" />
              </div>
              <div className="car__wheels">
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="skyline">
            <div className="skyline__building skyline__building--1" />
            <div className="skyline__building skyline__building--2" />
            <div className="skyline__building skyline__building--3" />
            <div className="skyline__building skyline__building--4" />
          </div>

          <img src={cityImage} alt="City" className="home-hero__bg-image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
