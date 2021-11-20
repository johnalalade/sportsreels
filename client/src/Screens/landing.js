import React from 'react'
import { Component } from 'react'
import logo from '../Images/logo.png'
import player from '../Images/player.png'
import boy from '../Images/boy.png'
import gym from '../Images/gym.png'
import bball from '../Images/b-ball.png'
import ltenis from '../Images/l-tenis.png'
import ttenis from '../Images/t-tenis.png'
import person from '../Images/person.svg'
import chat from '../Images/chat.svg'
import statistics from '../Images/statistics.svg'
import vector from '../Images/vector.svg'
import './landing.css'

function Landing() {
  return (
      <div>
        {/* <!-- navbar --> */}
  <nav class="navbar navbar-expand-md navbar-light">
    <div class="container-xxl">
      <a class="navbar-brand" href="#intro">
        
        <img src={logo} alt="logo" className="logo" />
      </a>
      {/* <!-- toggle button for mobile nav --> */}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      {/* <!-- navbar links --> */}
      <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#sports">Sports</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#reviews">Showcase your skills</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Get in Touch</a>
          </li>
          <li class="nav-item ms-2 ">
            <a class="btn scout" href="#pricing">Scout Talent</a>
          </li>
          {(!localStorage.getItem('firstname')) && 
          <li class="nav-item">
            <a class="nav-link" onClick={()=> window.location =`/login`}>Login</a>
          </li> || 
          <li class="nav-item">
            <b><i><a class="nav-link" href="#intro" >{localStorage.getItem('firstname')}</a></i></b>
          </li>}
          
          
        </ul>
      </div>
    </div>
  </nav>

  {/* <!-- main image & intro text --> */}
  <section id="intro">
    <div class="container-lg">
      <div class="row g-4 justify-content-center align-items-center">
        <div class="col-md-5 text-center text-md-start">
          <h1>
            <div class="display-2">Discover Top Talents</div>
            {/* <div class="display-5 text-muted">Your Coding Skills</div> */}
          </h1>
          <p class="lead my-4 text-muted">Through our growing networks of talented young people</p>
          
          <span className="search-span">
          <input className="form-control" placeholder="Try Football"/>
          <a href="#pricing" class="btn search-btn">SEARCH</a>
          </span>
          <br/>

          Are you talented in sport ?
          <br/>
          <a href="#sidebar" class="show-link" data-bs-toggle="offcanvas" role="button" aria-controls="sidebar">
            Showcase Your Skills
          </a>
          
        </div>
        <div class="col-md-5 text-center d-none d-md-block">
          {/* <!-- tooltip --> */}
          <span class="tt" data-bs-placement="bottom" title="Net Ninja Pro book cover">
            <img src={player} className="player" alt="ebook" />
          </span>
        </div>
      </div>
    </div>

    <section id="topics">
    <div class="container-md">
      <div class="row my-5 g-5 justify-content-around align-items-center">
        <div class="col-6 col-lg-4">
          <img src={boy} class="img-fluid" alt="ebook" />
        </div>
        <div class="col-lg-6">
          
          {/* <!-- accordion --> */}
          <div className="about">
            <h2>About SportReels</h2>
            <p>An Online platform which gives opportunity to unexpected but talented sport persons to showcase their talent to the world for <b><i>free</i></b></p>
          
          <a className="btn start" href="/login"> 
            Get Started <span class="iconify" data-icon="eva:arrow-forward-fill"></span>
          </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <br/>
  </section>

  {/* popular */}

  <section id="sports">
    <div className="container">
      <br/>
      <div className="pop-div">
        <h3 className="display-1 pop">Popular Sports</h3>
        <span className="pop-span"></span>
      </div>
      <br/>
      <div className="row p-r">
        <div className="col-md-3">
          <div class="card">
            <img class="card-img-top" src={gym} alt="Card image cap" />
            <div class="card-body">
            <h5 class="card-title">Football</h5>
            <h6 class="card-subtitle mb-2 text-muted">Learn more</h6>
         </div>
        </div>
        </div>
          <br/>
        <div className="col-md-3">
          <div class="card">
            <img class="card-img-top" src={bball} alt="Card image cap" />
            <div class="card-body">
            <h5 class="card-title">Basketball</h5>
            <h6 class="card-subtitle mb-2 text-muted">Learn more</h6>
         </div>
        </div>
        </div>

        <div className="col-md-3">
          <div class="card">
            <img class="card-img-top" src={ltenis} alt="Card image cap" />
            <div class="card-body">
            <h5 class="card-title">Lawn tennis</h5>
            <h6 class="card-subtitle mb-2 text-muted">Learn more</h6>
         </div>
        </div>
        </div>
            <br/>
        <div className="col-md-3">
          <div class="card">
            <img class="card-img-top" src={ttenis} alt="Card image cap" />
            <div class="card-body">
            <h5 class="card-title">Table tennis</h5>
            <h6 class="card-subtitle mb-2 text-muted">Learn more</h6>
         </div>
        </div>
        </div>
      </div>
    </div>
  </section>
    <br/>

{/* why choose */}
<section className="choose">
    <div className="container">
      <br/>
      <div className="pop-div">
        <h3 className="display-5 pop">Why Choose Us</h3>
        <span className="pop-span"></span>
      </div>
      <br/>
      <div className="row w-r">
        <div className="col-md-4">
          <div class="card">
            <img class="card-img-top why-img" src={person} alt="Card image cap" />
            <div class="card-body">
            <h5 class="card-title">Profile</h5>
            <h6 class="card-subtitle mb-2 text-muted">You can get the
profile of each player‘s unique resume, including their action videos ,, history etc.</h6>
            <a href="#" class="start btn">Learn more <span class="iconify" data-icon="eva:arrow-forward-fill"></span> </a>
         </div>
        </div>
        </div>
            <br/>
        <div className="col-md-4">
          <div class="card">
            <img class="card-img-top why-img" src={chat} alt="Card image cap" />
            <div class="card-body">
            <h5 class="card-title">Chat</h5>
            <h6 class="card-subtitle mb-2 text-muted">You will be able to chat with any player of your choice. Create new opportunities secure and private.</h6>
            <a href="#" class="start btn">Learn more <span class="iconify" data-icon="eva:arrow-forward-fill"></span> </a>
         </div>
        </div>
        </div>
            <br/>
        <div className="col-md-4">
          <div class="card">
            <img class="card-img-top why-img" src={statistics} alt="Card image cap" />
            <div class="card-body">
            <h5 class="card-title">Statistics</h5>
            <h6 class="card-subtitle mb-2 text-muted">A record of player’s performance. See posts of their best sport moments and connect with them.</h6>
            <a href="#" class="start btn">Learn more <span class="iconify" data-icon="eva:arrow-forward-fill"></span> </a>
         </div>
        </div>
        </div>

        {/* <div className="col-md-3">
          <div class="card">
            <img class="card-img-top" src={ttenis} alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">Table tennis</h5>
              <h6 class="card-subtitle mb-2 text-muted">Learn more</h6>
         </div>
        </div>
        </div> */}
      </div>
    </div>
    <br/>
  </section>

{/* Athletes */}
<section id="athlete">
    <div className="container">
    <br/>
      <div className="pop-div">
        <h3 className="display-5 pop">Meet some of athletes</h3>
        <span className="pop-span"></span>
      </div>
      <br/>
      <br/>
      <div className="row a-r">
        <div className="col-md-4 a-c">
          <div class="card">
            
            <div class="card-body">
            <h6 class="card-subtitle">I never thought my dreeam of becoming a professional footballer would eventually come to pass. Thanks to sportreels for putting me out there.</h6>
          </div>
          <div className="athelete-pic">
            <img class="athelete" src={gym} alt="Card image cap" />
            <div className="athelete-det">
              <h5>Adeyera Toluwani</h5>
              <p className="text-muted">A Footballer</p>
            </div>
          </div>
        </div>
        </div>
            <br/>
        <div className="col-md-4 a-c">
          <div class="card">
            
            <div class="card-body">
            <h6 class="card-subtitle">I never thought my dreeam of becoming a professional footballer would eventually come to pass. Thanks to sportreels for putting me out there.</h6>
          </div>
          <div className="athelete-pic">
            <img class="athelete" src={gym} alt="Card image cap" />
            <div className="athelete-det">
              <h5>Adeyera Toluwani</h5>
              <p className="text-muted">A Footballer</p>
            </div>
          </div>
        </div>
        </div>
            <br/>
        <div className="col-md-4 a-c">
          <div class="card">
            
            <div class="card-body">
            <h6 class="card-subtitle">I never thought my dreeam of becoming a professional footballer would eventually come to pass. Thanks to sportreels for putting me out there.</h6>
          </div>
          <div className="athelete-pic">
            <img className="athelete" src={gym} alt="Card image cap" />
            <div className="athelete-det">
              <h5>Adeyera Toluwani</h5>
              <p className="text-muted">A Footballer</p>
            </div>
          </div>
        </div>
        </div>

      </div>
    </div>
  </section>
    <br/>

        {/* What are you waiting for */}
    <section className="waiting">
        <div>
          
          <div className="row">

          <div className="col-md-6 d-none d-md-block"></div>
          <div className="col-md-6 w-h-div">
            <h2 className="display-4 w-h-h">What are you waiting for?</h2>
            <p className="w-h-p">If you are talented in sport and you’re sure of your skills, you can apply by clicking the link below.</p>
          </div>

            <div className="col-md-6 d-none d-md-block">
              <img src={vector} className="vector" alt="vector"/>
            </div>

            <div className="col-md-6 w-start">
            <a className="btn start" href="/login"> 
            Get Started <span class="iconify" data-icon="eva:arrow-forward-fill"></span>
            </a>
            </div>

          </div>
        </div>
    </section>

  {/* <!-- Intersting --> */}
  <section id="news" class="bg-light mt-5">
    <div class="container-lg">
    <div className="pop-div">
        <h3 className="display-5 pop">Interesting Sport News</h3>
        <span className="pop-span"></span>
      </div>

      <div class="row my-5 g-0 align-items-center justify-content-center">
        <div class="col-8 col-lg-4 col-xl-3">
          <div class="card border-0 soccer">
            <div class="card-body text-center py-4">

              <div className="c-b">
              <h4 class="c-h text-muted">Soccer</h4>
              <h2 className="n-h">Pele: Brazil legend upbeat undergoing..</h2>
              <p class="c-t mx-5 text-muted d-none d-lg-block">Surgery To Remove Tumour From His Colon Pele, 80, Has Pledged To Meet His Illness "with A Smile On My Face"; The Brazil Great..</p>
              <hr/>
              <a href="#" class="read-m">
                Read More
              </a>

              </div>
              
            </div>
          </div>
        </div>

        <div class="col-9 col-lg-4">
          <div class="card border-primary border-2 basketball">
            <div class="card-header text-center text-primary">Most Popular</div>
            <div class="card-body text-center py-5">
            <div className="c-b">
              <h4 class="c-h text-muted">Basketball</h4>
              <h2 className="n-h">Olympics: US beat Japan to win seventh...</h2>
              <p class="c-t mx-5 text-muted d-none d-lg-block">Team Usa Extended A Historic Run Of Championships In Olympic Women’s Basketball On Sunday (aug 8), Winning The Gold Against Home Team Japan, Who Made Their First-ever Appearance In A Medal Match.</p>
              <hr/>
              <a href="#" class="read-m">
                Read More
              </a>

            </div>
            </div>
          </div>
        </div>

        <div class="col-8 col-lg-4 col-xl-3">
          <div class="card border-0 table-tennis">
            <div class="card-body text-center py-4">
            <div className="c-b">
              <h4 class="c-h text-muted">Table Tennis</h4>
              <h2 className="n-h">Nigerian teenager, Samuel Boboye, claims.</h2>
              <p class="c-t mx-5 text-muted d-none d-lg-block">Only 17 Years Old, Samuel Boboye Is Making His Senior Debut As A Member Of The Nigerian Team At The 2021 Ittf African Championships In Yaoundé, Cameroon.</p>
              <hr/>
              <a href="#" class="read-m">
                Read More
              </a>

            </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  {/* <!-- contact form -->
  <!-- form-control, form-label, form-select, input-group, input-group-text --> */}
  <section id="contact">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 cc">
          <div className="contact-n">

          <div>
          <h5>Menu</h5>
          <p>Home</p>
          <p>about</p>
          <p>contact</p>
          </div>
         
          <div>
          <h5>Sports</h5>
          <p >Football</p>
          <p >Basketball</p>
          <p >Tenis</p>
          </div>

          </div>
        </div>
        <div className="col-md-6">
           <div class="container-fluid">
      
            <div class="text-center">
              <h2>Contact Us</h2>
            </div>
            <div class="row justify-content-center my-5">
            <div class="col-lg-6">
          
          
            <div class="input-group mb-4">
              <span class="input-group-text">
                <i class="bi bi-envelope-fill text-secondary"></i>
              </span>
              <input type="text" id="email" class="form-control in" width="100px" placeholder="Name" />

            </div>
            
            <div class="mb-4 input-group">
              <span class="input-group-text">
                <i class="bi bi-person-fill text-secondary"></i>
              </span>
              <input type="text" id="name" class="form-control in" placeholder="Email Address" />
              {/* <!-- tooltip --> */}
              
            </div>
            
            <div class="mb-4 input-group">
              <textarea className="in" col="3" row="6"></textarea>
            </div>

            <div class="mb-4 text-center">
              <button type="submit" class="btn start">Submit</button>
            </div>
         
         </div>
       </div>
     </div>
     </div>
     </div>
     </div>
     <hr></hr>
  </section>

  {/* <!-- get updates / modal trigger --> */}
 
  {/* <!-- modal itself --> */}
  

  {/* <!-- side panel / offcanvas --> */}
  
      </div>
    )

}

export default Landing