import React from 'react'
import ContentLoader from "react-content-loader"

const Preloader = () => {
  return (
      <ContentLoader
          className="pizza-block"
          speed={2}
          width={280}
          height={460}
          viewBox="0 0 280 460"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
         
      >
          <circle cx="138" cy="119" r="119" />
          <rect x="-3" y="297" rx="17" ry="17" width="280" height="84" />
          <rect x="4" y="408" rx="16" ry="16" width="99" height="38" />
          <rect x="146" y="401" rx="24" ry="24" width="130" height="49" />
          <rect x="-1" y="257" rx="19" ry="19" width="280" height="24" />
      </ContentLoader>
    )
  
}

export default Preloader