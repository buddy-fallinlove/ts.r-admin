import React, { FC } from 'react'

interface Props {
  
}

const Home: FC = (props: Props) => {
  return (
    <div className='flex f-col a-center j-center' style={{
      height: '70vh'
    }}>
      <div style={{
        fontSize: 36,
        fontWeight: 700,
        color: '#000'
      }}>欢迎您来到小爱电商后台管理系统</div>
    </div>
  )
}

export default Home
