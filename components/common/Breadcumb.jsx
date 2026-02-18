import React from "react";
import Link from "next/link";
import ParticleComponent from "./ParticleComponent";
export default function Breadcumb({ pageName = "Contest", title = "Contest" }) {
  return (
    <div className="page-title">
      <div className="tf-tsparticles">
        <ParticleComponent
          options={{
            fullScreen: {
              enable: false, // Disable fullscreen
              zIndex: -1, // Optional: Adjust if needed
            },

            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 120,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <h1 className="title">{title}</h1>
              <ul className="breadcrumbs">
                <li>
                  <Link href={`/`}>Home</Link>
                </li>
                <li>
                  <i className="icon-next" />
                </li>
                <li>Page</li>
                <li>
                  <i className="icon-next" />
                </li>
                <li>{pageName}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
