import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import "../Service/service.css";

import bandara from "../../assets/images/service/bandara.jpg";
import wisata from "../../assets/images/service/wisata.jpg";
import kunjungan_kerja from "../../assets/images/service/kunjungan_kerja.jpg";
import pernikahan from "../../assets/images/service/pernikahan.jpg";

const serviceData = [
  {
    id: 1,
    postImage: bandara,
    title: 'Bandara',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reprehenderit consectetur, quia pariatur nulla fugit? Fugit labore officia accusantium perspiciatis velit sed!'
  },
  {
    id: 2,
    postImage: wisata,
    title: 'Wisata/Religi',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reprehenderit consectetur, quia pariatur nulla fugit? Fugit labore officia accusantium perspiciatis velit sed!'
  },
  {
    id: 3,
    postImage: kunjungan_kerja,
    title: 'Kunjungan Kerja',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reprehenderit consectetur, quia pariatur nulla fugit? Fugit labore officia accusantium perspiciatis velit sed!'
  },
  {
    id: 4,
    postImage: pernikahan,
    title: 'Acara Pernikahan',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reprehenderit consectetur, quia pariatur nulla fugit? Fugit labore officia accusantium perspiciatis velit sed!'
  }
]

const Service = () => {
  return (
    <section id='service' className='service container section'>
      <div className='secContainer'>

        <div className='secIntro'>
          <h2 className='secTitle fw-bold'>
            Service
          </h2>
          <p>
            Bandara
          </p>
        </div>

        <div className='mainContainer cardContainer'>
          {
            serviceData.map(({id, postImage, title, desc}) => (
              <div className='singlePost' key={id}>
                <div className="imageContainer">
                  <div className="bandaraTitle">{title}</div>

                  <div className='imgDiv'>
                    <img src={postImage} alt={title} />
                  </div>
                </div>

                <div className='postDetails'>
                  <p>{desc}</p>
                  <a href={`/service/${id}`} className='icon'>
                    Lihat Detail <BsArrowRightShort />
                  </a>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </section>
  )
}

export default Service
