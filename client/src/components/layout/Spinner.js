import React from 'react'

function Spinner() {
  return (
    <div style={{ display: 'flex' , flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
      <i className="fas fa-spinner fa-spin" style={{fontSize: 50}}></i>
    </div>
  )
}
export default  Spinner;