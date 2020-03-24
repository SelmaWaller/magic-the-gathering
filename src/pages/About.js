import React, {useState} from 'react';

import HowToPlay from './../components/how-to-play';
import History from './../components/history';

export default function About() {
  const [currentPage, setCurrentPage] = useState(1);

  const next = () => {
    document.querySelector('#aboutContent').innerHTML = HowToPlay;
    setCurrentPage(2);
  };

  const prev = () => {
    document.querySelector('#aboutContent').innerHTML = History;
    setCurrentPage(1);
  };
  return (
    <>
      <div className="about">
        <div className="contentCard">
          <div className="setTitle">
            <h2>History and How to play</h2>
          </div>
          <div className="postFilter">
            <div>
              <button
                disabled={currentPage === 1 ? true : false}
                onClick={prev}
                className="prevCard"
              >
                <span>&#3894;</span>Prev
              </button>
            </div>
            <button className="currentPage">1 of 2</button>
            <div>
              <button
                disabled={currentPage === 2 ? true : false}
                onClick={next}
                className="nextCard"
              >
                Next <span>&#3894;</span>
              </button>
            </div>
          </div>
          <div
            id="aboutContent"
            className="innerCard boxShadow textLeft contentCard aboutContent"
          >
            <h2>The history of Magic</h2>
            <p>
              As it turns out, the game almost didn’t happen. In 1991, Wizards
              of the Coast was busy printing roleplaying games and supplements,
              and operated out of Peter Adkison’s basement. Adkison was the
              owner and CEO of Wizards when he was approached by Dr. Richard
              Garfield, a doctoral candidate in combinatorial mathematics.
              Garfield was interested in having Wizards publish his “RoboRally”
              board game design.
            </p>
            <p>
              Adkison liked RoboRally (and would later produce it through
              Wizards) but he felt at the time that Wizards didn’t possess the
              resources or technical know-how to produce a board game. He asked
              Garfield to instead come up with a simple game that could be
              played in minutes, and that was portable enough that people could
              play it while “waiting in line at conventions.”
            </p>
            <p>
              Garfield went back to his workshop and emerged with the very first
              version of the game we now know as Magic.
            </p>
            <p>
              Source:{' '}
              <a href="https://magic.wizards.com/en/content/history">
                Wizards of the Coast
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
