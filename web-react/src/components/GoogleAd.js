import React, { useEffect } from 'react'

export default () => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [window])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', width: '100vw', height: '300px' }}
      data-ad-client="pub-3601891123709132"
      data-ad-slot="7806394673"
      data-ad-format="auto"
    />
  )
}
