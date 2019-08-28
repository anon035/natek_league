import React from 'react';

const WeekTwo = () => {
    return(
        <div className="ui segment toggleView2 activeWeek" onClick={() => {
            const element = document.querySelector('.toggleView2');
            if(element.style.maxHeight !== '100%'){
              element.style.maxHeight = '100%';
            } else {
              element.style.maxHeight = '40vh';
              document.getElementById('root').style.marginRight = '';
            }
          }}>
              <p className="week-title">WEEK 2</p>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>František Dely</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Marek Hrubčo</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Marián Schwarz</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Peter Urban</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Gabriel Gembický</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Aleš Vincenčík</p>
                  </div>
                </div>
                <div className="versus ui vertical divider"> 2 : 1 </div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Vladimír Kertis</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Pavol Vodarčik</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Ladislav Arvay</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Stanislav Vojtko</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Miloslav Kocúr</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Tomáš Škrak</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Jozef Rosenberg</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Marek Vangor</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Daniel Pastornický</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Jakub Mizák</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Ján Mihalčin</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Stanislav Petruš</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Ondrej Gažo</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Lukáš Melicher</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Jakub Mokoš</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Marián Schwarz</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Aleš Vincenčík</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>František Dely</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Peter Urban</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Vladimír Kertis</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Stanislav Vojtko</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Gabriel Gembický</p>
                  </div>
                </div>
                <div className="versus ui vertical divider"> 1 : 2 </div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Pavol Vodarčik</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Miloslav Kocúr</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Marek Vangor</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Ladislav Arvay</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Tomáš Škrak</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Daniel Pastornický</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Stanislav Petruš</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Jozef Rosenberg</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Jakub Mizák</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Ondrej Gažo</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
              <div className="ui segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <p>Lukáš Melicher</p>
                    <img alt="#" src="./logos/user.png" />
                  </div>
                  <div className="column">
                    <img alt="#" src="./logos/user.png" />
                    <p>Ján Mihalčin</p>
                  </div>
                </div>
                <div className="versus ui vertical divider">VS</div>
              </div>
            </div>
    )
}

export default WeekTwo;