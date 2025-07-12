import React, { useState, useEffect } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import "../Service/service.css";
import axiosInstance from '../../core/axiosinstance';

const Service = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get('/api/guest/services')
        setServices(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching services:', error)
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <section id='service' className='service container section'>
      <div className='secContainer'>
        <div className='secIntro'>
          <h2 className='secTitle fw-bold'>
            Service
          </h2>
        </div>

        <div className='mainContainer cardContainer'>
          {loading ? (
            <p>Loading...</p>
          ) : services.length > 0 ? (
            services.map(({id, name, description, images}) => (
              <div className='singlePost' key={id}>
                <div className="imageContainer">
                  <div className="bandaraTitle">{name}</div>

                  <div className='imgDiv'>
                    <img 
                      src={images && images.length > 0 ? images[0].img_url.trim() : '/default-image.jpg'} 
                      alt={name} 
                    />
                  </div>
                </div>

                <div className='postDetails'>
                  <p>{description}</p>
                  <a href={`/service/${id}`} className='icon'>
                    Lihat Detail <BsArrowRightShort />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada layanan tersedia</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Service
