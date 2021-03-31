import React from 'react'

const Footer = (props) => {
  return (
    <div className="app-footer">
      <span>&copy; 2021 OnClick.</span>
      <div className="ml-auto">
        {React.Children.map(props.children, (child) => (
          <>
            {child}
          </>
        ))}
      </div>
    </div>
  )
}

export default Footer
