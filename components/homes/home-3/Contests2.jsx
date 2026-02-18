import { slotGames } from "@/data/contests";
import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Contests2() {
  return (
    <section className="s-game-play tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section mb-40">
              <h1 className="title fw-9 fs-50 mb-8">Win up to $250k</h1>
              <p className="sub-title fw-4">with our Instant Win Games</p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="game-play">
              <div className="style-left wow">
                {slotGames.slice(0, 1).map((game, index) => (
                  <div
                    key={index}
                    className="slot-game game-1 wow fadeInLeft"
                    data-wow-delay="0s"
                  >
                    <div className="content">
                      <div className="image-item mb-30">
                        <Image
                          alt=""
                          src={game.itemImage.src}
                          width={243}
                          height={150}
                        />
                      </div>
                      <h4 className="title fw-9 mb-16">Win up to</h4>
                      <p className="text-color-clip letter-space-0 fs-50 mb-30">
                        $2
                        <span className="fs-40"> Million* </span>
                      </p>
                      <Link
                        href={`/contest`}
                        className="btn-play tf-btn h-67 fs-20"
                      >
                        Play form $25 <i className="icon-right" />
                      </Link>
                    </div>
                    <div className="image">
                      <Image
                        alt=""
                        src={game.mainImage.src}
                        width={528}
                        height={430}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="style-right">
                {slotGames.slice(1, 3).map((game, index) => (
                  <div
                    key={index}
                    className={`slot-game ${game.gameClass} wow fadeInRight`}
                    data-wow-delay={game.delay}
                  >
                    <div className="content">
                      <div className="image-item mb-16">
                        <Image
                          alt=""
                          src={game.itemImage.src}
                          width={game.itemImage.width}
                          height={game.itemImage.height}
                        />
                      </div>
                      <p className="title fw-9 fs-14">Win up to</p>
                      <p className="text-color-clip fs-30 mb-16 letter-space-0">
                        $2 <span className="fs-20">million</span>
                      </p>
                      <Link
                        href={`/contest`}
                        className="btn-play tf-btn h-42 fs-13"
                      >
                        Play form $25 <i className="icon-right" />
                      </Link>
                    </div>
                    <div className="image">
                      <Image
                        alt=""
                        src={game.mainImage.src}
                        width={game.mainImage.width}
                        height={game.mainImage.height}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
