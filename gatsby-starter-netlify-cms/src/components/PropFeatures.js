import React from 'react'

const PropFeatureGrid = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map((item, index) => (
      <div key={index} className="column is-6">
        <section className="section">
          <div className="has-text-centered">
            <div
              style={{
                width: '240px',
                display: 'inline-block',
              }}
            >
              <img src={item.picture} />
            </div>
          </div>
          <p>{item.description}</p>
        </section>
      </div>
    ))}
  </div>
)


export default PropFeatureGrid
